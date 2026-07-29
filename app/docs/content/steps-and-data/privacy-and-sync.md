---
slug: privacy-and-sync
title: Privacy and sync
metaTitle: How Steps Widget Handles Your Health Data
description: What Steps reads, what stays on your device, what iCloud carries, and why there is no account, no leaderboard, and no server holding your steps.
order: 4
updated: 2026-07-28
readingTime: 5 min read
keywords:
  - private step counter
  - health data privacy iPhone
  - on-device processing
  - no account fitness app
  - iCloud sync settings
---

Step data is health data. It shows when you leave home, how long you sit still, and roughly what your day looks like — which is why Steps is built so that none of it has to go anywhere.

## What the app reads

Three read-only Apple Health types, with your permission: **step count**, **stand hours**, and your **activity summary**. It never writes to Health, and it never requests location for step counting.

No GPS is involved. Steps come from the iPhone's motion coprocessor and from Apple Watch, both surfaced through Health.

There is one location exception, and it is opt-in: **Local Sunset** uses your location to find today's sunset so evening reminders can arrive a little earlier. It asks only for **While Using the App** access and only at **kilometre accuracy** — a sunset time is the same across a whole city, so nothing finer is requested. Leave the toggle off and location is never touched.

## What stays on your device

The model that decides when to remind you runs and _trains_ on your iPhone. It stores one row per day — at most 365 — and retrains locally against that history. Your activity pattern, the thing that makes the reminders feel personal, never leaves the phone.

Reminder rewriting is the same story: Apple Intelligence runs the rewrite on device, so your step counts, your goal, and your tone instruction are not sent to a server — not ours, and not Apple's.

Your step counts are read from Health on the device, drawn on the device, and that is the end of the journey.

## What there is no such thing as

Several categories of risk are absent by construction rather than by policy:

|                            |                |
| -------------------------- | -------------- |
| Account or sign-in         | Does not exist |
| Password to be breached    | Does not exist |
| Server holding your steps  | Does not exist |
| Public leaderboard         | Does not exist |
| Social feed or friend list | Does not exist |
| Ads, at any tier           | Does not exist |

You cannot leak a database that was never assembled. That is a stronger guarantee than careful handling, because careful handling is a commitment and this is a property of the design.

## What iCloud carries

If you use more than one Apple device, your **settings** follow you — not your health data:

- Daily goal
- Last 24-Hour and Day Ends At
- Goal Reminder on/off, reminder tone, Local Sunset
- Widget styles and display options

This runs through your own private iCloud key-value store, the same account that syncs your Notes. There is no CrazyLazy server involved, which is a different arrangement from the usual model where you create an account and the vendor holds your data.

Your step _history_ does not sync through Steps, because it does not need to — it lives in Apple Health, and Health syncs between your own devices itself.

### How conflicts resolve

Each setting carries the time it changed, and the newer edit wins per setting rather than per device. So changing your goal on the phone and a widget style on the Watch keeps both, instead of one device's snapshot overwriting the other's.

Future timestamps are clamped, so a device with a wrong clock cannot win every merge forever. The iPhone also pushes the step-window settings directly to the Watch, which is faster than waiting for iCloud.

### If you do not use iCloud

Everything works. Steps Widget stops carrying settings between devices and nothing else changes — no features are gated on being signed in.

## Why no leaderboard?

Because comparison is the wrong mechanism here, and it backfires on the people who most need movement prompts. Someone recovering from illness, managing a condition, or having a heavy work week does not benefit from a colleague's 18,000 steps. The useful comparison is with your own ordinary day, which is what a goal and [Insight](/docs/steps-and-data/insight) give you.

There is a quieter reason too: a leaderboard requires a server, an account, and your data leaving your phone. Skipping the feature skips all three.

## How can I verify this?

Two checks you can run yourself, without taking anyone's word for it.

**What it asked for.** Open **Health › your profile › Apps and Services › Steps Widget**. You should see step count, stand hours, and activity summary, all read-only. HealthKit permissions are per-category and enforced by iOS, so anything not requested cannot be accessed.

**What it does in the background.** Open **Settings › Battery**, last 10 days. An app quietly running GPS or syncing to a server has a battery signature that is hard to hide. A well-behaved step widget sits at or near the bottom of the list.

**Whether it kept a copy.** Revoke the step permission in Health and open Steps. The count goes to zero, because the app reads your steps rather than accumulating them — there is no private history to fall back on. See [Connect Apple Health](/docs/getting-started/connect-apple-health).

## Does the app work offline?

Completely. Reading steps, drawing widgets, running the projection, and delivering reminders all happen on the device — aeroplane mode changes nothing. A connection is needed only for App Store purchases, for iCloud to carry settings, and for the sunset lookup if Local Sunset is on.

## Where is the formal policy?

The [privacy policy](/privacy) and [terms of service](/terms) are on this site. This page describes the same handling in plain language; the policy is the legal statement of it.

## What to read next

- [Connect Apple Health](/docs/getting-started/connect-apple-health) — grant, verify, or revoke access.
- [How goal reminders work](/docs/goal-reminders/how-goal-reminders-work) — what the on-device model does.
- [Insight](/docs/steps-and-data/insight) — your own history, computed locally.
