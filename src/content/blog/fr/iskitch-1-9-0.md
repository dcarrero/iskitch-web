---
title: "iSkitch 1.9.0 et 1.8.1 : WebP, un JPEG qui dit la vérité et des captures sans autorisation"
description: "Deux versions en un mois, toutes deux nées de courriels de support : coller une capture sans l'autorisation Enregistrement de l'écran, des captures nettes sur écrans mis à l'échelle, l'export WebP, la qualité dans la fenêtre d'enregistrement et le curseur JPEG qui affichait 80 % et écrivait 94."
lang: "fr"
pubDate: 2026-09-22
order: 7
heroAlt: "La fenêtre d'enregistrement d'iSkitch avec le menu Format sur WebP et le curseur Qualité."
tags: ["iSkitch", "version", "macOS"]
related: ["iskitch-1-8-0", "how-to-take-screenshots-on-mac"]
---

Depuis la [1.8.0](/fr/blog/iskitch-1-8-0/), deux mises à jour sont arrivées sur le Mac App Store : la 1.8.1 le 17 septembre et la 1.9.0 le 22. Toutes deux ont commencé par un courriel de support. L'un venait d'une personne sur un Mac d'entreprise qui ne pouvait pas accorder à iSkitch l'autorisation Enregistrement de l'écran. L'autre venait d'Autriche, avec quatre suggestions et, quelques jours plus tard, une mesure qui nous a fait retirer un build de la validation d'Apple.

## 1.8.1 : pas d'autorisation Enregistrement de l'écran ? Ça marche quand même

Sur un Mac géré par l'entreprise, sans droits d'administrateur, impossible d'accorder l'autorisation Enregistrement de l'écran. Et sans elle, « Capturer » ne sert à rien. Skitch avait réglé ça il y a des années avec le presse-papiers : on fait la capture avec macOS et on la colle dans Skitch. iSkitch ne savait pas le faire.

Maintenant si. **Fichier ▸ Nouveau depuis le presse-papiers (⇧⌘N**, le raccourci de Skitch) ouvre comme nouveau document l'image qui se trouve dans le presse-papiers. Et **⌘V fait la même chose** dès qu'aucun champ de texte n'attend le collage, si bien que la vieille habitude revient : ⌃⇧⌘4 dans macOS, puis coller. Rien de tout cela ne passe par la capture d'écran, donc aucune autorisation n'est nécessaire, et une capture Retina garde ses pixels en 2×.

Quand une capture échoue faute d'autorisation, l'alerte explique désormais les deux solutions (continuer avec ⇧⌘4 de macOS et laisser iSkitch ouvrir chaque capture, ou coller avec ⇧⌘N) et propose un bouton qui active la première sur place.

### La capture floue signalée par trois personnes

La même personne nous a envoyé une vidéo depuis un Mac mini avec un moniteur 4K réglé sur 2560×1440, et on a enfin vu d'où venaient les plaintes de « basse résolution ». Pas de l'export, comme nous le pensions. De la capture elle-même.

Nous demandions à ScreenCaptureKit un bitmap de la taille de `CGDisplayPixelsWide`, qui malgré son nom renvoie des **points** dans tout mode Retina. Sur un écran mis à l'échelle, la capture de zone sortait en 1× ; sur ce Mac mini elle atteignait le 2×, mais interpolée, molle. Les captures de zone et de plein écran passent désormais par le même mécanisme que le ⇧⌘4 de macOS. Mesuré contre `screencapture` sur le même rectangle : **zéro pixel de différence**.

## 1.9.0 : WebP, et la qualité là où l'on enregistre

macOS lit le WebP depuis des années et ne sait toujours pas l'écrire. iSkitch apporte désormais son propre encodeur (libwebp, celui de Google ; la mention figure dans « À propos »), et **WebP rejoint PNG, JPG, TIFF, PDF, GIF et BMP** dans les Réglages, dans le bouton Enregistrer de l'éditeur et dans la fenêtre d'enregistrement, avec qualité réglable et transparence conservée. **100 % enregistre sans perte**, comme le font les outils WebP. Et comme le format n'a pas de champ pour la résolution, nous l'écrivons dans un bloc EXIF qu'Aperçu et ImageIO lisent : une capture Retina s'ouvre à 144 dpi et à sa taille réelle, pas au double.

La fenêtre d'enregistrement elle-même a gagné un menu **Format** et, pour JPEG et WebP, un curseur **Qualité**, comme la feuille Exporter d'Aperçu. Ce que vous y choisissez devient la valeur par défaut.

Et **Redimensionner l'image** est sorti de sa cachette. Il était dans le menu Image depuis la 1.8.0 et personne ne le trouvait, pas même la personne qui nous écrivait d'Autriche, qui l'a demandé comme nouvelle fonction. Il a maintenant un raccourci (**⇧⌘R**), un bouton dans la barre de recadrage et un autre à côté des dimensions en pixels en bas de l'éditeur ; un clic sur les chiffres « L × H px » l'ouvre aussi.

## Le 80 % qui était un 94

Parmi les quatre suggestions, une plainte que nous pensions avoir réglée : les JPEG d'iSkitch étaient trop lourds. Notre première réponse disait que le fichier était correct et que l'outil de mesure se trompait. Cette personne a alors mesuré la même capture dans cinq apps, au même « 80 % ». iSkitch : 131 Ko. Les autres : de 31 à 46 Ko.

Elle avait raison. L'encodeur JPEG intégré à macOS a sa propre échelle de qualité, et son 80 écrit les tables de quantification qu'Affinity, XnConvert, Squoosh, ImageMagick et libjpeg appellent toutes **94**. Nous avons lu les tables nous-mêmes pour le confirmer : le 0,5 d'Apple est le 80 standard, et ses 0,85 et 0,9 écrivent exactement le même fichier.

Le build 25 était déjà en validation chez Apple. Nous l'avons retiré. Le build 26 traduit la valeur du curseur vers l'échelle de l'encodeur à l'aide d'une table mesurée point par point : le nombre que vous choisissez est celui que n'importe quel outil lit dans le fichier, et la taille est au niveau des autres. Si vous aviez réglé une qualité, vous verrez des fichiers plus petits au même nombre ; le 90 % par défaut est désormais un vrai 90.

## Le reste

- **La barre de recadrage parlait en points.** Sur une capture Retina elle disait 1280 × 800 alors que la barre du bas disait 2560 × 1600. Elle travaille maintenant en pixels, le dit, et saisir 1281 recadre exactement à 1281 (avant, cela donnait 1282).
- **Les petites images s'ouvrent centrées**, au lieu de rester collées dans le coin supérieur gauche de la fenêtre minimale de 800 × 600 de l'éditeur.
- **Une demande d'évaluation.** Après cinq exports et au moins trois jours d'utilisation, iSkitch demande une note avec la feuille native du système : une fois par version, jamais plus d'une fois tous les quatre mois, jamais en réponse à un clic. Rien en échange. Nous le disons ici parce que c'est la deuxième chose, après la fenêtre de la newsletter, que l'app peut vous montrer sans qu'on le lui demande.

## Disponible dès maintenant

La 1.9.0 est sur le Mac App Store depuis le 22 septembre 2026. Mise à jour gratuite pour tous ceux qui ont déjà iSkitch, sans abonnement et sans compte.
