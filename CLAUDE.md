# CLAUDE.md — Fluxia Consulting

**Version 3.0 — Maquette 2 validée, logos SVG fournis, SEO international — 03/11/2026**  
**Statut : cahier des charges de référence pour Claude Code, pas un site déjà développé.**

## 0. Règles non négociables
- Construire le **site vitrine commercial de Fluxia Consulting**, cabinet de solutions IA pour TPE/PME, **pas le site d'un restaurant**. Les restaurants sont une cible sectorielle et un exemple de démonstration de réservation.
- **Allemand par défaut**, français et anglais complets. Aucun mélange de langues dans une page.
- **Option C validée : Corporate Tech + Digital Accessible**. Sérieux, premium, chaleureux, compréhensible pour dirigeants non techniques.
- Conserver strictement le logo officiel fourni (ne pas redessiner, recolorer, étirer). **Ne jamais introduire de jaune/orange**.
- Toute donnée inconnue, tarif, témoignage, certification, résultat chiffré ou disponibilité de calendrier doit être marqué comme non confirmé ; ne jamais inventer.
- Toute fonctionnalité dépendant d'une API externe doit être réellement intégrée et testée avant d'être présentée comme active ; sinon mode démo explicitement étiqueté.

## 1. Identité de l'entreprise
| Champ | Valeur |
|---|---|
| Marque affichée | **Fluxia Consulting** |
| Contact | **Raoul Fotso** |
| Adresse | **Schönebecker Straße 44, 42283 Wuppertal, Deutschland** |
| Téléphone | **+49 157 50625673** (`tel:+4915750625673`) |
| Email | **fluxia@fluxia-consulting.company** |
| Domaine souhaité | **https://www.fluxia-consulting.company** (vérifier DNS et déploiement) |
| Marché prioritaire | Allemagne (marché prioritaire), France, Belgique et pays voisins selon capacité commerciale réelle ; TPE, PME, artisans, commerces et services |
| Langues | de (défaut), fr, en |
| Zone commerciale | Allemagne, France, Belgique et pays voisins ; activité transfrontalière à présenter sans prétendre à des bureaux locaux |

La fonction/titre professionnel exact de Raoul Fotso, les horaires, références clients, tarifs et informations légales d'immatriculation ne sont pas confirmés. Éviter de publier des titres ou détails non validés.

## 2. Direction artistique — OPTION C
### Intention
Mélanger l'autorité du design B2B allemand (structure, précision, fiabilité) avec une approche accessible aux petites entreprises (langage simple, personnes réelles, bénéfices concrets, exemples visuels).

### Palette officielle immuable
- Bleu pétrole principal : **`#176B80`** — liens, CTA, accents, icônes.
- Bleu nuit : **`#172B40`** — navigation, titres, footer, sections sombres.
- Bleu pâle : **`#EAF4F5`** — cartes, encarts, sections alternées.
- Blanc : **`#FFFFFF`** — fonds, respiration.
- Neutres complémentaires uniquement pour texte et bordures, avec contraste AA. Pas de jaune/orange, pas de dégradé multicolore.
- CSS tokens dans `src/styles/tokens.css` ou `globals.css` et variables Tailwind sémantiques.

### Référence visuelle approuvée — DEUXIÈME MAQUETTE
- La deuxième maquette de page d'accueil validée par le client est la référence visuelle principale. Voir `references/maquette-accueil-validee.png`.
- Reprendre sa structure et son langage graphique, **pas ses éventuelles erreurs de génération d'image** : header blanc avec navigation, sélecteur DE/FR/EN et CTA rendez-vous ; grand hero bleu nuit avec photographie professionnelle à droite ; bénéfices/CTA à gauche ; cartes de services avec visuels et icônes ; couverture internationale ; assistant IA écrit/vocal flottant.
- Reproduire l'esprit (hiérarchie, espacement, équilibre, contraste) en HTML/CSS responsive et composants accessibles, pas en plaçant l'image comme arrière-plan de la page.
- La maquette est une image conceptuelle : corriger toute faute de langue, tout libellé incohérent et toute affirmation invérifiée (ex. « DSGVO-konform », « résultats mesurables » si non démontrés).
- Ne pas supposer que la personne représentée sur la maquette est Raoul Fotso. Prévoir un visuel sous licence ou une photo validée ; aucune fausse photographie de fondateur ou d'équipe.
- IMPORTANT : le logo dessiné dans la maquette n'est pas l'asset de référence. Utiliser exclusivement les fichiers fournis `public/brand/logo.svg` et `public/brand/logo-icon.svg`, sans retouche ni recoloration. Le logo complet porte visuellement « Fluxia-consulting » tandis que le nom commercial textuel est « Fluxia Consulting » ; conserver le fichier tel quel et demander validation avant tout éventuel changement de typographie.
- Prévoir variantes desktop/tablette/mobile, navigation mobile, états hover/focus, contrastes et composants chargement/erreur.
### Composition
- Header fixe/discret : logo original, Services, Solutions par secteur, Démonstrations, À propos, Contact, CTA rendez-vous, sélecteur DE/FR/EN.
- Hero desktop en deux colonnes : promesse et deux CTA à gauche, visuel crédible à droite ; mobile empilé.
- Photos réelles autorisées/licenciées de petites entreprises, métiers et bureaux ; éviter robots humanoïdes, néons et fausses photos d'équipe. Si assets absents, utiliser illustrations CSS sobres ou placeholders clairement identifiés.
- Cartes services 2×2 desktop, 1 colonne mobile ; icônes cohérentes ; animations subtiles et désactivables (`prefers-reduced-motion`).
- Typographie sans serif accessible, échelle cohérente, lignes courtes, espacement généreux ; contraste WCAG AA et focus visible.
- **Logo :** importer le fichier SVG officiel en `public/brand/fluxia-logo.svg`. En cas d'absence, stopper la substitution de logo et signaler l'asset manquant ; texte de marque provisoire permis sans imitation du symbole.

## 3. Positionnement et copywriting trilingue
**Promesse :** des outils numériques et des agents IA pratiques qui réduisent les tâches répétitives, facilitent les échanges clients et connectent les systèmes existants.

| Élément | DE (défaut) | FR | EN |
|---|---|---|---|
| Hero H1 | Weniger Routine. Mehr Zeit für Ihr Geschäft. | Moins de tâches répétitives. Plus de temps pour votre activité. | Less busywork. More time for your business. |
| Sous-titre | Wir automatisieren Kundenanfragen, entwickeln intelligente Websites und verbinden Ihre Geschäftsprozesse – verständlich und praxisnah. | Nous automatisons les demandes clients, créons des sites intelligents et connectons vos processus, simplement et concrètement. | We automate customer enquiries, build intelligent websites and connect your business processes — clearly and practically. |
| CTA primaire | Kostenloses Erstgespräch anfragen | Demander un premier échange | Request an introductory call |
| CTA secondaire | Lösungen entdecken | Découvrir les solutions | Explore solutions |
| Assistant | Fluxia Assistent | Assistant Fluxia | Fluxia Assistant |

Le mot « gratuit » ne peut être affiché que si le premier échange est réellement gratuit ; sinon utiliser « Erstgespräch anfragen ». Pas de promesses de nouveaux clients garantis, de ROI sans preuve, de disponibilité 24/7 non confirmée.

## 4. Catalogue commercial : 4 piliers + 5 automatisations vedettes
### Quatre piliers visibles dès l'accueil
1. **Sites web intelligents / Intelligente Websites / Intelligent Websites** : création de sites responsive, chatbot, réservation/prise de rendez-vous, formulaires, SEO technique.
2. **Refonte de sites / Website-Relaunch / Website Redesign** : modernisation, vitesse, accessibilité, clarté des offres, parcours de conversion, SEO.
3. **Agents IA & accueil / KI-Agenten & Empfang / AI Agents & Reception** : chatbots, FAQ, qualification des demandes, réceptionnistes vocaux, transfert humain.
4. **Automatisation métier / Prozessautomatisierung / Business Automation** : emails, CRM, demandes, documents, commandes, stocks, rapports et alertes.

### Cinq solutions vedettes, chacune avec une page ou section approfondie
- **Réponse instantanée aux leads** : capturer, accuser réception, qualifier et router une demande ; transmission humaine si incertitude.
- **Traitement de documents** : extraction de factures et bons de livraison, classification, rapprochement et file de validation ; jamais de paiement automatique.
- **Séquences de suivi** : rappels, relances personnalisées et étapes CRM ; contrôle de consentement, opt-out et validation d'envoi.
- **Réactivation de base de données** : segmentation de clients inactifs et préparation de campagnes **uniquement si la prospection est autorisée** ; pas de campagne automatique sans base légale.
- **Rapports internes** : synthèses de service client, stocks, ventes et alertes ; chiffres calculés de façon déterministe et sources affichées.

### Catalogue étendu inspiré de l'offre de services jointe
Catégorisation des tickets, FAQ et réponses standard, reporting stock, réclamations/retours, recherche documentaire interne, factures et documents, génération de devis/prix avec validation, sites web avec réservation, réceptionniste IA, refonte de landing pages. Agents opérationnels possibles : pipeline commercial, onboarding, veille concurrentielle, reporting, support interne, assistance documentaire juridique (sans conseil juridique), service client, création de contenu sous validation, prospection autorisée. **Ne pas présenter ces capacités comme des produits déjà déployés ou des références clients.**

Chaque page service doit contenir : problème concret → solution → exemple TPE/PME → fonctionnement en 3 étapes → limites et validation humaine → CTA « demander une démo / consultation » → FAQ localisée. Ne pas inventer de prix.

## 5. Arborescence et navigation
Utiliser les **mêmes clés de route** dans les trois langues pour simplifier le code, tout en traduisant labels, SEO et contenu. Routes :
```
/de | /fr | /en                         Accueil
/[locale]/services                    Vue d'ensemble des 4 piliers + 5 automatisations
/[locale]/services/intelligent-websites
/[locale]/services/website-redesign
/[locale]/services/ai-agents
/[locale]/services/business-automation
/[locale]/solutions/instant-lead-response
/[locale]/solutions/document-processing
/[locale]/solutions/follow-up-sequences
/[locale]/solutions/customer-reactivation
/[locale]/solutions/internal-reporting
/[locale]/industries                  Solutions par secteur
/[locale]/demos                       Démonstrations interactives
/[locale]/about                       À propos de Fluxia et contact Raoul Fotso
/[locale]/contact                     Contact / demande de devis
/[locale]/book                        Rendez-vous de conseil
/[locale]/impressum                   Mentions légales allemandes (versions localisées)
/[locale]/privacy                     Politique de confidentialité
/[locale]/cookies                     Préférences de consentement
```
404 et erreurs traduites. Les routes `/` redirigent vers `/de` (ou négociation explicite sans changer la priorité de DE). Sélecteur de langue préserve autant que possible la page actuelle.

### Page d'accueil : ordre des sections
1. Navigation + CTA rendez-vous.
2. Hero : H1, sous-titre, CTA primaire et secondaire, image réelle/licenciée ou visuel de processus.
3. Bande de bénéfices qualitatifs : moins de tâches répétitives, réponses plus rapides, outils connectés (pas de statistiques fictives).
4. Grille des 4 piliers avec liens dédiés.
5. Bloc « 5 automatisations concrètes » avec exemples métiers et liens vers pages.
6. « Comment nous travaillons » : échange initial → cadrage et proposition → réalisation, tests et accompagnement.
7. Secteurs : artisans, commerces, e-commerce, hôtels, restaurants, logistique, services professionnels, PME.
8. Démo conversationnelle (expérience de l'assistant, clairement étiquetée selon disponibilité réelle).
9. FAQ : coût (sur devis), délais (selon périmètre), sécurité, langues, outils existants, transfert humain.
10. CTA final vers rendez-vous/contact ; coordonnées et footer légal.

### Pages sectorielles
Exemples **hypothétiques** et non études de cas : restaurant (chatbot FAQ + réservation de tables chez le client), hôtel (demandes et disponibilité), artisan (devis et rappels), commerce (commandes et stocks), cabinet (administratif uniquement, sans diagnostic), logistique (reporting). Afficher « exemple de solution ».

### Démonstrations
- Démo chatbot répondant à des questions sur Fluxia, avec sources de la base approuvée.
- Démo de qualification d'un lead avec données fictives.
- Démo d'un document **synthétique** (aucune vraie donnée sensible) et extraction illustrée.
- Démo de réservation de **consultation Fluxia** ; si fournisseur non connecté, seulement simulation sans confirmation.
- Démo vocale ElevenLabs uniquement si activée et conforme ; sinon expliquer qu'elle sera disponible après configuration.
- Ne jamais fabriquer un résultat ou prétendre avoir exécuté un workflow externe lorsqu'il s'agit d'une maquette.

## 6. Architecture technique validée
| Couche | Choix |
|---|---|
| Framework | Next.js App Router (SSR/SSG selon les pages) |
| Langage | TypeScript strict |
| Styles | Tailwind CSS et tokens de marque |
| Traductions | next-intl ; `messages/de.json`, `fr.json`, `en.json` |
| Données entreprise | **`src/data/company.ts`** typé (remplace `data/restaurant.ts`, inadapté à Fluxia) |
| Contenus et FAQ | `src/data/knowledge/` versionné, trilingue, approuvé |
| Chatbot | composant isolé + `src/app/api/chat/route.ts` + adaptateur LLM/RAG côté serveur |
| Voix | ElevenLabs Conversational AI, widget/SDK isolé, activable par configuration |
| Réservation | adaptateur calendrier (à choisir), validation serveur et anti-double réservation |
| Formulaires | React Hook Form + Zod (ou équivalent justifié), API serveur, anti-spam |
| Tests | Vitest, Testing Library, Playwright |

### Structure suggérée
```
src/
  app/
    [locale]/
      layout.tsx
      page.tsx
      services/[slug]/page.tsx
      solutions/[slug]/page.tsx
      services/page.tsx
      industries/page.tsx
      demos/page.tsx
      about/page.tsx
      contact/page.tsx
      book/page.tsx
      impressum/page.tsx
      privacy/page.tsx
      cookies/page.tsx
    api/chat/route.ts
    api/contact/route.ts
    api/availability/route.ts
    api/book/route.ts
  components/
    layout/ hero/ services/ solutions/ demos/ chat/ voice/ booking/ forms/ ui/
  data/company.ts
  data/services.ts
  data/knowledge/
  integrations/llm/ integrations/elevenlabs/ integrations/calendar/
  lib/validation/ lib/security/ lib/seo/
  i18n/
  styles/
messages/de.json
messages/fr.json
messages/en.json
public/brand/fluxia-logo.svg
.env.example
```
L'implémentation peut ajuster les chemins aux conventions de la version installée de Next.js ; documenter les choix.

## 7. Parcours commerciaux et interactions
### Prospect
Landing/service → CTA → formulaire court (nom, email, entreprise facultative, besoin, langue, accord de traitement approprié) → validation serveur → enregistrement/transmission réellement configurée → accusé de réception uniquement après succès → possibilité de réserver un échange.

### Chat IA
- Bouton flottant accessible, pas de pop-up intrusive, ouverture au clic, historique limité, fermeture clavier et focus géré.
- Détection ou choix DE/FR/EN, allemand par défaut ; possibilité de changer de langue.
- Questions fréquentes, services, cas d'usage, qualification légère, proposition de rendez-vous, transfert à Raoul Fotso.
- Réponses ancrées dans la base de connaissances approuvée ; aucune invention de prix, disponibilité, contrat, référence ou garantie.
- S'identifier comme IA ; si incertain, indiquer les limites et proposer contact humain.
- Backend : auth appropriée, rate limiting, protection injection et abuse, logs minimisés, clés privées serveur.

### Voix
- ElevenLabs Conversational AI configuré via variables serveur/identifiant public adapté à l'intégration, jamais de secret côté client.
- Même source de connaissance et mêmes règles métier que le chat, avec contenu synchronisé/contrôlé (ne pas supposer une synchronisation native automatique).
- Consentement/information avant microphone, audio et services tiers ; fonctionnement clavier/texte alternatif ; DE/FR/EN selon possibilités du fournisseur validées par test.
- Escalade vers contact humain, pas de collecte de données sensibles inutile.

### Rendez-vous
- Prise de rendez-vous **pour consultations Fluxia**, pas réservation de restaurant sur ce site.
- Fuseau Europe/Berlin, disponibilité lue du fournisseur, vérification au moment de confirmer, confirmation transactionnelle, protection contre double réservation, email de notification si configuré.
- Si calendrier non connecté, afficher « demander un rendez-vous » via formulaire, jamais de créneau inventé ni de fausse confirmation.
- Gestion des données, annulation et durée de conservation à documenter.

## 8. Internationalisation, SEO et performance
- Toutes les pages et messages UI traduits : nav, boutons, erreurs, FAQ, formulaires, consentement, emails, chat prompts.
- Langues `de-DE`, `fr-FR`, `en` ; métadonnées, Open Graph, `hreflang`, canonical, sitemap et robots propres.
- JSON-LD `ProfessionalService` avec **uniquement** données confirmées, sans étoiles, avis, certifications ni horaires inventés.
- SEO local Wuppertal et NRW en allemand, mais pas de keyword stuffing ni pages locales artificielles.
- Images optimisées via `next/image`, fontes locales ou `next/font`, lazy load, composants serveur quand possible.
- Objectifs de mesure : Lighthouse >=90 sur pages clés en environnement de référence ; publier les résultats réels et corriger les écarts.


## 8 bis. SEO international et présence transfrontalière — OBLIGATOIRE
### Marchés et langues
- Marchés servis : **Allemagne, France, Belgique**, avec possibilité de servir les **pays voisins** sur demande, sous réserve de faisabilité opérationnelle. Le siège/contact reste **Wuppertal, Allemagne** ; ne pas inventer de bureaux ou adresses en France, Belgique ou ailleurs.
- Priorité commerciale et éditoriale : **Allemagne d'abord**, puis **France** et **Belgique** ; les pays voisins ne doivent pas être présentés comme des implantations physiques.
- Langue par défaut : **allemand (`de`)**. Versions complètes **français (`fr`)** et **anglais (`en`)** ; proposer un sélecteur manuel visible, stable, accessible, sans redirection forcée par IP.
- Pour la Belgique, servir les visiteurs francophones via la version FR et les visiteurs germanophones via DE ; ne pas inventer de traduction néerlandaise. Une version `nl-BE` est une éventuelle phase ultérieure, **uniquement avec une vraie traduction complète et validation commerciale**.
- Définir les variantes SEO de langue/région **uniquement si les pages existent réellement avec contenu distinct et utile**. Valeurs de base recommandées : `de-DE`, `fr-FR`, `en` et `x-default` vers l'allemand. Ne pas déclarer `fr-BE`, `de-BE`, `en-BE` ou d'autres variantes avec URLs artificielles ; on peut utiliser une même URL linguistique pour plusieurs marchés, selon la stratégie validée.
### SEO technique
- URLs stables et indexables `/de/...`, `/fr/...`, `/en/...`, avec `/` redirigé proprement vers `/de` (ou stratégie canonique cohérente), sans doublons.
- Balises `title`, `description`, canonical auto-référent, Open Graph et `hreflang` réciproques **par page équivalente**, ainsi que `x-default`. Ne pas lier des pages qui n'ont pas d'équivalent traduit.
- Générer `sitemap.xml` multilingue et `robots.txt` ; exclure des index les environnements de test, confirmations de formulaire, pages de réservation privées et démonstrations non publiques.
- `ProfessionalService`/`Organization` JSON-LD avec nom, site, téléphone, email et **adresse réelle de Wuppertal** ; `areaServed` peut inclure `DE`, `FR`, `BE` et les pays voisins **seulement si effectivement desservis**. Ne pas utiliser `LocalBusiness` avec de fausses implantations ou `aggregateRating` sans preuves.
- Pages de services ciblant des besoins concrets dans chaque langue : chatbot et accueil IA, création/refonte de sites, automatisation des leads, traitement documentaire, relances autorisées, réactivation client conforme, reporting. Mots-clés naturels, aucune répétition artificielle.
- Une page « Zones desservies / Einsatzgebiete / Service Areas » est possible si elle contient de vraies informations sur le fonctionnement transfrontalier (rendez-vous à distance, langues, modalités d'accompagnement) et non une liste de villes dupliquées.
- Pages sectorielles pertinentes (restaurants, hôtels, commerces, services) avec cas d'usage distincts ; **pas de doorway pages** clonées par pays ou ville.
- Prévoir `Google Search Console` et `Bing Webmaster Tools`, suivi des performances par pays/langue, mesure des conversions conforme au consentement, Core Web Vitals et SEO accessible.
### Contenu commercial et conformité
- Ajouter sur l'accueil et la page Contact, dans les trois langues, une phrase naturelle indiquant les interventions en **Allemagne, France, Belgique et pays voisins**.
- Exemples validés : DE « Wir unterstützen kleine und mittlere Unternehmen in Deutschland, Frankreich, Belgien und den Nachbarländern – auch digital und ortsunabhängig. » ; FR « Nous accompagnons les TPE et PME en Allemagne, en France, en Belgique et dans les pays voisins, notamment à distance. » ; EN « We support small and medium-sized businesses in Germany, France, Belgium and neighbouring countries, including remotely. »
- Ne pas promettre de conformité juridique universelle : adapter les mentions et traitements aux marchés réellement servis, faire valider les textes légaux, les règles de prospection et les contrats.
- Ne pas confondre langues du site et pays : un site en anglais ne signifie pas une implantation au Royaume-Uni ; un site en français ne signifie pas une adresse en France.
### Critères d'acceptation
1. Chaque page indexable dispose de traductions DE/FR/EN de qualité, de canonical et de `hreflang` réciproques corrects.
2. `sitemap.xml`, `robots.txt`, métadonnées et données structurées sont testés automatiquement.
3. Les trois pays cibles sont clairement mentionnés, sans fausses adresses ni pages géographiques dupliquées.
4. Navigation, sélecteur de langue et formulaires fonctionnent sur mobile et conservent la langue choisie.
5. Les métriques SEO et conversions peuvent être ventilées par pays/langue lorsque les outils sont configurés et les consentements obtenus.

## 9. Conformité, confidentialité et accessibilité
- Allemagne : Impressum, Datenschutz, consentement cookies/scripts, mentions des sous-traitants et transferts, AVV/DPA et obligations applicables **à faire valider juridiquement**.
- Aucun outil tiers non essentiel ni widget vocal avant consentement applicable. Pas de case marketing précochée.
- Email de prospection, réactivation de base et séquences : vérifier autorisations et désinscriptions ; pas d'envoi automatique non autorisé.
- TLS, en-têtes de sécurité, validation serveur Zod, limitation de débit, protection anti-bot, gestion d'erreurs sans fuite de secrets, CSP adaptée.
- WCAG 2.2 AA cible : clavier, focus, contrastes, labels, erreurs explicites, tailles tactiles, mouvement réduit.
- Les pages légales sont des **brouillons signalés comme tels** tant que les informations d'immatriculation et mentions obligatoires ne sont pas validées. Ne pas publier un faux Impressum.

## 10. Critères d'acceptation
1. Responsive sans débordement de 320 à 1920 px, mobile menu et sélecteur de langue fonctionnels.
2. 3 langues complètes et route DE par défaut, SEO trilingue et aucune chaîne hardcodée visible dans une seule langue.
3. Logo officiel inchangé, palette exacte et aucune couleur jaune/orange.
4. Toutes les pages listées et les 4 piliers + 5 automatisations accessibles depuis l'accueil.
5. Formulaire testé : succès réel, erreurs, spam, données minimales.
6. Chat : tests FAQ, inconnus, langue, refus d'invention, injection, escalade.
7. Voix : consentement et chargement conditionnel ; dégradation gracieuse si clé manquante.
8. Réservation : aucun créneau fictif, anti-double réservation et confirmation réelle uniquement si calendrier branché.
9. Tests unitaires et E2E, lint, typecheck, build réussis ; vérifier erreurs console et liens.
10. README, `.env.example`, liste des validations en attente et instructions de déploiement livrés.

## 11. Méthode de réalisation Claude Code
- Auditer d'abord les fichiers existants et ne pas écraser sans contrôle.
- Produire un plan de pages, composants, flux et dépendances ; implémenter par phases testées.
- Écrire les tests avant logique métier (validation, booking, sécurité, chat adapters).
- Phase 1 : identité + i18n + design system + structure responsive.
- Phase 2 : pages, contenus, secteurs, démos non connectées clairement étiquetées, SEO.
- Phase 3 : contact et réservation (intégrations ou mode demande), chatbot.
- Phase 4 : voix ElevenLabs, conformité, tests et optimisation.
- À la fin, distinguer **implémenté et testé / démonstration / non configuré / nécessite validation juridique**. Aucun succès fictif.

## 12. Assets fournis et état de livraison
- `public/brand/logo.svg` : **fichier original utilisateur**, logo complet, à afficher tel quel.
- `public/brand/logo-icon.svg` : **fichier original utilisateur**, favicon / petite icône.
- `references/maquette-accueil-validee.png` : **deuxième maquette validée**, référence conceptuelle (pas un asset à intégrer tel quel).
- `README_DEMARRAGE.md` : mode d'emploi, configurations externes à fournir et limites de livraison.
- Les fichiers Markdown spécifient le projet : **ils ne constituent pas un site implémenté**.
- Pour les images du hero et des cartes, utiliser des assets licenciés ou validés ; ne pas réutiliser la photographie synthétique de la maquette comme portrait authentique de Raoul.
- Avant mise en production, exécuter audit visuel desktop/mobile, tests E2E, tests sécurité, SEO multilingue, accessibilité et validation juridique.
