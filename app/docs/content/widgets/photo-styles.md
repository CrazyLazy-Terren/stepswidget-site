---
slug: photo-styles
title: Styles from a photo
metaTitle: Make a Widget Style from Your Own Photo in Steps Widget
description: Turn any picture into a widget style — either as a colour palette lifted from the photo, or as the photo itself behind your step count.
order: 3
updated: 2026-09-08
readingTime: 7 min read
keywords:
  - photo widget iPhone
  - custom widget background photo
  - widget color from photo
  - personalized step widget
---

Steps Widget can create a widget style from your own photos, so it matches your wallpaper—or just your vibe. When you pick a photo, the app gives you two ways to turn it into a style.

- **Colors Palette** — the colours are lifted off the photo and applied to the normal widget design. No picture is shown.
- **Background Image** — the picture itself sits behind your step count.

A style you make this way is saved, syncs to your other devices, and can be reused on any widget.

## Opening the editor

Photo styles are made on the app's main screen, so pick the widget you are dressing first — swipe along the top to the widget type you want, since each type keeps its own style.

Then, in the bottom bar:

- **Style from Photo** starts a new style.
- **Edit Style** appears instead beside it when the widget is already wearing one of your own styles, and reopens that one.

## Picking the photo

The picker is your normal photo library. RAW files from a camera work: it asks iOS for a compatible transcode rather than the original sensor data, which is what makes a Sony or Canon frame importable at all.

Two things can go wrong, and they say different things because you can do different things about them:

- **"That photo couldn't be read"** — usually a picture that still lives in iCloud and has not downloaded to this device yet. Open it once in Photos so it downloads, then try again.
- **"That photo couldn't be saved"** — there was no room to store the copy. Free up space and retry.

The app stores its own copy of the picture rather than referencing your library, so the widget keeps working if you later reorganise or delete the original.

## Colors Palette

The photo is reduced to a small thumbnail and clustered in OKLab — a colour space where distance matches how different two colours actually look — so what comes out describes the masses in the picture rather than whatever pixel a sampling grid happened to land on. Six colours come back, shown as dots under the preview.

Those colours are then assembled into a handful of complete styles, offered as swatches in the **Palettes** row:

| Candidate   | How it is built                                                                    |
| ----------- | ---------------------------------------------------------------------------------- |
| Dark tone   | The photo's shadow colour carries the widget, its highlights the text              |
| Dominant    | The colour the photo is mostly made of, with black or white on top                 |
| Light tone  | The inverse, for bright pictures                                                   |
| Gradient    | The two heaviest colours as a gradient background                                  |
| Accent only | The system background kept, with the photo's two most vivid colours as the numbers |

Two preview tiles sit above the row — one light, one dark — so you can see both appearances at once before committing.

Reopening a saved style shows the full colour picker below the palettes. Colours you set by hand outrank the palette selection.

## Background Image

This tab puts the picture behind the widget and gives you four controls.

### Framing

**Drag to move the picture, pinch to zoom.** The window you are aiming is the widget itself, drawn at real size with the real step count in it — not an abstract crop rectangle — and the rest of the photo bleeds around it dimmed so you can see what sits just outside the frame.

A freshly picked photo opens at roughly the size it would be as _wallpaper_, centred. That is deliberate: at that scale the widget reads as a hole cut in your Home Screen rather than as a thumbnail of the picture. Zoom in from there if you want a detail instead.

How far you can zoom is capped by the photo's own resolution, so the widget is always cutting a crop down rather than enlarging one.

### Foreground

What the step count is drawn in. Three chips are offered — white, black, and the most vivid colour in the photo — plus a full colour picker for anything else.

The app suggests one for you by measuring the part of the picture the widget actually shows, and re-suggests it when you reframe or change the tone. But a colour you reach for yourself is yours: once you pick one, moving the picture never takes it back.

### Tone

Left darkens the picture and deepens its colours; right lightens and washes them out. It starts slightly dark, which is what makes a light step count legible over most photographs.

Tone is the main tool for making a foreground colour work. If white text is disappearing into a bright sky, pull tone left rather than hunting for a different colour.

### Blur

Softening a busy picture lets the numbers sit on top of it. A photo with a lot of fine detail behind the step count — foliage, a crowd, text — usually needs a little blur even when its brightness is fine.

### A working recipe

If a background looks wrong and you cannot tell why, the order that usually fixes it:

1. Frame first, so you know what the numbers are actually sitting on.
2. Set tone until the area under the step count is clearly darker (or clearly lighter) than the text will be.
3. Add blur only if the detail is still fighting the numbers.
4. Pick the foreground colour last.

## Where the picture shows, and where it does not

A photo background is drawn by **Home Screen widgets**. The Lock Screen accessory widgets and the Apple Watch complications are drawn by iOS on a clear background in a single tint colour, so there is no photo to show there — those surfaces take the style's colours instead.

The same applies on the Home Screen when you tint your icons and widgets, and in StandBy's night mode: iOS renders the widget monochrome, so the picture flattens into the tint. A photo style still works on those surfaces; it just stops being a photograph.

For anything you want on the Lock Screen or the wrist, **Colors Palette** is the mode that survives the trip. See [Apple Watch](/docs/widgets/apple-watch), which keeps its own styles anyway.

## Saving, sharing, and reusing a style

Tapping the checkmark files the style and puts it on the widget you opened the editor from.

Saved styles appear as an extra row at the end of the style picker on the main screen, newest first, so you can put one on any widget later without opening the editor again.

Because a style can be worn by several widgets at once, editing one asks what you meant:

- **Change All Widgets** — updates the style itself, and every widget wearing it follows.
- **Duplicate for This Widget** — files a copy and changes only the widget you are looking at, leaving the others alone.

The trash button deletes a style. The confirmation says how many widgets are using it; those go back to their default look. You can keep up to 60 styles.

## Sync and privacy

Styles travel through your own private iCloud, like the rest of your settings. The pictures are larger than the settings store can carry, so they go to your private iCloud database separately — the same place the reminder model lives. Nothing is uploaded to a server, and there is no account.

That means a style can arrive on a second device slightly before its photo does. When that happens the editor says **"This photo hasn't downloaded yet"** and the widget draws the style's background colour in the meantime, so nothing looks broken while the picture is on its way.

The stored copy of your photo lives in the app's own container, shared only with its widget extensions so they can draw it. Deleting a style removes its picture; so does deleting the app.

## What the subscription covers

Making a photo style and keeping it costs nothing. What an active [Customization subscription](/docs/widgets/widget-styles#what-the-subscription-covers) buys is the act of _applying_ a style to a widget — the same rule as every other style in the app.

A style already on a widget keeps rendering if the subscription lapses, photograph and all.

## What to read next

- [Styling widgets](/docs/widgets/widget-styles) — the built-in palettes, display options, and what the subscription covers.
- [The widget gallery](/docs/widgets/widget-gallery) — which widget shows what.
- [Privacy and sync](/docs/steps-and-data/privacy-and-sync) — how settings travel between devices.
