---
title: "Everything Skitch Could Do in 2011 — and What iSkitch Does Today"
description: "We pulled the original skitch.com feature list out of the Internet Archive and checked it line by line against iSkitch. What we rebuilt, what we left out on purpose, and what's still missing."
lang: "en"
pubDate: 2026-08-25
order: 5
heroAlt: "The archived skitch.com feature list from 2011 next to the iSkitch editor running on macOS."
tags: ["Skitch", "features", "macOS"]
related: ["skitch-alternative-macos", "how-to-annotate-screenshots-on-mac"]
---

In February 2011, months before Evernote bought it, skitch.com had a page listing everything the app could do. [The Internet Archive still has it](https://web.archive.org/web/20110216205611/http://skitch.com/features), captured on 16 February 2011, ads and all.

We went through that list line by line against iSkitch, the app we ship today. Some of it we rebuilt. Some of it we do better. And a big chunk we deliberately never built — that part deserves an explanation.

## Three things you notice before the feature list

**Half of Skitch wasn't an app.** Every item on that page is tagged either `Mac` or `Web`, and the Web ones outnumber the Mac ones. Skitch was a Mac app bolted onto an image-sharing site with profiles, followers and comment threads.

**The free version had ads.** "Ad-free experience" was a bullet point you paid for. Skitch Plus cost **$14.95/yr** — "limited time, normally $19.95".

**The footer kept a counter:** *3,753,447 images stored, and counting.*

## Capture

| Skitch, 2011 | iSkitch | Note |
|---|---|---|
| Capture screenshots | Yes | Region, window, full screen — ⌥⌘4 works anywhere and can be remapped |
| Capture from your iSight | No | Photo Booth does this, and does it better |
| Auto archiving of captures & edits | Partly | Quick-capture straight to a folder; no browsable history yet |
| Web capture with a bookmarklet | No | It said *Coming soon!* in 2011 |
| Capture full-length webpages | No | Under consideration — scrolling capture is on the list |

Things that page never had: a countdown timer, recapture-last-region, picking which display to grab on a multi-monitor desk, quick capture to the clipboard without opening an editor. All of those are in iSkitch now.

## Edit

| Skitch, 2011 | iSkitch | Note |
|---|---|---|
| Crop by dragging the inner frame | Yes | Plus 1:1, 4:3, 3:4, 16:9 and 9:16 presets |
| Text, arrows, shapes, sketch, Wacom tablet | Yes | 14 tools, 4 arrowhead styles, 7 stamps |
| Organise images with tags and sets | No | That was the website, not the app |
| Watermark your images | No | Under consideration |
| Save tif, gif, bmp, svg & pdf | Partly | PNG, JPG, TIFF and PDF. No GIF, BMP or SVG |
| Add shadow, transparent background, wipe snap only | No | Under consideration |
| Resize with presets or digits | No | You can zoom 25–300%, but that doesn't change the pixels |

And the other direction — what iSkitch has that the 2011 list doesn't mention at all: **four ways to hide sensitive information** (pixelate, blur, a solid block, stripes), a **spotlight** that dims everything but the point you're making, stickers, image overlays, side-by-side collages, rotate and flip, and the whole interface in **18 languages**.

## Share — this is where we walk away on purpose

The original list had eleven sharing and social features. Free image hosting. A blog-like public profile. Followers. Privacy levels. Upload to Flickr or MobileMe. A dashboard holding 300 images. "Powerful visual comment threads."

iSkitch has none of it, and won't. You get the macOS share sheet, drag-out to any app, copy, and export. Nothing leaves your Mac unless you send it somewhere yourself.

Here's the argument for doing it that way. Paste `skitch.com/someone/something` into your browser today and you land on **evernote.com** — we checked this morning. Every Skitch link anyone ever pasted into a bug tracker, a forum thread or a support ticket now points at a company homepage. Those 3.7 million images are, for practical purposes, gone.

A PNG on your own disk still opens fifteen years later. That's not nostalgia, it's the whole reason iSkitch has no account, no server and no login.

## What Evernote-era Skitch added

The 2011 page predates the tools most people actually remember. Later versions added **stamps** for approving and rejecting things, a **pixelate** tool and a **highlighter** — iSkitch has all three, with seven stamps that sit on a coloured disc and can grow a tail to point at what you mean, plus a text label beside them.

The one Evernote feature we don't match is **PDF annotation**, which arrived in Skitch 2.5 and needed a Premium account after 30 days. Ours would need no account. It's on the list.

## What's still missing

The honest version, all in one place:

- Resize an image to a given size
- Drop shadow and transparent background
- Watermarks
- GIF and BMP export
- Full-page web capture
- PDF markup
- A browsable history of past captures

That list is our backlog, not a wishlist we're hiding. If one of them is the thing standing between you and switching, tell us: **hello@iskitch.com**. Requests from people who actually used Skitch are how the last three releases got planned.

## Fifteen years later

Skitch got the important half right in 2008: grab something, put an arrow on it, get it in front of someone in seconds. What it got wrong was tying that to a service someone else had to keep running.

[iSkitch](/) is the first half, rebuilt native for Apple Silicon, in 18 languages, for a one-time purchase. The second half is your own disk.
