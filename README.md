# Baiboly Quiz

Baiboly Quiz est une application mobile **Expo / React Native** dédiée à l'apprentissage biblique par le jeu. Elle propose des quiz bibliques, des défis en duo, des questions basées sur des images, une lecture de la Bible, un verset du jour et un suivi de progression avec gemmes, cœurs, points, médailles et classement.

## Capture d'écran

<p align="center">
  <img src="docs/screen-capture.svg" alt="Capture d'écran de l'écran d'accueil Baiboly Quiz" width="760" />
</p>

## Fonctionnalités principales

- **Quiz solo** : choisissez un thème biblique et répondez à des questions pour gagner des points et des gemmes.
- **Mode duo** : jouez à deux, localement ou en ligne, avec des quiz classiques ou des quiz image.
- **Quiz image** : identifiez des personnages, scènes ou éléments bibliques à partir d'images.
- **Bible intégrée** : consultez et recherchez des passages bibliques depuis l'application.
- **Verset du jour** : affichez une promesse biblique quotidienne et partagez-la.
- **Profil joueur** : personnalisez votre avatar, suivez vos points, gemmes, cœurs et médailles.
- **Classement et amis** : comparez votre progression avec d'autres joueurs et recherchez des amis.
- **Paramètres** : changez la langue, le thème visuel et les préférences de l'application.

## Technologies utilisées

- [Expo](https://expo.dev/) et React Native
- TypeScript
- React Navigation
- Expo SQLite pour les données locales
- Supabase pour les profils, le matchmaking et les fonctionnalités en ligne
- Expo Notifications, Sharing, Clipboard, AV et autres modules Expo

## Prérequis

Avant d'installer le projet, assurez-vous d'avoir :

- Node.js installé (version LTS recommandée)
- npm installé avec Node.js
- Expo CLI utilisable via `npx expo`
- Un émulateur Android, un simulateur iOS ou l'application **Expo Go** sur un téléphone
- Un projet Supabase si vous voulez utiliser les fonctionnalités en ligne

> Remarque : les commandes iOS nécessitent macOS et Xcode.

## Installation rapide

```bash
git clone <url-du-depot>
cd Baiboly-quiz
npm install
npm start
```

Ensuite, ouvrez l'application en scannant le QR code avec **Expo Go**, ou appuyez sur `a` pour Android / `i` pour iOS dans le terminal Expo.

## Configuration Supabase

Créez un fichier `.env` à la racine du projet avec les variables suivantes :

```env
EXPO_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=votre-cle-anon
```

Ces variables sont nécessaires pour les fonctionnalités en ligne comme l'authentification, les profils publics, la recherche de joueurs et le matchmaking. Les parties locales de l'application peuvent être développées sans Supabase, mais certaines fonctionnalités afficheront des erreurs si ces valeurs sont absentes.

## Scripts disponibles

| Commande          | Description                                                      |
| ----------------- | ---------------------------------------------------------------- |
| `npm start`       | Lance Expo en mode développement.                                |
| `npm run android` | Compile et lance l'application sur Android avec un client natif. |
| `npm run ios`     | Compile et lance l'application sur iOS avec un client natif.     |
| `npm run web`     | Lance la version web via Expo.                                   |

## Structure du projet

```text
.
├── App.tsx                 # Point d'entrée React Native
├── index.ts                # Point d'entrée Expo
├── app.json                # Configuration Expo
├── eas.json                # Configuration des builds EAS
├── assets/                 # Logos, icônes et avatars
├── docs/                   # Captures d'écran et documentation visuelle
├── raw_data/               # Données sources et scripts de préparation
└── src/
    ├── components/         # Composants réutilisables
    ├── constants/          # Données statiques et configuration de l'interface
    ├── context/            # Contextes globaux, notamment l'état utilisateur
    ├── data/               # Questions, versets et Bible locale
    ├── hooks/              # Hooks métier
    ├── i18n/               # Traductions
    ├── navigation/         # Navigation entre les écrans
    ├── screens/            # Écrans de l'application
    ├── services/           # Services SQLite, Supabase et notifications
    ├── theme/              # Couleurs, espacements, rayons et ombres
    └── utils/              # Fonctions utilitaires
```

## Données et persistance

- Les données locales du joueur sont stockées avec Expo SQLite.
- Les questions, versets, données bibliques et quiz image sont fournis dans `src/data/`.
- Supabase est utilisé pour les fonctionnalités connectées : profils, amis, joueurs en ligne et matchmaking.

## Construction avec EAS

Le fichier `eas.json` contient des profils de build pour le développement, la prévisualisation et la production. Après avoir configuré Expo Application Services, vous pouvez créer une build Android de production avec :

```bash
npx eas build --platform android --profile production
```

Pour une build iOS, utilisez :

```bash
npx eas build --platform ios --profile production
```

## Dépannage

- **Les fonctionnalités en ligne ne marchent pas** : vérifiez `EXPO_PUBLIC_SUPABASE_URL` et `EXPO_PUBLIC_SUPABASE_ANON_KEY`.
- **Expo ne trouve pas un module** : relancez `npm install`, puis redémarrez Expo avec `npm start -- --clear`.
- **Problème Android/iOS natif** : vérifiez que l'émulateur, le SDK Android ou Xcode sont correctement installés.
- **Cache persistant** : fermez Expo et relancez avec `npm start -- --clear`.
