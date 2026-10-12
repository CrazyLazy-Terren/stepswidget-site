---
slug: reminder-messages
title: Reminder messages
metaTitle: Write Your Own Goal Reminder Messages in Steps Widget
description: Edit every reminder title and message in your own words, rotate several phrasings, keep the live numbers with placeholders, and restyle the lot on device with Apple Intelligence.
order: 2
updated: 2026-09-26
readingTime: 5 min read
keywords:
  - custom reminder message
  - custom notification text iPhone
  - Apple Intelligence reminder
  - personalized step reminder
image: /assets/f03.png
---

Every word a goal reminder says can be rewritten. The app ships with its own copy, and you can replace any title or message with yours — the numbers still fill in, and your version is what arrives on your Lock Screen and your wrist, and what the widgets show under your count.

## Opening the editor

1. Open **Settings** in the app.
2. With **Goal Reminder** on, tap **Edit Messages**.

The screen opens prefilled with exactly what is sent today, so you are editing the real thing rather than starting from a blank page.

## The four sections

Messages are grouped by how your day is tracking — the same four states described in [How goal reminders work](/docs/goal-reminders/how-goal-reminders-work#what-each-message-is-telling-you):

| Section            | Default title | Placeholders             | Messages                    |
| ------------------ | ------------- | ------------------------ | --------------------------- |
| **Falling behind** | Push now      | `{stepsLeft}`, `{hours}` | Up to you — ships with four |
| **Goal reached**   | Goal hit      | none                     | Up to you — ships with four |
| **Ahead of pace**  | Strong lead   | `{stepsAhead}`           | One                         |
| **On track**       | Steady pace   | `{stepsLeft}`            | One                         |

Each section has one **Title** and one or more **Body** messages. The title is sent exactly as you write it; placeholders go in the body.

**Falling behind** is the one you will actually see most. It is the message sent when the projection says you are heading for a miss, so it is the one worth getting right.

## Placeholders

A placeholder is swapped for a live number when the reminder is sent:

| Placeholder    | Becomes                                                                | Example |
| -------------- | ---------------------------------------------------------------------- | ------- |
| `{stepsLeft}`  | Steps still to walk to reach your goal, rounded to the nearest hundred | 1,900   |
| `{hours}`      | Hours left in your day                                                 | 3       |
| `{stepsAhead}` | How far past your goal the day is projected to end                     | 1,250   |

So `{stepsLeft} steps in {hours}h — a short walk gets you there.` arrives as _1,900 steps in 3h — a short walk gets you there._

While you edit a message, a bar above the keyboard offers the placeholders that section supports, plus Undo and Redo. Tap one to insert it at the cursor. A placeholder behaves as a single piece: one backspace removes the whole thing, so you never end up sending a broken `{step`.

Each section's footer lists which placeholders it replaces. A placeholder from another section — `{stepsAhead}` in Falling behind, say — is not filled in, so stick to the ones listed.

## Several messages in rotation

**Falling behind** and **Goal reached** can hold several messages, and the app picks one from the list each time:

- **Falling behind** changes its pick every hour, so two nudges in the same afternoon do not repeat each other word for word.
- **Goal reached** changes its pick every day. The congratulation arrives once and stays on screen afterwards, so it reads the same all day and differently tomorrow.

- **Add Message** adds another one to the rotation.
- **Swipe left** on a message to remove it.

The last message in a section cannot be removed; every state needs something to send. The other two sections carry a single message.

## Restyling with Apple Intelligence

If Apple Intelligence is available, a field at the bottom of the editor asks **How should reminders sound?** Describe a voice, tap the pencil, and the on-device model rewrites every title and message in the editor to match.

Three suggestions sit above the field to start from:

- A sports coach who gives quick pep talks
- A yoga teacher who invites a mindful stroll
- A witty buddy who teases a little

The suggestions show the shape that works best: **a person you can picture, doing one concrete thing.** The model follows a voice it can imagine far more closely than a list of adjectives, and it tends to ignore negatives, so _"never pushy"_ is less effective than describing someone who is naturally gentle.

The rewrite keeps the placeholders in place. If a rewritten message comes back without its numbers, that message keeps its original text rather than going out as a number-less nudge.

> **Note:** The rewrite is a draft, like anything you type. Nothing is stored until you tap **Save**, so read it through, fix what you do not like, or undo it. And because the result is saved as ordinary text, reminders themselves are not generated at send time — what you saved is exactly what arrives.

The field only appears when the device can run it:

- **iOS 26 or later**
- **Apple Intelligence** turned on
- The app's language supported by the on-device model

Without it, the editor works the same way; you just write the messages yourself.

## Saving, discarding, and going back to the defaults

Tap the **checkmark** to save. If you try to leave with unsaved edits, the app asks whether to **Save** or **Discard Changes** first, so edits are not lost to a stray swipe.

**Restore Defaults**, at the bottom of the editor, puts every section back to the built-in copy. Like any other edit, it takes effect when you save.

A few details about what gets kept:

- Only what you changed is stored. A section you never touched keeps following the built-in copy — including its translations, if you switch the iPhone's language later.
- Clearing a title, or typing the built-in text back in, returns that field to the default.
- Blank messages are dropped when you save.

## On your other devices

Your messages sync through your private iCloud with the rest of your settings, so the **Apple Watch** sends your wording too. On a day the Watch is elected as the sending device, the tap on your wrist carries the same text you wrote on the iPhone. See [Reminder timing and devices](/docs/goal-reminders/reminder-timing-and-devices).

## Privacy

Your messages are stored in the app's settings and your own iCloud, not on a server. The Apple Intelligence restyle runs on Apple's on-device foundation model: your wording and your style description are not sent anywhere — not to us, and not to Apple.

## Choosing the alert itself

The editor controls the wording. How intrusive the alert is comes from iOS, and it is worth setting deliberately:

| Want                                  | Where                                                                |
| ------------------------------------- | -------------------------------------------------------------------- |
| Silent but visible                    | **Settings › Notifications › Steps Widget › Sounds**, off            |
| A wrist tap instead of a sound        | Wear your Apple Watch — see [Apple Watch](/docs/widgets/apple-watch) |
| Banner style, persistent or temporary | **Settings › Notifications › Steps Widget**                          |
| Never during a Focus                  | Leave the app off that Focus's allowed list                          |

Reminders are delivered with the default notification sound. One iOS setting to check: if the app is included in your **Scheduled Summary**, reminders are held and delivered in a batch, so a reminder about your afternoon can arrive at 6pm. See [Reminders not arriving](/docs/troubleshooting/reminders-not-arriving).

## Can I have different messages at different times of day?

Not by schedule. The rotation in **Falling behind** varies the wording from hour to hour, but every message in it can be picked at any time. The closest thing to a quiet stretch is a Focus mode covering the hours you want silence.

## What to read next

- [How goal reminders work](/docs/goal-reminders/how-goal-reminders-work) — which state sends which message.
- [Reminder timing and devices](/docs/goal-reminders/reminder-timing-and-devices) — when it fires and from which device.
- [Reminders not arriving](/docs/troubleshooting/reminders-not-arriving) — the fix list.
