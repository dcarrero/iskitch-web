---
title: "What's Coming in iSkitch 1.8.0 — and the Bug That Was There All Along"
description: "Capturing a window never actually captured a window. Fixing that opened the door to shadows, transparent backgrounds, real global shortcuts, resizing, and GIF and BMP export."
lang: "en"
pubDate: 2026-08-26
updatedDate: 2026-08-27
order: 6
heroAlt: "A window captured with its shadow and rounded corners on a transparent background."
tags: ["iSkitch", "release", "macOS"]
related: ["skitch-features-compared", "how-to-take-screenshots-on-mac"]
---

We published a feature-by-feature comparison against the original Skitch a couple of days ago, listing what iSkitch still couldn't do. Working through that list turned up something we didn't expect: **capturing a window never captured a window.**

## The bug that was there from day one

Pick "Capture Window", click on Safari, and you'd get a picture of Safari. Most of the time. But if anything overlapped it — a floating panel, another window, a notification — that came along too.

Because the app wasn't capturing the window at all. It took a picture of the **whole screen** and cropped out the window's rectangle. Anything sitting inside that rectangle was in the shot, whether it belonged to the window or not.

The function that asks macOS for a single, isolated window had existed since the first version. Nobody ever called it. It sat there as dead code while every window capture went through the crop.

That also explains something we'd been chasing: the shadow and transparent corners we'd just implemented weren't showing up anywhere. Of course they weren't — the code that produced them never ran.

## What that fix makes possible

Now that windows are actually captured as windows, they arrive **with their shadow and their rounded corners, on a transparent background** instead of whatever was behind them on the desktop. Pasted into a document or a chat, that's the difference between a screenshot and a clipping.

One detail we're a bit proud of: the shadow is drawn by iSkitch, not by macOS. ScreenCaptureKit will render it for you, but it squeezes it *inside* the buffer you asked for — measured on a 2168 px window, the content shrank to 2038 px to make room. A screenshot app can't resample your window to 0.94× and call it a day. So we ask for it without the shadow, at native resolution, and compose the shadow ourselves.

## The shortcuts that weren't shortcuts

⌥⌘5 for a window, ⌥⌘3 for the full screen, ⌥⇧⌘4 to repeat the last region. They were documented, they were in the menu, and outside the app **none of them did anything**. Only ⌥⌘4 was ever registered as a global shortcut; the rest were plain menu items, which need iSkitch to be in front — precisely when you're not.

All four are now real global shortcuts, a fifth one has joined them (**⌥⇧⌘5** grabs the window you already have in front, no aiming), and **every one can be remapped individually** in Settings ▸ Capture ▸ Shortcut.

## The rest of it

- **Resize the image** — Image ▸ Resize Image…, in pixels, with proportions locked and 25/50/75/100% presets. Annotations scale with the image, and ⌘Z undoes the whole thing in one step.
- **Export to GIF and BMP**, joining PNG, JPG, TIFF and PDF.
- **Adjustable strength** for pixelation and blur, saved per annotation: hint at an IP address and make a password completely unreadable in the same screenshot.

## One honest note about privacy

1.8.0 adds a window that invites you to subscribe to product news. It's the first time iSkitch can send anything at all, so we've been precise about it: the app still works entirely offline, your screenshots still never leave your Mac, and the only thing that can ever go out is your email address — and only if you type it, tick the box and press the button.

We've rewritten the [privacy policy](/privacy/) accordingly, in all eight languages. It previously claimed the app "never connects to our servers", and starting with this version that would no longer be true.

## Available now

1.8.0 has been on the Mac App Store since August 27, 2026. It's a free update for everyone who already has iSkitch — as always, no subscription, no account.
