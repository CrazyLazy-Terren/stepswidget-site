---
slug: install-and-set-up
title: Install and set up
metaTitle: Install and Set Up Steps Widget on iPhone
description: Install Steps, allow Health access, set your daily goal, add a widget, and turn on goal reminders. About five minutes, start to finish.
order: 1
updated: 2026-11-22
readingTime: 4 min read
keywords:
  - Steps Widget setup
  - install steps widget iPhone
  - step counter widget setup
  - iPhone pedometer widget install
---

Steps is free to download and shows no ads. Setup is four steps: install, allow Health access, set a daily goal, and add a widget. Goal reminders and every setting behind them are free — the optional subscription only changes how widgets look.

## Requirements

| Device           | Minimum version |
| ---------------- | --------------- |
| iPhone           | iOS 18.6        |
| iPad             | iPadOS 18.6     |
| Apple Watch      | watchOS 11.6    |
| Apple Vision Pro | visionOS 2.6    |

An Apple Watch is **not required, but recommended**. iPhone counts steps on its own and the app reads them through Apple Health. A Watch is on your wrist, so it catches the walks your phone missed, delivers reminders as a tap, and lights up the stand dots in the rectangular widget — see [Apple Watch](/docs/widgets/apple-watch).

Two features need a newer OS than the minimum: restyling your reminder messages with Apple Intelligence needs iOS 26, and Live Activities need a device with the Dynamic Island to show the compact view. Everything else works on iOS 18.6.

## Step 1: Install and open once

1. Search the App Store for **Steps Widget**, or open the [App Store listing](https://apps.apple.com/app/apple-store/id6756297788?pt=120739140&ct=website&mt=8).
2. Tap **Get**.
3. Open the app once.

> **Note:** The first launch is not optional. iOS does not offer an app's widgets in the widget gallery until the app has run once, and the app needs a foreground moment to request Health access.

## Step 2: Allow Health access

The first screen says **Every Step Counts**. If you use a wheelchair, turn on **Wheelchair Mode** here first — the app then counts pushes from Apple Watch instead of steps. See [Wheelchair Mode](/docs/steps-and-data/wheelchair-mode).

Tap **Connect Apple Health**, then **Allow Access**, then **Allow** on the system sheet.

It requests three read-only Health types — step count, plus your stand hours and daily activity summary so the hourly chart can mark the hours you stood. It never writes to Health.

A **Welcome!** screen then walks through three quick steps: Apple Health, widgets and reminders, and styling your widget. While you read it, the app starts learning your routine from your Health history; the status underneath changes to **Personalized to your routine** once the reminder model is trained. [Connect Apple Health](/docs/getting-started/connect-apple-health) has the detail, including how to grant access later if you declined.

## Step 3: Set your daily goal

Open **Settings** in the app. The first row is **Daily Goal** — type a number or drag the slider, which runs from 2,200 to 20,000 in steps of 200. The default is 8,000.

The goal is the number everything else measures against: the progress ring in every widget, and the target the reminder model projects you against. [Set your daily goal](/docs/getting-started/set-your-daily-goal) covers how to pick a figure you will actually hit. If you want to build up to a bigger number, tap **Walking Plan** under the slider — see [Walking Plan](/docs/getting-started/walking-plan).

## Step 4: Add a widget

1. Touch and hold an empty area of the Home Screen until the icons jiggle.
2. Tap **Edit** or the **customize icon** in iOS 27, then tap **Add Widget**.
3. Search for **Steps**.
4. Pick one of the widgets — **Steps Ring**, **Steps Timeline**, **Steps Prompt**, **Goal Progress**, **Steps Minimal**, **Walking Plan**, or **Side by Side**.
5. Tap **Add Widget**, drag it into place, tap **Done**.

[The widget gallery](/docs/widgets/widget-gallery) describes what each one shows and which sizes it supports.

## Step 5: Turn on goal reminders

In **Settings**, turn on **Goal Reminder** and allow notifications when iOS asks.

This is the part that changes behaviour. A model on your iPhone projects how many steps you will finish the day with, and sends a reminder only when that projection falls short of your goal — so a day you are already walking stays quiet. [How goal reminders work](/docs/goal-reminders/how-goal-reminders-work) explains the decision in full.

The reminder settings are free, including the schedule and the message tone. Nothing about reminders sits behind the subscription.

## Do I need an account?

No. There is no account, no sign-in, and no password. Your steps are read from Apple Health on your device and stay there, and there is no leaderboard or social feed.

The one feature that talks to a server is [Side by Side](/docs/sharing/walk-with-a-friend), when you choose to share steps with a friend. Even then there is no account: your card is the key, your step chart is encrypted on your iPhone, and the server only delivers updates it cannot read. See [Private by design](/docs/sharing/private-by-design).

Sign in to iCloud and your settings — goal, reminder preferences, widget styles — follow you across your own devices through your private iCloud. See [Privacy and sync](/docs/steps-and-data/privacy-and-sync).

## Is Steps Widget free?

Yes. It is free to download with no ads at any tier, and the free tier is not time-limited. The whole reminder system costs nothing: the on-device model, the projection, the schedule, the message style, and the Apple Watch reminders.

The optional **Customization** subscription lets you apply additional widget styles, colours, gradient themes, and fonts. The app also offers a one-time gift of every style free for 30 minutes, and whatever you apply during it is yours to keep — see [Styling widgets](/docs/widgets/widget-styles#try-every-style-free-for-30-minutes). An active subscription is needed to _change_ to a different style; a style you have already applied keeps working if the subscription lapses. Prices are on the App Store listing.

## What to read next

- [Connect Apple Health](/docs/getting-started/connect-apple-health) — what it reads, and how to fix access.
- [How goal reminders work](/docs/goal-reminders/how-goal-reminders-work) — the projection and the threshold.
- [The widget gallery](/docs/widgets/widget-gallery) — every widget and where it fits.
