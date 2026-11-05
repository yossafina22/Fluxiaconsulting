# Fluxia Consulting — Site web officiel

Site vitrine trilingue (DE / FR / EN) pour **Fluxia Consulting** — solutions IA, sites web intelligents et automatisation pour TPE/PME. Allemand par défaut.

- Stack : **Next.js 15 (App Router)** · **TypeScript strict** · **Tailwind CSS** · **next-intl**
- Formulaires : React Hook Form + Zod
- Chatbot : adaptateur LLM (Anthropic Claude par défaut, fallback FAQ)
- Voix : ElevenLabs Conversational AI (widget officiel, chargé après consentement)
- Email : Resend (fallback log serveur si non configuré)
- Tests : Vitest + Playwright

---

## Démarrage rapide

```powershell
# 1. Installer les dépendances (Node 20+ requis)
pnpm install

# 2. Copier le fichier d'environnement et renseigner (tout est optionnel)
copy .env.example .env.local

# 3. Lancer en développement
pnpm dev
# → http://localhost:3000 (redirige vers /de)
```

### Scripts disponibles

| Commande | Usage |
|---|---|
| `pnpm dev` | Serveur Next.js en dev |
| `pnpm build` | Build de production |
| `pnpm start` | Démarre le serveur de production (après `build`) |
| `pnpm lint` | ESLint (next/core-web-vitals + typescript) |
| `pnpm typecheck` | `tsc --noEmit` strict |
| `pnpm test` | Tests unitaires Vitest |
| `pnpm test:e2e` | Tests E2E Playwright (démarre le serveur automatiquement) |

---

## Variables d'environnement

Toutes **optionnelles**. Sans clé, le site tourne en **mode démonstration honnête** (log serveur + bandeaux d'avertissement UI).

| Variable | Rôle | Sans elle |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL canonique (SEO, sitemap) | Default `https://www.fluxia-consulting.company` |
| `ANTHROPIC_API_KEY` | Chatbot via Claude Haiku 5.5 | Chatbot répond via la FAQ |
| `ANTHROPIC_MODEL` | Modèle Claude | Default `claude-haiku-5-5` |
| `RESEND_API_KEY` | Envoi d'email contact/book | Demandes loguées côté serveur, bandeau UI |
| `CONTACT_TO_EMAIL` | Destinataire email | `fluxia@fluxia-consulting.company` |
| `CONTACT_FROM_EMAIL` | Expéditeur email | `Fluxia Website <onboarding@resend.dev>` |
| `NEXT_PUBLIC_ELEVENLABS_AGENT_ID` | ID public de l'agent vocal | Bouton vocal masqué |

---

## Structure

```
messages/{de,fr,en}.json         Traductions — source unique des textes
knowledge/                       Base de connaissances RAG (chatbot + futur ElevenLabs)
config/company_facts.json        Données de contact confirmées
src/
  app/[locale]/…                 Pages multilingues (accueil, services, solutions, …)
  app/api/{chat,contact,book}/   Routes API serveur
  components/{layout,home,chat,voice,forms,consent,ui}/
  data/{company,services,industries}.ts
  i18n/{routing,request}.ts
  integrations/{llm,email,calendar,leads}/
  lib/{rag,security,seo,validation}/
```

---

## Modes de fonctionnement

| Fonctionnalité | Sans config | Avec config |
|---|---|---|
| **Pages** | ✅ 100% opérationnelles DE/FR/EN | identique |
| **Formulaire contact** | Logue dans la console + bandeau "démo" | Envoi email via Resend |
| **Demande de RDV** | Logue + bandeau "demande, pas confirmation" | Email à l'équipe (pas de calendrier connecté en Phase 1) |
| **Chatbot** | Répond via la FAQ indexée | Réponses LLM Claude + RAG |
| **Assistant vocal** | Bouton masqué | Widget ElevenLabs chargé après consentement |

Aucun de ces modes ne simule un succès qu'il n'a pas obtenu : le chatbot en mode démo porte un badge `Demo mode (FAQ)` et le formulaire affiche un bandeau orange explicite.

---

## Déploiement Vercel (recommandé)

1. Pousser le repo sur GitHub.
2. Vercel → Import → sélectionner le repo.
3. Variables d'environnement à configurer dans Vercel (Production + Preview) : celles du tableau ci-dessus que tu veux activer.
4. Domaine `www.fluxia-consulting.company` : ajouter dans Vercel → Domains, puis mettre à jour les DNS (CNAME vers `cname.vercel-dns.com`).
5. Vérifier `/de`, `/fr`, `/en`, `/sitemap.xml`, `/robots.txt`.

---

## Checklist avant mise en ligne publique

| État | Élément | Action |
|---|---|---|
| ✅ Implémenté & testé | Pages DE/FR/EN, header/footer, sélecteur de langue | — |
| ✅ Implémenté & testé | SEO (metadata, sitemap, robots, JSON-LD, hreflang) | — |
| ✅ Implémenté & testé | Formulaire contact + Book avec validation Zod + honeypot + rate limit | — |
| ✅ Implémenté & testé | Chatbot avec adaptateur LLM + fallback FAQ | — |
| ✅ Implémenté | Widget vocal ElevenLabs conditionnel + consentement | Tester en live après config `NEXT_PUBLIC_ELEVENLABS_AGENT_ID` |
| ⚠️ Mode démo | Envoi email réel | Ajouter `RESEND_API_KEY`, valider le domaine d'envoi chez Resend |
| ⚠️ Mode démo | LLM chatbot en live | Ajouter `ANTHROPIC_API_KEY` |
| ⚠️ À configurer | Agent vocal ElevenLabs | Créer l'agent dans le dashboard ElevenLabs, charger la même base `knowledge/*.md`, activer DE/FR/EN |
| ⚠️ Non connecté | Calendrier de RDV | Brancher Cal.com ou Calendly à `src/integrations/calendar/` — en Phase 1 c'est un formulaire de demande |
| 🚨 Validation juridique | Impressum, Politique de confidentialité, Cookies | Brouillons marqués "À VALIDER" — faire relire par un pro du droit allemand (DSGVO) |
| 🚨 À vérifier | Visuel hero | Illustration SVG abstraite par défaut. Si Raoul veut une vraie photo pro validée, déposer `public/images/raoul.jpg` et modifier `src/components/home/Hero.tsx` |
| 🚨 À confirmer | Mentions légales (TVA, immatriculation) | Compléter `legal.impressumBody` dans `messages/{de,fr,en}.json` |

---

## Contenu : où éditer quoi

Voir [README_CONTENU.md](README_CONTENU.md).

---

## Notes de sécurité

- Headers de sécurité (`X-Content-Type-Options`, `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`, HSTS en prod) sont dans [next.config.ts](next.config.ts).
- Secrets uniquement côté serveur. Seul `NEXT_PUBLIC_ELEVENLABS_AGENT_ID` est exposé au client (identifiant public documenté par ElevenLabs).
- Rate limit in-memory par défaut (reset à chaque redémarrage). Pour la prod, configurer `UPSTASH_REDIS_REST_*` et étendre `src/lib/security/rateLimit.ts`.
- Aucun cookie non essentiel avant consentement. Chatbot vocal chargé uniquement après acceptation explicite.
