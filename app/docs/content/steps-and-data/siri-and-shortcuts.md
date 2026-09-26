---
slug: siri-and-shortcuts
title: Siri and Shortcuts
metaTitle: Ask Siri for Your Steps and Step Goal Forecast with Steps Widget
description: Ask Siri for your steps or daily goal forecast, and build automations with Shortcuts, Spotlight, and the Action Button.
order: 4
updated: 2026-09-26
readingTime: 3 min read
keywords:
  - Siri step count
  - hey Siri how many steps
  - step count shortcut iPhone
  - Siri AI shortcuts
  - will I hit my step goal
---

Steps Widget integrates with Siri and Apple Shortcuts so you can check your steps, hear your daily goal forecast, or grab a widget snapshot hands-free. No extra setup is required once Health access is granted.

## Asking Siri

When speaking to Siri, include **"Steps Widget"** or **"Steps App"** in your request so iOS routes the query to the app rather than Apple Health. Saying just "steps" gets you Apple Health's answer instead.

### 1. Check your steps

> "Hey Siri, get my Steps Widget."
>
> "Hey Siri, get my Steps App for this week."

For today, Siri reads your current count and compares it to your goal. You can also ask for specific periods:

| Single days | Ranges (daily average & goal hit rate) |
| --- | --- |
| Today | This week / Last week |
| Yesterday | Last 7 days |
| Last 24 hours | This month / Last month |
| | Last 30 days |
| | This year |

### 2. Check your goal forecast

> "Hey Siri, will I hit my step goal in Steps Widget?"
>
> "Hey Siri, am I on track in Steps App?"

Siri announces your projected end-of-day step count based on your pace and indicates whether you are on track to meet your daily goal.

### 3. Display your widget

> "Hey Siri, get my Steps App widget image."

Siri displays your current widget styling and step progress on screen.

## Using Shortcuts

Open Apple's **Shortcuts** app, tap **+**, and search for **Steps**. Three background actions are available:

| Action | Options | Returns |
| --- | --- | --- |
| **Show Steps** | **Period** (defaults to Today) | Text summary |
| **Project Today's Steps** | **Step Goal** (defaults to your app goal) | Projected total number |
| **Get Steps Widget** | None | Widget image (PNG) |

### Popular Shortcuts ideas

- **Action Button:** Assign **Show Steps** to the Action Button on iPhone 15 Pro or newer for instant step checks.
- **Afternoon forecast:** Create an automation at 4 PM running **Project Today's Steps** and choose "Speak Text" to hear if you need an evening walk.
- **Weekly summary:** Schedule a Monday morning shortcut that runs **Show Steps** for *Last Week* and shares the result.

## Troubleshooting & Privacy

- **Siri opens Apple Health instead:** Siri requires the app name to distinguish between system fitness and Steps Widget. Be sure to say **"Steps Widget"** or **"Steps App"** (e.g., *"Hey Siri, get my Steps Widget"*).
- **"Unable to read step history":** Ensure Health permissions are enabled in **Settings › Health › Data Access & Devices › Steps Widget**.
- **Privacy:** All Siri requests and Shortcut actions run entirely on your device using local HealthKit data. No step data is sent to external servers.

## What to read next

- [How goal reminders work](/docs/goal-reminders/how-goal-reminders-work) — how the on-device projection works.
- [The step window](/docs/steps-and-data/step-window) — how day boundaries and rolling 24-hour windows work.
- [Connect Apple Health](/docs/getting-started/connect-apple-health) — troubleshooting Health data permissions.
