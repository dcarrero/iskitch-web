---
title: "Come nascondere informazioni sensibili negli screenshot (in sicurezza)"
description: "Sfocare non è sempre sicuro: alcuni metodi sono reversibili. Scopri come nascondere in modo affidabile password, email e dati personali in uno screenshot su macOS prima di condividerlo."
lang: "it"
pubDate: 2026-06-23
order: 4
heroAlt: "Uno screenshot con un campo password nascosto dietro un blocco pieno e aree pixelate."
tags: ["privacy", "screenshot", "sicurezza"]
related: ["how-to-take-screenshots-on-mac", "how-to-annotate-screenshots-on-mac"]
---

Stai per condividere uno screenshot di un bug, di una fattura o di una pagina delle impostazioni — e c'è un indirizzo email, una chiave API o un numero di conto proprio nell'inquadratura. Prima di premere invio, ecco come nasconderlo in modo che resti davvero nascosto.

## Non tutte le censure sono sicure

L'istinto è sfocare la parte sensibile. Ma la sfocatura è un **filtro reversibile**: distribuisce ogni pixel tra i suoi vicini secondo un'operazione matematica nota. Con abbastanza impegno — e a volte ben poco — quell'operazione può essere parzialmente annullata, soprattutto per testi brevi e prevedibili come un codice di 6 cifre o un formato email noto. Ci sono stati casi reali di testo «sfocato» o pixelato recuperato.

La lezione non è «non sfocare mai». È **adattare il metodo al rischio**:

- **Poco importante, solo per fare ordine** — una leggera sfocatura o pixelatura va bene per nascondere un volto sullo sfondo o un logo che non vuoi nell'inquadratura.
- **Davvero segreto** — password, token, numeri di carta, nomi completi, indirizzi: non filtrarli, **coprili**.

## Il metodo affidabile: coprire, non filtrare

L'unica censura che non può essere annullata è quella in cui i pixel originali **non ci sono più**, sostituiti da qualcosa che non porta alcuna informazione su di essi:

- **Blocco pieno** — un rettangolo opaco e uniforme sopra il segreto. Non c'è nulla sotto da recuperare. È l'opzione più sicura per qualsiasi cosa davvero sensibile.
- **Righe / barre piene** — stessa idea, visivamente distinta così i lettori capiscono che è intenzionale.
- **Ritaglialo via** — se il segreto è al bordo, la soluzione più pulita è rimuoverlo del tutto dall'immagine.

Un punto sottile ma importante: se «censuri» disegnando un riquadro in uno strumento che mantiene i livelli, assicurati di **appiattire ed esportare** in un'immagine standard (PNG/JPG). Un file con livelli o vettoriale può permettere a qualcuno di spostare il tuo riquadro e rivelare ciò che c'è sotto. Esportare in un PNG appiattito fissa la copertura nei pixel.

## Come farlo su macOS

Il Markup integrato di macOS può disegnare una forma sopra il contenuto, ma non è progettato per una censura affidabile e non ha uno strumento di pixelatura dedicato. Per gli screenshot che intendi condividere, uno strumento dedicato è più rapido e più sicuro.

[iSkitch](/it/) ti offre quattro modi per nascondere informazioni, ciascuno a un clic di distanza nell'editor:

- **Blocco pieno** — trascina un rettangolo opaco e uniforme su qualsiasi cosa segreta. Usalo per password, chiavi e numeri di conto.
- **Righe** — una barra a righe che si legge chiaramente come «censurato».
- **Pixelate** — un mosaico grossolano per sfocature meno critiche (volti, disordine sullo sfondo).
- **Sfocatura** — una sfocatura morbida per gli stessi usi più leggeri.

Quando esporti in **PNG, JPG o PDF**, la censura viene **appiattita nell'immagine** — ciò che copri resta coperto. E poiché iSkitch è **privato per progettazione — nessun account, nessun tracciamento, nulla lascia il tuo Mac** — lo screenshot originale, non censurato, non è mai stato caricato da nessuna parte fin dall'inizio.

## Una rapida checklist prima di condividere

1. C'è qualcosa di segreto nell'inquadratura? Controlla angoli, schede del browser, notifiche e riflessi.
2. Per i segreti veri, usa un **blocco pieno**, non la sfocatura.
3. Ritaglia via tutto ciò che non ti serve.
4. **Esporta in un'immagine appiattita** (PNG/JPG) così la copertura non possa essere rimossa.
5. Ricontrolla il file esportato, non l'anteprima nell'editor.

Nascondere bene i dati sensibili richiede dieci secondi e ti salva da una fuga che non puoi annullare. Coprilo, appiattiscilo, poi condividi.

[Scarica iSkitch sul Mac App Store →](/it/)
