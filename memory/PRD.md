# PRD — afinity.ai Frontend Rebuild (Covar Template)

## Original Problem Statement
Rebuild the frontend of `https://insurtech.afinity.ai/` using the Covar Insurance HTML
template (`https://html.awaikenthemes.com/covar/index-3.html`) as the visual reference.
Keep all the original Afinity branding/content (afinity.ai, Aura AI copilot, four shields:
Travel/Health/Motor/PA, 120k+ protected, 4.9/5 App Store, < 2 min claim triage).
Frontend-only React rebuild. All inner pages required. Heavy animations matching the
template.

## Architecture
- **Stack**: React 19 + react-router-dom v7 + Tailwind CSS 3 + shadcn-style tokens
- **Animation libs**: swiper, framer-motion, react-intersection-observer, AOS (CSS only)
- **Fonts**: Fraunces (display serif), Plus Jakarta Sans (body), JetBrains Mono (eyebrow)
- **Palette**: Lime/chartreuse primary `#d2ed3c`, cream background `#f5f1e8`, dark ink `#0e0e0c`
- **Routing**: `/`, `/about`, `/services`, `/services/:slug`, `/pricing`, `/team`, `/blog`, `/blog/:slug`, `/testimonials`, `/contact`, `*` (404)

## What's been implemented (Jan 2026)
- ✅ Sticky header with transparent → blurred-cream scroll state, mobile drawer
- ✅ Footer with quick links, shield links, contact, marquee on top
- ✅ Reusable: AnimatedHeading (letter-by-letter reveal), Counter (scroll-triggered), Marquee, PageHero
- ✅ Home page (12 sections): hero with floating cover-card, contact bar, About, 4-Shields grid, Why Choose Us with award counter, dark Watch Our Story (3 counters), Pricing 3 plans, Get Quote, Team, FAQ accordion (5 Qs), Swiper testimonials, Blog (3), bottom marquee
- ✅ About page: story, mission/vision, values grid, stat counters
- ✅ Services page: 6 shields (Travel/Health/Motor/PA/Home/Business)
- ✅ Service Single (dynamic by slug)
- ✅ Pricing page (3 plans)
- ✅ Team page (6 advisors)
- ✅ Blog list (6 posts) + Blog Single
- ✅ Testimonials page (6 cards)
- ✅ Contact page with working form (client-side confirmation)
- ✅ 404 NotFound

## What's been implemented (Feb 2026 — fork)
- ✅ **P0 fix: Lead → Customer conversion for existing emails.** In `LeadDetailPage.jsx` (`handleConvertToCustomer`) and `Leads.jsx` (`handleConvertSubmit`), when `POST /api/auth/signup` returns 400 ("Email already registered") after `POST /api/leads/{id}/convert`, we now fall back to `GET /api/crm/customers?q=<email>`, match the row by exact email, and link that existing `user_id`. The success toast becomes "Lead converted. Existing account linked as customer." and the deep link points to `/admin/customers/<userId>`. The conversion activity entry records whether the customer was newly created or an existing one was linked. Verified end-to-end against the live backend (`endpoint.afinity.ai`).

## Backlog / Future
- P1: Wire contact form to backend (FastAPI + MongoDB) for real lead capture
- P1: CMS integration so the marketing team can edit Blog & Testimonials without code
- P2: Add real product/quote flow (Travel quote, Motor quote) like the original Afinity
- P2: Add login/dashboard for policyholders (port from original codebase)
- P2: SEO meta tags per page, Open Graph images, structured data
- P3: Dark-mode toggle, Bahasa Malaysia / 中文 i18n switch
- P3: Sora-2 hero video background option
