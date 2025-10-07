# Backlog Améliorations Crimson

Ce fichier fige l’état courant du backlog proposé. Modifier ce fichier n’affecte pas la todo interne de l’assistant; il sert de référence humaine/versionnée.

## Légende
- (QW) Quick Win / faible effort
- (⚠) Accessibilité / Qualité
- (⏱) Performance / Architecture
- (💡) Fonctionnalité avancée / R&D

---

### 1. UX & Accessibilité Immédiates
1. Badges contraste AA/AAA tokens (QW, ⚠)
2. Recherche et filtrage tokens (QW)
3. Raccourcis clavier essentiels (QW)
4. Indicateurs conflits inline (QW, ⚠)
5. Export CSS variables (QW)
6. Export JSON style-dictionary (QW)
7. Marquage variants modifiés (QW)
8. Memoization recommendFor (⏱)
9. Mode Focus UI (💡)
10. Ajustement adaptatif lighten/darken (💡)
11. Mix perceptuel LCH (💡)
12. Auto-correction contraste (⚠, 💡)
13. Génération pack sémantique (💡)
14. Indice redondance ΔE (⚠)
15. Simulation daltonisme overlay (⚠)
16. Palette sandbox what-if (💡)
17. Onboarding contextualisé (QW)
18. Drag & drop groupes tokens (💡)
19. Mode comparaison Light/Dark (QW)
20. Historique visuel thumbnails (💡)
21. Barre actions contextuelles token (QW)
22. Toast alerte contraste faible (⚠)
23. Tests tailles police contraste (⚠)
24. Contraste overlays composites (⚠)
25. Export rapport A11y (⚠)
26. Clustering ΔE palette (💡)
27. ARIA live corrections (⚠)

### 2. Performance & Architecture
28. Code splitting panneaux (⏱)
29. Hash stable palette (⏱)
30. Virtualisation liste tokens (⏱)
31. Optimisation imports culori (⏱)
32. Lazy utils colorBlindness (⏱)
33. Limite historique + purge (⏱)

### 3. Tests & Qualité
34. Tests unitaires color utils (⚠)
35. Property-based ensureContrast (⚠)
36. Snapshot non-écrasement variants (⚠)
37. Tests export déterministes (⚠)

### 4. Évolutivité Modèle Palette
38. Version schéma palette (⏱)
39. Champ origin sur variants (QW)
40. Auto-save debounce (QW)

### 5. Sécurité & Electron
41. Vérification sécurité Electron (⚠)
42. Validateur import taille (⚠)
43. Blocage navigation externe (⚠)

### 6. Exports & Intégrations
44. Export Tailwind snippet (QW)
45. Export Figma Tokens JSON (💡)
46. Export SCSS map (QW)
47. Export Style Dictionary (si différent JSON) (QW)
48. Export multi-thèmes zip (💡)
49. Import depuis CSS vars (💡)
50. Préparer mode CLI futur (R&D)

### 7. Algorithmes Recommandations Avancées
51. Score diversité palette (💡)
52. Pondération dynamique scoring (💡)
53. Mode High Contrast palette (⚠)
54. Suggestions harmoniques (💡)

### 8. Observabilité & Debug
55. Overlay debug ΔE min (💡)
56. Journal mutations store (⏱)
57. Analytics anonymisés opt-in (⚠)

### 9. Internationalisation
58. Externalisation strings i18n (QW)
59. Détection locale système (QW)
60. Interpolation messages i18n (QW)

### 10. Outils Dev & Docs
61. Script doc tokens Markdown (QW)
62. Pre-commit formatting (QW)
63. Mode dev palette seed (⏱)
64. Typage complet bridge (⏱)

### 11. UI Showcase & Ergonomie
65. Générateur échantillons UI (💡)
66. Copie rapide pastille hex (QW)
67. Dark simulation preview auto (💡)
68. Lock tokens critiques (💡)
69. Compression historique avancée (⏱)
70. Hash bundle size suivi (⏱)
71. Métriques UX internes (⏱)
72. Correcteur contraste inline rapide (⚠)
73. Prévisualisation foreground alternatives (⚠)
74. Sandbox cluster merge (💡)
75. Sauvegarde snapshot manual save (QW)
76. Raccourci export rapide (QW)
77. Indicateur origine variant (QW)
78. Sélecteur ratio cible global (⚠)
79. Gouvernance tokens critiques (💡)
80. Export Markdown changelog palette (QW)

---

## Priorisation Phasée (Suggestion)
- Phase 1: 1,2,3,4,5,6,8,21,28
- Phase 2: 7,12,14,19,29,34–37,38,41
- Phase 3: 15,24,25,44,45,48,49,51–54
- Phase 4: 20,26,30,55–57,58–60,65–73

(Phases adaptables selon feedback.)

## Notes d’Implémentation
- Ne pas écraser variants modifiés: vérifier origin/manual.
- Toujours normaliser hex (#rrggbb) via safeHex.
- Export: fonctions pures, pas d’IPC direct côté renderer.
- Undo/Redo: push ancien état dans history, clear future sur mutation.

---
Dernière génération: 2025-10-06.
