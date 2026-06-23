---
title: "How to Hide Sensitive Information in Screenshots (Safely)"
description: "Blurring isn't always safe — some methods can be reversed. Learn how to reliably hide passwords, emails and personal data in a screenshot on macOS before you share it."
lang: "en"
pubDate: 2026-06-23
order: 4
heroAlt: "A screenshot with a password field hidden behind a solid block and pixelated regions."
tags: ["privacy", "screenshots", "security"]
related: ["how-to-take-screenshots-on-mac", "how-to-annotate-screenshots-on-mac"]
---

You're about to share a screenshot of a bug, an invoice or a settings page — and there's an email address, an API key or an account number sitting right in the frame. Before you hit send, here's how to hide it so it actually stays hidden.

## Not all redaction is safe

The instinct is to blur the sensitive part. But blurring is a **reversible filter**: it spreads each pixel into its neighbours according to a known math operation. With enough effort — and sometimes very little — that operation can be partially undone, especially for short, predictable text like a 6-digit code or a known email format. There have been real cases of "blurred" or pixelated text being recovered.

The lesson isn't "never blur." It's **match the method to the risk**:

- **Low-stakes, just-tidying** — a light blur or pixelation is fine for hiding a face in the background or a logo you don't want in the shot.
- **Actually secret** — passwords, tokens, card numbers, full names, addresses: don't filter them, **cover them**.

## The reliable way: cover, don't filter

The only redaction that can't be reversed is one where the original pixels are **gone**, replaced by something that carries no information about them:

- **Solid block** — a flat opaque rectangle over the secret. There's nothing underneath to recover. This is the safest option for anything truly sensitive.
- **Stripes / solid bars** — same idea, visually distinct so readers can tell it's intentional.
- **Crop it out** — if the secret is at the edge, the cleanest fix is to remove it from the image entirely.

A subtle but important point: if you "redact" by drawing a box in a tool that keeps layers, make sure you **flatten and export** to a standard image (PNG/JPG). A layered or vector file can let someone move your box and reveal what's underneath. Exporting to a flat PNG bakes the cover-up into the pixels.

## How to do it on macOS

macOS's built-in Markup can draw a shape over content, but it isn't designed for reliable redaction and has no dedicated pixelate tool. For screenshots you're going to share, a dedicated tool is faster and safer.

[iSkitch](/) gives you four ways to hide information, each one click away in the editor:

- **Solid block** — drag a flat, opaque rectangle over anything secret. Use this for passwords, keys and account numbers.
- **Stripes** — a striped bar that reads clearly as "redacted."
- **Pixelate** — coarse mosaic for lower-stakes blurring (faces, background clutter).
- **Blur** — a soft blur for the same lighter use cases.

When you export to **PNG, JPG or PDF**, the redaction is **flattened into the image** — what you cover stays covered. And because iSkitch is **private by design — no accounts, no tracking, nothing leaves your Mac** — the original, un-redacted screenshot was never uploaded anywhere in the first place.

## A quick checklist before you share

1. Is anything in the frame secret? Scan corners, browser tabs, notifications and reflections.
2. For real secrets, use a **solid block**, not blur.
3. Crop out anything you don't need.
4. **Export to a flat image** (PNG/JPG) so the cover can't be peeled back.
5. Double-check the exported file, not the editor preview.

Hiding sensitive data well takes ten seconds and saves you from a leak you can't undo. Cover it, flatten it, then share.

[Get iSkitch on the Mac App Store →](/)
