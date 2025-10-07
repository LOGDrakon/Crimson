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
}

export type LocaleKey = keyof typeof fr
export function t(key: LocaleKey, vars?: Record<string,string|number>) {
  let str = fr[key]
  if (vars) {
    for (const [k,v] of Object.entries(vars)) str = str.replace(new RegExp(`{${k}}`, 'g'), String(v))
  }
  return str
}
