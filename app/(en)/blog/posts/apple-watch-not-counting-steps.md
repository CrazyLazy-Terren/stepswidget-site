---
title: 'Apple Watch Not Counting Steps? 8 Fixes That Work'
metaTitle: 'Apple Watch Not Counting Steps: How to Fix It | Steps Widget'
description: Steps missing, stuck at zero, or not showing on your watch face? Work through the chain from wrist fit to Health permissions to the complication itself, ordered by how often each one turns out to be the cause.
date: '2026-10-07'
updated: '2026-10-07'
slug: apple-watch-not-counting-steps
category: Troubleshooting
image: /assets/blog-apple-watch-steps-accuracy.jpg

keywords:
  - apple watch not counting steps
  - why is my apple watch not counting my steps
  - steps not showing on apple watch
  - apple watch steps not working
  - apple watch step counter not working
  - apple watch not tracking steps
  - apple watch steps missing
  - apple watch step count stuck
---

An Apple Watch that has stopped counting steps is almost never broken hardware. In nearly every case it is a setting, a permission, or a sync problem somewhere between your wrist and the screen you are looking at.

The checks below are ordered by how often each one turns out to be the answer. Work down the list and stop when the steps come back.

> **Quick Answer: Start Here**
> 1. **Check you are looking in the right place.** Steps live in the **Activity** app, scrolled down below the three rings — not on the rings themselves.
> 2. **Check the fit.** A loose watch misses motion. It should be snug, on the top of your wrist.
> 3. **Check Motion & Fitness** is on: **iPhone › Settings › Privacy & Security › Motion & Fitness › Fitness Tracking**.
> 4. **Check Health permission for the app** you are using — granted on the iPhone does *not* mean granted on the Watch.
> 5. **Restart both devices.** This fixes a surprising share of stuck counts.

**Table of contents**

- [First: is it actually missing?](#first-is-it-actually-missing)
- [1. Check how you are wearing it](#1-check-how-you-are-wearing-it)
- [2. Check Fitness Tracking is enabled](#2-check-fitness-tracking-is-enabled)
- [3. Check Health permissions — on both devices](#3-check-health-permissions--on-both-devices)
- [4. Check whether the Watch and iPhone are syncing](#4-check-whether-the-watch-and-iphone-are-syncing)
- [5. Restart both devices](#5-restart-both-devices)
- [6. Check Low Power Mode](#6-check-low-power-mode)
- [7. If a complication is the thing showing nothing](#7-if-a-complication-is-the-thing-showing-nothing)
- [8. Unpair and re-pair, as a last resort](#8-unpair-and-re-pair-as-a-last-resort)
- [When steps are low rather than missing](#when-steps-are-low-rather-than-missing)
- [Frequently asked questions](#frequently-asked-questions)
- [Key takeaways](#key-takeaways)

## First: is it actually missing?

Two things get mistaken for a broken step counter:

- **Looking at the rings.** Move, Exercise, and Stand are not step counts. Your steps are in the **Activity** app, several scrolls below them. A full set of rings with no visible step number is normal, not a fault.
- **A complication that lags.** watchOS refreshes complications from a limited budget rather than live, so a few minutes behind the Health app is expected. Hours behind, or stuck at zero, is a real problem.

If the Health app on your iPhone shows today's steps but your watch face does not, the recording is fine and the problem is downstream — skip to [step 7](#7-if-a-complication-is-the-thing-showing-nothing).

## 1. Check how you are wearing it

The Watch counts steps from wrist motion, so it has to be able to feel your arm move.

- **Snug, not loose.** A watch sliding around on your wrist registers motion poorly. You should not be able to spin it freely.
- **Top of the wrist**, not the inside, and not over a sleeve.
- **Worn on a moving arm.** Pushing a pram or trolley, holding a handrail, or carrying something heavy keeps your arm still and your steps will be undercounted or missed entirely. This is expected behaviour rather than a bug — the same thing happens on an under-desk treadmill while you type. See [do walking pad steps count](https://stepswidget.app/blog/do-walking-pad-steps-count).

## 2. Check Fitness Tracking is enabled

This is the most common hard stop, and it silences step recording across every app on both devices.

1. On your **iPhone**, open **Settings › Privacy & Security › Motion & Fitness**.
2. Turn on **Fitness Tracking**.
3. Confirm **Health** is enabled in the list below.

One thing to know: turning it back on starts recording from that moment. It does not backfill the hours it was off, so a partly empty day stays that way.

## 3. Check Health permissions — on both devices

HealthKit denies access silently. An app without permission is told the data does not exist, which is why you see a zero rather than an error message.

**On the iPhone:**

1. **Health › your profile picture › Apps and Services**.
2. Tap the step app you are using.
3. Turn on step count, stand hours, and activity summary.
4. Open the app once so it can read the newly available data.

**On the Watch — this is the step people miss.** Health access is granted *per device*. Allowing it on your phone does not allow it on your wrist. If a Watch app needs access it will say so and offer an **Authorize** button; grant it there.

If permissions look correct but the count is still zero, revoke and re-grant: tap **Turn Off All**, then **Turn On All**, then reopen the app. That clears a permission grant that looks right but has stopped delivering data, which happens most often after a major watchOS or iOS update.

## 4. Check whether the Watch and iPhone are syncing

Your Watch counts locally and reconciles with your iPhone over Bluetooth or Wi-Fi. If they have been apart, the backlog arrives in one lump when they reconnect — which looks like missing steps until it lands.

- Bring the devices together, with **Bluetooth on** and Airplane Mode off.
- Give it a few minutes, then check the Health app again.
- A sudden jump in your total is the sync completing, not an error.

The full chain, and why the phone usually lags the watch, is in [how your iPhone and Apple Watch count and sync steps](https://stepswidget.app/blog/how-iphone-apple-watch-count-and-sync-steps).

## 5. Restart both devices

Unglamorous and genuinely effective for a count that has frozen.

- **Watch:** hold the side button, slide to power off, then hold the side button again to restart.
- **iPhone:** restart normally.
- Restart the Watch *after* the iPhone is back up, so it reconnects to a working phone.

## 6. Check Low Power Mode

Low Power Mode on either device throttles background activity, which delays how promptly step data is processed, synced, and drawn. If your battery has been low, this is very likely the explanation for a count that updates slowly rather than not at all.

On the Watch, check **Settings › Battery**. On the iPhone, **Settings › Battery**.

## 7. If a complication is the thing showing nothing

When Health has your steps but the watch face does not:

- **Confirm the Watch app is actually installed.** Open the **Watch** app on your iPhone, go to **My Watch › Available Apps**, and install it if it is listed there. Then **open it once on the Watch** — that first launch is what registers the complication.
- **Re-add the complication.** Touch and hold the face, tap **Edit**, swipe to **Complications**, tap the slot, and select the app again.
- **Check Background App Refresh** on the Watch: **Settings › General › Background App Refresh**.
- **Do not force-quit the app.** Swiping it away makes the system withhold background refresh until you open it again, which makes staleness more likely rather than less.

## 8. Unpair and re-pair, as a last resort

If everything above fails and the Watch records nothing at all over a test walk, unpairing and re-pairing rebuilds the connection. Your Watch backs up to your iPhone automatically during unpairing, and your step history lives in Apple Health rather than on the Watch, so the data itself is not at risk.

Budget an hour, and do it only after the other eight checks.

## When steps are low rather than missing

Different problem, different cause. If your Watch is counting but the numbers seem too low:

- **Your arm was still** for much of the walking — trolley, handrail, pockets, typing.
- **Your health details are wrong.** In **Health › profile › Health Details**, check height, weight, age, and sex, which iOS uses to estimate stride and distance.
- **It has never been calibrated.** Take both devices outdoors to a flat, open area and do a 20-minute **Outdoor Walk** workout at your normal pace.

More on what a wrist sensor can and cannot see is in [how accurate is the Apple Watch step count](https://stepswidget.app/blog/apple-watch-steps-accuracy-limitations).

## Frequently asked questions

**Why is my Apple Watch not counting my steps?** Most often Fitness Tracking is off on the paired iPhone, the watch is worn too loosely, or an app lacks Health permission on the Watch specifically. Work down the list above in order.

**Why are steps not showing on my Apple Watch?** Check where you are looking first — steps are inside the Activity app below the three rings, not on the rings. If a complication is blank, the Watch app may not be installed or may never have been opened on the wrist.

**My iPhone shows steps but my Apple Watch does not. Why?** The recording chain is fine, so the problem is on the Watch side: usually a missing Watch app, a complication that needs re-adding, or Health access not granted on the Watch.

**Does the Apple Watch count steps without the iPhone?** Yes. It counts independently and syncs later, so a walk with the Watch alone is still recorded in full.

**Will unpairing my Apple Watch delete my step history?** No. Your steps live in Apple Health on your iPhone, not on the Watch, and unpairing backs the Watch up automatically.

**Why did my step count suddenly jump?** A sync completing. The Watch stores steps locally when separated from your phone and delivers the backlog on reconnection.

## Key takeaways

| Symptom | Most likely cause |
| :--- | :--- |
| No steps anywhere | Fitness Tracking off on the iPhone |
| Zero in one app only | Health permission missing — check the Watch separately |
| Blank complication | Watch app not installed, or never opened on the wrist |
| Count frozen for hours | Needs a restart, or the devices have not synced |
| Count low but present | Arm held still, wrong health details, or never calibrated |
| Sudden jump in total | Normal — a backlog syncing after the devices reconnected |

Related reading: [why is my iPhone not counting steps](https://stepswidget.app/blog/iphone-not-counting-steps) for the phone-side version of this checklist, [does the Apple Watch count steps](https://stepswidget.app/blog/how-to-view-and-track-apple-watch-steps-daily) for where the number lives, and [how your iPhone and Apple Watch count and sync steps](https://stepswidget.app/blog/how-iphone-apple-watch-count-and-sync-steps) for the full pipeline.
