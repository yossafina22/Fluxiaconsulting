# Fluxia Consulting — Guide d'édition de contenu

Ce guide explique comment modifier les textes, services, FAQ et base de connaissances **sans toucher au code**.

---

## 1. Modifier un texte affiché sur le site

Toutes les chaînes affichées (menus, CTA, titres, erreurs) sont dans :

- `messages/de.json` (allemand — langue par défaut)
- `messages/fr.json` (français)
- `messages/en.json` (anglais)

**Règle d'or :** chaque clé doit exister dans les **trois** fichiers. Après édition, lance `pnpm typecheck && pnpm build` pour vérifier.

Exemple : changer le titre du hero.

```jsonc
// messages/de.json
"home": {
  "hero": {
    "title": "Weniger Routine. Mehr Zeit für Ihr Geschäft.",   // ← ici
    ...
  }
}
```

---

## 2. Modifier ou ajouter une FAQ

Les FAQ affichées sur l'accueil viennent du tableau `faqs` dans `messages/{locale}.json`. Pour ajouter une question :

```jsonc
"faqs": [
  { "q": "...", "a": "..." },
  { "q": "Nouvelle question ?", "a": "Réponse courte." }  // ← ajouté
]
```

Les FAQ utilisées par le chatbot sont dans `knowledge/faq_{de,fr,en}.md` (voir §4).

---

## 3. Modifier les 4 piliers ou 5 solutions

Chaque pilier (`intelligent-websites`, `website-redesign`, `content-creation`, `ai-agents`, `business-automation`) et chaque solution (`instant-lead-response`, `document-processing`, `follow-up-sequences`, `customer-reactivation`, `internal-reporting`) a son contenu dans :

```jsonc
// messages/{locale}.json
"pillars": {
  "intelligent-websites": {
    "name": "...",
    "short": "...",          // affiché dans la carte
    "long": "...",           // intro de la page détail
    "problem": "...",
    "solution": "...",
    "exampleTitle": "...",
    "exampleBody": "...",
    "steps": ["...", "...", "..."],
    "limits": "..."
  }
}
```

Pour **ajouter** un nouveau pilier :

1. Ajouter sa clé dans `src/data/services.ts` (`PillarSlug` + `pillarSlugs` + `pillarIcons`).
2. Ajouter la section dans les 3 `messages/*.json`.
3. Rebuild — la page `/[locale]/services/[slug]` est générée automatiquement.

---

## 4. Modifier la base de connaissances du chatbot

Le chatbot s'appuie sur deux sources :

- `knowledge/fluxia_{de,fr,en}.md` — présentation de l'entreprise et des services.
- `knowledge/faq_{de,fr,en}.md` — FAQ structurées (titres `## Question ?`).

Après édition, aucun redéploiement du code n'est nécessaire : le store de connaissance est rechargé au prochain démarrage du serveur. Pour une mise à jour sans redémarrage, redéployer suffit.

**Format FAQ attendu** : titre `## Question`, puis réponse en texte libre.

```markdown
## Was kostet das?
Die Kosten hängen von Umfang und Schnittstellen ab.

## Kann ich einen Termin buchen?
Sie können einen Termin anfragen. Bestätigt ist er erst nach Rückmeldung.
```

**Instructions de comportement du chatbot** : dans `knowledge/assistant_policy.md`. Ces règles sont injectées comme system prompt. À modifier si tu veux changer la ligne de conduite.

---

## 5. Modifier les coordonnées de l'entreprise

Source unique : `config/company_facts.json`.

```jsonc
{
  "company_name": "Fluxia Consulting",
  "address": "Schönebecker Straße 44, 42283 Wuppertal, Allemagne",
  "telephone_display": "+49 1575 0625673",
  "telephone_e164": "+4915750625673",
  "email": "fluxia@fluxia-consulting.company",
  ...
}
```

Tous les endroits du site qui affichent ces infos (footer, contact, JSON-LD) lisent ce fichier.

---

## 6. Ajouter une nouvelle langue

1. Créer `messages/xx.json` (copier `en.json` et traduire).
2. Ajouter `xx` dans `src/i18n/routing.ts` → `locales`.
3. Créer `knowledge/fluxia_xx.md` et `knowledge/faq_xx.md`.
4. Mettre à jour `src/lib/rag/knowledgeStore.ts` → `loadForLocale` gère déjà toutes les locales.
5. Vérifier le `LanguageSwitcher` (il lit `routing.locales` automatiquement).

---

## 7. Ajouter un logo mis à jour

- `public/brand/logo.svg` : logo complet (header, footer).
- `public/brand/logo-icon.svg` : favicon et petite icône.

**Ne jamais** retoucher le SVG fourni par le client sans validation explicite (le nom commercial textuel est « Fluxia Consulting » mais le fichier SVG affiche « Fluxia-consulting » — c'est voulu).

---

## 8. Mentions légales et politique de confidentialité

Textes dans `messages/{locale}.json` → section `legal`. **Ces textes sont actuellement des brouillons** : un avocat doit les valider avant publication. Ils affichent un bandeau d'avertissement « Brouillon — rechtliche Prüfung ausstehend » / « Brouillon — validation juridique en attente » / « Draft — pending legal review ».

Infos à compléter :
- Umsatzsteuer-ID (Allemagne) ou équivalent
- Numéro d'immatriculation (Handelsregister ou équivalent)
- Politique complète RGPD/DSGVO (bases légales, durées, sous-traitants — notamment Resend, Anthropic, ElevenLabs quand configurés)
- Liste des cookies et services tiers
