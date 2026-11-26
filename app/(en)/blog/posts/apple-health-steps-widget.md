---
slug: apple-health-steps-widget
category: Privacy & Performance
title: Apple Health Steps Widget for iPhone and Apple Watch
metaTitle: 'Apple Health Steps Widget for iPhone & Watch | Steps Widget'
description: Apple Health counts your steps but keeps the number inside the app. See how to put it on your Home Screen, Lock Screen, StandBy, and Apple Watch, privately.
date: 2026-06-28
updated: '2026-09-08'
keywords:
  - Apple Health steps widget
  - Apple Watch steps widget
  - private step counter widget
  - daily steps tracker
  - Apple Health step counter
  - iPhone Apple Health widget
  - does Apple Health have a steps widget
  - HealthKit steps widget home screen
image: /assets/blog-apple-health.webp
---

Apple Health already stores your step count — merged from your iPhone, your Apple Watch, and any app you have given access. It would be great if you could see it on the screen and stay updated without having to open the Health app.

An Apple Health steps widget closes that gap. It reads the step total Health already holds, with your permission, and shows it where you actually look: the iPhone Home Screen, the Lock Screen, StandBy, and the Apple Watch face. This guide covers what Apple offers on its own, how to add a widget that reads Health, and what to check when the numbers look off.

## Does Apple Health have a built-in steps widget?

Not a plain one. Apple gives you related things, and none of them is a step count you can drop next to your apps:

- **The Fitness widget.** It shows your Activity rings (Move, Exercise, Stand), not a step number, and it leans on an Apple Watch.

A good widget should update frequently based on your usage, since iOS has a very limited budget for widget refreshes in order to save battery life. It's worth planning accordingly. I built the Steps Widget to learn your usage patterns and refresh when you are most likely to look at it. The more you use it, the better it will fit your day.

## How to add an Apple Health steps widget

Setup takes about five minutes. You need **iOS 18.6 or iOS 26.0 later to support latest features**. An Apple Watch is _not_ required — but it's great to rise your wist to see your step count and get a reminder tap when you are falling behind.

**1. Install and open the app once.** Get [Steps Widget](https://apps.apple.com/app/apple-store/id6756297788?pt=120739140&ct=website&mt=8) from the App Store and launch it once. iOS does not list an app's widgets in the gallery until the app has run, and the app needs that first moment to request Health access.

**2. Allow Health access.** On first launch it asks to read your step count. Tap **Allow**. It requests three read-only Health types and nothing else — step count, plus stand hours and your daily activity summary so it can mark the hours you stood. It never writes to Health. If you declined by accident, open **Health › your profile picture › Apps and Services › Steps Widget** and turn the types on.

**3. Set a daily goal.** In the app's **Settings**, the first row is **Daily Goal** — the number every progress ring is measured against. The default is 8,000; the slider runs 2,200–20,000.

**4. Add the widget where you want it.**

- **Home Screen:** touch and hold an empty area until the icons jiggle → **Edit** → **Add Widget** → search **Steps Widget** → pick a style and size → **Add Widget**.
- **Lock Screen:** press and hold the Lock Screen → **Customize** → **Lock Screen** → tap a widget slot → add Steps Widget. See [how to show steps on your iPhone Lock Screen](https://stepswidget.app/blog/iphone-lock-screen-steps-widget).
- **StandBy:** with StandBy enabled in Settings, turn the phone sideways on a charger and swipe to the widget panel. See [show your steps in StandBy mode](https://stepswidget.app/blog/show-steps-standby-mode-ios).
- **Apple Watch:** add the complication from the watch face editor. See [show steps on your Apple Watch face](https://stepswidget.app/blog/show-steps-watch-face).

![Steps Widget across Apple Watch, iPhone notifications, Home Screen widgets, and the in-app daily steps chart](/assets/f02.webp 'One Apple Health step count on every screen.')

The longer, screenshot-by-screenshot version is in [How to add step count to Home Screen, Lock Screen, and Apple Watch](https://stepswidget.app/blog/how-to-add-step-count-home-lock-screen-apple-watch).

On the home screen you can manually refresh the widget by tapping the number without opening the app. When the app is open, it shows a live count of your steps since the last sample from Health, so you can see the number rise as you walk.

## What the widget reads from Apple Health

Apple Health is the source of truth for step tracking. Your iPhone counts steps with a low-power motion coprocessor, your Apple Watch counts its own, and Health merges and de-duplicates both into one daily total.

A widget reads that total. It does not run its own pedometer, so the number in the widget is the same number you see in Health — no second count to reconcile. Reading steps this way needs no GPS and no server: the data is read on your device and drawn on your device.

_Note: HealthKit denies access silently — an app without permission is told the data does not exist, not that it was refused. A widget stuck on zero is almost always a missing permission, not a bug._

## Do you need an Apple Watch?

No. The iPhone's motion coprocessor records steps whenever the phone is on you, and a widget can show those without a Watch anywhere in the picture. See [how to track steps on iPhone without an Apple Watch](https://stepswidget.app/blog/track-steps-iphone-without-apple-watch).

A Watch still helps if you have one: it is on your wrist for the walks your phone sits out — a lap of the office, moving around the kitchen — and Health folds that movement into the same daily total. It also means reminders arrive as a tap on the wrist. Wrist-based counting has its own quirks, covered in [how accurate Apple Watch steps are](https://stepswidget.app/blog/apple-watch-steps-accuracy-limitations).

## Why the widget number can differ from Health

Over a full day it will not. Short-term gaps have two ordinary causes:

- **Refresh timing.** iOS decides when a widget may redraw. A steps widget asks for a refresh every few minutes during active hours, but the system grants those requests on its own schedule. The Health app recalculates the instant you open it, so it is always the more current of the two.
- **Apple Health's cadence.** Health shares step updates with apps roughly once an hour. Steps Widget has a **Motion Sensor** option that reads the pedometer for the stretch since Health's last sample and adds it on top. The number will differ slightly until the next Health update, since it is not synced or duplicated by the Health app.

If the widget shows zero all day, work through [why your iPhone is not counting steps](https://stepswidget.app/blog/iphone-not-counting-steps) — it is usually Health permission or the system **Motion & Fitness** switch. Widgets are also light on battery because they read an existing total rather than tracking with GPS; the detail is in [will a steps widget drain your battery](https://stepswidget.app/blog/steps-widget-iphone-battery-drain).

## Sizes, styles, and colour-matching

A good Apple Health steps widget comes in more than one shape so it fits the screen it is on: a compact ring for a tight Home Screen grid, a wider timeline that shows the shape of your day, a minimal number for the Lock Screen. On iOS 18 and later, [tinted widgets](https://stepswidget.app/blog/ios-18-tinted-steps-widgets) let the widget take on your wallpaper's colour so it blends into the Home Screen instead of standing out as a coloured tile.

![An iPhone Home Screen steps widget at 8,072 with an hourly bar chart, next to the widget style picker with colour options](/assets/f01.webp 'Pick a widget style and colour to fit your Home Screen.')

## Privacy: it is still health data

A step count feels trivial, but it is health and fitness information, and a widget should treat it that way. The bar to look for:

- **Read-only, minimal access.** Only the Health types the widget actually needs, and no write access.
- **On-device.** Steps read from Health on your phone, processed on your phone, shown on your phone. No account to create, no server holding your history.
- **No social layer.** Your movement is your own — not a feed, not a leaderboard, not a competition.

Steps Widget is built this way. Even the model that decides when to remind you trains and runs locally; your step history never leaves the device.

## From a number to a decision

A widget that mirrors Health is already useful — you notice your day without digging for it. But a step count on its own is hard to judge: whether 4,300 is good depends entirely on what time it is.

That is what the daily goal is for, and what the reminder does with it. Steps Widget projects where your step count is heading by the end of the day and speaks up only when that projection falls short of your goal — in the afternoon, while there are still hours to add a walk. The widget shows the number; the goal and the projection turn it into something you can act on before the day is over.

![Three step reminder notifications: Push now with steps needed in the hours left, Strong lead, and Goal hit](/assets/f03.webp 'Reminders follow the projection: behind, ahead, or done.')

## Frequently asked questions

**Does Apple Health have a steps widget for the Home Screen?** Not a dedicated one. You can pin Steps as a favorite inside the Health app and use Apple's Fitness (Activity rings) widget, but neither puts a plain daily step count on the Home Screen or Lock Screen. A third-party widget that reads HealthKit does.

**Will the widget match my Apple Health step count?** Yes, over the course of a day. Both read the same merged total from Health. Short-term differences come from how often iOS lets the widget refresh; the Health app is always the most current because it recalculates the moment you open it.

**Do I need an Apple Watch for an Apple Health steps widget?** No. Your iPhone counts steps with a built-in motion sensor and the widget reads those through Health. A Watch adds the steps your phone misses when it is not on you, and lets reminders arrive on your wrist.

**Is my step data shared with anyone?** With a privacy-first widget, no. Steps Widget reads your count from Health on the device, processes it there, and shows it there. There is no account, no server, and no social feed.

**Why does my Apple Health steps widget show zero?** Almost always a permission. HealthKit refuses access silently, so the widget shows zero rather than an error. Check **Health › Apps and Services › Steps Widget**, and confirm **Settings › Privacy & Security › Motion & Fitness › Fitness Tracking** is on.

## Key takeaways

| Point                          | Detail                                                                                                  |
| :----------------------------- | :------------------------------------------------------------------------------------------------------ |
| Apple's built-in option        | No plain Home Screen step widget — only Health favorites and the Activity-rings Fitness widget          |
| What a third-party widget does | Reads the step total Health already holds and places it on Home Screen, Lock Screen, StandBy, and Watch |
| Data source                    | Apple Health's merged, de-duplicated total — the widget runs no pedometer of its own                    |
| Apple Watch                    | Not required; iPhone counts on its own, and a Watch adds the walks the phone sits out                   |
| Privacy                        | Read-only Health access, on-device processing, no account, no social feed                               |

Related reading: [the best step counter widget for iPhone](https://stepswidget.app/blog/step-counter-widget-iphone) compares the options, [how to set a realistic daily step goal](https://stepswidget.app/blog/how-to-set-a-realistic-daily-step-goal) covers the number everything is measured against, and [Connect Apple Health](https://stepswidget.app/docs/getting-started/connect-apple-health) documents exactly which Health types the app requests.
