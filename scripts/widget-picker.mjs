import fs from 'node:fs'
import http from 'node:http'
import path from 'node:path'
import { columns, defaultExportDir, names, readCurrentGrid, readManifest, rows, writeTiles } from './widget-tiles-lib.mjs'

/*
 * Pick the home page's widget wall by hand.
 *
 *   pnpm widgets:pick [export-dir]      (export-dir defaults to .widget-export/)
 *
 * Opens a local page with the 6×4 wall as it is now beside every style the app
 * exported. Click a cell, then a style, to put that style in the cell (a style
 * already on the wall swaps places). Save writes the WebPs and
 * app/widget-tiles.ts, the same as the automatic `pick-widget-tiles.mjs`, so the
 * dev server picks the change up straight away.
 *
 * Local only: it listens on 127.0.0.1.
 */

const exportDir = path.resolve(process.argv[2] ?? defaultExportDir)
const port = Number(process.env.PORT ?? 4310)

if (!fs.existsSync(path.join(exportDir, 'manifest.json'))) {
  console.error(`No export in ${exportDir}. Launch the app with -ExportWidgetGallery and copy its Documents/WidgetGallery there.`)
  process.exit(1)
}

const styles = readManifest(exportDir).map((s) => ({ ...s, name: names[s.type] ?? s.type }))
const known = new Map(styles.map((s) => [s.key, s]))

function sendJson(res, status, body) {
  res.writeHead(status, { 'content-type': 'application/json' })
  res.end(JSON.stringify(body))
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost')

  if (req.method === 'GET' && url.pathname === '/') {
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' })
    res.end(page)
    return
  }

  if (req.method === 'GET' && url.pathname === '/api/state') {
    sendJson(res, 200, { styles, grid: readCurrentGrid().map((key) => (known.has(key) ? key : null)), columns, rows })
    return
  }

  // Renders straight from the export folder; the name is checked against the manifest.
  const render = url.pathname.match(/^\/render\/([a-z0-9]+-\d+)-(light|dark)\.png$/)
  if (req.method === 'GET' && render && known.has(render[1])) {
    res.writeHead(200, { 'content-type': 'image/png', 'cache-control': 'max-age=3600' })
    fs.createReadStream(path.join(exportDir, `${render[1]}-${render[2]}.png`)).pipe(res)
    return
  }

  if (req.method === 'POST' && url.pathname === '/api/save') {
    let body = ''
    for await (const chunk of req) body += chunk
    let grid
    try {
      grid = JSON.parse(body).grid
    } catch {
      sendJson(res, 400, { error: 'Bad request' })
      return
    }
    if (!Array.isArray(grid) || grid.length !== columns * rows || grid.some((key) => key !== null && !known.has(key))) {
      sendJson(res, 400, { error: 'Unknown style in grid' })
      return
    }
    const picks = grid.flatMap((key, cell) => (key ? [{ ...known.get(key), row: Math.floor(cell / columns), col: cell % columns }] : []))
    const written = await writeTiles(exportDir, picks)
    console.log(`saved ${written} tiles`)
    sendJson(res, 200, { written })
    return
  }

  res.writeHead(404)
  res.end()
})

server.listen(port, '127.0.0.1', () => {
  console.log(`Widget picker: http://localhost:${port}  (${styles.length} styles from ${exportDir})`)
})

const page = /* html */ `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Widget wall picker</title>
<style>
  :root { color-scheme: light; font-family: -apple-system, BlinkMacSystemFont, sans-serif; }
  body { margin: 0; background: #f2f1ec; color: #1a1a18; }
  body.dark { background: #161614; color: #f2f1ec; }
  header { position: sticky; top: 0; z-index: 2; display: flex; gap: 12px; align-items: center; padding: 12px 20px; background: inherit; border-bottom: 1px solid #8884; }
  header h1 { font-size: 15px; margin: 0 auto 0 0; }
  button { font: inherit; font-size: 13px; padding: 6px 12px; border-radius: 8px; border: 1px solid #8886; background: transparent; color: inherit; cursor: pointer; }
  button.primary { background: #c2410c; border-color: #c2410c; color: #fff; }
  button:disabled { opacity: .5; cursor: default; }
  #status { font-size: 13px; opacity: .7; min-width: 10ch; }
  main { display: grid; grid-template-columns: minmax(420px, 560px) 1fr; gap: 24px; padding: 20px; align-items: start; }
  .wall-wrap { position: sticky; top: 72px; }
  .hint { font-size: 12px; opacity: .65; margin: 8px 0 0; line-height: 1.5; }
  #wall { display: grid; grid-template-columns: repeat(6, 1fr); gap: 8px; }
  .cell { position: relative; aspect-ratio: 1; border-radius: 18%; cursor: pointer; overflow: hidden; }
  .cell.empty { border: 2px dashed #8886; }
  .cell img { width: 100%; height: 100%; display: block; }
  .cell.selected { outline: 3px solid #c2410c; outline-offset: 2px; }
  .cell.empty::after { content: '+'; position: absolute; inset: 0; display: grid; place-items: center; opacity: .4; font-size: 20px; }
  section h2 { font-size: 13px; text-transform: uppercase; letter-spacing: .1em; opacity: .6; margin: 0 0 8px; }
  section { margin-bottom: 24px; }
  .styles { display: grid; grid-template-columns: repeat(auto-fill, minmax(84px, 1fr)); gap: 8px; }
  .style { position: relative; padding: 0; border: 0; border-radius: 18%; overflow: hidden; aspect-ratio: 1; }
  .style img { width: 100%; height: 100%; display: block; }
  .style.on-wall { outline: 2px solid #c2410c; outline-offset: 2px; }
  .style.on-wall::after { content: attr(data-cell); position: absolute; bottom: 4px; right: 4px; font-size: 10px; background: #c2410c; color: #fff; border-radius: 6px; padding: 1px 5px; }
</style>
</head>
<body>
<header>
  <h1>Widget wall picker</h1>
  <span id="status"></span>
  <button id="theme">Dark</button>
  <button id="clear" title="Empty the selected cell">Clear cell</button>
  <button id="revert">Revert</button>
  <button id="save" class="primary" disabled>Save</button>
</header>
<main>
  <div class="wall-wrap">
    <div id="wall"></div>
    <p class="hint">Click a cell, then a style on the right. A style already on the wall swaps places.<br>
    The wall shows exactly this order, row by row. Narrower screens wrap the same order into fewer columns.</p>
  </div>
  <div id="library"></div>
</main>
<script>
let state, grid, saved, selected = 0, scheme = 'light'
const $ = (id) => document.getElementById(id)
const src = (key) => '/render/' + key + '-' + scheme + '.png'

function render() {
  $('wall').replaceChildren(...grid.map((key, cell) => {
    const el = document.createElement('div')
    el.className = 'cell' + (key ? '' : ' empty') + (cell === selected ? ' selected' : '')
    el.title = 'Row ' + (Math.floor(cell / state.columns) + 1) + ', column ' + (cell % state.columns + 1)
    if (key) { const img = new Image(); img.src = src(key); img.alt = key; el.append(img) }
    el.onclick = () => { selected = cell; render() }
    return el
  }))
  const where = new Map(grid.map((key, cell) => [key, cell]))
  const groups = Map.groupBy(state.styles, (s) => s.name)
  $('library').replaceChildren(...[...groups].map(([name, list]) => {
    const section = document.createElement('section')
    const h = document.createElement('h2'); h.textContent = name + ' · ' + list.length
    const box = document.createElement('div'); box.className = 'styles'
    for (const s of list) {
      const b = document.createElement('button')
      b.className = 'style' + (where.has(s.key) ? ' on-wall' : '')
      if (where.has(s.key)) b.dataset.cell = (where.get(s.key) + 1)
      b.title = s.key
      const img = new Image(); img.loading = 'lazy'; img.src = src(s.key); img.alt = s.key
      b.append(img)
      b.onclick = () => place(s.key)
      box.append(b)
    }
    section.append(h, box)
    return section
  }))
  const dirty = JSON.stringify(grid) !== JSON.stringify(saved)
  $('save').disabled = !dirty
  $('status').textContent = dirty ? 'Unsaved changes' : ''
}

function place(key) {
  const from = grid.indexOf(key)
  if (from !== -1) grid[from] = grid[selected]
  grid[selected] = key
  // Move on to the next cell, so filling the wall is click, click, click.
  selected = (selected + 1) % grid.length
  render()
}

$('theme').onclick = () => {
  scheme = scheme === 'light' ? 'dark' : 'light'
  document.body.classList.toggle('dark', scheme === 'dark')
  $('theme').textContent = scheme === 'light' ? 'Dark' : 'Light'
  render()
}
$('clear').onclick = () => { grid[selected] = null; render() }
$('revert').onclick = () => { grid = [...saved]; render() }
$('save').onclick = async () => {
  $('save').disabled = true
  $('status').textContent = 'Saving…'
  const res = await fetch('/api/save', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ grid }) })
  const body = await res.json()
  if (!res.ok) { $('status').textContent = body.error; $('save').disabled = false; return }
  saved = [...grid]
  render()
  $('status').textContent = 'Saved ' + body.written + ' tiles to the site'
}

fetch('/api/state').then((r) => r.json()).then((s) => { state = s; grid = [...s.grid]; saved = [...s.grid]; render() })
</script>
</body>
</html>`
