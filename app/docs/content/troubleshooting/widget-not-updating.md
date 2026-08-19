---
slug: widget-not-updating
title: Widget not updating
metaTitle: Fix a Steps Widget That Is Not Updating on iPhone
description: The three-stage chain from Health to widget, what counts as normal lag, and the checks that fix a widget genuinely stuck or reading zero.
order: 1
updated: 2026-08-10
readingTime: 5 min read
keywords:
  - widget not updating iPhone
  - step widget stuck
  - iOS widget refresh
  - widget not refreshing fix
---

First, separate two situations, because their causes are completely different.

**A few minutes behind is normal.** Being slightly behind the Health app is expected — see the chain below.

**Hours behind, frozen, or stuck at zero is a real problem.** Work through the checks.

## The chain

Your steps pass through three stages, each on its own schedule. The app explains this on its **How Step Update** screen, reachable from Settings › Links.

| Stage                                              | Cadence                                                                                                                 |
| -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **Apple Health** collects your steps               | Shares updates with apps about once an hour                                                                             |
| **The app** reads Health and hands data to widgets | Every time you open it, plus background refreshes                                                                       |
| **The widget** redraws                             | Asks about every 5 minutes in active hours, up to every 30 minutes in quiet ones — iOS decides when it actually reloads |

Nothing in that chain is instant, and the widget is the least instant part of it. That cadence is not fixed — it adapts to when you move and when you tend to check, and the Apple Watch stretches further in both directions. See [Adaptive widget updates](/docs/widgets/widget-gallery#adaptive-widget-updates). iOS grants each widget a limited daily reload budget to protect battery life, which is why a widget is a recent snapshot rather than a live readout.

If you want a genuinely live number, that is what [Motion Sensor](/docs/steps-and-data/motion-sensor-and-live-activity) and the Live Activity are for.

## My Live Activity has stopped moving

Expected, and not a fault. The app pushes those updates itself, so they stop as soon as iOS suspends it — pocket the phone and the count freezes at its last value. Open Steps again and it resumes and catches up. See [StandBy and Live Activity](/docs/widgets/standby-and-live-activity).

## 1. Open the app once

Opening Steps gives it a foreground moment to read current Health data and hand fresh values to the widget system. This resolves a large share of cases, particularly after an iOS update or a restart.

> **Note:** Do not force-quit Steps as a habit. Swiping an app away from the App Switcher makes iOS block its background refresh until you open it again — force-quitting makes widget staleness _more_ likely, not less.

## 2. Check Health permission

If access was revoked — sometimes silently during a major iOS update — the widget has nothing to show and reads zero rather than displaying an error.

1. **Health** › your profile picture › **Apps and Services**.
2. Tap **Steps Widget**.
3. Confirm the step, stand hour, and activity summary types are on.

See [Connect Apple Health](/docs/getting-started/connect-apple-health).

## 3. Check Fitness Tracking

If the system-wide motion switch is off, nothing on the phone counts steps.

1. **Settings** › **Privacy & Security** › **Motion & Fitness**.
2. Turn on **Fitness Tracking**.
3. Confirm **Health** is enabled in the list below.

## 4. Check Background App Refresh

Widgets depend on iOS being allowed to wake the app in the background.

1. **Settings** › **General** › **Background App Refresh**.
2. Ensure the top-level setting is on.
3. Find **Steps Widget** and make sure it is enabled.

## 5. Check Low Power Mode

Low Power Mode deliberately throttles background activity, and widget refreshes are among the first things it cuts. If your battery has been low, this is very likely your answer. Check **Settings › Battery**.

## 6. Confirm which window you are looking at

A widget that looks wrong rather than stale may be showing a different slice of time than you expect. If **Last 24-Hour** is on, the number is a rolling 24-hour total, not today. If **Start of Day** is set past midnight, a late-night walk counts toward the previous day.

Both are in Settings, and both are explained in [the step window](/docs/steps-and-data/step-window).

## 7. Remove and re-add the widget

If everything above is correct and the widget is still frozen, rebuild it: touch and hold, **Remove Widget**, then add it again. This clears a stale widget instance and touches none of your data.

## 8. Restart the iPhone

A restart clears the widget refresh queue along with other temporary system state. Blunt, but it resolves what survives everything above.

## My Watch and iPhone disagree

Usually the **iPhone** is the one behind, and the reason is the direction the data travels.

The Watch is worn, so it is the device that actually captures the steps — including every walk you took without your phone. Those steps then have to sync to Apple Health and be merged there before the iPhone can show them. The Watch reads its own count directly; the iPhone reads the merged result at the end of that chain, so it trails by design.

If the **complication itself** is stale rather than the number, watchOS budgets complication refreshes the same way iOS budgets widgets. Raise your wrist and open Steps on the Watch once. See [Apple Watch](/docs/widgets/apple-watch).

## The widget shows zero all day

That is a different symptom from a stale number — data is not reaching the app at all, rather than arriving late. Start from [Steps not counting](/docs/troubleshooting/steps-not-counting), which works through the recording side of the chain.

## What is the small icon on my widget?

That is the routine-change indicator. The app noticed your step pattern for some hour has shifted and the reminder model is due a retrain. It clears itself once retraining finishes, and you get a toast naming the hour that moved. Nothing to fix — see [How goal reminders work](/docs/goal-reminders/how-goal-reminders-work).

## What to read next

- [Steps not counting](/docs/troubleshooting/steps-not-counting) — when the data is missing.
- [Motion Sensor](/docs/steps-and-data/motion-sensor-and-live-activity) — skip the Health wait.
- [Reminders not arriving](/docs/troubleshooting/reminders-not-arriving) — silence from notifications.
