---
title: 'How Your iPhone and Apple Watch Count Steps (and How They Sync)'
metaTitle: 'How iPhone and Apple Watch Count and Sync Steps | Steps Widget'
description: The full path a step takes — from the sensor in your pocket or on your wrist, into Apple Health, across your devices, and out to the widget on your screen — and how long each hop takes.
date: '2026-10-04'
updated: '2026-10-04'
slug: how-iphone-apple-watch-count-and-sync-steps
category: Apple Watch
image: /assets/blog-workspace-showing-apple-watch-and-iphone-syncing-step-data.jpg

keywords:
  - how does iphone count steps
  - how does apple watch count steps
  - how do steps sync between iphone and apple watch
  - apple health step data sources
  - how often does apple health update steps
  - iphone motion coprocessor steps
  - apple watch step sync
  - apple health sync steps icloud
  - when do widgets update steps
---

You take a step. Somewhere between your foot hitting the pavement and a number appearing on your Lock Screen, five separate systems handle that step — each on its own schedule, each with its own rules.

Knowing that chain is genuinely useful. It tells you why a widget can be a few minutes behind the Health app, why the Watch is usually ahead of the phone, why a total settles later in the evening, and which part to look at when something seems off.

Here is the whole path, hop by hop.

> **Quick Answer: The Path a Step Takes**
> 1. **A sensor records it.** The iPhone's motion coprocessor, or the sensors in your Apple Watch — both low-power, both always running, neither using GPS.
> 2. **The device stores it in Apple Health**, on that device.
> 3. **Health combines the sources.** Where two devices cover the same stretch, Health de-duplicates rather than adding, producing one merged total.
> 4. **The devices sync.** Watch and iPhone reconcile over Bluetooth or Wi-Fi when in range; Health history travels between your own devices through iCloud.
> 5. **An app reads Health and draws a widget.** Health shares updates with apps about once an hour, and iOS redraws widgets on its own budget — roughly every 5 minutes when you are active.

**Table of contents**

- [How an iPhone counts a step](#how-an-iphone-counts-a-step)
- [How an Apple Watch counts a step](#how-an-apple-watch-counts-a-step)
- [Where the count actually lives](#where-the-count-actually-lives)
- [How Apple Health combines two devices](#how-apple-health-combines-two-devices)
- [How the devices sync with each other](#how-the-devices-sync-with-each-other)
- [How an app gets the number](#how-an-app-gets-the-number)
- [The last hop: drawing the widget](#the-last-hop-drawing-the-widget)
- [The whole chain, with timings](#the-whole-chain-with-timings)
- [What else syncs, and what never leaves your phone](#what-else-syncs-and-what-never-leaves-your-phone)
- [Frequently asked questions](#frequently-asked-questions)
- [Key takeaways](#key-takeaways)

## How an iPhone counts a step

Your iPhone counts steps with a dedicated **motion coprocessor** — a low-power chip separate from the main processor, which is why step counting runs all day without meaningfully affecting battery life. It is already counting whether or not any app is asking.

What it works from is accelerometer data: the rhythmic, repeating pattern of acceleration that walking produces, distinguished from the irregular motion of a phone being picked up, set down, or rattling in a car. That pattern-matching is why a phone in a loose bag counts less reliably than one in a pocket — a swinging bag produces motion that looks less like gait.

Three consequences worth knowing:

- **No GPS is involved.** Step counting is motion only. Location is a separate system that a step counter does not need.
- **The phone only counts what it was present for.** Steps taken with the phone on a desk, on a charger, or in another room do not exist as far as the sensor is concerned. This is the single biggest factor in how a phone's count compares to a wrist's.
- **It runs regardless of apps.** The count exists in the system; apps read it rather than create it. That is also why there is a system-wide switch — **Settings › Privacy & Security › Motion & Fitness › Fitness Tracking** — that turns step recording off for every app at once, including Apple's own.

## How an Apple Watch counts a step

The Watch does the same job from a different vantage point: sensors on your wrist, reading the arm motion that accompanies walking, again continuously and at very low power. It reads the data watchOS is already recording for its own Activity tracking rather than running a separate sensor loop.

The difference that matters is not the sensor — it is the **placement**. A Watch is on your body from the moment you put it on until you take it off. There is no equivalent of leaving it on a desk, so it captures the trips to the kitchen, the laps of the office, and the walk around the supermarket that a pocketed phone also captures but a parked phone does not.

The Watch also records something the iPhone cannot: **stand hours**, the Activity-ring measure of having stood up and moved around for a minute in a given hour. That is a separate metric from steps — you can earn a stand hour without going anywhere — and in Steps Widget it appears as context, a row of dots along the bottom of the Rectangular complication's chart, rather than as a second score to chase.

## Where the count actually lives

Both devices write their counts into **Apple Health**, the system-level store on each device. That is the important architectural point: Health is the source of truth, and apps — including this one — are readers.

Steps Widget reads three read-only types with your permission: step count, stand hours, and your activity summary. It never writes to Health. There is no separate copy of your step history inside the app, which is why revoking the permission makes the count go to zero rather than falling back on a private cache.

Health access is granted **per device**. Allowing it on your iPhone does not allow it on your Watch — the Watch app asks separately, which is why a complication can show nothing while the phone is working perfectly.

## How Apple Health combines two devices

When two devices cover the same stretch of time, Health does not add their counts together. It **de-duplicates** the overlap and produces a single merged total.

This is the right behaviour, and it is worth stating plainly because the arithmetic surprises people: if you walked for an hour wearing a Watch and carrying your phone, both devices recorded that hour, and only one of them contributes to your day's total. Otherwise every walk taken with two devices would count twice.

Which source wins for a given stretch comes from **source priority**, a ranked list you can see and reorder:

1. **Health › Browse › Activity › Steps**
2. Scroll to the bottom, tap **Data Sources & Access**
3. Devices higher in the list take precedence where their data overlaps

Tapping into a day's chart and choosing **Show All Data** shows the individual samples and which device recorded each one, if you ever want to inspect a specific walk.

The merged total is the number worth paying attention to, and it is what a step app displays. It is not "the Watch's number" or "the phone's number" — it is the reconciled figure that accounts for both without double counting.

## How the devices sync with each other

Two separate movements of data are happening, and they are easy to conflate.

**Watch to iPhone.** Your Watch reconciles with your iPhone over Bluetooth, or Wi-Fi when both are on the same network. While they are in range, this happens continuously in the background. While they are not — a walk with the Watch and no phone — the Watch keeps counting locally and delivers the backlog when the two reconnect. That is why a long-separated Watch can produce a sudden jump in your total rather than a smooth climb.

**Between your own devices, through iCloud.** Health history syncs across devices signed into the same Apple Account, so a second iPhone or an iPad shows the same history without the app doing anything. The app plays no part in this — your step history does not travel through it, because it does not need to.

One useful consequence: because the Watch is the device on your body, it typically records a step *first*, and the phone shows it after the sync and merge have happened. The phone is reading the end of the chain. Keeping the devices near each other with Bluetooth on is what keeps that lag short.

## How an app gets the number

Here is where a detail surprises most people: **Apple Health shares step updates with apps about once an hour.**

That cadence is fine for a daily total and visibly slow during a walk. It is the single most common reason a widget looks behind when the Health app itself looks current — the steps are recorded, they have simply not been handed over yet.

Steps Widget has two ways around it, both optional:

- **Motion Sensor** reads the iPhone's own pedometer directly for the stretch Health has not caught up on, and adds it on top of Health's total. The two never compete: Health provides everything up to its most recent sample, and the pedometer covers only the minutes since. When Health catches up, that added figure is replaced rather than counted twice. It is **off by default on iPhone and on by default on the Watch**, which is a large part of why the wrist usually looks fresher.
- **A Live Activity**, started by tapping the live count, puts a count on your Lock Screen and in the Dynamic Island that updates as you walk. The app pushes those updates itself, so they stop when iOS suspends it — pocket the phone and the count freezes until you open the app again.

Opening the app at any point also gives it a foreground moment to read current Health data and hand fresh values to the widget system. That is why "open it once" resolves so many apparent staleness problems.

## The last hop: drawing the widget

Widgets do not refresh on a timer you control. iOS grants each widget a limited daily reload budget to protect battery life, and the app requests reloads against that budget.

Steps Widget varies the request rate rather than asking constantly:

| | iPhone | Apple Watch |
| :--- | :--- | :--- |
| **Active periods** | about every 5 minutes | about every 5 minutes |
| **Quiet periods** | up to every 30 minutes | up to every 60 minutes |

Three signals push it toward the fast end: you are moving right now, this hour is usually active for you, and you usually open the app around now. It weighs the current hour *and the next one*, so the widget speeds up ahead of your usual walk rather than catching up after it. The Watch has the wider range because its refresh budget is tighter — spending less on quiet stretches leaves more for the moments you raise your wrist.

Two throttles sit on top: a redraw needs at least **200 steps** of change and at least **60 seconds** since the last one, because a reload that changes nothing visible is budget spent for no reason.

The upshot is that a widget is a recent snapshot, not a live readout — by design. If you want a genuinely live number, that is what Motion Sensor and the Live Activity are for.

## The whole chain, with timings

| Hop | What happens | Typical delay |
| :--- | :--- | :--- |
| **1. Sensor** | Motion coprocessor or Watch sensors detect the gait pattern | Continuous |
| **2. Device store** | The count is written to Apple Health on that device | Seconds to minutes |
| **3. Watch → iPhone** | Reconciled over Bluetooth or Wi-Fi while in range | Background, continuous; batched if out of range |
| **4. Health merge** | Overlapping sources de-duplicated into one total by source priority | On sync; a day can be recalculated later |
| **5. Health → app** | Health shares updates with apps | **About once an hour**, or instantly when you open the app |
| **6. App → widget** | iOS redraws the widget from its reload budget | ~5 min when active, up to 30 (iPhone) or 60 (Watch) when quiet |

Read down that list and the common observations explain themselves. A widget a few minutes behind the Health app is hop 6. A phone behind the Watch is hops 3 and 5. A total that settles in the evening is hop 4, recalculating after a late sync. None of those is a fault.

## What else syncs, and what never leaves your phone

Steps are not the only thing moving between your devices, but they are the only thing moving through Apple's systems rather than the app's.

**Your settings follow you** through your own private iCloud — the same account that syncs your Notes, with no CrazyLazy server in the middle:

- Daily goal
- Last 24-Hour and Start of Day
- Goal Reminder on/off, your reminder messages, Local Sunset
- Widget styles and display options

Each setting carries the time it changed, and the newer edit wins **per setting** rather than per device, so changing your goal on the phone and a widget style on the Watch keeps both. The iPhone also pushes step-window settings straight to the Watch, which is faster than waiting for iCloud. A Customization subscription is tied to your Apple Account, so subscribing on either device covers both.

**Reminders are elected, not duplicated.** With the app on an iPhone, an iPad, and a Watch, a single sending device is chosen from iCloud heartbeats, so a reminder arrives once rather than three times. Settings shows which device is currently sending — usually the Watch if you wear one, since a wrist tap reaches you whether or not your phone is nearby. See [reminder timing and devices](https://stepswidget.app/docs/goal-reminders/reminder-timing-and-devices).

**Your step history does not sync through the app at all.** It lives in Apple Health, and Health syncs between your own devices itself. The model that decides when to remind you also trains on your device, against your existing Health history, and never leaves it. See [privacy and sync](https://stepswidget.app/docs/steps-and-data/privacy-and-sync).

## Frequently asked questions

**How does an iPhone count steps without a Watch?** With its built-in motion coprocessor, which reads accelerometer data for the repeating pattern of walking. It runs continuously at very low power, uses no GPS, and only counts steps taken while the phone is on you.

**How often do steps sync between Apple Watch and iPhone?** Continuously in the background while the two are in Bluetooth or Wi-Fi range. If they are separated, the Watch counts locally and delivers the backlog when they reconnect, which can arrive as a sudden jump.

**How often does Apple Health update steps for apps?** About once an hour. That cadence — not the app — is usually why a count looks behind during a walk. Opening an app lets it read current data immediately, and Motion Sensor fills the gap from the iPhone's pedometer.

**Does Apple Health add my iPhone and Watch steps together?** No. It de-duplicates the overlapping stretches and reports one merged total, so the daily figure is deliberately not the sum of both devices.

**Why does my step total change later in the day?** Health recalculates a day when a new source syncs. A Watch uploading a walk hours late triggers a merge and de-duplication, and the total settles. That is reconciliation, not lost data.

**Why is my widget behind the Health app?** The last hop. iOS redraws widgets from a limited daily budget — roughly every 5 minutes when you are active, less often when you are not. A few minutes behind is normal; hours behind is worth [troubleshooting](https://stepswidget.app/docs/troubleshooting/widget-not-updating).

**Does counting steps all day drain my battery?** Not meaningfully. The motion coprocessor is a low-power chip that is already counting whether or not an app reads it, and no GPS or network is involved. See [will a steps widget drain your battery](https://stepswidget.app/blog/steps-widget-iphone-battery-drain).

## Key takeaways

| Question | The short answer |
| :--- | :--- |
| What counts the steps? | The iPhone's motion coprocessor, or your Watch's sensors — both low-power, neither using GPS |
| Where do they go? | Apple Health on that device; apps read it, they do not store their own copy |
| What happens with two devices? | Health de-duplicates the overlap into one merged total, by source priority |
| How do they sync? | Watch ↔ iPhone over Bluetooth/Wi-Fi; history across your devices via iCloud |
| Why is an app behind? | Health shares updates with apps about once an hour |
| Why is a widget behind that? | iOS redraws widgets from a daily budget — ~5 min active, up to 30–60 min quiet |

Related reading: [how accurate is the Apple Watch step count](https://stepswidget.app/blog/apple-watch-steps-accuracy-limitations) for what the wrist sensor can and cannot see, [how to show steps on your Apple Watch face](https://stepswidget.app/blog/show-steps-watch-face) for complication setup, and [why is my iPhone not counting steps](https://stepswidget.app/blog/iphone-not-counting-steps) when the chain breaks rather than lags.
