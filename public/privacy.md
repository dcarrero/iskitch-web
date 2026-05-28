# Privacy Policy — iSkitch

> How iSkitch handles your data: it doesn't collect any. Captures stay on your Mac and the app never connects to our servers.

**Effective Date:** 28 May 2026

This policy explains how the **iSkitch** macOS application handles your data. The app is built and distributed by **Color Vivo Internet, S.L.**, a Spanish company based in Madrid (Spain).

## Summary

- **No personal data collection.** iSkitch does not collect, store or transmit personal data to us or to any third party.
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

iSkitch **does not make any outbound network connections on its own**. We do not operate any servers that receive your data.

The optional `com.apple.security.network.client` entitlement is declared only so that user-initiated sharing through the macOS share sheet can work as expected (for example, sending a screenshot via Mail or Messages). Anything that happens after you pick a share extension is handled by that extension, not by iSkitch.

## Permissions iSkitch may request

- **Screen Recording** (required): granted via *System Settings ▸ Privacy & Security ▸ Screen Recording*. macOS uses this permission so iSkitch can read pixels of the area you select with ⌥⌘4, a window or full screen. The captured image stays on your Mac.
- **File access** via the standard Open and Save panels: limited to the file or folder you pick at that moment.
- **Pasteboard / drag & drop**: when you press "Copy" or drag an image out, iSkitch writes the flattened image to the macOS clipboard or to the destination you choose.

## Apple as a third party

iSkitch is distributed through the **Mac App Store**. Apple acts as an independent data controller for downloads, ratings, payments and any diagnostics you opt in to share with developers via the App Store. Please refer to [Apple's Privacy Policy](https://www.apple.com/legal/privacy/) to understand how they handle that information.

## Children

iSkitch is rated **4+** in the App Store and is suitable for all audiences. We do not knowingly collect any data from anyone, including children under 13.

## Your rights under GDPR

Because iSkitch performs no server-side processing and we receive none of your data, there is no personal data on our side to access, rectify, port or erase. You remain in full control of everything stored on your Mac and can delete the app and its preferences at any time.

## Changes to this policy

If we ever change how iSkitch handles data, this page will be updated with a new effective date before the change reaches users.

## Contact

**Color Vivo Internet, S.L.**
Madrid, Spain
Email: hello@iskitch.com
Website: https://iskitch.com
