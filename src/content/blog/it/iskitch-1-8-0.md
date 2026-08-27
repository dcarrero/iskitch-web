---
title: "iSkitch 1.8.0 è disponibile, e il bug che c'era dal primo giorno"
description: "Catturare una finestra non ha mai catturato una finestra. Sistemarlo ha aperto la strada all'ombra, allo sfondo trasparente, alle vere scorciatoie globali, al ridimensionamento e all'esportazione in GIF e BMP."
lang: "it"
pubDate: 2026-08-26
updatedDate: 2026-08-27
order: 6
heroAlt: "Una finestra catturata con la sua ombra e gli angoli arrotondati su sfondo trasparente."
tags: ["iSkitch", "versione", "macOS"]
related: ["skitch-features-compared", "how-to-take-screenshots-on-mac"]
---

Un paio di giorni fa abbiamo pubblicato un confronto funzione per funzione con lo Skitch originale, con l'elenco di quello che iSkitch ancora non sapeva fare. Ripassando quell'elenco è saltato fuori qualcosa di inatteso: **catturare una finestra non ha mai catturato una finestra.**

## Il bug che c'era dall'inizio

Scegli «Cattura finestra», fai clic su Safari e ottieni un'immagine di Safari. Quasi sempre. Ma se c'era qualcosa sopra — un pannello fluttuante, un'altra finestra, una notifica — se ne veniva dentro.

Perché l'app non stava catturando la finestra. Scattava un'immagine dell'**intero schermo** e ritagliava il rettangolo della finestra. Tutto ciò che stava dentro quel rettangolo finiva nella cattura, che appartenesse alla finestra o no.

La funzione che chiede a macOS una finestra isolata esisteva dalla prima versione. Non la chiamava nessuno. Codice morto, mentre ogni cattura di finestra passava dal ritaglio.

Questo spiega anche una cosa che ci sfuggiva: l'ombra e gli angoli trasparenti che avevamo appena implementato non comparivano da nessuna parte. Ovvio: il codice che li produceva non veniva mai eseguito.

## Cosa rende possibile questa correzione

Ora che le finestre vengono catturate davvero come finestre, arrivano **con la loro ombra e gli angoli arrotondati, su sfondo trasparente** invece che con quello che c'era dietro sulla scrivania. Incollata in un documento o in una chat, è la differenza tra una cattura e un ritaglio.

Un dettaglio di cui andiamo un po' fieri: l'ombra la disegna iSkitch, non macOS. ScreenCaptureKit sa farlo, ma la mette **dentro** il buffer richiesto: misurato su una finestra da 2168 px, il contenuto si rimpiccioliva a 2038 px per farle spazio. Un'app di catture non può ricampionare la tua finestra a 0,94×. Quindi la chiediamo senza ombra, a risoluzione nativa, e l'ombra la componiamo noi.

## Le scorciatoie che non erano scorciatoie

⌥⌘5 per una finestra, ⌥⌘3 per lo schermo intero, ⌥⇧⌘4 per ripetere l'ultima area. Erano documentate, erano nel menu e, fuori dall'app, **non facevano nulla**. Solo ⌥⌘4 era registrata come scorciatoia globale; le altre erano normali voci di menu, che richiedono iSkitch in primo piano. Cioè proprio quando non lo è.

Tutte e quattro sono ora vere scorciatoie globali, se n'è aggiunta una quinta (**⌥⇧⌘5** prende la finestra che hai davanti, senza puntare) e **tutte e cinque si cambiano una per una** in Impostazioni ▸ Cattura ▸ Scorciatoia.

## Il resto

- **Ridimensionare l'immagine** — Immagine ▸ Ridimensiona immagine…, in pixel, con proporzioni bloccate e scorciatoie al 25, 50, 75 e 100 %. Le annotazioni si ridimensionano con lei e ⌘Z annulla tutto in un colpo solo.
- **Esportazione in GIF e BMP**, che si aggiungono a PNG, JPG, TIFF e PDF.
- **Intensità regolabile** di pixel e sfocatura, memorizzata per ogni annotazione: nella stessa schermata puoi accennare un indirizzo IP e rendere una password del tutto illeggibile.

## Una nota onesta sulla privacy

La 1.8.0 aggiunge una finestra che ti invita a iscriverti alle novità. È la prima volta che iSkitch può inviare qualcosa, quindi siamo precisi: l'app continua a funzionare interamente offline, le tue catture continuano a non uscire dal Mac, e l'unica cosa che può uscire è il tuo indirizzo email — e solo se lo scrivi, spunti la casella e premi il pulsante.

Abbiamo riscritto di conseguenza l'[informativa sulla privacy](/it/privacy/), in tutte e otto le lingue. Prima diceva che l'app «non si connette mai ai nostri server», e da questa versione non sarebbe più vero.

## Già disponibile

La 1.8.0 è sul Mac App Store dal 27 agosto 2026. È un aggiornamento gratuito per chi ha già iSkitch. Come sempre: senza abbonamento e senza account.
