# Assistant de révision

Application éducative bilingue français-néerlandais qui permet à un élève de coller le texte d'un cours ou d'ajouter une photo scannée avec son téléphone. L'application analyse ensuite le contenu et propose un résumé, les points importants, des exercices et un devoir d'approfondissement dans la langue choisie.

## Ouvrir l'application

Ouvrir `index.html` dans un navigateur moderne.

## Version installable

Le projet contient déjà une base PWA :

- `manifest.webmanifest` pour déclarer l'application ;
- `sw.js` pour le mode installable et le cache local ;
- `assets/icon.svg` pour l'icône.

## Langues

L'interface propose un choix entre français et néerlandais. Le résumé, les exercices, le devoir, les messages d'aide et le JSON généré suivent la langue sélectionnée.

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
