---
title: "Ce qui arrive dans iSkitch 1.8.0, et le bug qui était là depuis le début"
description: "Capturer une fenêtre ne capturait jamais une fenêtre. Le corriger a ouvert la voie à l'ombre, au fond transparent, aux vrais raccourcis globaux, au redimensionnement et à l'export GIF et BMP."
lang: "fr"
pubDate: 2026-08-26
order: 6
heroAlt: "Une fenêtre capturée avec son ombre et ses coins arrondis sur fond transparent."
tags: ["iSkitch", "version", "macOS"]
related: ["skitch-features-compared", "how-to-take-screenshots-on-mac"]
---

Il y a deux jours, nous avons publié une comparaison fonction par fonction avec le Skitch d'origine, avec la liste de ce qu'iSkitch ne savait toujours pas faire. En parcourant cette liste, une surprise : **capturer une fenêtre ne capturait jamais une fenêtre.**

## Le bug présent depuis le premier jour

Vous choisissez « Capturer une fenêtre », vous cliquez sur Safari, et vous obtenez une image de Safari. La plupart du temps. Mais si quelque chose la recouvrait — un panneau flottant, une autre fenêtre, une notification — cela partait avec.

Parce que l'app ne capturait pas la fenêtre. Elle prenait une image de **tout l'écran** et découpait le rectangle de la fenêtre. Tout ce qui se trouvait dans ce rectangle entrait dans la capture, que cela appartienne à la fenêtre ou non.

La fonction qui demande à macOS une fenêtre isolée existait depuis la première version. Personne ne l'appelait. Du code mort, pendant que toutes les captures passaient par le découpage.

Cela explique aussi ce qui nous échappait : l'ombre et les coins transparents que nous venions d'implémenter n'apparaissaient nulle part. Évidemment : le code qui les produisait ne s'exécutait jamais.

## Ce que ce correctif rend possible

Maintenant que les fenêtres sont réellement capturées comme des fenêtres, elles arrivent **avec leur ombre et leurs coins arrondis, sur fond transparent** au lieu de ce qui se trouvait derrière sur le bureau. Collée dans un document ou une conversation, c'est la différence entre une capture et un découpage.

Un détail dont nous sommes assez fiers : l'ombre est dessinée par iSkitch, pas par macOS. ScreenCaptureKit sait le faire, mais il la place **à l'intérieur** du tampon demandé : mesuré sur une fenêtre de 2168 px, le contenu se réduisait à 2038 px pour lui faire de la place. Une app de captures ne peut pas rééchantillonner votre fenêtre à 0,94×. Nous la demandons donc sans ombre, en résolution native, et nous composons l'ombre nous-mêmes.

## Les raccourcis qui n'en étaient pas

⌥⌘5 pour une fenêtre, ⌥⌘3 pour le plein écran, ⌥⇧⌘4 pour répéter la dernière zone. Ils étaient documentés, ils étaient dans le menu, et en dehors de l'app **ils ne faisaient rien**. Seul ⌥⌘4 était enregistré comme raccourci global ; les autres n'étaient que des entrées de menu, qui exigent d'avoir iSkitch au premier plan. C'est-à-dire jamais au bon moment.

Les quatre sont désormais de vrais raccourcis globaux, un cinquième les rejoint (**⌥⇧⌘5** prend la fenêtre que vous avez devant, sans viser) et **tous se modifient un par un** dans Réglages ▸ Capture ▸ Raccourci.

## Le reste

- **Redimensionner l'image** — Image ▸ Redimensionner l'image…, en pixels, proportions verrouillées et raccourcis à 25, 50, 75 et 100 %. Les annotations suivent, et ⌘Z annule le tout en une seule fois.
- **Export GIF et BMP**, en plus de PNG, JPG, TIFF et PDF.
- **Intensité réglable** de la pixellisation et du flou, mémorisée par annotation : dans la même capture, suggérer une adresse IP et rendre un mot de passe totalement illisible.

## Une note honnête sur la confidentialité

La 1.8.0 ajoute une fenêtre qui vous invite à vous abonner aux nouveautés. C'est la première fois qu'iSkitch peut envoyer quoi que ce soit, alors soyons précis : l'app fonctionne toujours entièrement hors ligne, vos captures ne quittent toujours pas votre Mac, et la seule chose qui peut sortir est votre adresse e-mail — et uniquement si vous la saisissez, cochez la case et appuyez sur le bouton.

Nous avons réécrit la [politique de confidentialité](/fr/privacy/) en conséquence, dans les huit langues. Elle affirmait que l'app « ne se connecte jamais à nos serveurs », ce qui à partir de cette version ne serait plus vrai.

## Quand

La 1.8.0 est terminée et part en validation sur l'App Store. Elle arrivera comme mise à jour gratuite pour qui possède déjà iSkitch. Comme toujours : sans abonnement et sans compte.
