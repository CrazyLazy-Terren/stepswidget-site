---
slug: connect-apple-health
title: Connect Apple Health
metaTitle: Connect Steps Widget to Apple Health on iPhone
description: The read-only Health types Steps requests, how to grant access after declining, how to see which devices counted your steps, and the switches step counting depends on.
order: 2
updated: 2026-11-22
readingTime: 5 min read
keywords:
  - Apple Health permission
  - HealthKit steps access
  - Steps Widget Health access
  - Motion and Fitness iPhone
---

Steps does not count steps itself. Your iPhone counts them with a built-in motion coprocessor, your Apple Watch counts its own, and Apple Health merges and de-duplicates both into one daily total. The app reads that total with your permission.

That is why your numbers match the Health app exactly, and why counting steps needs no GPS and no server. One optional feature does ask for location — **Local Sunset**, covered in [Reminder timing and devices](/docs/goal-reminders/reminder-timing-and-devices) — and nothing else does.

## What the app requests

Three read-only types:

| Type             | Why                                                             |
| ---------------- | --------------------------------------------------------------- |
| Step count       | The number in every widget, and the input to the reminder model |
| Stand hours      | Marks the hours you stood in the hourly chart                   |
| Activity summary | Carries the day's stand total and stand goal                    |

Two features ask for one more type, only when you use them:

| Type                   | Asked for when                                                                                          |
| ---------------------- | ------------------------------------------------------------------------------------------------------- |
| Wheelchair push count  | You turn on [Wheelchair Mode](/docs/steps-and-data/wheelchair-mode)                                     |
| Age, weight and height | You tap the Health import in [Walking Plan](/docs/getting-started/walking-plan) for a goal that uses them |

And what it never asks for: writing to Health, heart rate, sleep or workouts. HealthKit enforces this per category — an app cannot read what it has not requested.

## Granting access on first launch

The first screen has a **Connect Apple Health** button. Tap it and an **About Permissions** sheet lists what the app reads — **Step Count**, plus **Motion Sensor** for live counts. Tap **Allow Access**, then **Allow** on the system sheet.

If you use a wheelchair, turn on **Wheelchair Mode** on that same first screen before connecting, so the app asks for push count instead of reading steps. See [Wheelchair Mode](/docs/steps-and-data/wheelchair-mode).

## Granting access after declining

The Health sheet appears once. If you dismissed it or tapped **Don't Allow**:

1. Open the **Health** app.
2. Tap your profile picture, top right.
3. Tap **Apps and Services**.
4. Tap **Steps Widget**.
5. Turn on the types listed above.
6. Open the app once so it can read the newly available data.

> **Note:** HealthKit denies access silently. An app without permission is told the data does not exist rather than that it was refused — which is why a widget with no permission shows zero instead of an error. A count stuck at zero is almost always this.

## Check Fitness Tracking

Health permission only matters if iOS is recording motion at all. One system switch turns that off for every app on the phone, including Apple's own:

1. **Settings** › **Privacy & Security** › **Motion & Fitness**.
2. Turn on **Fitness Tracking**.
3. Confirm **Health** is enabled in the app list below.

With Fitness Tracking off, nothing counts steps. Turning it back on starts recording from that moment — it does not backfill the hours it missed.

## See which devices counted your steps

**Settings › Apple Health** opens **Step Sources**, a breakdown of today's total by where it came from:

- A bar filled against your daily goal, split by each source's share.
- One row per source — this iPhone, your Apple Watch, and any app that writes steps to Health, such as a fitness band's companion app — with when it last synced and when it recorded its last step.
- A **Motion Sensor** row comparing the live pedometer with Health's figure for this iPhone.

Health counts a step once even when several devices recorded it, so the rows can add up to more than the total. That is expected, not double counting.

When an app has not synced while other sources kept recording, the page says so and offers **Try Open** for that app — opening it usually makes it sync — or **Check Access in Health** if it is not allowed to write steps. Pull down to refresh afterwards.

If the numbers still look wrong, **Report an Issue** at the bottom sends what you expected along with the counts on that page. Device and app names are left out.

## Why does my widget show a different number than Health?

Over a day it will not. Short differences have two ordinary causes.

Widget refresh timing. iOS decides when a widget may redraw. The app asks for a refresh as often as every five minutes while you are walking and up to every thirty minutes during quiet stretches, but the system grants those requests on its own schedule. Tap the step number on the widget to refresh it on the spot. The Health app recalculates the instant you open it, so it is always the more current of the two.

Apple Health's own cadence. Health shares step updates with apps about once an hour. If you want a count that tracks your walk in near real time, turn on **Motion Sensor** in Settings — it reads the pedometer for the stretch since Health's last sample and adds it on top. See [Motion Sensor](/docs/steps-and-data/motion-sensor-and-live-activity).

## Does Steps Widget send my health data anywhere?

No. Step data is read from Health on your device, processed on your device, and drawn on your device. The model that decides when to remind you also trains and runs locally. There is no account, no server holding your steps, and no analytics pipeline carrying step counts off the phone.

The full picture, including what iCloud does and does not carry, is in [Privacy and sync](/docs/steps-and-data/privacy-and-sync).

## Revoking access

1. **Health** › your profile picture › **Apps and Services**.
2. Tap **Steps Widget** and turn the types off.

Your count drops to zero. The app reads your steps rather than accumulating them, so there is no private copy to fall back on: once the read is revoked there is nothing left to show, and it asks for access again.

One exception: the current window's numbers are cached in the shared app group so widgets can redraw without running a Health query every time. That cache holds today only, not your history, and a widget may keep showing its last value until it refreshes. Nothing is transmitted when you revoke access, because nothing was being transmitted before.

## What to read next

- [Set your daily goal](/docs/getting-started/set-your-daily-goal) — the target everything measures against.
- [Steps not counting](/docs/troubleshooting/steps-not-counting) — the full checklist when the number stays at zero.
- [Motion Sensor and Live Activity](/docs/steps-and-data/motion-sensor-and-live-activity) — counts that update while you walk.
- [How iPhone and Apple Watch count and sync steps](/blog/how-iphone-apple-watch-count-and-sync-steps) — how Apple Health reconciles data from multiple devices.
- [See your step count without opening Health](/blog/see-step-count-without-opening-health-app) — glanceable step counts across widgets and complications.

