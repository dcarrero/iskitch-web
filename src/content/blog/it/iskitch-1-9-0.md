---
title: "iSkitch 1.9.0 e 1.8.1: WebP, un JPEG che dice la verità e catture senza autorizzazione"
description: "Due versioni in un mese, entrambe nate da email di supporto: incollare una schermata senza l'autorizzazione Registrazione dello schermo, catture nitide sui display in scala, l'esportazione WebP, la qualità nella finestra di salvataggio e il cursore JPEG che diceva 80 % e scriveva 94."
lang: "it"
pubDate: 2026-09-22
order: 7
heroAlt: "La finestra di salvataggio di iSkitch con il menu Formato su WebP e il cursore Qualità."
tags: ["iSkitch", "versione", "macOS"]
related: ["iskitch-1-8-0", "how-to-take-screenshots-on-mac"]
---

Dalla [1.8.0](/it/blog/iskitch-1-8-0/) sono arrivati due aggiornamenti sul Mac App Store: la 1.8.1 il 17 settembre e la 1.9.0 il 22. Entrambi sono iniziati come email di supporto. Una veniva da una persona con un Mac aziendale che non poteva concedere a iSkitch l'autorizzazione Registrazione dello schermo. L'altra veniva dall'Austria, con quattro suggerimenti e, qualche giorno dopo, una misurazione che ci ha fatto ritirare una build dalla revisione di Apple.

## 1.8.1: senza l'autorizzazione Registrazione dello schermo? Si può lo stesso

Su un Mac gestito dall'azienda, senza diritti di amministratore, l'autorizzazione Registrazione dello schermo non si può concedere. E senza, «Cattura» non serve a niente. Skitch aveva risolto la cosa anni fa con gli appunti: fai la schermata con macOS e la incolli in Skitch. iSkitch non sapeva farlo.

Ora sì. **File ▸ Nuovo dagli appunti (⇧⌘N**, la scorciatoia di Skitch) apre come nuovo documento l'immagine che c'è negli appunti. E **⌘V fa lo stesso** ogni volta che nessun campo di testo sta aspettando l'incolla, così torna l'abitudine di sempre: ⌃⇧⌘4 di macOS e incolla. Niente di tutto questo passa dalla cattura dello schermo, quindi non serve alcuna autorizzazione, e una schermata Retina conserva i suoi pixel a 2×.

Quando una cattura fallisce per mancanza di autorizzazione, l'avviso ora spiega le due alternative (continuare con ⇧⌘4 di macOS e lasciare che iSkitch apra ogni schermata, o incollare con ⇧⌘N) e ha un pulsante che attiva la prima lì stesso.

### La cattura sfocata segnalata da tre persone

La stessa persona ci ha mandato un video da un Mac mini con un monitor 4K impostato a 2560×1440, e finalmente si è visto da dove venivano le lamentele sulla «bassa risoluzione». Non dall'esportazione, come pensavamo. Dalla cattura stessa.

Chiedevamo a ScreenCaptureKit una bitmap della dimensione di `CGDisplayPixelsWide`, che nonostante il nome restituisce **punti** in qualsiasi modalità Retina. Su un display in scala, la cattura di area usciva a 1×; su quel Mac mini arrivava a 2×, ma interpolata, morbida. Le catture di area e a schermo intero passano ora dallo stesso meccanismo di ⇧⌘4 di macOS. Misurato contro `screencapture` sullo stesso rettangolo: **zero pixel diversi**.

## 1.9.0: WebP, e la qualità dove si salva

macOS legge il WebP da anni e ancora non sa scriverlo. iSkitch porta ora con sé il proprio codificatore (libwebp, quello ufficiale di Google; l'avviso è in «Informazioni»), così **il WebP si aggiunge a PNG, JPG, TIFF, PDF, GIF e BMP** nelle Impostazioni, nel pulsante Salva dell'editor e nella finestra di salvataggio, con qualità regolabile e trasparenza conservata. **Il 100 % salva senza perdita**, come fanno gli strumenti WebP. E siccome il formato non ha un campo per la risoluzione, la scriviamo in un blocco EXIF che Anteprima e ImageIO leggono: una schermata Retina si apre a 144 dpi e alla sua dimensione reale, non al doppio.

Alla finestra di salvataggio stessa sono spuntati un menu **Formato** e, per JPEG e WebP, un cursore **Qualità**, come il foglio Esporta di Anteprima. Quello che scegli lì diventa il valore predefinito.

E **Ridimensiona immagine** è uscito dal nascondiglio. Era nel menu Immagine dalla 1.8.0 e non lo trovava nessuno, nemmeno chi ci ha scritto dall'Austria, che l'ha chiesto come funzione nuova. Ora ha una scorciatoia (**⇧⌘R**), un pulsante nella barra di ritaglio e un altro accanto alle dimensioni in pixel in fondo all'editor; anche un clic sulle cifre «L × A px» lo apre.

## L'80 % che era un 94

Tra i quattro suggerimenti c'era una lamentela che credevamo di aver chiuso: i JPEG di iSkitch pesavano troppo. La nostra prima risposta diceva che il file era a posto e che lo strumento di misura si sbagliava. Allora quella persona ha misurato la stessa schermata in cinque app allo stesso «80 %». iSkitch: 131 KB. Le altre: da 31 a 46 KB.

Aveva ragione. L'encoder JPEG integrato in macOS ha una scala di qualità tutta sua, e il suo 80 scrive le tabelle di quantizzazione che Affinity, XnConvert, Squoosh, ImageMagick e libjpeg chiamano tutti **94**. Abbiamo letto le tabelle noi stessi per confermarlo: lo 0,5 di Apple è l'80 standard, e i suoi 0,85 e 0,9 scrivono esattamente lo stesso file.

La build 25 era già in revisione da Apple. L'abbiamo ritirata. La build 26 traduce il valore del cursore nella scala dell'encoder con una tabella misurata punto per punto, così il numero che scegli è quello che qualsiasi strumento legge dal file, e la dimensione è alla pari con gli altri. Se avevi impostato una qualità, vedrai file più piccoli con lo stesso numero; il 90 % predefinito ora è un 90 vero.

## Il resto

- **La barra di ritaglio parlava in punti.** Su una cattura Retina diceva 1280 × 800 mentre la barra in basso diceva 2560 × 1600. Ora lavora in pixel, lo dice, e digitare 1281 ritaglia esattamente a 1281 (prima dava 1282).
- **Le immagini piccole si aprono centrate**, invece di restare incollate nell'angolo in alto a sinistra della finestra minima di 800 × 600 dell'editor.
- **Una richiesta di valutazione.** Dopo cinque esportazioni e almeno tre giorni di utilizzo, iSkitch chiede una valutazione con il foglio nativo del sistema: una volta per versione, mai più di una ogni quattro mesi, mai in risposta a un clic. Niente in cambio. Lo diciamo qui perché è la seconda cosa, dopo la finestra della newsletter, che l'app può mostrarti senza che tu lo chieda.

## Disponibile ora

La 1.9.0 è sul Mac App Store dal 22 settembre 2026. Aggiornamento gratuito per chi ha già iSkitch, senza abbonamento e senza account.
