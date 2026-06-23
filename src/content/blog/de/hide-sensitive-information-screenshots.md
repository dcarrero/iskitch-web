---
title: "Sensible Informationen in Screenshots verbergen (sicher)"
description: "Weichzeichnen ist nicht immer sicher — manche Methoden lassen sich rückgängig machen. So verbirgst du Passwörter, E-Mails und persönliche Daten in einem Screenshot unter macOS zuverlässig, bevor du ihn teilst."
lang: "de"
pubDate: 2026-06-23
order: 4
heroAlt: "Ein Screenshot mit einem Passwortfeld, das hinter einer Vollfläche und pixelisierten Bereichen verborgen ist."
tags: ["Datenschutz", "Screenshots", "Sicherheit"]
related: ["how-to-take-screenshots-on-mac", "how-to-annotate-screenshots-on-mac"]
---

Du willst gerade einen Screenshot von einem Bug, einer Rechnung oder einer Einstellungsseite teilen — und mitten im Bild sitzt eine E-Mail-Adresse, ein API-Schlüssel oder eine Kontonummer. Bevor du auf Senden drückst, hier, wie du sie so verbirgst, dass sie wirklich verborgen bleibt.

## Nicht jede Schwärzung ist sicher

Der Instinkt ist, den sensiblen Teil weichzuzeichnen. Aber Weichzeichnen ist ein **umkehrbarer Filter**: Es verteilt jedes Pixel nach einer bekannten mathematischen Operation auf seine Nachbarn. Mit genug Aufwand — und manchmal sehr wenig — lässt sich diese Operation teilweise rückgängig machen, besonders bei kurzem, vorhersagbarem Text wie einem 6-stelligen Code oder einem bekannten E-Mail-Format. Es gab reale Fälle, in denen „weichgezeichneter" oder pixelisierter Text wiederhergestellt wurde.

Die Lehre ist nicht „nie weichzeichnen". Sie lautet: **Passe die Methode an das Risiko an**:

- **Geringes Risiko, nur Aufräumen** — ein leichtes Weichzeichnen oder Pixeln ist in Ordnung, um ein Gesicht im Hintergrund oder ein Logo zu verbergen, das du nicht im Bild haben willst.
- **Wirklich geheim** — Passwörter, Tokens, Kartennummern, vollständige Namen, Adressen: filtere sie nicht, **decke sie ab**.

## Der zuverlässige Weg: abdecken, nicht filtern

Die einzige Schwärzung, die sich nicht umkehren lässt, ist eine, bei der die ursprünglichen Pixel **weg** sind, ersetzt durch etwas, das keinerlei Information über sie trägt:

- **Vollfläche** — ein flaches, deckendes Rechteck über dem Geheimnis. Es gibt nichts darunter zum Wiederherstellen. Das ist die sicherste Option für alles wirklich Sensible.
- **Streifen / Balken** — dieselbe Idee, optisch deutlich, sodass Leser erkennen, dass es Absicht ist.
- **Wegschneiden** — wenn das Geheimnis am Rand sitzt, ist die sauberste Lösung, es ganz aus dem Bild zu entfernen.

Ein subtiler, aber wichtiger Punkt: Wenn du „schwärzt", indem du in einem Werkzeug, das Ebenen behält, ein Kästchen zeichnest, stelle sicher, dass du **reduzierst und exportierst** in ein Standardbild (PNG/JPG). Eine Datei mit Ebenen oder Vektoren kann jemanden dein Kästchen verschieben und enthüllen lassen, was darunter liegt. Ein Export in ein flaches PNG brennt die Abdeckung in die Pixel ein.

## So geht es unter macOS

Das integrierte Markup von macOS kann eine Form über Inhalt zeichnen, aber es ist nicht für zuverlässige Schwärzung gemacht und hat kein dediziertes Pixel-Werkzeug. Für Screenshots, die du teilen wirst, ist ein dediziertes Werkzeug schneller und sicherer.

[iSkitch](/de/) gibt dir vier Wege, Informationen zu verbergen, jeder einen Klick entfernt im Editor:

- **Vollfläche** — ziehe ein flaches, deckendes Rechteck über alles Geheime. Nutze dies für Passwörter, Schlüssel und Kontonummern.
- **Streifen** — ein gestreifter Balken, der klar als „geschwärzt" zu lesen ist.
- **Pixeln** — grobes Mosaik für weniger Heikles (Gesichter, Hintergrund-Unordnung).
- **Weichzeichnen** — ein weiches Weichzeichnen für dieselben leichteren Anwendungsfälle.

Wenn du als **PNG, JPG oder PDF** exportierst, wird die Schwärzung **ins Bild reduziert** — was du abdeckst, bleibt abgedeckt. Und weil iSkitch **von Grund auf privat ist — keine Konten, kein Tracking, nichts verlässt deinen Mac** — wurde der ursprüngliche, ungeschwärzte Screenshot überhaupt nie irgendwohin hochgeladen.

## Eine kurze Checkliste vor dem Teilen

1. Ist etwas im Bild geheim? Scanne Ecken, Browser-Tabs, Mitteilungen und Spiegelungen.
2. Für echte Geheimnisse nutze eine **Vollfläche**, kein Weichzeichnen.
3. Schneide weg, was du nicht brauchst.
4. **Exportiere in ein flaches Bild** (PNG/JPG), damit sich die Abdeckung nicht abziehen lässt.
5. Prüfe die exportierte Datei doppelt, nicht die Editor-Vorschau.

Sensible Daten gut zu verbergen dauert zehn Sekunden und bewahrt dich vor einem Leck, das du nicht rückgängig machen kannst. Abdecken, reduzieren, dann teilen.

[Hol dir iSkitch im Mac App Store →](/de/)
