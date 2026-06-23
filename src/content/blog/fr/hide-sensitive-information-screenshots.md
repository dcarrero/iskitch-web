---
title: "Comment masquer des informations sensibles dans une capture d'écran (en toute sécurité)"
description: "Le flou n'est pas toujours sûr — certaines méthodes peuvent être inversées. Apprenez à masquer de façon fiable mots de passe, e-mails et données personnelles dans une capture sur macOS avant de la partager."
lang: "fr"
pubDate: 2026-06-23
order: 4
heroAlt: "Une capture d'écran avec un champ de mot de passe masqué derrière un bloc plein et des zones pixelisées."
tags: ["confidentialité", "captures d'écran", "sécurité"]
related: ["how-to-take-screenshots-on-mac", "how-to-annotate-screenshots-on-mac"]
---

Vous êtes sur le point de partager la capture d'un bug, d'une facture ou d'une page de réglages — et il y a une adresse e-mail, une clé d'API ou un numéro de compte juste dans le cadre. Avant d'appuyer sur Envoyer, voici comment le masquer pour que cela reste vraiment masqué.

## Toutes les méthodes de masquage ne sont pas sûres

Le réflexe est de flouter la partie sensible. Mais le flou est un **filtre réversible** : il diffuse chaque pixel dans ses voisins selon une opération mathématique connue. Avec assez d'efforts — et parfois très peu — cette opération peut être partiellement annulée, surtout pour un texte court et prévisible comme un code à 6 chiffres ou un format d'e-mail connu. Il existe de vrais cas de texte « flouté » ou pixelisé qui a été récupéré.

La leçon n'est pas « ne floutez jamais ». C'est **d'adapter la méthode au risque** :

- **Faible enjeu, simple mise au propre** — un léger flou ou une pixelisation convient pour masquer un visage en arrière-plan ou un logo que vous ne voulez pas dans l'image.
- **Réellement secret** — mots de passe, jetons, numéros de carte, noms complets, adresses : ne les filtrez pas, **couvrez-les**.

## La méthode fiable : couvrir, pas filtrer

Le seul masquage qui ne peut pas être inversé est celui où les pixels d'origine ont **disparu**, remplacés par quelque chose qui ne porte aucune information à leur sujet :

- **Bloc plein** — un rectangle opaque uni par-dessus le secret. Il n'y a rien dessous à récupérer. C'est l'option la plus sûre pour tout ce qui est vraiment sensible.
- **Rayures / barres pleines** — la même idée, visuellement distincte pour que les lecteurs comprennent que c'est intentionnel.
- **Le recadrer** — si le secret est sur le bord, la solution la plus propre est de le retirer entièrement de l'image.

Un point subtil mais important : si vous « masquez » en dessinant un cadre dans un outil qui conserve les calques, assurez-vous d'**aplatir et d'exporter** vers une image standard (PNG/JPG). Un fichier en calques ou vectoriel peut permettre à quelqu'un de déplacer votre cadre et de révéler ce qui se trouve dessous. Exporter vers un PNG aplati grave le masquage dans les pixels.

## Comment le faire sur macOS

Le Markup intégré de macOS peut dessiner une forme par-dessus le contenu, mais il n'est pas conçu pour un masquage fiable et n'a pas d'outil de pixelisation dédié. Pour les captures que vous allez partager, un outil dédié est plus rapide et plus sûr.

[iSkitch](/fr/) vous offre quatre façons de masquer une information, chacune à un clic dans l'éditeur :

- **Bloc plein** — faites glisser un rectangle opaque uni par-dessus tout ce qui est secret. À utiliser pour les mots de passe, les clés et les numéros de compte.
- **Rayures** — une barre rayée qui se lit clairement comme « masqué ».
- **Pixeliser** — une mosaïque grossière pour un flou à faible enjeu (visages, fouillis d'arrière-plan).
- **Flouter** — un flou léger pour les mêmes usages plus anodins.

Quand vous exportez en **PNG, JPG ou PDF**, le masquage est **aplati dans l'image** — ce que vous couvrez reste couvert. Et comme iSkitch est **privé par conception — pas de comptes, pas de pistage, rien ne quitte votre Mac** — la capture originale, non masquée, n'a de toute façon jamais été envoyée nulle part.

## Une petite checklist avant de partager

1. Y a-t-il quelque chose de secret dans le cadre ? Inspectez les coins, les onglets du navigateur, les notifications et les reflets.
2. Pour les vrais secrets, utilisez un **bloc plein**, pas le flou.
3. Recadrez pour retirer tout ce dont vous n'avez pas besoin.
4. **Exportez vers une image aplatie** (PNG/JPG) pour que la couverture ne puisse pas être retirée.
5. Vérifiez deux fois le fichier exporté, pas l'aperçu de l'éditeur.

Bien masquer des données sensibles prend dix secondes et vous évite une fuite que vous ne pourrez pas annuler. Couvrez, aplatissez, puis partagez.

[Obtenez iSkitch sur le Mac App Store →](/fr/)
