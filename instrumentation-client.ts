import posthog from 'posthog-js'

const posthogToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN

if (posthogToken) {
  posthog.init(posthogToken, {
    api_host: 'https://ts.crazylazy.xyz', // your managed reverse proxy domain
    ui_host: 'https://us.posthog.com', // necessary because you're using a proxy, this way links will point back to PostHog properly
    defaults: '2026-05-30',
  })
}
