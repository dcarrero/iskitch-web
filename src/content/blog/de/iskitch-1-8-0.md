---
title: "Was in iSkitch 1.8.0 kommt — und der Fehler, der von Anfang an da war"
description: "Ein Fenster aufnehmen hat nie ein Fenster aufgenommen. Das zu beheben machte den Weg frei für Schatten, transparenten Hintergrund, echte globale Kurzbefehle, Größenänderung und Export als GIF und BMP."
lang: "de"
pubDate: 2026-08-26
updatedDate: 2026-08-27
order: 6
heroAlt: "Ein Fenster, aufgenommen mit Schatten und abgerundeten Ecken auf transparentem Hintergrund."
tags: ["iSkitch", "Version", "macOS"]
related: ["skitch-features-compared", "how-to-take-screenshots-on-mac"]
---

Vor zwei Tagen haben wir einen Vergleich Funktion für Funktion mit dem originalen Skitch veröffentlicht, mit der Liste dessen, was iSkitch noch nicht konnte. Beim Abarbeiten dieser Liste kam etwas Unerwartetes heraus: **Ein Fenster aufnehmen hat nie ein Fenster aufgenommen.**

## Der Fehler, der seit dem ersten Tag da war

Du wählst „Fenster aufnehmen", klickst auf Safari und bekommst ein Bild von Safari. Meistens. Aber wenn etwas darüber lag — ein schwebendes Panel, ein anderes Fenster, eine Mitteilung — kam das mit.

Weil die App das Fenster gar nicht aufnahm. Sie machte ein Bild vom **ganzen Bildschirm** und schnitt das Rechteck des Fensters heraus. Alles, was in diesem Rechteck lag, war mit drauf, ob es zum Fenster gehörte oder nicht.

Die Funktion, die macOS um ein einzelnes, isoliertes Fenster bittet, gab es seit der ersten Version. Niemand rief sie auf. Toter Code, während jede Fensteraufnahme durch den Zuschnitt lief.

Das erklärt auch, was uns beschäftigt hatte: Der Schatten und die transparenten Ecken, die wir gerade eingebaut hatten, tauchten nirgends auf. Natürlich nicht — der Code, der sie erzeugt, lief nie.

## Was diese Korrektur ermöglicht

Jetzt, wo Fenster wirklich als Fenster aufgenommen werden, kommen sie **mit Schatten und abgerundeten Ecken auf transparentem Hintergrund** statt mit dem, was dahinter auf dem Schreibtisch lag. In ein Dokument oder einen Chat eingefügt, ist das der Unterschied zwischen einer Aufnahme und einem Ausschnitt.

Ein Detail, auf das wir ein bisschen stolz sind: Den Schatten zeichnet iSkitch, nicht macOS. ScreenCaptureKit kann das, aber es packt ihn **in** den angeforderten Puffer: gemessen an einem 2168 px breiten Fenster schrumpfte der Inhalt auf 2038 px, um Platz zu schaffen. Eine Screenshot-App darf dein Fenster nicht auf 0,94× herunterrechnen. Also holen wir es ohne Schatten in nativer Auflösung und setzen den Schatten selbst.

## Die Kurzbefehle, die keine waren

⌥⌘5 für ein Fenster, ⌥⌘3 für den ganzen Bildschirm, ⌥⇧⌘4 zum Wiederholen des letzten Bereichs. Dokumentiert, im Menü vorhanden — und außerhalb der App **taten sie nichts**. Nur ⌥⌘4 war als globaler Kurzbefehl registriert; der Rest waren normale Menüeinträge, die iSkitch im Vordergrund brauchen. Also genau dann nicht, wenn man sie braucht.

Alle vier sind jetzt echte globale Kurzbefehle, ein fünfter ist dazugekommen (**⌥⇧⌘5** nimmt das Fenster, das du gerade vor dir hast, ohne Zielen) und **alle fünf lassen sich einzeln ändern** unter Einstellungen ▸ Aufnahme ▸ Kurzbefehl.

## Der Rest

- **Bildgröße ändern** — Bild ▸ Bildgröße ändern…, in Pixeln, mit gesperrten Proportionen und 25/50/75/100 %. Anmerkungen skalieren mit, und ⌘Z macht alles in einem Schritt rückgängig.
- **Export als GIF und BMP**, zusätzlich zu PNG, JPG, TIFF und PDF.
- **Regelbare Stärke** von Verpixeln und Weichzeichnen, pro Anmerkung gespeichert: eine IP nur andeuten und ein Passwort im selben Bild völlig unlesbar machen.

## Eine ehrliche Anmerkung zum Datenschutz

1.8.0 bringt ein Fenster, das dich einlädt, die Neuigkeiten zu abonnieren. Zum ersten Mal kann iSkitch überhaupt etwas senden, deshalb sagen wir es genau: Die App funktioniert weiterhin vollständig offline, deine Aufnahmen verlassen deinen Mac weiterhin nicht, und das Einzige, was hinausgehen kann, ist deine E-Mail-Adresse — und nur, wenn du sie einträgst, das Häkchen setzt und die Taste drückst.

Wir haben die [Datenschutzerklärung](/de/privacy/) entsprechend neu geschrieben, in allen acht Sprachen. Dort stand, die App „verbinde sich nie mit unseren Servern", und ab dieser Version wäre das nicht mehr wahr.

## Ab sofort verfügbar

1.8.0 ist seit dem 27. August 2026 im Mac App Store. Ein kostenloses Update für alle, die iSkitch bereits haben. Wie immer: ohne Abo und ohne Konto.
