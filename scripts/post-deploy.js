const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://steps.crazylazy.xyz'
const secret = process.env.INDEXNOW_SUBMIT_SECRET || process.env.INDEXNOW_KEY || 'c578ec83f7ae49908bfeb9b9f494de37'

const submitUrl = `${siteUrl.replace(/\/$/, '')}/api/indexnow/submit?secret=${secret}`

console.log(`Triggering IndexNow URL submission at: ${submitUrl.replace(/secret=[^&]+/, 'secret=***')}`)

fetch(submitUrl)
  .then((res) => {
    console.log(`Response Status: ${res.status} ${res.statusText}`)
    return res.json().catch(() => res.text())
  })
  .then((data) => {
    console.log('Response Body:', JSON.stringify(data, null, 2))
    if (data && (data.success || data.submittedUrlsCount > 0)) {
      console.log('IndexNow submission successful.')
      process.exit(0)
    } else {
      console.error('IndexNow submission failed.')
      process.exit(0)
    }
  })
  .catch((err) => {
    console.error('Error triggering IndexNow submission:', err.message)
    process.exit(0)
  })
