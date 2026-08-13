---
slug: step-window
title: The step window
metaTitle: Last 24-Hour Mode and Start of Day in Steps Widget
description: Change what "today" means — push the day boundary up to six hours past midnight for night owls, or drop the calendar day for a rolling 24-hour window.
order: 1
updated: 2026-08-10
readingTime: 4 min read
keywords:
  - last 24 hours steps
  - step count reset time
  - night owl step tracking
  - day boundary steps
---

By default your step count covers today, midnight to midnight. Two settings change that, and both exist because "today" is a worse fit for some people's lives than it looks.

## Start of Day

If you are often awake past midnight, the default boundary splits your evening in half: a walk at 12:30am lands in a brand-new day with an empty ring, while the day you were actually living closes out one walk short.

**Settings › Start of Day** moves the boundary up to **six hours** past midnight. Pick 3:00 AM and steps taken at 1am count toward the day that started the previous morning; your count resets at 3am instead.

The picker shows real times in your locale — 12:00 AM through 6:00 AM — and the app explains it in one line: *"Steps before this time count toward yesterday."*

This shifts everything consistently: the widgets, the goal, Insight, and the reminder model's sense of how much day you have left. It does not change what Apple Health stores, only the window Steps reads.

It also slides the reminder window. Reminders run from the 11th to the 23rd hour of your day, so a day starting at 3:00 AM moves them from 11:00–23:00 to 14:00–02:00. See [Reminder timing and devices](/docs/goal-reminders/reminder-timing-and-devices).

## Last 24-Hour

**Last 24-Hour** discards the calendar day entirely. Instead of today, the widget shows a **rolling window of the previous 24 hours**, always ending now.

Turn it on and **Start of Day** disappears from Settings, because a day boundary means nothing when there is no day.

This suits a genuinely irregular schedule — shift work, frequent long-haul travel, anyone whose waking hours do not line up with a calendar. Your goal is then read as a rolling target: the app expects your trailing 24-hour total to sit near your goal at any moment, rather than climbing from zero each morning.

> **Note:** The reminder model still reasons in hours of the day, because that is what it was trained on. In Last 24-Hour mode the projection is against your rolling total rather than a day that resets — the app's own explanation is *"Last 24-Hour mode uses a rolling 24-hour window, and your total steps are expected to align with your goal."*

## Which should I use?

| Your schedule | Setting |
| --- | --- |
| Ordinary days, asleep before midnight | Leave both alone |
| Usually up past midnight | **Start of Day**, 2:00–4:00 AM |
| Shift work, no fixed day | **Last 24-Hour** |
| Frequent long-haul travel | **Last 24-Hour** |

Leave both off unless one of the cases above applies. They exist for schedules the default handles badly rather than as general tuning.

## Comparing to the previous window

Whichever mode you are in, the app can show the window before the current one — yesterday, or the 24 hours before your rolling window. It gives the current number something to be measured against, which a bare count cannot do.

## Do these settings sync?

Yes. Both travel through your iCloud, and the iPhone also pushes them straight to the Apple Watch over the direct connection, which is faster than iCloud. You can change either one from the Watch as well.

## Does changing the window lose data?

No. Your steps are in Apple Health and untouched. Changing the window changes which slice Steps reads and redraws, and switching back restores the old view exactly. Widgets reload right away.

## What to read next

- [Motion Sensor and Live Activity](/docs/steps-and-data/motion-sensor-and-live-activity) — fresher numbers inside the window.
- [How goal reminders work](/docs/goal-reminders/how-goal-reminders-work) — what the model does with the window.
- [Insight](/docs/steps-and-data/insight) — a month of days at once.
