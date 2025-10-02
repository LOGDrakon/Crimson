# Guide Développeur — Crimson (Electron)

## Présentation du projet
Crimson est une application Electron multiplateforme permettant de générer, visualiser et exporter des palettes de couleurs pour le design d’interface. Elle propose une UI moderne, réactive et accessible, basée sur HTML, CSS (Tailwind), et React (UMD).

## Fonctionnalités principales
- Générateur de palettes harmonisées (primaire, secondaire, accent)
- Calcul automatique des contrastes et accessibilité (AA/AAA)
- Export des palettes en CSS, SCSS, JSON, Tailwind, XAML
- Extraction de couleurs depuis une image
- Recommandations de couleurs et tokens pour UI
- Aperçu interactif des composants (boutons, cartes, etc.)
- Mode clair/sombre
- Verrouillage des couleurs pour personnalisation
- Documentation intégrée sur chaque token

## Structure du projet
```
Crimson/
├── src/
│   ├── main.js           # Entrée Electron
│   ├── crimson.html      # UI principale
├── assets/               # Images, polices, ressources
├── config/               # Fichiers de config (nginx, docker, etc.)
├── DEVELOPER_GUIDE.md    # Ce guide
├── README.md             # Présentation rapide
├── package.json          # Dépendances et scripts
```

## Démarrage rapide
1. Installer les dépendances système :
   ```bash
   sudo apt update
   sudo apt install -y libatk1.0-0 libgtk-3-0 libnss3 libxss1 libasound2
   ```
2. Installer les dépendances Node.js :
   ```bash
   npm install
   ```
3. Lancer l’application :
   ```bash
   npm start
   ```

## UI & Composants
- **Palette Generator** : Sélection des couleurs, harmonisation automatique, suggestions.
- **Shades Grid** : Visualisation des variantes (base, light, dark, hover, disabled).
- **Tokens Panel** : Aperçu et documentation des tokens (background, surface, text, border, focus, overlay).
- **Interactive Demos** : Boutons, cartes, badges avec états (hover, active, disabled).
- **Exporters** : Génération de code pour l’intégration dans différents environnements.
- **Image Color Extractor** : Import d’image pour extraire les couleurs dominantes.

## Technologies utilisées
- Electron (desktop)
- HTML5, CSS3 (Tailwind via CDN)
- React 18 (UMD)
- Babel Standalone (pour JSX)
- Node.js (pour Electron)

## Bonnes pratiques
- Utiliser le dossier `src/` pour tout le code source de l’application.
- Les ressources statiques vont dans `assets/`.
- Les fichiers de configuration dans `config/`.
- Documenter toute nouvelle fonctionnalité dans ce guide et dans le README.
- Respecter l’accessibilité (contraste, navigation clavier, etc.).

## Personnalisation
- Modifier `src/crimson.html` pour l’UI.
- Ajouter des composants React en JSX dans le même fichier (grâce à Babel).
- Adapter le style via Tailwind ou CSS custom.
- Ajouter des exports ou formats dans le code JS.

## Déploiement
- L’application peut être packagée avec Electron Packager ou Electron Builder.
- Docker : Adapter le Dockerfile pour inclure les dépendances système et Node.js.

## Contribution
- Forker le projet, créer une branche pour chaque fonctionnalité ou correction.
- Documenter les changements dans `CORRECTIFS.md`.
- Proposer des PR claires et détaillées.

## Support & Ressources
- [Electron Documentation](https://www.electronjs.org/docs)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Node.js](https://nodejs.org/)

---
Pour toute question ou suggestion, ouvrir une issue sur le dépôt GitHub ou contacter le mainteneur.
