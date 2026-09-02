# Assistant de révision

Application éducative multilingue qui permet à un élève de coller le texte d'un cours, d'ajouter des photos scannées avec son téléphone ou d'importer un PDF. L'application analyse ensuite le contenu et propose un résumé, les points importants, des exercices et un devoir d'approfondissement dans la langue choisie.

## Ouvrir l'application

Ouvrir `index.html` dans un navigateur moderne.

## Version installable

Le projet contient déjà une base PWA :

- `manifest.webmanifest` pour déclarer l'application ;
- `sw.js` pour le mode installable et le cache local ;
- `assets/icon.svg` pour l'icône.

## Langues

L'interface propose français, néerlandais, arabe Maroc, espagnol Espagne, italien Italie et anglais. Le résumé, les exercices, le devoir, les messages d'aide et le JSON généré suivent la langue sélectionnée.

Les niveaux scolaires changent selon le pays ou la région choisie :

- Français : enseignement primaire, secondaire inférieur, secondaire supérieur, enseignement supérieur.
- Néerlandais : lager onderwijs, secundair onderwijs eerste graad, secundair onderwijs tweede/derde graad, hoger onderwijs.
- Arabe : التعليم الابتدائي، الثانوي الإعدادي، الثانوي التأهيلي، التعليم العالي - المغرب.
- Espagnol : Educación Primaria, ESO, Bachillerato, Universidad / formación superior - España.
- Italien : Scuola primaria, Scuola secondaria di primo grado, Scuola secondaria di secondo grado, Università / istruzione superiore - Italia.
- Anglais : Primary school, Lower secondary, Upper secondary, University / higher education.

## Options de révision

- Sélection de plusieurs photos scannées pour un même cours.
- Import d'un PDF de cours et extraction locale du texte, page par page (25 Mo et 120 pages maximum).
- Message explicite pour les PDF scannés sans texte sélectionnable, avec redirection vers le mode Photos.
- Choix de la langue du cours pour améliorer la lecture OCR.
- Choix automatique ou manuel du niveau scolaire.
- Choix du type de révision : module complet, résumé court, fiche mémo ou quiz rapide.
- Génération intelligente par API IA via une fonction Netlify sécurisée.
- Export PDF via l'impression du navigateur.
- Lecture audio du résumé.
- Flashcards générées à partir des concepts clés.
- Quiz interactif avec correction.
- Sauvegarde locale des cours dans le navigateur.
- Gestion des cours longs : compteur de mots, estimation du nombre de pages, détection des cours de plusieurs pages et résumé structuré par sections.

Le fichier PDF n'est pas envoyé tel quel. Il reste sur l'appareil ; seul le texte extrait est transmis à la fonction IA lorsque l'utilisateur lance explicitement la génération. Le lecteur PDF nécessite une connexion internet lors de son premier chargement.

## Connexion IA

La clé API ne doit jamais être placée dans `app.js` ou dans GitHub. Elle doit être enregistrée dans Netlify :

- Nom de la variable : `OPENAI_API_KEY`
- Portée : tous les contextes de déploiement
- Secret : activé

L'application appelle ensuite la fonction `netlify/functions/generate-module.mjs`. Si l'API IA n'est pas disponible, l'application garde l'analyse locale comme solution de secours.

Par défaut, la fonction utilise `gpt-4.1-mini`, un modèle rapide et largement compatible pour les usages fréquents. Pour changer de modèle sans modifier le code, ajouter aussi une variable Netlify optionnelle :

- Nom de la variable : `OPENAI_MODEL`
- Exemple de valeur : `gpt-4.1-mini`

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
