# EKY Media — Claude Code Operating Rules

## 1. EKY Premium Design Skill
Always preserve EKY Media’s premium identity:
- Navy / deep blue as base
- Gold as premium accent
- White / light text only for readability
- No random black redesign
- No generic template look
- No cheap card/grid style
- No color regression

Every new section must match the existing premium website style:
- luxury digital consultancy
- clean spacing
- strong typography
- subtle motion
- conversion-focused layout

Before changing design:
1. Inspect existing design patterns.
2. Reuse current classes where possible.
3. Only add targeted CSS.
4. Never redesign the entire site unless explicitly requested.

## 2. Token Saving / Context Mode Skill
Use minimal context and avoid wasting tokens.

Rules:
- Read only files needed for the current task.
- Do not dump full files into chat.
- Do not rewrite entire files unless absolutely necessary.
- Prefer small surgical patches.
- Do not re-explain everything repeatedly.
- Do not touch unrelated sections.
- Before editing, identify the exact files and selectors involved.
- After editing, summarize only what changed.

When working on CSS:
- Inspect the relevant selector first.
- Patch only that selector or nearby related selectors.

When working on HTML:
- Move or edit only the required section.
- Do not regenerate the full page.

## 3. EKY Conversion Psychology Skill
Every homepage change must support this funnel:

First impression
→ Proof
→ Relevance
→ Method
→ Offer
→ Conversion

Preferred homepage order:
1. Hero
2. Ausgewählte Systeme
3. Arbeitsproben / Referenzen / Projektbeispiele
4. Branchen
5. Prozess
6. Leistungen
7. Vergleich
8. Rechtssicherheit
9. Preise
10. Team
11. Potenzialanalyse
12. FAQ
13. Footer

Rules:
- Proof must appear early.
- Do not duplicate industry messaging.
- Do not move references too low.
- Keep CTAs clear.
- Avoid anything that makes EKY look like a cheap webdesign agency.

## 4. SEO / GEO Skill
Preserve and improve local SEO/GEO signals:
- EKY Media
- Webdesign Würzburg
- Webdesign Regensburg
- SEO Würzburg
- SEO Regensburg
- GEO
- KI-Agentur Bayern
- Voice Agent
- Google Business
- Handwerk
- Praxen
- Gastronomie
- Mittelstand

Do not remove:
- meta tags
- canonical tags
- schema markup
- FAQ structure
- heading hierarchy
- internal anchors
- legal links

## 5. Safe Editing Skill
Before every commit, verify:
- Header links scroll to correct sections
- Mobile menu works
- Portfolio/reference slider works
- Pricing toggle works
- WhatsApp button works
- Accessibility widget works
- No duplicate IDs
- No broken anchors
- No visible placeholder text
- No color regression
- No layout collapse
- No unrelated files changed

## 6. EKY Project Memory
Important EKY rules:
- Real domain will be ekymedia.de
- Current GitHub Pages link is only preview
- Google Business profile will be added after GbR setup
- Do not fake real client references
- Use honest labels:
  - Arbeitsprobe
  - Konzeptprojekt
  - Beispielsystem
  - Ausgewähltes Projektbeispiel
- Keep CTA wording:
  - Kostenfreie Potenzialanalyse
- Replace cheap wording:
  - Use “0 € Startinvestition”
  - Avoid “0 € Einstieg”

## 7. Final Response Format
After completing a task, respond with:
1. Files changed
2. What changed
3. What was not changed
4. What to verify
5. Commit status

Keep it short.
