# Assistant de révision

Application éducative multilingue qui permet à un élève de coller le texte d'un cours ou d'ajouter une photo scannée avec son téléphone. L'application analyse ensuite le contenu et propose un résumé, les points importants, des exercices et un devoir d'approfondissement dans la langue choisie.

## Ouvrir l'application

Ouvrir `index.html` dans un navigateur moderne.

## Version installable

Le projet contient déjà une base PWA :

- `manifest.webmanifest` pour déclarer l'application ;
- `sw.js` pour le mode installable et le cache local ;
- `assets/icon.svg` pour l'icône.

## Langues

L'interface propose français Wallonie, néerlandais Flandre, arabe Maroc, espagnol Espagne et italien Italie. Le résumé, les exercices, le devoir, les messages d'aide et le JSON généré suivent la langue sélectionnée.

Les niveaux scolaires changent selon le pays ou la région choisie :

- Français : enseignement primaire, secondaire inférieur, secondaire supérieur, enseignement supérieur - Wallonie.
- Néerlandais : lager onderwijs, secundair onderwijs eerste graad, secundair onderwijs tweede/derde graad, hoger onderwijs - Vlaanderen.
- Arabe : التعليم الابتدائي، الثانوي الإعدادي، الثانوي التأهيلي، التعليم العالي - المغرب.
- Espagnol : Educación Primaria, ESO, Bachillerato, Universidad / formación superior - España.
- Italien : Scuola primaria, Scuola secondaria di primo grado, Scuola secondaria di secondo grado, Università / istruzione superiore - Italia.

## Options de révision

- Sélection de plusieurs photos scannées pour un même cours.
- Choix de la langue du cours pour améliorer la lecture OCR.
- Choix automatique ou manuel du niveau scolaire.
- Choix du type de révision : module complet, résumé court, fiche mémo ou quiz rapide.
- Export PDF via l'impression du navigateur.
- Lecture audio du résumé.
- Flashcards générées à partir des concepts clés.
- Quiz interactif avec correction.
- Sauvegarde locale des cours dans le navigateur.

## Publication sur les stores

Pour publier sur les stores, il faut créer une enveloppe mobile/desktop autour de cette application web. Le chemin recommandé est Capacitor :

1. Android / Play Store : lancer `npm run android:init`, ouvrir le projet Android généré dans Android Studio, créer une version signée, puis publier dans Google Play Console.
2. iPhone / App Store : lancer `npm run ios:init` sur un Mac, ouvrir le projet dans Xcode, signer avec un compte Apple Developer, puis envoyer à App Store Connect.
3. Microsoft Store : empaqueter l'application comme PWA ou application Windows, préparer les captures d'écran, la politique de confidentialité et la fiche produit.

## Points à prévoir avant validation store

- Ajouter une vraie politique de confidentialité.
- Remplacer l'OCR chargé par internet par une solution embarquée ou serveur fiable.
- Ajouter des captures d'écran mobiles et desktop.
- Tester sur téléphone Android, iPhone et Windows.
- Préparer le nom public, la description commerciale, la catégorie et l'âge cible.
