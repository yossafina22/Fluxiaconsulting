# AGENTS.md

<!-- handoff:learnings:begin -->
## Session Learnings (auto-updated by handoff)

### Implicit Rules
- Stack: Next.js 15 App Router + React 19 + TypeScript 5.7 strict + Tailwind 3.4 + next-intl 3.26 + Zod 3.24 + react-hook-form + @anthropic-ai/sdk + resend + lucide-react + Vitest 2.1 + Playwright 1.49
- Package manager: pnpm 9.15 via Corepack (NEVER npm install — user CLAUDE.md global rule)
- Platform: Windows 11 Pro + PowerShell (Bash tool via Git Bash). PowerShell 5.1 has no && or ||, use ; if ($?) { }. Never run sudo (does not exist on Windows)
- Default locale: de (German). URL structure /de, /fr, /en with localePrefix: 'always'. Root / redirects to /de
- Brand colors (immutable, no yellow/orange ever): petrol #176B80, night #172B40, pale #EAF4F5, white #FFFFFF
- Logo: public/brand/logo.svg (header/footer) and logo-icon.svg (favicon) — official assets, DO NOT redraw/recolor/rescale
- Env vars all optional: site runs in demo mode without any key (console fallback for email, FAQ fallback for chatbot, 'not configured' modal for voice)
- Non-fabrication rule (critical): never invent prices, testimonials, references, certifications, GDPR guarantees, calendar slots. Legal pages are drafts with amber warning banner until a DSGVO lawyer validates them
- areaServed for JSON-LD: strictly DE, FR, BE — NOT a list of cities, no fake local offices
- Contact: Raoul Fotso, Schönebecker Straße 44, 42283 Wuppertal, +49 1575 0625673, fluxia@fluxia-consulting.company — only confirmed data (no job title, no business hours, no VAT number yet)
- Testing: run pnpm lint && pnpm typecheck && pnpm test && pnpm build && pnpm test:e2e before claiming done
- Port 3000 may be stuck on Windows after pnpm start — kill via Get-NetTCPConnection -LocalPort 3000 | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force } (NEVER kill all node processes, blocked by auto-mode classifier)
- Git identity for commits: Raoul Fotso <fluxia@fluxia-consulting.company> (user is sole developer), Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>

### Key Decisions
- Decision: Anthropic Claude Haiku 5.5 as default LLM — Reason: user runs on Anthropic ecosystem (Claude Code), excellent German/French, cheap and fast, perfect for small RAG
- Decision: Resend for transactional email — Reason: aligns with user CLAUDE.md global defaults for SaaS stack, generous free tier, deliverability good from Germany
- Decision: no database in Phase 1 — Reason: site is pure marketing + chatbot + contact; leads go straight to email, CRM slot (src/integrations/leads/) ready for later HubSpot/Pipedrive
- Decision: adapter pattern everywhere (llm, email, calendar, leads) with console/FAQ fallbacks — Reason: user opens the site to test without any API key, every fallback must be honestly labeled (no faked successes)
- Decision: lexical BM25-style search (no embeddings) for RAG — Reason: knowledge base under 20KB total, embeddings overkill, deterministic and debuggable
- Decision: voice widget always rendered, shows honest 'nicht konfiguriert' modal when agentId missing — Reason: user explicitly asked where the widget was; hiding it entirely confused the demo, but faking it violates the non-fabrication rule
- Decision: headings use color:inherit globally — Reason: text-ink fixed in base layer made H1/H2 invisible on bg-night sections; inheritance + explicit text-white on dark sections is cleaner
- Decision: break-words + hyphens-auto on card titles + html lang='de' — Reason: German compound Prozessautomatisierung overflowed cards; lang on html enables browser hyphenation for correct syllable breaks
- Decision: legal pages (Impressum, Datenschutz, Cookies) shipped as drafts with amber warning banner — Reason: never publish unverified legal text; user must get these reviewed by DSGVO specialist before production deploy

<!-- handoff:learnings:end -->
