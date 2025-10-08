export const fr = {
  wizard_title: 'Nouveau Projet',
  step_context: 'Contexte',
  step_context_sub: "Définissez le cadre et l'intention esthétique.",
  step_seeds: 'Seeds',
  step_seeds_sub: 'Choisissez les couleurs de départ qui structurent la palette.',
  step_options: 'Options',
  step_options_sub: 'Paramètres de génération & variantes.',
  step_access: 'Accessibilité',
  step_access_sub: 'Contrastes & objectifs de lisibilité.',
  step_themes: 'Thèmes',
  step_themes_sub: 'Activer les modes clair / sombre ou auto.',
  step_naming: 'Nom & Fusion',
  step_naming_sub: "Stratégie d'intégration dans la palette actuelle.",
  step_preview: 'Prévisualisation',
  step_preview_sub: 'Aperçu des principaux tokens générés.',
  step_summary: 'Résumé',
  step_summary_sub: 'Diff et application finale.',
  label_keywords: 'Mots-clés style',
  label_profile: 'Profil (optionnel)',
  beta: 'beta',
  add_seed: '+ seed',
  remove_seed: 'Retirer',
  saturation: 'Saturation',
  internal_contrast: 'Contraste interne',
  neutral_levels: 'Niveaux neutres',
  include_semantic: 'Sémantiques (success/danger...)',
  generate_neutrals: 'Générer neutrals',
  variant_scope: 'Variants scope',
  min_contrast: 'Contraste minimum',
  enforce_semantic_distance: 'Distances sémantiques (ΔE ≥ {threshold})',
  token_prefix: 'Préfixe tokens',
  prefix_merge: 'Prefix merge',
  apply_sandbox: 'Appliquer (Sandbox)',
  apply_direct: 'Appliquer Direct',
  regenerate: 'Régénérer',
  close: 'Fermer',
  previous: 'Précédent',
  next: 'Suivant',
  undo: 'Undo',
  redo: 'Redo',
  added: 'Ajoutés',
  replaced: 'Remplacés',
  unchanged: 'Inchangés',
  show_diff: 'Voir Diff',
  hide_diff: 'Masquer Diff',
  warnings: 'Warnings',
  notes: 'Notes',
  generated_tokens: 'Tokens générés',
  confirm_replace_needed: 'Confirmation requise pour remplacement total (cliquer à nouveau Appliquer Direct)',
  prefix_required: 'Préfixe requis pour mergeWithPrefix'
  ,exports: 'Exports'
  ,mode_minimal: 'Mode Minimal'
  ,mode_complet: 'Mode Complet'
  ,metrics: 'Métriques'
  ,simulation: 'Simulation'
  ,generate_suggestions: 'Générer suggestions'
  ,suggestions: 'Suggestions'
  ,apply: 'Appliquer'
  ,no_selection: 'Aucune sélection'
  ,new_project: 'Nouveau Projet'
  ,label_keywords_simple: 'Style (mots-clés)'
  ,help_keywords: 'Mots séparés par virgule: influencent saturation & contraste (ex: vif, pastel, minimal, accessible).'
  ,label_profile_simple: 'Profil visuel'
  ,help_profile: 'Applique un réglage pré-déterminé (Pastel, Vivid, Nord…). Laissez vide pour neutre.'
  ,label_saturation_simple: 'Couleur (intensité)'
  ,help_saturation: 'Plus haut = couleurs plus vives. Plus bas = plus ternes/pastel.'
  ,label_internal_contrast_simple: 'Écart variantes'
  ,help_internal_contrast: 'Contrôle la différence entre Hover / Active / Subtle et la base.'
  ,label_neutral_levels_simple: 'Paliers neutres'
  ,help_neutral_levels: 'Nombre de gris générés (5,7,9,12). Plus = nuances plus fines.'
  ,label_semantics_include: 'Inclure couleurs sémantiques'
  ,help_semantics_include: 'Ajoute success / danger / warning / info dérivées de la couleur de base (teintes).'
  ,label_distance_threshold: 'Distance minimum (ΔE)'
  ,help_distance_threshold: 'Plus grand = force des teintes plus distinctes entre les couleurs sémantiques.'
  ,label_variant_scope_simple: 'Variants à générer'
  ,help_variant_scope: 'Sélectionnez les familles pour générer Hover / Active / Subtle.'
  ,label_autoreg: 'Auto régénération'
  ,help_autoreg: 'Met à jour la palette automatiquement après une courte pause de frappe.'
  ,label_minimal_mode: 'Mode réduit'
  ,help_minimal_mode: 'Masque les étapes avancées (accessibilité, sémantiques, simulation).'
  ,label_harmony_mode: 'Harmonie'
  ,help_harmony_mode: 'Schéma utilisé pour proposer Secondary et Accent si non fournis.'
  ,label_secondary: 'Secondaire'
  ,label_accent: 'Accent'
}

export type LocaleKey = keyof typeof fr
export function t(key: LocaleKey, vars?: Record<string,string|number>) {
  let str = fr[key]
  if (vars) {
    for (const [k,v] of Object.entries(vars)) str = str.replace(new RegExp(`{${k}}`, 'g'), String(v))
  }
  return str
}
