# Crimson

Application Electron multiplateforme pour générer, analyser et exporter des palettes de couleurs orientées design système.

---
## Sommaire / Table of Contents
1. Objectifs & Valeur
2. Démarrage rapide
3. Architecture (Main / Preload / Renderer)
4. Taxonomie des tokens & variantes
5. Moteur de recommandations intelligentes
6. Accessibilité & Contraste
7. Aperçu (Preview) : sections & usages
8. Export des palettes (formats supportés)
9. Persistance & Store
10. Icônes d'application & packaging
11. Scripts NPM
12. Roadmap (idées futures)
13. Notes techniques (ΔE & Mode Auto)
14. Logo animé & UX

---
## 1. Objectifs & Valeur
Crimson sert de "workbench" pour construire un set de couleurs cohérent, accessible et exportable vers plusieurs plateformes (Web, iOS, Android, Design Tools). Il combine :
- Génération & édition rapide des tokens
- Recommandations assistées (variants, harmonies, contrastes)
- Détection de conflits (tokens trop proches, contrastes insuffisants)
- Prévisualisation réaliste de composants UI
- Export multi-format prêt à consommer

## 2. Démarrage rapide
Développement:
```
npm install
npm run dev
```
Construit & empaquette (plateforme courante) :
```
npm run build
```
Targets spécifiques:
```
npm run build:win
npm run build:mac
npm run build:linux
```

## 3. Architecture
```
src/
  main/         (Processus principal Electron: fenêtre, IPC, icône, AppUserModelId)
  preload/      (Bridging sécurisé: expose APIs contrôlées au renderer)
  renderer/     (React + Zustand + Tailwind)
    core/       (Modèle palette, utilitaires de couleur)
    store/      (Zustand store: tokens, historique, recommandations, exports)
    ui/         (Panneaux et composants)
      preview/  (Sections modulaires de la zone d'aperçu)
```

Flux principal:
- `main/index.ts` crée la fenêtre, configure l'icône, gère les dialogs & persistence (electron-store via IPC).
- `preload` isole la surface d'exécution et enregistre les handlers exposés.
- `renderer` orchestre UI/état.

## 4. Taxonomie des tokens & variantes
Catégories majeures (exemples – évolutif):
- Base: `primary`, `secondary`, `accent`, `neutral`
- Sémantique: `success`, `danger`, `warning`, `info`
- Surfaces: `surface`, `surfaceAlt`, `surfaceElevated`, `surfaceInverted`
- États & variantes générées: `primaryHover`, `primaryActive`, `primarySubtle`, `primarySubtleHover`, `primaryFg`, etc.
- Utilitaires: `focusRing`, `backdrop`, `skeleton`

Patterns de variantes typiques:
- `XHover`, `XActive` (interaction)
- `XSubtle`, `XSubtleHover` (fond léger / badge soft)
- `XFg` (couleur de texte optimale sur base ou subtle)

Règles générales:
- Contraste par rapport à `surface` / `surfaceAlt` ciblé pour atteindre AA/AAA selon rôle.
- Fg généré en fonction de luminance + correction (ensureContrast).

## 5. Moteur de recommandations intelligentes
Entrées:
- Token de référence (base) & type (sémantique, surface, accent, etc.)
- Contexte d'évaluation: `evaluationTarget` (background | surface | base) + `targetContrast`

Sorties (metadata par suggestion):
- `reason` (ex: "lighten+mix primary", "darken→contrast", "variant subtle")
- `contrastBg`, `contrastSurface`, `contrastBase` (ratios WCAG)
- `score` (pondération: contrast + distinctness + cohérence satur./lum.)
- `variant` (si applicable: Hover, Active, Subtle…)

Stratégies:
- Transformations: lighten/darken graduels, mix neutre ou accent, clamp saturation
- Assurance de contraste via `ensureContrast` sur cible (ex: 4.5 ou 7.0)
- Filtre des doublons (distance RGB minimale)

## 6. Accessibilité & Contraste
Utilitaires internes:
- `luminance(color)` -> Y relative
- `contrastRatio(a,b)` -> ratio WCAG 2.1
- `ensureContrast(fg, bg, min)` -> ajuste luminosité de fg (lighten/darken)
- `rgbDistance(a,b)` -> filtrage de proximités (< 24 ~ confluent)

Badges UI:
- AAA (>=7.0), AA (>=4.5), AA* (>=3.0 large / context souple), ⛔ (<3.0)

## 7. Aperçu (Preview) : sections & usages
La refonte est modulaire (dossier `ui/preview`):
- `GradientHero`: Présente un dégradé (ex: primary → secondary) + contexte rapide de thème
- `TokensBar`: Bar de chips montrant les tokens clés & variants
- `ButtonsShowcase`: Variantes de boutons (primaire, danger, subtle, outline) avec états hover/active simulés
- `AlertsShowcase`: Bannières/alerts utilisant success/danger/warning/info + Fg/Subtle
- `SurfacesShowcase`: Grille multi-surfaces (surface, elevated, alt, inverted) + composés (card, badge, overlay)
- `AccessibilityReport`: Tableau de ratios contrast (texte primaire, secondaire, semantic Fg vs surfaces)
- `Section` (wrapper générique): titre + description cohérente

Toggles globaux preview:
- Afficher/Masquer tokens (densité visuelle)
- Afficher section Accessibilité
- Densité (compact vs normal)

## 8. Export des palettes
Formats supportés (bouton export multiple):
- CSS (variables `--color-token`)
- JSON (structure hiérarchique)
- SCSS (map + variables)
- XAML (ResourceDictionary)
- GIMP `.gpl`
- SwiftUI Extension (Color + static vars)
- Android XML (color resources)
- ASE (Adobe Swatch Exchange binaire)

## 9. Persistance & Store
- `electron-store` (clé: `crimson-store`) sauvegarde palettes & préférences.
- Zustand gère: historique (undo/redo), groupes, tokens, paramètres d'évaluation (targetContrast, evaluationTarget).
- Migrable vers multi-projets (id -> palette) si besoin futur.

## 10. Icônes d'application & packaging
Résolution de l'icône (dans `main/index.ts`):
1. Sur Windows : cherche d'abord `assets/icon.ico` puis variantes `.ico` racine.
2. Fallback PNG : `assets/icon.png` puis racine ou répertoire renderer.
3. Premier fichier valide (non vide) adopté via `nativeImage`.
4. `app.setAppUserModelId('com.crimson.app')` (aligné avec `build.appId`) assure l'ancrage & groupement correct dans la barre des tâches Windows.

Recommandations d'actifs:
- Fournir `assets/icon.ico` multi-résolutions (16, 24, 32, 48, 64, 128, 256) – généré via un outil (ex: RealFaviconGenerator, icongen).
- Fournir `assets/icon.png` de grande taille (512x512) pour macOS / Linux & fallback.
- Ajouter ultérieurement un `.icns` dédié pour macOS si branding finalisé (`build.mac.icon`).

Checklist rapide:
- [x] AppID unifiée: `com.crimson.app`
- [ ] Vérifier présence d'un `.icns` (optionnel, futur)
- [ ] Tester affichage icône dans barre des tâches Windows après build (pas seulement en dev)

Astuce debug icône Windows:
- Si l'icône ne s'affiche pas après installation: vider le cache d'icônes Windows (ou incrémenter version), puis relancer l'appli.

## 11. Scripts NPM
| Script | Description |
|--------|-------------|
| dev | Démarre Electron + Vite en mode développement |
| build | Build + package plateforme courante |
| build:win / mac / linux | Build spécifiques |
| build:all | Chaîne multi-plateformes (nsis/dmg/AppImage) |
| preview | Sert le bundle pré-construit |

## 12. Roadmap (idées futures)
- Mode thème "Auto" (suit préférence système)
- Génération automatique de palette dérivée (tonal steps, scale 0–1000)
- Audit A11y avancé (table récap exportable + suggestions correctives)
- Calcul ΔE (perceptuel) pour détection fine de collisions
- Export Figma Plugin Manifeste / tokens JSON style dictionary
- Capture image du preview (export PNG/MD) pour documentation
- Détection palette triadique/analogique automatique & suggestions connectées
- Paramètres de stratégie de scoring (poids contrast vs distance vs saturation)

---
## Contribution
Ouvert aux PRs: documentation, nouveaux formats d'export, optimisation du moteur de recommandations.

## Licence
MIT

---
Bon design ! 🎨

---
## 13. Notes techniques (ΔE & Mode Auto)
### Mode Thème Auto
Le store possède `themeMode` ∈ `light | dark | auto`. En mode `auto`, Crimson suit la préférence système (événements `nativeTheme.updated`). Changement dynamique propagé via IPC (`system-theme`).

Persistance: `themeMode` sauvegardé (electron-store). Au démarrage si `auto`, on applique le thème système immédiatement.

### ΔE (OKLab)
La distance perceptuelle utilise OKLab (plus stable que simple distance RGB). Fonction `deltaE(a,b)` implémentée dans `core/palette.ts`.

Utilisation:
- Détection de conflits: deux couleurs sémantiques considérées comme trop proches si `rgbDistance < 24` OU `ΔE < 5`.
- Recommandations: distinctness utilise `ΔE` normalisé sur fenêtre ~0.5 (valeur empirique pour sRGB). Score combine contraste & ΔE.

Seuils suggérés (guidelines internes):
- ΔE < 1 : quasi identique
- ΔE < 5 : risque de confusion visuelle (flag)
- ΔE 5–15 : variation modérée
- ΔE > 15 : variation forte (confortable pour différencier des rôles)

Prochaines améliorations possibles:
- Support CIEDE2000 (plus coûteux mais plus standardisé)
- Paramétrage utilisateur des seuils ΔE

---
## 14. Logo animé & UX
L'animation du logo Crimson est utilisée de façon mesurée pour ajouter du caractère sans distraire:

Points d'intégration actuels:
- Splash screen (production uniquement) : affiché jusqu'au chargement de la fenêtre principale.
- Assistant Nouveau Projet (étape "context") : hero introductif avec apparition douce.
- Panneau d'Export : overlay de micro‑interaction pendant la génération multi‑fichiers.

Composant:
- `AnimatedLogo` (React) charge l'`SVG` animé depuis `assets/temp/crimson_icon_animated.svg` avec fallback statique & respect de `prefers-reduced-motion`.

Bonnes pratiques appliquées:
- Animation limitée aux moments de transition (chargement / introduction / action ponctuelle).
- Fallback sans mouvement en mode réduction de mouvement.
- L'animation n'est pas répétée sur toutes les étapes du wizard pour minimiser la fatigue visuelle.

Désactiver le splash:
```
CRIMSON_NO_SPLASH=1 npm run build
```

Optimisation future potentielle:
- Remplacement du script SVGator par une version keyframes CSS plus légère si besoin de réduire la taille initiale.
