---
slug: motion-sensor-and-live-activity
title: Motion Sensor
metaTitle: Motion Sensor Mode for Near Real-Time Steps in Steps Widget
description: Fill the gap between Apple Health's last step sample and now by reading the iPhone pedometer, so your count moves while you are still walking.
order: 2
updated: 2026-07-28
readingTime: 4 min read
keywords:
  - real time step counter
  - pedometer live steps
  - steps not updating instantly
  - CMPedometer iPhone
---

Apple Health shares step updates with apps about **once an hour**. That is fine for a daily total, but it means your count lags while you are walking.

**Motion Sensor** closes that gap by reading the iPhone's pedometer for the stretch Health has not caught up on yet.

## Turning it on

**Settings › Motion Sensor**. The app describes it in one line: *"See your latest steps without waiting for Health sync."*

It is also in the Watch app's settings, where it is **on by default** — the Watch runs its pedometer live and pushes the count to your iPhone, which is why the Watch is rarely the device that looks behind.

## What changes

It fills the gap. Apple Health is still the whole total up to its most recent step sample — Motion Sensor asks the pedometer only for the stretch *since* that sample, and adds it on top.

The two never compete. Health provides the day's total; the pedometer covers the minutes Health has not merged yet. When Health catches up, the gap closes and the added figure is replaced rather than counted twice.

In the foreground the pedometer streams updates, so the number moves as you walk. In the background it is one gap query per wake — which is the part that matters for widgets, because Apple Health only delivers step updates hourly and this is what gets your widget a current number in between.

## The live count and the Live Activity

With Motion Sensor on, the app shows a live sensor reading near the top of its main screen. **Tap it** to start a **Live Activity** — a count on your Lock Screen and in the Dynamic Island that updates as you walk. Tap again to stop.

This is the app's answer to "why isn't my widget instant". Widgets are throttled by iOS on purpose; a Live Activity is not, so a walk you are watching gets a live number without the widget system having to change its behaviour.

The catch is that the app pushes those updates itself, so they stop the moment iOS suspends it — pocket the phone and the count freezes at its last value until you open the app again.

## Battery

Motion Sensor uses no GPS and no network. The motion coprocessor is a low-power chip that is already counting your steps whether or not any app reads it, so reading it is close to free.

Two things do cost something, and both are deliberate:

- A running **Live Activity** updates about once a second, which is why it is a manual action you start and stop.
- Frequent step changes could trigger constant widget reloads. Steps throttles those instead — a widget reload needs at least **200 steps** of change and at least **60 seconds** since the last one, because background reloads draw from a limited daily budget.

To check on your own device, open **Settings › Battery** and look at the last 10 days. A step widget should sit near the bottom of the list.

## Why is Motion Sensor not on by default?

On iPhone it is off by default because Apple Health alone is already accurate: the gap only matters if you check your count during it, and a total that lands within the hour is fine for a glance at a widget between meetings. On Apple Watch it is on by default, because a wrist glance is usually made mid-walk.

Turn it on if you check your count while walking, if you want the Live Activity, or if "the widget is behind" is a recurring annoyance.

## Does it make the reminders more accurate?

Somewhat, at the margins. The reminder model reads your current step total, so a fresher total means a fresher projection — particularly in the hour after a long walk, when Health has not caught up yet but the projection is being evaluated.

It does not change how the model reasons. See [How goal reminders work](/docs/goal-reminders/how-goal-reminders-work).

## Will my count be higher than the Health app?

Briefly, and it converges. You are seeing Health's total plus the not-yet-merged tail, so it is the same steps, sooner — not a different count. Once Health merges that stretch, the two agree.

Persistent disagreement is a different problem: see [Steps not counting](/docs/troubleshooting/steps-not-counting).

## Does it work without an Apple Watch?

Yes, and this is the case it helps most. Without a Watch, your iPhone is your only source, so the hourly Health cadence is the only thing between you and a current number.

## What to read next

- [Widget not updating](/docs/troubleshooting/widget-not-updating) — the refresh chain explained.
- [The step window](/docs/steps-and-data/step-window) — which slice of time you are watching.
