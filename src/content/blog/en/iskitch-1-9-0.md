---
title: "iSkitch 1.9.0 and 1.8.1: WebP, a JPEG That Tells the Truth, and No Permission Required"
description: "Two releases in a month, both born from support emails: pasting a screenshot without the Screen Recording permission, sharp captures on scaled displays, WebP export, quality in the save dialog, and the JPEG slider that said 80% and wrote 94."
lang: "en"
pubDate: 2026-09-22
order: 7
heroAlt: "The iSkitch save dialog with a Format pop-up set to WebP and a Quality slider."
tags: ["iSkitch", "release", "macOS"]
related: ["iskitch-1-8-0", "how-to-take-screenshots-on-mac"]
---

Two updates have reached the Mac App Store since [1.8.0](/blog/iskitch-1-8-0/): 1.8.1 on September 17 and 1.9.0 on September 22. Both started as support emails. One came from someone on a company Mac who couldn't grant iSkitch the Screen Recording permission. The other came from Austria, with four suggestions and, a few days later, a measurement that made us pull a build out of review.

## 1.8.1: no Screen Recording permission? That works too

On a managed Mac without admin rights, you can't grant the Screen Recording permission. Without it, "Capture" does nothing useful. Skitch solved this years ago with the clipboard: take the screenshot with macOS, paste it into Skitch. iSkitch couldn't do that.

Now it can. **File ▸ New from Clipboard (⇧⌘N**, Skitch's shortcut) opens whatever image is on the clipboard as a new document. And **⌘V does the same** whenever no text field is waiting for the paste, so the old habit works again: ⌃⇧⌘4 in macOS, then paste. None of it goes through screen capture, so no permission is needed, and a Retina screenshot keeps its 2× pixels.

When a capture does fail for lack of permission, the alert now explains both ways around it (keep using macOS's ⇧⌘4 and let iSkitch open each screenshot, or paste with ⇧⌘N) and has a button that turns the first one on right there.

### The blurry capture three people had reported

The same customer sent a video from a Mac mini with a 4K monitor set to 2560×1440, and it finally showed where the "low resolution" complaints were coming from. Not from the export, as we'd assumed. From the capture itself.

We were asking ScreenCaptureKit for a bitmap the size of `CGDisplayPixelsWide`, which, despite its name, returns **points** on any Retina mode. On a scaled display, the region capture came out at 1×; on that Mac mini it reached 2× but interpolated, soft. Region and full-screen captures now go through the same machinery as macOS's own ⇧⌘4. Measured against `screencapture` on the same rectangle: **zero pixels different**.

## 1.9.0: WebP, and quality where you save

macOS has read WebP for years and still can't write it. iSkitch now brings its own encoder (libwebp, Google's official one; the notice is in About), so **WebP joins PNG, JPG, TIFF, PDF, GIF and BMP** in Settings, in the editor's save button and in the save dialog, with adjustable quality and transparency preserved. **100% saves lossless**, the way WebP tools do. WebP has no field for resolution, so we write it into an EXIF chunk that Preview and ImageIO read: a Retina capture opens at 144 dpi and its real size, not double.

The save dialog itself has grown a **Format** pop-up and, for JPEG and WebP, a **Quality** slider, like Preview's Export sheet. Whatever you choose there becomes the default.

And **Resize Image** has come out of hiding. It's been in the Image menu since 1.8.0 and nobody found it, including the Austrian customer, who asked for it as a new feature. It now has a shortcut (**⇧⌘R**), a button in the crop bar and another next to the pixel dimensions at the bottom of the editor; clicking the "W × H px" figures opens it too.

## The 80% that was a 94

Among the four suggestions was a complaint we thought we'd answered: iSkitch's JPEGs were too big. Our first reply said the file was fine and their measuring tool was off. Then they measured the same screenshot in five apps at the same "80%" setting. iSkitch: 131 KB. The others: 31 to 46 KB.

They were right. macOS's built-in JPEG encoder has its own quality scale, and its 80 writes the quantization tables that Affinity, XnConvert, Squoosh, ImageMagick and libjpeg all call **94**. We read the tables ourselves to confirm it: Apple's 0.5 is the standard 80, and its 0.85 and 0.9 write the very same file.

Build 25 was already in App Review. We pulled it. Build 26 translates the slider value to the encoder's scale using a table measured point by point, so the number you pick is the number any tool reads back from the file, and sizes are on a par with everyone else's. If you had a quality set, you'll see smaller files at the same number; the 90% default is now a real 90.

## The rest of it

- **The crop bar spoke in points.** On a Retina capture it said 1280 × 800 while the bottom bar said 2560 × 1600. It now works in pixels, says so, and typing 1281 crops to exactly 1281 (it used to give 1282).
- **Small images open centred** instead of stuck in the top-left corner of the editor's 800 × 600 minimum window.
- **A review request.** After five exports and at least three days of use, iSkitch asks for a rating with the system's native sheet: once per version, never more than once every four months, never in response to a click. Nothing in exchange. We say it here because it's the second thing, after the newsletter window, that the app can show you without being asked.

## Available now

1.9.0 has been on the Mac App Store since September 22, 2026. Free update for everyone who already has iSkitch, no subscription, no account.
