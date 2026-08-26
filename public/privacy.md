# Privacy Policy — iSkitch

> How iSkitch handles your data: your captures stay on your Mac. The only thing that can ever leave is your email address, and only if you subscribe to product news.

**Effective Date:** 28 May 2026

This policy explains how the **iSkitch** macOS application handles your data. The app is built and distributed by **Color Vivo Internet, S.L.**, a Spanish company based in Madrid (Spain).

## Summary

- **We only get your email if you hand it over.** iSkitch collects and transmits nothing on its own. The one exception is the product-news subscription: if you type your address, accept this policy and press the button, that address reaches us. Nothing else does.
- **No analytics, no tracking.** The app contains no telemetry, no analytics SDKs and no crash-reporting services.
- **Captures stay on your Mac.** Screenshots, annotations and edits are processed locally and never leave your device unless you choose to share them.
- **Screen Recording is only used on demand.** macOS requests this permission only when you initiate a capture.

## What the app stores on your device

iSkitch saves a small amount of information on your Mac so it can remember your preferences between sessions:

- **App preferences** in `UserDefaults`: default export format, default save folder, default color and arrow style, appearance (Light/Dark/System), language, and similar UI choices.
- **Window state**: editor window size and position, so the next launch opens where you left off.
- **Captures and saved files**: only when you explicitly save or export them, and only to the location you choose.

None of this is transmitted to us.

## What the app sends over the network

iSkitch **sends nothing on its own**: no telemetry, no update checks, no remote content loading. The whole app works offline.

The **only** outbound connection is the product-news subscription, and it happens only if you ask for it. When you type your email in the *iSkitch news* window, tick the acceptance box and press *Subscribe*, the app sends your address, the language you are using the app in, and the record that you accepted this policy to `iskitch.com/api/subscribe`. That — and only that — is why the app declares `com.apple.security.network.client` as of version 1.8.0.

**Your screenshots, annotations and edits are never sent anywhere.**

Whatever you share through the macOS share sheet is handled by the extension you pick (Mail, Messages, AirDrop), each with its own permissions.

## Permissions iSkitch may request

- **Screen Recording** (required): granted via *System Settings ▸ Privacy & Security ▸ Screen Recording*. macOS uses this permission so iSkitch can read pixels of the area you select with ⌥⌘4, a window or full screen. The captured image stays on your Mac.
- **File access** via the standard Open and Save panels: limited to the file or folder you pick at that moment.
- **Pasteboard / drag & drop**: when you press "Copy" or drag an image out, iSkitch writes the flattened image to the macOS clipboard or to the destination you choose.

## About this website (iskitch.com)

The marketing website at **iskitch.com** (where you are reading this) uses **Google Analytics 4** to understand aggregated traffic — visited pages, country, browser. Google may set cookies and process data outside the EU. We do **not** use this information to identify individuals, build profiles or run advertising.

If you subscribe to product news — from the form on this site or from the app itself — we keep your **email address**, the **language** you signed up in, whether it came from the web or the app, and the **date you accepted this policy** in Cloudflare KV. Once a day we copy new sign-ups to **Acumbamail**, our email provider. The legal basis is your **consent**, and we use it only to tell you about iSkitch: no advertising, no sharing with third parties. You can unsubscribe from the footer of any email we send, or write to hello@iskitch.com.

This data collection on the website is **independent from the app**: iSkitch on your Mac does not contain Google Analytics or any other tracking SDK.

## Apple as a third party

iSkitch is distributed through the **Mac App Store**. Apple acts as an independent data controller for downloads, ratings, payments and any diagnostics you opt in to share with developers via the App Store. Please refer to [Apple's Privacy Policy](https://www.apple.com/legal/privacy/) to understand how they handle that information.

## Children

iSkitch is rated **4+** in the App Store and is suitable for all audiences. We do not knowingly collect any data from anyone, including children under 13.

## Your rights under GDPR

If you have not subscribed to product news, we hold no data about you at all: everything iSkitch stores lives on your Mac, you control it, and you can delete the app and its preferences whenever you like.

If you did subscribe, we process your email address on the legal basis of your **consent**, and you have the right to access it, rectify it, port it, object to the processing, withdraw your consent and request its erasure. Write to hello@iskitch.com and we will sort it out; you can also unsubscribe yourself from the footer of any email. We keep the address until you unsubscribe or ask us to delete it. If you think we have got it wrong, you can complain to the Spanish Data Protection Agency (aepd.es).

## Changes to this policy

If we ever change how iSkitch handles data, this page will be updated with a new effective date before the change reaches users.

## Contact

**Color Vivo Internet, S.L.**
Madrid, Spain
Email: hello@iskitch.com
Website: https://iskitch.com
