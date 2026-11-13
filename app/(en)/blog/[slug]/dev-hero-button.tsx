'use client'

import { useRef, useState } from 'react'

/**
 * Dev-only "Replace hero" button. The page renders it only under `next dev`;
 * the upload goes to `/api/dev/blog-hero`, which also refuses outside dev.
 */
export function DevHeroButton({ slug, hasImage }: { slug: string; hasImage: boolean }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [status, setStatus] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  async function upload(file: File) {
    setBusy(true)
    setStatus('Uploading…')

    const body = new FormData()
    body.append('slug', slug)
    body.append('file', file)

    try {
      const response = await fetch('/api/dev/blog-hero', { method: 'POST', body })
      const result = await response.json()

      if (!response.ok) {
        setStatus(result.error ?? `Failed (${response.status})`)
        setBusy(false)
        return
      }

      setStatus(`Saved ${result.image} · ${result.width}×${result.height} · ${Math.round(result.bytes / 1024)} KB`)
      // Reload so the page re-reads the post and the browser refetches the file.
      window.location.reload()
    } catch (error) {
      setStatus((error as Error).message)
      setBusy(false)
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2 text-xs">
      <button
        type="button"
        disabled={busy}
        onClick={() => inputRef.current?.click()}
        className="rounded-full border border-dashed border-[color:var(--accent-color)] bg-[var(--background,white)]/90 px-3 py-1.5 font-semibold text-[var(--accent-color)] shadow-sm backdrop-blur disabled:opacity-60"
      >
        {busy ? 'Uploading…' : hasImage ? 'Replace hero (dev)' : 'Add hero image (dev)'}
      </button>
      {status && <span className="rounded bg-black/60 px-2 py-1 text-white">{status}</span>}
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/avif,image/heic"
        hidden
        onChange={(event) => {
          const file = event.target.files?.[0]
          event.target.value = ''
          if (file) void upload(file)
        }}
      />
    </div>
  )
}
