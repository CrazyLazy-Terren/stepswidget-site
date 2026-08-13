---
slug: reminder-timing-and-devices
title: Reminder timing and devices
metaTitle: When Steps Widget Reminders Fire and Which Device Sends Them
description: The hours reminders are allowed, the once-per-hour limit, how Local Sunset lowers the bar in the evening, and why only one of your devices sends.
order: 3
updated: 2026-08-10
readingTime: 5 min read
keywords:
  - reminder schedule
  - local sunset reminder
  - duplicate notifications multiple devices
  - one reminder per hour
---

Two things decide whether a reminder reaches you: whether the projection says you need one, and whether the clock and your devices agree it is a good moment. This page is the second half.

## The reminder window

Reminders can only fire during the **11th to the 23rd hour of your day**. On a default setup that is 11:00 to 23:00. Outside the window nothing is sent, regardless of how far behind you are.

The window is measured from your own start of day, not from midnight, so it moves with the [Start of Day](/docs/steps-and-data/step-window) setting. Set your day to begin at 3:00 AM and reminders run 14:00 to 02:00 instead — the same eleven-hour offset into a day that now ends later.

The morning cutoff exists because a projection made at 7am is mostly guesswork — you have barely any steps yet, and being told at breakfast that you are behind is neither surprising nor useful. By 11am there is enough of your day on record for the projection to mean something.

The evening cutoff exists because a reminder at midnight cannot be acted on.

## One per hour, at most

Steps sends at most **one reminder per hour**, tracked per clock hour. Even if you spend an hour well over the threshold, you get one message about it.

In practice a typical behind-schedule day produces a handful of reminders, not a stream — the projection improves as soon as you walk, which drops the risk below the threshold and stops the reminders on its own.

## Local Sunset

**Local Sunset** is a toggle under Goal Reminder. Turn it on and the app uses your location to find today's sunset, then lowers the reminder threshold from 0.615 to **0.565** from that hour onward.

The reasoning: a gap that is easy to close at 2pm is hard to close after dark, so the same shortfall deserves more urgency later. Tying it to actual sunset rather than a fixed hour means it tracks the season — the bar drops at 4pm in December and 9pm in June.

Settings shows the hour it will use, for example _"Uses your location to send reminders earlier as the sun sets, around 8:41 PM."_ With the toggle off, or when sunset cannot be determined, the app assumes **19:00**.

> **Note:** This is the only feature that uses your location. It asks for **While Using the App** access at **kilometre accuracy** — enough to know when the sun sets near you, not enough to place you — and caches the sunset once a day, refreshing only if you move more than 250 m. Turn the toggle off and location monitoring stops. The Apple Watch cannot fetch weather data itself, so it reads the sunset hour the iPhone last saved to your iCloud.

## Only one device sends

If you have an iPhone, an iPad, and an Apple Watch all running Steps with reminders on, you get **one** reminder — not three.

When the device you are holding is not the sender, Settings shows which one is, under the Goal Reminder toggle: **Device: Apple Watch**.

Election follows presence, so it settles on the device you actually use. If reminders stop reaching you after you set up a new device, that is the first thing to check — the elected sender may be a device sitting in a drawer.

## Which device should send?

Whichever one is with you. In practice:

- **Apple Watch** is the best choice if you wear one. A wrist tap arrives whether or not your phone is nearby, and it is the least disruptive delivery there is.
- **iPhone** is right if you do not wear a Watch.
- **iPad** is rarely what you want, since it usually is not with you when you would act on a nudge.

## Does a reminder interrupt a call or a meeting?

Not if a Focus mode is active and Steps is not on its allowed list — iOS suppresses it, which is normally what you want. A suppressed reminder is not treated as a completed one; the projection is unchanged, so the next hour can try again.

If you want reminders to survive a Focus, add Steps Widget to that Focus's allowed apps in **Settings › Focus**. Focus modes sync between iPhone and Apple Watch by default, so a Focus on the phone also silences the wrist.

## Why did I not get a reminder this hour?

In rough order of likelihood:

- You had already moved, and the projection now clears your goal. This is the feature working.
- The hour was outside the reminder window.
- A reminder had already been sent this hour.
- Another of your devices is the elected sender.
- A Focus mode or Do Not Disturb suppressed it.
- Notification permission is off for Steps Widget.

[Reminders not arriving](/docs/troubleshooting/reminders-not-arriving) works through each one.

## What to read next

- [How goal reminders work](/docs/goal-reminders/how-goal-reminders-work) — the projection and thresholds.
- [Apple Watch](/docs/widgets/apple-watch) — reminders on your wrist.
- [Reminders not arriving](/docs/troubleshooting/reminders-not-arriving) — full troubleshooting.
