---
slug: reminders-not-arriving
title: Reminders not arriving
metaTitle: Fix Goal Reminders That Are Not Arriving in Steps Widget
description: The reminder window, the elected sending device, notification permission, Focus modes, and Scheduled Summary — why a goal reminder stays silent.
order: 3
updated: 2026-08-10
readingTime: 5 min read
keywords:
  - notifications not working iPhone
  - goal reminder not firing
  - iPhone focus mode notifications
  - scheduled summary notifications
image: /assets/blog-stand-reminders-not-working.jpg
---

Before troubleshooting, rule out the two most likely explanations. Neither is a fault.

**You are on track.** Steps does not fire on a timer. A model projects your end-of-day total and only sends a reminder when that projection falls short of your goal, so a day of normal walking produces no reminders. See [How goal reminders work](/docs/goal-reminders/how-goal-reminders-work).

**Another device is sending them.** With reminders on across an iPhone, iPad, and Watch, only one device sends. Open **Settings** and look under the Goal Reminder toggle: if another device is elected, it shows **Device: <name>**. If that device is in a drawer, you will not see reminders.

If neither applies, work through the list.

## 1. Check the hour

Reminders only fire during the 11th to the 23rd hour of your day — **11:00 to 23:00** on a default setup. Nothing is sent outside that window, however far behind you are. A quiet morning is by design: before the 11th hour there is not enough of your day on record to project from.

If you have moved **Start of Day**, the window moves with it. A day starting at 3:00 AM puts the window at 14:00 to 02:00, which is worth checking before assuming reminders are broken.

## 2. Notification permission

If you dismissed the permission prompt, reminders cannot be delivered at all.

1. **Settings** › **Notifications** › **Steps Widget**.
2. Turn on **Allow Notifications**.
3. Enable **Lock Screen**, **Notification Centre**, and **Banners** so alerts have somewhere to appear.

An app with permission but every delivery location disabled is functionally silent, and that combination is easy to reach by accident.

> **Note:** iOS accepts a notification even when you have denied alerts — it just never shows it. So a reminder can be "sent successfully" and still be invisible, which is why this check comes before the exotic ones.

## 3. Scheduled Summary

A held notification looks the same as one that never fired, which makes this easy to miss.

If Steps Widget is in your Scheduled Summary, its reminders are collected and delivered in a batch, so a reminder intended for 2pm arrives at 6pm.

1. **Settings** › **Notifications** › **Scheduled Summary**.
2. If it is on, find **Steps Widget** in the app list.
3. Turn it **off** so its alerts deliver immediately.

## 4. Focus modes

A Focus suppresses notifications from apps not on its allowed list. This is usually what you want, but an all-day Work Focus will silence reminders during the hours you wanted them.

1. **Settings** › **Focus**.
2. Select the Focus you use during the day.
3. Under **Allowed Notifications**, add **Steps Widget**.

Also confirm **Do Not Disturb** is not left on from Control Centre. Focus modes sync between iPhone and Apple Watch by default, so a Focus on the phone also silences the wrist.

## 5. One per hour

Steps sends at most one reminder per clock hour. If you already had one, the next is at least an hour away even if your projection gets worse.

## 6. Give the model time

A newly installed app is running the bundled model with no personal history yet. It works, but its projections sharpen as it accumulates days — it logs one training row per day and retrains on device.

If reminders arrive but feel mistimed, that is the learning period rather than a fault. If they arrive but you do not notice them, adjust the wording and alert style in [Reminder messages](/docs/goal-reminders/reminder-messages).

## 7. Background App Refresh and Low Power Mode

Both affect the app's ability to evaluate your projection in the background.

- **Settings › General › Background App Refresh** — on, and enabled for Steps Widget.
- **Settings › Battery** — Low Power Mode off.

## 8. On Apple Watch, grant Health access separately

The Watch app requests Health access on its own. If it shows **Health Access Required**, tap **Authorize** — granting access on the phone does not grant it on the wrist, and without step data the Watch cannot project anything.

## Why do reminders stop when my phone is in another room?

If the iPhone is the elected sender, the reminder arrives and you never see it. The fix is the wrist: wear your Apple Watch and let it be the sender, so a tap reaches you regardless of where the phone is. See [Apple Watch](/docs/widgets/apple-watch).

## Why did I get "Steady pace" instead of a nudge?

That is the message for being on track, and it carries your remaining step count so it still gives you a concrete figure. The four states are Goal hit, Strong lead, Steady pace, and Push now, chosen from your projection. Only states at or above the threshold are delivered.

## Nothing here fixed it

Two broader steps remain. Restart the iPhone, which clears the notification scheduling queue along with other temporary state. If reminders still do not arrive, turn **Goal Reminder** off in the app, restart, and turn it back on, allowing the notification prompt when it appears. This rebuilds the permission and schedule from scratch.

## What to read next

- [How goal reminders work](/docs/goal-reminders/how-goal-reminders-work) — the projection and thresholds.
- [Reminder timing and devices](/docs/goal-reminders/reminder-timing-and-devices) — hours, sunset, device election.
- [Reminder messages](/docs/goal-reminders/reminder-messages) — tone and alert style.
