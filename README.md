# Crimson - Générateur de Palettes de Couleurs

![Crimson Logo](assets/crimson-preview.png)

**Crimson** est une application Electron multiplateforme permettant de générer, visualiser et exporter des palettes de couleurs harmonisées pour le design d'interface. Elle propose une interface moderne, réactive et accessible.

## ✨ Fonctionnalités

### 🎨 Génération de Palettes
- **Générateur automatique** de palettes harmonisées (primaire, secondaire, accent)
- **Algorithmes de couleur** : complémentaires, triadiques, analogues
- **Génération de nuances** : 9 variations par couleur (50-900)
- **Verrouillage de couleurs** pour personnalisation avancée

### ♿ Accessibilité
- **Calcul automatique des contrastes** selon les standards WCAG
- **Vérification AA/AAA** en temps réel
- **Recommandations** pour l'accessibilité des interfaces

### 📤 Export Multi-Format
- **CSS Variables** (custom properties)
- **SCSS Maps** pour Sass
- **JSON** universel
- **Tailwind CSS** configuration
- **XAML** ResourceDictionary

### 🖼️ Extraction d'Images
- **Import d'images** JPG, PNG, GIF
- **Extraction automatique** des couleurs dominantes
- **Génération de palette** basée sur l'image

### 🎭 Interface Moderne
- **Mode sombre/clair** avec transition fluide
- **Aperçu interactif** des composants (boutons, cartes, badges)
- **Interface réactive** et accessible
- **Documentation intégrée** des tokens de couleur

## 🚀 Installation

### Prérequis
- **Node.js** 16.x ou supérieur
- **npm** ou **yarn**

### Installation des dépendances

```bash
# Cloner le projet
git clone https://github.com/your-username/crimson.git
cd crimson

# Installer les dépendances
npm install

# Ou avec yarn
yarn install
```

### Dépendances système (Linux)
```bash
sudo apt update
sudo apt install -y libatk1.0-0 libgtk-3-0 libnss3 libxss1 libasound2
```

## 🔧 Utilisation

### Développement
```bash
# Lancer en mode développement
npm start

# Ou
npm run dev
```

### Build de production
```bash
# Installer electron-builder (si pas déjà fait)
npm install --save-dev electron-builder

# Créer un build
npm run build
```

### Scripts disponibles
- `npm start` : Lance l'application Electron
- `npm run dev` : Lance en mode développement
- `npm run build` : Crée un build de production
- `npm test` : Lance les tests (à implémenter)

## 🎯 Guide d'utilisation

### 1. Génération de Palette
1. **Choisir une couleur primaire** avec le sélecteur ou saisir un code HEX
2. **Cliquer sur "Régénérer"** pour créer une palette harmonisée
3. **Explorer les nuances** générées automatiquement
4. **Verrouiller des couleurs** pour personnaliser

### 2. Vérification d'Accessibilité
1. **Aller dans l'onglet "Aperçu"**
2. **Consulter les ratios de contraste** WCAG
3. **Vérifier les niveaux AA/AAA** pour chaque couleur
4. **Ajuster si nécessaire** pour respecter l'accessibilité

### 3. Export de Palette
1. **Aller dans l'onglet "Export"**
2. **Choisir le format** souhaité (CSS, SCSS, JSON, etc.)
3. **Cliquer sur le format** pour télécharger
4. **Intégrer** dans votre projet

### 4. Extraction depuis Image
1. **Aller dans l'onglet "Extraction"**
2. **Choisir une image** depuis votre ordinateur
3. **Laisser l'algorithme** extraire les couleurs dominantes
4. **Utiliser la couleur principale** pour générer une palette

## 🏗️ Structure du Projet

```
Crimson/
├── src/
│   ├── main.js           # Point d'entrée Electron
│   └── crimson.html      # Interface utilisateur React
├── assets/               # Ressources (images, icônes)
├── config/               # Fichiers de configuration
├── dist/                 # Builds de production
├── node_modules/         # Dépendances npm
├── DEVELOPER_GUIDE.md    # Guide développeur détaillé
├── README.md             # Ce fichier
└── package.json          # Configuration npm
```

## 🛠️ Technologies

- **[Electron](https://electronjs.org/)** - Framework d'application desktop
- **[React 18](https://react.dev/)** - Bibliothèque UI (mode UMD)
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utilitaire
- **[Babel Standalone](https://babeljs.io/)** - Transpilation JSX
- **Node.js** - Runtime JavaScript

## 🎨 Algorithmes de Couleur

### Génération d'Harmonies
- **Complémentaires** : couleurs opposées sur la roue chromatique
- **Triadiques** : trois couleurs équidistantes (120°)
- **Analogues** : couleurs adjacentes (±30°)

### Calcul de Contraste WCAG
```javascript
// Formule de luminance relative
L = 0.2126 * R + 0.7152 * G + 0.0722 * B

// Ratio de contraste
ratio = (L1 + 0.05) / (L2 + 0.05)

// Standards :
// AA Normal : ≥ 4.5:1
// AA Large : ≥ 3:1  
// AAA Normal : ≥ 7:1
// AAA Large : ≥ 4.5:1
```

## 📦 Packaging & Distribution

### Windows
```bash
npm run build:win
```

### macOS
```bash
npm run build:mac
```

### Linux
```bash
npm run build:linux
```

### Tous les OS
```bash
npm run build:all
```

## 🐛 Dépannage

### Problèmes courants

**L'application ne se lance pas**
- Vérifiez que Node.js 16+ est installé
- Supprimez `node_modules` et relancez `npm install`

**Erreurs de dépendances système (Linux)**
```bash
sudo apt install --fix-missing libatk1.0-0 libgtk-3-0 libnss3
```

**Performance lente**
- Fermez les outils de développement
- Redémarrez l'application

## 🤝 Contribution

1. **Forker** le projet
2. **Créer une branche** pour votre fonctionnalité (`git checkout -b feature/nouvelle-fonctionnalite`)
3. **Commiter** vos changements (`git commit -am 'Ajouter nouvelle fonctionnalité'`)
4. **Pusher** vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. **Créer une Pull Request**

### Guidelines de développement
- Suivre les standards ESLint
- Documenter les nouvelles fonctionnalités
- Tester sur plusieurs plateformes
- Respecter l'accessibilité (WCAG)

## 📄 Licence

Ce projet est sous licence **MIT**. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🆘 Support

- 📧 **Email** : support@crimson-app.com
- 🐛 **Issues** : [GitHub Issues](https://github.com/your-username/crimson/issues)
- 📖 **Documentation** : [Wiki](https://github.com/your-username/crimson/wiki)
- 💬 **Discord** : [Communauté Crimson](https://discord.gg/crimson)

## 🎯 Roadmap

### Version 1.1
- [ ] Système de plugins pour nouveaux exportateurs
- [ ] Sauvegarde/chargement de projets
- [ ] Historique des palettes
- [ ] Thèmes personnalisés

### Version 1.2
- [ ] Collaboration en temps réel
- [ ] API REST pour intégration
- [ ] Extension VS Code
- [ ] Mode hors-ligne avancé

### Version 2.0
- [ ] Intelligence artificielle pour suggestions
- [ ] Analyse de tendances couleur
- [ ] Intégration Design Systems
- [ ] Application mobile

---

**Développé avec ❤️ par l'équipe Crimson**

Pour toute question ou suggestion, n'hésitez pas à ouvrir une [issue](https://github.com/your-username/crimson/issues) !