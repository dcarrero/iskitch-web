---
title: "iSkitch 1.9.0 und 1.8.1: WebP, ein ehrliches JPEG und Aufnahmen ohne Berechtigung"
description: "Zwei Versionen in einem Monat, beide aus Support-Mails entstanden: einen Screenshot ohne die Berechtigung für Bildschirmaufnahme einsetzen, scharfe Aufnahmen auf skalierten Displays, WebP-Export, Qualität im Sichern-Dialog und der JPEG-Regler, der 80 % anzeigte und 94 schrieb."
lang: "de"
pubDate: 2026-09-22
order: 7
heroAlt: "Der Sichern-Dialog von iSkitch mit dem Einblendmenü „Format“ auf WebP und dem Regler „Qualität“."
tags: ["iSkitch", "Version", "macOS"]
related: ["iskitch-1-8-0", "how-to-take-screenshots-on-mac"]
---

Seit [1.8.0](/de/blog/iskitch-1-8-0/) sind zwei Updates im Mac App Store erschienen: 1.8.1 am 17. September und 1.9.0 am 22. Beide begannen als Support-Mail. Die eine kam von jemandem mit einem Firmen-Mac, der iSkitch die Berechtigung für Bildschirmaufnahme nicht erteilen konnte. Die andere kam aus Österreich, mit vier Vorschlägen und ein paar Tage später mit einer Messung, wegen der wir einen Build aus der Prüfung bei Apple zurückgezogen haben.

## 1.8.1: Keine Berechtigung für Bildschirmaufnahme? Geht trotzdem

Auf einem von der Firma verwalteten Mac ohne Administratorrechte lässt sich die Berechtigung für Bildschirmaufnahme nicht erteilen. Und ohne sie bringt „Aufnehmen“ nichts. Skitch hat das vor Jahren über die Zwischenablage gelöst: Screenshot mit macOS machen, in Skitch einsetzen. iSkitch konnte das nicht.

Jetzt schon. **Ablage ▸ Neu aus der Zwischenablage (⇧⌘N**, das Kürzel von Skitch) öffnet das Bild aus der Zwischenablage als neues Dokument. Und **⌘V tut dasselbe**, solange kein Textfeld auf das Einsetzen wartet, die alte Gewohnheit funktioniert also wieder: ⌃⇧⌘4 in macOS, dann einsetzen. Nichts davon läuft über die Bildschirmaufnahme, es braucht also keine Berechtigung, und ein Retina-Screenshot behält seine 2×-Pixel.

Schlägt eine Aufnahme mangels Berechtigung fehl, erklärt der Hinweis jetzt beide Auswege (weiter ⇧⌘4 von macOS verwenden und iSkitch jeden Screenshot öffnen lassen, oder mit ⇧⌘N einsetzen) und hat eine Taste, die den ersten direkt dort einschaltet.

### Die unscharfe Aufnahme, die drei Leute gemeldet hatten

Dieselbe Person schickte uns ein Video von einem Mac mini mit einem 4K-Monitor auf 2560×1440, und endlich war zu sehen, woher die Klagen über „niedrige Auflösung“ kamen. Nicht vom Export, wie wir angenommen hatten. Von der Aufnahme selbst.

Wir baten ScreenCaptureKit um eine Bitmap in der Größe von `CGDisplayPixelsWide`, das trotz seines Namens in jedem Retina-Modus **Punkte** liefert. Auf einem skalierten Display kam die Bereichsaufnahme in 1× heraus; auf jenem Mac mini erreichte sie 2×, aber interpoliert, weich. Bereichs- und Vollbildaufnahmen laufen jetzt über denselben Mechanismus wie ⇧⌘4 von macOS. Gemessen gegen `screencapture` auf demselben Rechteck: **null Pixel Unterschied**.

## 1.9.0: WebP, und Qualität dort, wo gesichert wird

macOS liest WebP seit Jahren und kann es immer noch nicht schreiben. iSkitch bringt jetzt seinen eigenen Encoder mit (libwebp, den offiziellen von Google; der Hinweis steht unter „Über“), und **WebP gesellt sich zu PNG, JPG, TIFF, PDF, GIF und BMP** in den Einstellungen, in der Sichern-Taste des Editors und im Sichern-Dialog, mit einstellbarer Qualität und erhaltener Transparenz. **100 % sichert verlustfrei**, wie es WebP-Werkzeuge tun. Und weil das Format kein Feld für die Auflösung hat, schreiben wir sie in einen EXIF-Block, den Vorschau und ImageIO lesen: Eine Retina-Aufnahme öffnet sich mit 144 dpi und in ihrer echten Größe, nicht doppelt so groß.

Der Sichern-Dialog selbst hat ein Einblendmenü **Format** bekommen und, für JPEG und WebP, einen Regler **Qualität**, wie der Exportieren-Dialog der Vorschau. Was Sie dort wählen, wird zum Standard.

Und **Bildgröße ändern** ist aus seinem Versteck gekommen. Es stand seit 1.8.0 im Menü „Bild“, und niemand fand es, auch nicht die Person aus Österreich, die es sich als neue Funktion wünschte. Jetzt hat es ein Kürzel (**⇧⌘R**), eine Taste in der Zuschneideleiste und eine weitere neben den Pixelmaßen unten im Editor; ein Klick auf die Zahlen „B × H px“ öffnet es ebenfalls.

## Die 80 %, die eine 94 waren

Unter den vier Vorschlägen war eine Beschwerde, die wir für beantwortet hielten: Die JPEGs von iSkitch seien zu groß. Unsere erste Antwort lautete, die Datei sei in Ordnung und das Messwerkzeug liege daneben. Dann maß diese Person denselben Screenshot in fünf Apps bei denselben „80 %“. iSkitch: 131 KB. Die anderen: 31 bis 46 KB.

Sie hatte recht. Der eingebaute JPEG-Encoder von macOS hat eine eigene Qualitätsskala, und seine 80 schreibt die Quantisierungstabellen, die Affinity, XnConvert, Squoosh, ImageMagick und libjpeg allesamt **94** nennen. Wir haben die Tabellen selbst gelesen, um es zu bestätigen: Apples 0,5 ist die Standard-80, und seine 0,85 und 0,9 schreiben exakt dieselbe Datei.

Build 25 war schon in der Prüfung bei Apple. Wir haben ihn zurückgezogen. Build 26 übersetzt den Reglerwert mit einer Punkt für Punkt gemessenen Tabelle in die Skala des Encoders, sodass die gewählte Zahl die ist, die jedes Werkzeug aus der Datei liest, und die Größe mit allen anderen gleichauf liegt. Wer eine Qualität eingestellt hatte, sieht bei derselben Zahl kleinere Dateien; die Vorgabe 90 % ist jetzt eine echte 90.

## Der Rest

- **Die Zuschneideleiste sprach in Punkten.** Bei einer Retina-Aufnahme stand dort 1280 × 800, während die untere Leiste 2560 × 1600 anzeigte. Sie arbeitet jetzt in Pixeln, sagt es auch, und 1281 einzugeben schneidet exakt auf 1281 zu (vorher wurden 1282 daraus).
- **Kleine Bilder öffnen sich zentriert**, statt in der linken oberen Ecke des mindestens 800 × 600 großen Editorfensters zu kleben.
- **Eine Bitte um Bewertung.** Nach fünf Exporten und mindestens drei Tagen Nutzung bittet iSkitch mit dem systemeigenen Dialog um eine Bewertung: einmal pro Version, nie öfter als alle vier Monate, nie als Reaktion auf einen Klick. Nichts im Gegenzug. Wir erwähnen es hier, weil es nach dem Newsletter-Fenster das Zweite ist, das die App Ihnen ungefragt zeigen kann.

## Ab sofort verfügbar

1.9.0 ist seit dem 22. September 2026 im Mac App Store. Kostenloses Update für alle, die iSkitch schon haben, ohne Abo und ohne Konto.
