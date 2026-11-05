# PROMPT CLAUDE CODE — Construire le site Fluxia Consulting

Tu es un développeur senior Next.js/TypeScript, architecte logiciel, designer UI/UX B2B et spécialiste accessibilité, i18n, SEO et intégrations IA. Construis un site professionnel prêt à être configuré et déployé pour **Fluxia Consulting** en suivant intégralement `CLAUDE.md` à la racine. Ce document est la source de vérité. **Direction graphique OPTION C validée : Corporate Tech + Digital Accessible**.

## 1. Compréhension et cadrage
- Ce projet est le site de **Fluxia Consulting**, une entreprise de solutions IA et d'automatisation pour TPE/PME basée à Wuppertal ; **pas** un site de restaurant.
- Marché allemand d'abord ; DE par défaut, FR et EN également complets.
- Informations confirmées : Fluxia Consulting ; Raoul Fotso ; Schönebecker Straße 44, 42283 Wuppertal ; +49 157 50625673 ; fluxia@fluxia-consulting.company ; https://www.fluxia-consulting.company.
- Identité officielle : `#176B80`, `#172B40`, `#EAF4F5`, `#FFFFFF`. **Aucun jaune, aucune réinterprétation du logo**. Vérifie l'existence de `public/brand/fluxia-logo.svg` ; si absent, demande l'asset original et utilise un simple nom texte provisoire.
- Ne crée ni faux avis, ni fausses études de cas, ni prix inventés, ni garanties de résultats.

## 2. Avant de coder
1. Inspecte le dépôt, ses fichiers, ses dépendances, son état Git et les assets existants. Ne détruis pas de travail préexistant.
2. Lis `CLAUDE.md` en entier ; relève les ambiguïtés réellement bloquantes (logo, fournisseur de calendrier, LLM, ElevenLabs, hébergement, mentions légales). Ne bloque pas les sections indépendantes.
3. Présente un plan exécutable par étapes, une arborescence de pages, un inventaire des composants et une liste « confirmé / à configurer ».
4. Commence ensuite l'implémentation sans attendre une validation supplémentaire pour les choix déjà actés dans `CLAUDE.md`.

## 3. Crée le site, pas seulement une maquette
- Next.js App Router, TypeScript strict, Tailwind CSS, next-intl, Zod ; design mobile-first accessible.
- Implémente toutes les routes définies dans `CLAUDE.md` pour `/de`, `/fr`, `/en`.
- Accueil : header + sélecteur de langue + hero puissant + 2 CTA, bénéfices, 4 piliers, 5 automatisations, processus en 3 étapes, secteurs, démo, FAQ, CTA final, footer.
- Pages dédiées : services, sites web intelligents, refonte, agents IA, automatisation, réponse instantanée aux leads, traitement documentaire, séquences de suivi, réactivation de clientèle, rapports internes, secteurs, démos, à propos, contact, rendez-vous et pages légales.
- Design option C : premium mais convivial ; fonds blancs, sections bleu nuit, accents bleu pétrole, cartes bleu pâle, photos crédibles ou visuels sobres. Typographie lisible, beaucoup d'espace, composants réutilisables, animations discrètes.
- Traductions naturelles DE/FR/EN pour **chaque** page, label, formulaire, erreur, FAQ et méta SEO. Allemand prioritaire.
- Site commercial orienté conversion : CTA contextualisés, bénéfices concrets, exemples de PME, sans fausses statistiques.

## 4. Fonctionnalités réellement opérationnelles
### Contact / leads
- Formulaire de contact court et accessible : validation client + serveur, anti-spam, limites de débit, envoi à une destination configurée. Affiche une confirmation uniquement après succès serveur.
- Démonstration de qualification des leads avec données synthétiques et statut « démo » si aucun CRM n'est branché.

### Chatbot écrit
- Widget flottant accessible, trois langues, base FAQ commune, réponses sur les services, qualification et orientation vers contact/rendez-vous.
- Route API serveur, adaptateur LLM configurable, garde-fous anti-injection et anti-hallucination, fallback quand API absente. Ne jamais exposer de secrets.
- En mode démo, afficher clairement la limitation et ne jamais faire croire qu'une demande a été transmise.

### Agent vocal ElevenLabs
- Intégration isolée du widget/SDK ElevenLabs Conversational AI, conditionnée à la configuration et au consentement applicable ; même base de connaissances métier, synchronisée explicitement si nécessaire.
- Choix de langue DE/FR/EN si réellement supporté et testé ; possibilité de revenir au chat texte. Ne pas simuler un agent vocal connecté.

### Réservation
- Prise de rendez-vous pour une **consultation Fluxia** : adaptateur calendrier, créneaux réels, fuseau Europe/Berlin, confirmation serveur, prévention des doublons, notification si configurée.
- Sans calendrier connecté, proposer seulement une demande de rendez-vous et l'indiquer clairement. Pas de créneaux inventés.

### Démos métiers
- Réponse instantanée aux leads ; extraction de document synthétique ; suivi commercial ; réactivation autorisée ; reporting illustratif. Présenter des démonstrations locales avec jeux de données fictifs, sans promettre un backend connecté.
- Exemples de réservation de tables uniquement comme solutions vendues aux restaurants clients, jamais comme réservation d'une table chez Fluxia.

## 5. Architecture et qualité
- Centralise les informations dans `src/data/company.ts` (et non `data/restaurant.ts`). Contenus et FAQ versionnés dans `src/data/knowledge/`.
- `messages/de.json`, `messages/fr.json`, `messages/en.json` ; SEO hreflang, canonical, sitemap, robots, Open Graph, JSON-LD ProfessionalService avec données confirmées.
- Consentement, RGPD, Impressum/Datenschutz avec mentions non confirmées marquées À VALIDER, aucun script tiers avant consentement requis.
- Tests : Vitest + Testing Library + Playwright. Commence par les tests de logique métier et d'intégration, puis implémente. Vérifie mobile 320/375/768/1024/1440 px, clavier, contraste, focus, erreurs et navigation.
- Fournis `.env.example` avec noms de variables et commentaires, **sans** secrets. Fournis README de développement, intégrations, déploiement et contenu à compléter.
- Exécute réellement lint, typecheck, tests et build ; corrige les erreurs. Ne déclare pas de réussite si une commande n'a pas été exécutée.

## 6. Phases et livrables
**Phase A :** design system, logo, tokens, layout, navigation, i18n, responsive.  
**Phase B :** toutes les pages et contenus, SEO, exemples sectoriels, démonstrations clairement identifiées.  
**Phase C :** formulaire de contact et réservation, puis chatbot.  
**Phase D :** voix ElevenLabs, consentement, sécurité, tests E2E et préparation déploiement.

À chaque phase : liste les fichiers modifiés, tests effectués, résultats et éventuels blocages. Ne supprime pas les fonctionnalités déjà valides. Si un fournisseur n'est pas configuré, construis l'adaptateur et un fallback honnête, puis documente ce qu'il reste à brancher.

## 7. Résultat attendu
Un projet Next.js complet, cohérent avec le flyer et le logo Fluxia, attractif pour les TPE/PME, rapide, responsive, en allemand/français/anglais, présentant tous les services et avec parcours commercial concret. Termine par un tableau : **fonctionnalité / implémentée / testée / connectée / configuration requise**. Fournis les commandes exactes de lancement et les validations juridiques et techniques encore nécessaires.

**Commence maintenant par l'audit du dépôt et un plan court, puis développe la phase A.**

## Extension obligatoire V2.1 — SEO Allemagne, France, Belgique et pays voisins
- Applique intégralement la section « 8 bis. SEO international et présence transfrontalière » de `CLAUDE.md`.
- Le siège réel reste Wuppertal. Mentionne les marchés servis DE/FR/BE et pays voisins sur Accueil, Contact et page « Zones desservies », sans inventer d'autres bureaux.
- Crée des routes localisées `/de`, `/fr`, `/en` et une navigation accessible ; allemand par défaut. Ne crée pas de version néerlandaise factice.
- Implémente `hreflang` réciproque, canonical, `x-default`, sitemap multilingue, robots, métadonnées localisées, JSON-LD `ProfessionalService` avec `areaServed` vérifié.
- Développe une stratégie SEO par service et intention (création de sites IA, refonte, accueil IA, leads, documents, suivi, reporting) plutôt que des pages de villes ou de pays clonées.
- Ajoute des tests automatisés pour les routes linguistiques, les balises SEO et le sitemap ; contrôle absence de pages de démonstration indexées.
- Explique en fin de travail comment connecter Search Console, suivre les résultats par pays et par langue et valider les textes légaux pour les marchés concernés.

## Version 3 — Maquette validée et assets
- La **deuxième maquette** (`references/maquette-accueil-validee.png`) est validée : inspire-toi de sa composition (header blanc, hero bleu nuit, photographie professionnelle, cartes de services illustrées, couverture internationale, assistant IA), mais construis une véritable interface responsive.
- Le logo officiel fourni dans `public/brand/logo.svg` est la source unique pour le header et le footer. Utilise `public/brand/logo-icon.svg` pour le favicon. Ne jamais substituer le logo illustré dans la maquette.
- Ne pas reprendre de faux éléments visuels : portraits non identifiés comme représentant Raoul, badges de conformité non vérifiés, résultats commerciaux non prouvés, avis clients inventés.
- Les coordonnées de Fluxia Consulting sont confirmées ; prévoir une page Contact et des liens `tel:`/`mailto:` fonctionnels.
- Vérifie les trois langues, les routes SEO, le consentement de l'agent vocal et la réservation connectée avant de présenter le site comme prêt à publier.
- En fin d'exécution, livre une checklist explicite : terminé / démonstration / intégration à configurer / validation juridique.
