---
slug: widget-gallery
title: The widget gallery
metaTitle: Every Steps Widget for iPhone Home and Lock Screen
description: All eight Steps widgets — Steps Ring, Timeline, Prompt, Goal Progress, Minimal, and the three Lock Screen accessories — with sizes and what each one shows.
order: 1
updated: 2026-07-28
readingTime: 5 min read
keywords:
  - iPhone step widget
  - home screen widget steps
  - lock screen step widget
  - widget sizes iOS
image: /assets/steps-widget-grid.png
---

Steps ships eight widgets: five for the Home Screen and three accessory widgets for the Lock Screen and watch-style layouts. They all read the same Apple Health data and the same [daily goal](/docs/getting-started/set-your-daily-goal), so they never disagree with each other.

## Home Screen widgets

| Widget | Sizes | Shows |
| --- | --- | --- |
| **Steps Ring** | Small | Current steps with goal progress in a ring |
| **Steps Timeline** | Small | Steps by hour as a compact bar chart |
| **Steps Prompt** | Small, Medium | Step count with a motivational message |
| **Goal Progress** | Small | How close you are to today's goal |
| **Steps Minimal** | Small | A clean, minimal step count |

**Steps Timeline** shows the shape of the day rather than just the outcome: a flat run of empty bars from 10am to 3pm tells you more than a daily total does. It can also render as a **line chart**, plotting your running total as a climbing curve whose slope shows your momentum — see [Line Chart: the momentum view](/docs/widgets/widget-styles#line-chart-the-momentum-view).

**Steps Prompt** is the only one with a medium size, because the message needs the room.

## Lock Screen and accessory widgets

| Widget | Families | Shows |
| --- | --- | --- |
| **Steps Complication** | Inline, Circular, Rectangular | Quick step glance in any accessory slot |
| **Steps Summary** | Rectangular | Compact summary of steps and goal |
| **Steps Reminder** | Inline | Inline reminder text to stay on track |

The same three families serve the iPhone Lock Screen and Apple Watch complication slots, which is why one widget covers both.

The rectangular layout includes the **stand dots**: a row of one dot per hour along the bottom of the chart, brighter for the hours you stood. Stand hours come from Apple Watch, so with no Watch paired the row stays dim.

## Adding a Home Screen widget

1. Touch and hold an empty area of the Home Screen until the icons jiggle.
2. Tap **Edit**, then **Add Widget**.
3. Search for **Steps Widget**.
4. Pick a widget, swipe between its sizes, tap **Add Widget**.
5. Drag it into place, tap **Done**.

> **Note:** If Steps Widget is missing from the gallery, open the app once. iOS does not offer an app's widgets until it has launched at least once.

## Adding a Lock Screen widget

1. Touch and hold the Lock Screen until **Customize** appears, authenticating if asked.
2. Tap **Customize**, then **Lock Screen**.
3. Tap the widget area below the clock.
4. Choose **Steps Complication**, **Steps Summary**, or **Steps Reminder**.
5. Tap **Done**, then tap the Lock Screen to save.

Lock Screen widgets are rendered by iOS in a restricted style — small, and limited in how colour is used, so they stay legible over any wallpaper. Your chosen style applies where the platform allows it, which on the Lock Screen is less than on the Home Screen. That is a system rule and applies to every app equally.

## Where to put them

Somewhere you already look: the top-left of the first page, or the row above the dock. A small widget in a place you pass often is more useful than a large one on a page you rarely open.

A common setup is **Steps Ring** in prime position for constant glances, and **Steps Timeline** somewhere you look occasionally when you want to know where the day went.

## Can I add more than one?

As many as you like, in any combination. Each widget remembers its own style and its own display options, so a muted ring on the Home Screen and a bright chart on a second page is a normal configuration — see [Styling widgets](/docs/widgets/widget-styles).

## Smart Stacks

Dragging one widget onto another of the same size creates a stack you can swipe through. Steps reports a relevance score to iOS so it surfaces itself in a Smart Stack at useful moments — when you have been moving in the last couple of hours, and when you are between 70% and just past your goal.

That said, with **Smart Rotate** on, iOS decides what is showing when you glance. If seeing your progress reliably is the point, give the widget a dedicated slot.

## Can I put the widget on my Mac?

Yes, and it is a good place for it if you work at a desk. The Mac is the screen you are already looking at, so a progress ring at the edge of it keeps your step count visible without reaching for your phone.

There is no Mac app to install. On macOS Sonoma or later the Mac borrows the widget from your iPhone over Continuity:

1. Sign the Mac and iPhone into the same Apple Account, and keep the iPhone nearby or on the same network.
2. On the Mac, open **System Settings › Desktop & Dock** and scroll to **Widgets**.
3. Turn on **Use iPhone widgets**.
4. Right-click the desktop, choose **Edit Widgets**, find **Steps Widget**, and drag one out.

Because the widget is powered by the phone rather than the Mac, it greys out when the iPhone is out of range.

iPad works too, on iPadOS 18.6 or later, with the same touch-and-hold flow as iPhone.

## Moving and removing

Touch and hold a widget to drag it. Touch and hold and choose **Remove Widget** to delete it. Removing a widget does nothing to your data — your steps are in Apple Health, and the widget is only a window onto them.

## What to read next

- [Styling widgets](/docs/widgets/widget-styles) — colours, charts, timestamps, and the purchase.
- [StandBy and Live Activity](/docs/widgets/standby-and-live-activity) — steps while charging, and in the Dynamic Island.
- [Widget not updating](/docs/troubleshooting/widget-not-updating) — when the number is stale.
