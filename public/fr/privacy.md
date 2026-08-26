# Politique de confidentialité — iSkitch

> Comment iSkitch traite vos données : vos captures restent sur votre Mac. La seule chose qui peut en sortir est votre adresse e-mail, et seulement si vous vous abonnez aux nouveautés.

**Date d'entrée en vigueur :** 26 août 2026

Cette politique explique comment l'application **iSkitch** pour macOS traite vos données. L'app est développée et distribuée par **Color Vivo Internet, S.L.**, société espagnole basée à Madrid (Espagne).

## Résumé

- **Nous n'obtenons votre e-mail que si vous nous le donnez.** iSkitch ne collecte ni ne transmet rien de lui-même. Seule exception : l'abonnement aux nouveautés. Si vous saisissez votre adresse, acceptez cette politique et appuyez sur le bouton, cette adresse nous parvient. Rien d'autre.
- **Pas d'analytique, pas de pistage.** L'app ne contient ni télémétrie, ni SDK d'analytique, ni service de rapport de plantage.
- **Vos captures restent sur votre Mac.** Captures, annotations et modifications sont traitées localement et ne quittent pas votre appareil sauf si vous choisissez de les partager.
- **Enregistrement de l'écran uniquement à la demande.** macOS demande cette autorisation uniquement lorsque vous initiez une capture.

## Ce que l'app stocke sur votre appareil

iSkitch enregistre une petite quantité d'informations sur votre Mac pour mémoriser vos préférences entre les sessions :

- **Préférences** dans `UserDefaults` : format d'export par défaut, dossier de sauvegarde, couleur et style de flèche, apparence (clair/sombre/système), langue et autres choix d'interface.
- **État de la fenêtre** : taille et position de l'éditeur.
- **Captures et fichiers enregistrés** : uniquement lorsque vous les exportez explicitement, et uniquement à l'emplacement de votre choix.

Rien de tout cela ne nous est transmis.

## Ce que l'app envoie sur le réseau

iSkitch **n'envoie rien de lui-même** : pas de télémétrie, pas de vérification de mises à jour, pas de chargement de contenu distant. L'application fonctionne entièrement hors ligne.

La **seule** connexion sortante est l'abonnement aux nouveautés, et elle n'a lieu que si vous le demandez. Lorsque vous saisissez votre e-mail dans la fenêtre *Nouveautés iSkitch*, cochez la case d'acceptation et appuyez sur *S'abonner*, l'application envoie à `iskitch.com/api/subscribe` votre adresse, la langue dans laquelle vous utilisez l'application et la trace de votre acceptation de cette politique. C'est pour cela — et uniquement pour cela — que l'application déclare `com.apple.security.network.client` depuis la version 1.8.0.

**Vos captures, annotations et retouches ne sont jamais envoyées nulle part.** Ce que vous partagez via la feuille de partage de macOS est géré par l'extension que vous choisissez (Mail, Messages, AirDrop), chacune avec ses propres autorisations.


## Autorisations qu'iSkitch peut demander

- **Enregistrement de l'écran** (requis) : accordé via *Réglages Système ▸ Confidentialité et sécurité ▸ Enregistrement de l'écran*. macOS utilise cette autorisation pour qu'iSkitch puisse lire les pixels de la zone que vous sélectionnez avec ⌥⌘4, d'une fenêtre ou de l'écran complet. L'image capturée reste sur votre Mac.
- **Accès aux fichiers** via les panneaux Ouvrir et Enregistrer standard.
- **Presse-papiers / glisser-déposer**.

## À propos de ce site web (iskitch.com)

Le site marketing **iskitch.com** utilise **Google Analytics 4** pour comprendre le trafic agrégé — pages visitées, pays, navigateur. Google peut déposer des cookies et traiter les données hors de l'UE. Nous **n'utilisons pas** ces informations pour identifier des individus, faire du profilage ou de la publicité.

Si vous vous abonnez aux nouveautés — depuis le formulaire de ce site ou depuis l'application — nous conservons dans Cloudflare KV votre **adresse e-mail**, la **langue** d'inscription, l'origine (web ou application) et la **date d'acceptation de cette politique**. Une fois par jour, nous copions les nouvelles inscriptions vers **Acumbamail**, notre prestataire d'e-mailing. La base légale est votre **consentement**, et nous l'utilisons uniquement pour vous parler d'iSkitch : ni publicité, ni cession à des tiers. Vous pouvez vous désabonner depuis le pied de page de n'importe quel e-mail, ou nous écrire à hello@iskitch.com.

Cette collecte sur le site est **indépendante de l'app** : iSkitch sur votre Mac ne contient ni Google Analytics ni aucun autre SDK de pistage.

## Apple comme tiers

iSkitch est distribué via le **Mac App Store**. Apple agit en tant que responsable de traitement indépendant pour les téléchargements, évaluations, paiements et toute donnée de diagnostic que vous choisissez de partager. Consultez la [Politique de confidentialité d'Apple](https://www.apple.com/legal/privacy/).

## Enfants

iSkitch est classé **4+** sur l'App Store et convient à tout public. Nous ne collectons sciemment aucune donnée auprès de qui que ce soit, y compris les enfants de moins de 13 ans.

## Vos droits sous le RGPD

Si vous ne vous êtes pas abonné aux nouveautés, nous ne détenons aucune donnée vous concernant : tout ce qu'iSkitch enregistre reste sur votre Mac, vous le contrôlez, et vous pouvez supprimer l'application et ses préférences quand vous voulez.

Si vous vous êtes abonné, nous traitons votre adresse e-mail sur la base légale de votre **consentement**, et vous disposez des droits d'accès, de rectification, de portabilité, d'opposition, de retrait du consentement et d'effacement. Écrivez-nous à hello@iskitch.com et nous nous en occupons ; vous pouvez aussi vous désabonner vous-même depuis le pied de page de tout e-mail. Nous conservons l'adresse jusqu'à votre désabonnement ou votre demande de suppression. Si vous estimez que nous avons mal agi, vous pouvez saisir l'Agence espagnole de protection des données (aepd.es).

## Contact

**Color Vivo Internet, S.L.**
Madrid, Espagne
Email : hello@iskitch.com
Web : https://iskitch.com
