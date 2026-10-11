# SEO SUPER BOOSTER — Instructions for the AI Coding Agent

You are building or modifying a website whose top priority is ranking as high as possible in Google Search, while staying fast, accessible, and genuinely useful to people. Follow every rule in this file. **The framework is Astro** unless the owner explicitly says otherwise for a given project — it ships zero JavaScript by default and renders to static HTML, which is a strong starting point for both page speed and crawlability. Section 2.1 gives Astro-specific implementation notes for the rules below; where this file says "adapt to the framework" outside that section, it means Astro's native mechanism first. **Single language, US English only:** every site built from this file targets one locale (`en-US`) with no translated versions, no locale routing, and no hreflang. This keeps the site smaller, simpler to audit, and free of the international-SEO overhead that isn't needed here.

Nothing here guarantees a ranking. Your job is to get every on-site factor right and to hand the owner a clear list of the off-site work (backlinks, Search Console setup) that only a human can do.

---

## 0. Operating rules (read first)

1. **Inputs override defaults.** If the owner supplies a template repo, design system, color palette, hero image, or keyword list, use them. When a template repo is supplied, treat it exactly as the owner's own instructions for it read: keep the existing structure, layout, UI style, components, animations, responsiveness, and overall design; do not redesign the website from scratch; do not remove or break existing functionality unless it genuinely needs to change for this new project; keep the existing code architecture and reuse components wherever possible. Apply the SEO rules below on top of that foundation. The template is a source for design, UI style, components, and functionality only — never its content — see section 1.1 for what must never carry over from it.
2. **Required inputs — ask for anything missing before building.** You need, at minimum: site name, purpose, target audience, the product's features or offerings (what it actually does or sells — ask for these specifically if not supplied; don't infer or invent them from the template or the niche), the production domain, and either a keyword list or the completed keyword-research package (section 4.1). Do not start building page content and structure around invented features or invented keywords — ask first. Do not invent a domain either; use a clearly marked placeholder (e.g. `https://example.com`) held in ONE config/env variable so it can be replaced in one place. **Buy, purchase, and pricing buttons** follow the same rule: if the owner has not supplied the real affiliate link yet, point every such button to one placeholder value (e.g. `AFFILIATE_LINK_PLACEHOLDER`) via the single link config in section 6, never a fabricated or guessed URL, and list it as an open TODO in the final report (section 14) so the owner can supply it later.
3. **Git and deployment permissions.** By default you do NOT commit, push, deploy, delete files, or overwrite the original template repository. The single exception is an explicit instruction from the owner, under these rules:
   - **What counts as explicit:** a direct instruction in the owner's current message that names the action, such as "commit and push to main," "commit this," or "deploy." Vague phrases like "looks good," "done," "finalize," or "ship it" do not count. If unsure, ask.
   - **One instruction, one action.** Permission covers only the action named, once. It does not carry over to later changes, later messages, or later tasks. Each new commit or push needs a new explicit instruction.
   - **Scope:** when told, you may commit and push to `main` of the current project's own repository. Never push to the original template repository, an upstream remote, or any other repository or branch unless the owner names it. Never force-push, rewrite history, or delete branches unless the owner explicitly asks for that exact action. Deploying is a separate permission and needs its own explicit instruction.
   - **How:** follow the pre-push checks in section 13.8 every time.
   - Work in the current project only. The template repository itself is read-only: never edit files inside it, and never commit or push to it under any instruction.
4. **Never fabricate.** No fake reviews, testimonials, ratings, statistics, awards, author credentials, addresses, or "as seen in" logos. If real content is needed and not provided, insert a visible `TODO:` placeholder and list it in the final report. Placeholders must never be indexable in a shipped state, so flag them. **Pricing plans** follow the same rule: plan names, prices, and features must come directly from the real affiliate/product page the owner supplies (or from features the owner states directly), never invented or estimated. If the owner's product has more or fewer than two plans, or the supplied page doesn't make the plans clear, ask rather than guessing a structure.
5. **Google's spam policies are hard limits.** No cloaking, hidden text or links, keyword stuffing, doorway pages, link schemes, scraped or thin content, or mass-produced near-duplicate pages. Do not generate many pages that only swap a keyword variant. Every indexable page must earn its existence.
6. **Work in phases:** Plan → Build → Multi-pass verify and fix → Report (sections 1, 2–12, 13, 14). Section 13 is mandatory. A single pass is never enough: half-fixes and fixes that break something else are the most common failure, and the multi-pass protocol exists to prevent them.
7. **Template content isolation is absolute — zero tolerance.** When a template repo is supplied, it is a source for UI/UX inspiration only: structure, layout, style, components, animations, functionality (rule 1). Not one piece of its actual content — text, copy, product data, images, screenshots, videos, captions, alt text, outbound links, brand names, or metadata — may ever appear on the new site. This is not a best-effort guideline; it is a hard requirement on the same level as rules 4 and 5. Follow section 1.1 in full, and treat even one leaked item as a build-blocking defect, not a minor cleanup task — it must be found and removed before the work can be reported as finished (section 13.7).
8. **Audit-only requests.** If the owner asks you to review, audit, evaluate, or "take a step back and look at" an existing site rather than build one, treat it as read-only: run the baseline snapshot (13.2) and a full Pass 1 audit (13.3) using the checklist (13.5), across every page and viewport. Report every issue found — what's wrong, which section of this file it violates, and the exact fix — as a numbered, unbiased list. Do not change any code. Only move into Pass 2 (fix) if the owner then tells you to proceed.

---

## 1. Plan before building

### Required inputs checklist (work through before planning)

Before producing the plan below, go through this checklist with the owner. For anything not yet checked off, ask for it specifically — don't guess, don't substitute a generic assumption, and don't start the plan until the list is complete (or the owner explicitly defers an item, which is only allowed where section 0 rule 2 names a placeholder: the production domain and the affiliate link). If several items are missing, ask for them together rather than one message per item, but keep asking across turns until every box is checked.

- [ ] Template repository (or explicit confirmation to build without one)
- [ ] Site name
- [ ] Site purpose — what it does, who it's for
- [ ] Target audience
- [ ] Product features / offerings
- [ ] Pricing plans: the plan names, prices, and included features, pulled from the real affiliate/product page the owner provides — ask for that page's URL if not yet given, even if features were also described directly
- [ ] Affiliate link (placeholder allowed until supplied, per section 0 rule 2)
- [ ] Keyword list or completed keyword-research package (section 4.1)
- [ ] Production domain (placeholder allowed until supplied)
- [ ] FAQ page: owner-supplied content, or auto-generate it (section 5.1)?
- [ ] Forum page: owner-supplied content, or auto-generate it (section 5.1 — note the limits on what "auto-generate" can mean here)?
- [ ] Any design preferences beyond what the template already provides (palette, fonts, reference sites)

Once every item is checked off or explicitly deferred, move to the plan below.

Produce a short plan (in chat, not a new file unless asked) covering:

- **Product features.** List the actual features, offerings, or selling points the owner supplied. These drive which pages exist and what each page has to cover — don't plan page structure or content around assumed or generic features for the niche.
- **Keyword map:** one primary search intent per URL, plus a few closely related secondary terms. No two pages target the same primary intent (avoids cannibalization). If the owner supplies a final keyword set, treat it as the source of truth: assign every keyword to a page and do not add, drop, or swap keywords without asking. If two keywords share the same search intent, target them on ONE page. If volume or difficulty data is supplied, use it to choose each page's primary keyword and the build order (section 4.1's prioritization rules). If the owner supplies a full keyword-research package (site structure, keyword map table, per-page draft metadata) rather than a raw list, use it directly as this step's output per section 4.1's package-handling rules instead of re-deriving the structure. Record each page's primary keyword, secondary terms, and slug in the plan, and follow sections 3.1, 4.1, and 6.1.
- **Intent match:** for each page, state whether the intent is informational, commercial investigation, transactional, or navigational, and build the page type to match (guide, comparison, product/detail page, landing page, etc.).
- **Site architecture:** a shallow hierarchy where every important page is reachable within about 3 clicks from the homepage. Group content into topic hubs (a pillar page linking to detailed sub-pages, and back).
- **Information architecture check:** category and section groupings are logical, non-overlapping, and match how a visitor would expect the topic to be organized. No duplicate or near-duplicate categories, no orphaned sections with nothing linking to them, and breadcrumb depth matches the actual URL hierarchy (section 3).
- **URL plan** following section 3.

---

### 1.1 Template adaptation and content isolation (when starting from a provided template repo)

**This section is an absolute requirement (section 0, rule 7) — zero tolerance, not a cleanup pass to get to eventually.** The template exists purely as UI/UX inspiration: take its design, UI style, layout, components, interactions, and functionality. Nothing about the template's original subject matter may ever appear on this site, which covers an entirely different topic. One leaked word, image, or link is a failure of this requirement, full stop — treat it exactly as seriously as a fabricated review or a spam violation (rules 4 and 5), because that's the standard it's held to.

- **Reuse, don't rebuild.** Keep the existing code architecture and reuse existing components wherever they fit, rather than writing new ones that duplicate what the template already provides. Don't remove or break functionality that already works unless this project genuinely needs it changed — if something has to change to fit the new product, change it deliberately and note why, rather than stripping it out by default.
- **Read-only source.** Copy or clone the template into the new project's own working directory before making any changes. Never edit files inside the original template repository, and never commit or push to it (section 0, rule 3).
- **Strip every piece of the template's original content**, with no exceptions, including:
  - all copy and text specific to the old subject (names, descriptions, product data, sample copy) — rewritten for this site's actual topic, not reworded remnants of the old text;
  - all images, screenshots, videos, and their alt text or captions that show or reference the old subject, unless the owner explicitly names a specific neutral asset to keep;
  - all outbound links, canonical URLs, structured data values, and metadata that point to the template's original domain, brand, or product;
  - demo pages, sample blog posts, unused routes, and any other files not relevant to this site's topic or keyword map — remove them, but never remove functional structure (layout, nav, footer, animations, components) the new site still needs.
- **Verify zero leakage — literally zero, not "mostly clean."** After cleanup, search the whole codebase and the rendered build output for the template's original brand name, domain, product name, and any leftover sample strings, links, images, or media filenames. A single match means this requirement has not been met: fix it and search again before treating the base as ready to build content on. Repeat this full search on every audit pass (section 13.5) and again immediately before reporting the work as finished (section 13.7) — a later fix can silently reintroduce a copied snippet, so passing once is not enough.
- **When unsure**, ask whether something is template content to remove or a structural element to keep, rather than guessing either way. Guessing wrong in the direction of keeping template content is the failure mode this rule exists to prevent.

---

## 2. Technical foundation

- **Server-rendered or statically generated HTML.** All primary content, headings, internal links, metadata, and structured data must be present in the initial HTML response. Do not rely on client-side rendering to show indexable content. In Astro this is the default behavior for `.astro` pages — keep it that way (see 2.1).
- **Real links.** All navigation uses `<a href="...">` with crawlable URLs. No click-handler-only navigation, no `href="#"` or `javascript:` links, no hash-fragment routing.
- **HTTPS everywhere.** Redirect HTTP to HTTPS with a single 301. No mixed content.
- **One canonical host.** Choose www or non-www and 301 the other to it. Choose trailing-slash or no-trailing-slash and enforce it consistently with 301s.
- **Correct status codes.** 200 for good pages, 301 for permanent moves (avoid redirect chains, max one hop), 404 for missing pages, 410 for intentionally removed pages. Never return 200 for a "not found" page (soft 404). Provide a helpful custom 404 page with links to key sections.
- **Mobile-first.** Google indexes the mobile version. Mobile content, metadata, structured data, and links must match desktop.
- **Do not block resources.** `robots.txt` must not block CSS, JS, images, or fonts that pages need to render.
- **Clean build.** No console errors, no hydration mismatches, no broken imports, no failing build. Run `astro check` before considering any pass clean (13.5).

### 2.1 Astro implementation notes

Astro's SEO advantage comes from shipping HTML-first, near-zero JavaScript by default. These rules keep that advantage intact rather than accidentally rebuilding a heavy SPA on top of it.

- **Rendering mode.** Default to `output: 'static'` in `astro.config.mjs` so every page is prerendered to plain HTML at build time — the fastest option and the easiest for Google to crawl. Only switch a route to server rendering (`export const prerender = false`, or a global `output: 'server'`/`'hybrid'`) when it genuinely needs per-request data (live pricing, a logged-in view) that can't be prerendered or fetched client-side after the fact. Server-rendered routes need a hosting adapter (`@astrojs/vercel`, `@astrojs/netlify`, `@astrojs/node`, etc.) — pick the one matching where the owner hosts.
- **Islands, not a hydrated app.** Astro components render to static HTML with no client JS unless you add a `client:*` directive. Keep it that way: only hydrate the specific interactive components that need it (a filter, a carousel, a form), and pick the lightest directive that works — `client:visible` or `client:idle` over `client:load` for anything below the fold. Never wrap a whole page or layout in a framework component "to be safe"; that's exactly the JS bloat section 8 is guarding against.
- **Images.** Use Astro's built-in `<Image />` and `<Picture />` components (`astro:assets`) for every content image instead of a bare `<img>`. They generate responsive `srcset`/`sizes`, convert to modern formats, and require `width`/`height` (or infer them for local images), which satisfies section 8 and 9's image rules automatically — don't bypass them with a raw `<img>` unless the image genuinely can't go through the pipeline (e.g. a remote image needing a configured `domains`/`remotePatterns` entry).
- **Metadata and structured data.** Put the title, meta description, canonical, Open Graph tags, and JSON-LD in one shared layout or `<SEO />`/`<Head />` component that every page passes props into, rather than repeating `<head>` markup per page. This is what makes section 4's "unique per page" rules and section 7's JSON-LD both consistent and easy to audit.
- **Sitemap and robots.txt.** Use the official `@astrojs/sitemap` integration, with `site` set in `astro.config.mjs` to the real production domain, so the generated sitemap uses absolute canonical URLs (section 10). Astro doesn't generate `robots.txt` itself — add it as a static file in `public/robots.txt` (or generate it at build time if content needs to vary), with a `Sitemap:` line pointing at the generated sitemap.
- **Content management.** For guides, articles, and similar repeated content types, use Astro Content Collections (`src/content/`) with a Zod schema, so every entry is forced to have the fields section 4 and 7 require (title, description, date, author, etc.) rather than some entries silently missing them.
- **Motion between pages.** If using Astro's View Transitions (`<ClientRouter />` / `<ViewTransitions />`), confirm each route still renders full, correct HTML on a direct load and on a fresh crawl (view-source, not just click-through), since transitions must never become the only way real content appears.
- **Placeholders and config.** Keep the production domain, the `AFFILIATE_LINK_PLACEHOLDER` (section 0), and other environment-specific values in `astro.config.mjs`/env vars (`import.meta.env`), read from one place, not hardcoded per page — same single-source principle as sections 4 and 6.

---

## 3. URLs

- Lowercase, hyphen-separated, short, human-readable, keyword-relevant, ASCII where possible (e.g. `/guides/beginner-setup`). Avoid IDs, dates, and parameters in indexable URLs unless required.
- Stable. **Never break an existing URL.** If a URL must change, add a 301 redirect from the old path to the new one in the same change, and update all internal links to point straight to the new URL.
- No duplicate paths to the same content (with/without slash, uppercase variants, `index.html`, tracking parameters). Canonicalize or redirect them.
- Logical hierarchy that mirrors the site structure and breadcrumbs.
- Keep filter, sort, session, and tracking parameters out of indexable URLs; use canonical tags to the clean URL, or `noindex` where appropriate.

---

### 3.1 Slug optimization rules (every indexable URL)

Build every slug from the page's primary keyword using these rules. Generate slugs with one shared `slugify` helper, never by hand, so the rules apply everywhere.

1. **Characters:** lowercase letters, digits, and single hyphens only. Every path segment must match `^[a-z0-9]+(-[a-z0-9]+)*$`. No uppercase, spaces, underscores, double hyphens, punctuation, or file extensions (`.html`, `.php`).
2. **Contains the primary keyword** in natural word order, so the slug reads like what the page is about (for example `/guides/beginner-loadout`). Use the exact primary phrase where it fits.
3. **Short:** typically 2 to 5 words, and ideally under about 60 characters per segment. Drop filler and stop words ("the", "a", "an", "of", "for", "and", "to", "in") when the meaning stays clear. Do not paste the whole title into the slug.
4. **No repetition or stuffing:** each word once, no lists of secondary keywords or synonyms. Never repeat the parent segment's words in the child (`/guides/ranking-tips`, not `/guides/guides-ranking-tips`).
5. **Evergreen:** no years, months, dates, version numbers, "new," "latest," or counts that will go stale, unless that is the actual topic (for example a specific patch or release). No date-based paths like `/2026/09/`. Updating content must never require a URL change.
6. **Hierarchy:** mirror the site architecture, no more than about 3 levels deep. Parent segments are the topic hub or category keyword; the last segment is the specific topic. Every parent segment must resolve to a real, useful hub page, never a 404.
7. **Unique and stable:** one slug per page, never reused for another page, with no IDs, hashes, query strings, or session parameters. Once published, never change a slug without a 301 (section 3), and update internal links, sitemap, canonical, and breadcrumbs in the same change.
8. **Standard utility slugs:** `/about`, `/contact`, `/privacy-policy`, `/terms`, `/affiliate-disclosure`.
9. **Enforce consistency:** redirect uppercase or mixed-case URLs to the lowercase version with a 301, and apply one trailing-slash style everywhere.

## 4. On-page elements (every indexable page)

**Title tag**
- Unique per page, roughly 50–60 characters, primary keyword near the front where it reads naturally, brand at the end (`Primary Topic | Brand`).
- Written for a human clicking a result, not a keyword list.
- **Keep it direct:** state plainly what the page is or offers. Avoid vague hype, clickbait phrasing, or filler adjectives ("amazing," "ultimate," "unbelievable," "insane") unless the owner's supplied brand voice specifically calls for that tone.

**Meta description**
- Unique per page, roughly 120–160 characters, accurately summarizing the page with a reason to click. It does not affect rankings directly but affects click-through.
- **Keep it direct:** describe exactly what the visitor will find, in literal terms. No exaggerated claims, no teaser withholding the actual content ("You won't believe what's #3"), nothing the page itself doesn't deliver.

**Headings**
- Exactly one `<h1>` per page that clearly states the page topic. Logical `<h2>`–`<h3>` hierarchy with no skipped levels and no headings used purely for styling.

**Canonical**
- A self-referencing absolute canonical URL on every indexable page.

**Robots directives**
- Indexable pages: no `noindex`. Use `noindex, follow` for thin utility pages (internal search results, cart, thank-you pages, login, tag archives with no value). Do **not** block a page in `robots.txt` if you rely on `noindex`, because Google must crawl the page to see the tag.

**Body content**
- Put the primary topic in the first paragraph naturally. Use synonyms and related terms as a human writer would. There is no target keyword density. Never repeat a phrase unnaturally.
- Answer the searcher's question fully and early, then add depth.
- Add descriptive internal links in context (section 6).
- Show an author or publisher, and a "last updated" date on content where freshness matters. Only change the date when the content meaningfully changes.

**Do not**
- Use `meta keywords` (ignored by Google).
- Use identical or templated titles/descriptions/intros across pages.
- Hide text with CSS, off-screen positioning, or tiny/same-color text.

---

### 4.1 Keyword usage and placement

**Source of truth**
- Use the keyword set the owner supplies exactly. Do not invent, drop, merge, or substitute keywords without asking. If none is supplied, ask (section 0, rule 2).
- Every keyword maps to exactly one page in the keyword map (section 1). If a keyword has no natural home, tell the owner instead of forcing it onto a page or ignoring it.
- Treat the mapping as a careful, page-by-page exercise, not an automated find-and-replace: read what each page is actually about and confirm the assigned keyword genuinely matches it before finalizing. A keyword bolted onto a page it doesn't fit hurts more than it helps.

**If the owner supplies a structured keyword-research package**
Sometimes the input isn't a bare keyword list but a full package from prior research: a recommended site structure with slugs, a keyword map table (page/slug, primary keyword, secondary keywords, intent, an estimated volume band, a difficulty rating), a per-page starting draft (title, meta description, H1, H2 suggestions, a recommended schema type, suggested internal links and anchor text, an alt-text pattern), and a short list of keywords the owner still needs to verify in a real keyword tool. When that's what you're given:
- Treat its site structure and keyword map as the keyword map for section 1 directly. Don't re-derive page structure or re-assign keywords from scratch; the volume/opportunity weighing has already been done.
- Use its per-page title, meta description, H1, H2, schema, and internal-link suggestions as the starting draft for that page, then bring each one into full compliance with this file's own rules before shipping: title/meta length and directness (section 4), natural keyword placement (this section), anchor-text rules (section 6.1), and the correct JSON-LD shape (section 7). Rewrite anything that doesn't already comply; don't ship a suggestion as-is just because it was supplied.
- Volume bands and difficulty ratings in the package are estimates unless it says otherwise. Don't restate them as precise figures, and don't quietly treat them as verified.
- Surface the package's own "keywords to verify" list back to the owner in your plan or report rather than dropping it, so they can confirm those in Google Keyword Planner, Ahrefs, Semrush, or Search Console before you finalize the pages built around them.
- If the package conflicts with something already built (an existing slug, an existing page's assigned keyword), stop and ask before overwriting rather than silently reconciling it.

**Prioritization: search volume and ranking opportunity**
- If the owner's keyword set includes search volume, difficulty/competition, or a priority ranking, use it to decide three things: which supplied term becomes each page's PRIMARY keyword, which pages get built and polished first, and how many secondary terms a page can realistically also target.
- Balance volume against realistic ranking chance, don't chase volume alone. For a new or low-authority site, prioritize lower-competition, longer-tail terms first, since they're winnable sooner (see "Reality check" in the ranking-requirements guidance already given); fold higher-volume, more competitive head terms in as the site's authority grows, still only from the supplied set.
- **One primary keyword per page, chosen by best opportunity.** When more than one supplied keyword could fit the same page, assign the one with the strongest combination of volume and realistic ranking chance as the primary, and work the others in naturally as secondary terms (section 4.1's "Secondary and related terms") on that same page. Never make two keywords co-primary on one page, and never spin up a second near-duplicate page just to give a runner-up keyword its own primary slot (section 0, rule 5).
- **Don't drop the smaller keywords.** Every supplied keyword still gets a home, even a lower-volume one — as a secondary term on a related page, or as the primary of a smaller supporting page, unless the owner says to leave it out.
- **No invented numbers.** If the supplied set has no volume or difficulty data, say so and proceed by matching keywords to pages on relevance and intent alone (section 1); never fabricate a volume figure or a ranking-chance estimate.

**Where the primary keyword goes (only where it reads naturally)**
1. Title tag, toward the front when it reads well.
2. `<h1>`: the exact phrase or a very close variant. The H1 does not have to match the title exactly.
3. URL slug (section 3.1).
4. The first paragraph, ideally within the first 100 or so words.
5. Meta description, once, naturally.
6. At least one `<h2>` or `<h3>` that uses a secondary or related term (not always the primary).
7. The alt text of one image that genuinely shows the topic.
8. The anchor text of some internal links pointing to the page (section 6.1).

If a placement makes the text read unnaturally, leave the keyword out of that spot. Never force it.

**Secondary and related terms**
- Use roughly 2 to 5 secondary terms per page: same-intent phrases, synonyms, plural and singular forms, question forms, and related entities and subtopics. Use them as `<h2>`/`<h3>` topics and naturally in the body.
- Cover the subtopics and questions a searcher would expect answered, so the page fully satisfies the intent, rather than repeating one phrase.

**Repetition limits**
- There is no keyword density target. After the placements above, use the exact primary phrase only where a sentence needs it; otherwise use pronouns, synonyms, and variants.
- Read-aloud test: if a sentence sounds written for a search engine, rewrite it. If the exact phrase appears in nearly every paragraph or heading, rewrite the page.
- Do not put the exact keyword in every heading, list item, image alt, or link.
- No keyword-rich boilerplate: no repeated keyword phrases in footers, sidebars, or site-wide blocks; no hidden text; no meta keywords; no keyword or location lists at the bottom of pages.
- Do not create near-duplicate pages by swapping keyword variants (section 0, rule 5).

**Intent and page type**
- Match the keyword's intent: informational gets a guide, commercial investigation gets a comparison or review, transactional gets a product or landing page, navigational gets a brand page.
- The homepage targets the brand plus the site's main topic, not a long list of keywords.

## 5. Content quality (people-first)

- Each page must provide something a searcher can't get by reading the top existing results: original explanation, firsthand experience, real data, clearer structure, better visuals, or more accurate detail.
- **Affiliate and commercial pages:** add real value beyond merchant descriptions (comparisons, selection criteria, honest pros and cons, specifics from real use, buying guidance). Thin pages that merely repackage product listings and push affiliate links violate Google's spam policies.
- **Trust signals (E-E-A-T):** include an About page, a Contact page, author bylines with short bios where relevant, sources or references for factual claims, an editorial/review methodology page for review sites, and clear Privacy Policy and Terms pages. Use real information supplied by the owner; use placeholders if not.
- **Affiliate disclosure (short, unbranded, unnamed).** Every page that contains affiliate links must carry a brief, generic disclosure. Rules:
  - **Default text (English):** "Some links on this site are affiliate links. If you buy through them, we may earn a commission at no extra cost to you." Remove the "no extra cost" phrase if it is not true for the program in use.
  - **Optional short label** next to individual buy/shop buttons: "Affiliate link".
  - **Unbranded and unnamed:** the disclosure text, the label, and the disclosure page must not name any company, brand, employer, client, agency, or affiliate network, and must not describe who runs the site beyond the site's own name. It states only that commissions may be earned. **Exception:** if an affiliate program's terms require exact wording (for example a mandated sentence naming the program), use that exact wording when the owner provides it.
  - **Placement:** directly above the first affiliate link on the page, or immediately beside the link or button. Do not rely on the footer alone.
  - **Visibility:** rendered in the initial HTML (not injected by JavaScript), in the site's normal body font, at a legible size (not smaller than the small body text style), with contrast of at least 4.5:1. It must never be hidden in a tooltip, hover state, collapsed accordion, carousel, or image, and never styled to be hard to notice.
  - **Design:** one line of plain text matched to the design. No banners, popups, modals, sticky bars, or icons that add clutter.
  - **Dedicated page:** a short `/affiliate-disclosure` page repeating the same generic statement, linked from the footer. It follows the same unnamed rules.
  - **Single source of truth:** store the disclosure text, the short label, and the page path in ONE config location, so the owner can change the wording site-wide in a single edit.
  - **Never omit it** on any page that contains affiliate links.
  - This is separate from `rel="sponsored"`, which is for search engines. Both are required.
- **No AI-flavored filler.** Write specific, varied, concrete copy.
  - Avoid stock openings and buzzwords: "In today's fast-paced world," "look no further," "unlock," "elevate," "seamless," "game-changer," "delve," "revolutionize," "cutting-edge," "ultimate guide" repeated on every page.
  - Vary sentence length and structure. Do not repeat the same sentence templates across pages.
  - Never pad to hit a word count. Length should match what the topic needs.
- Keep facts accurate and current. If unsure, leave a `TODO:` for the owner to verify instead of guessing.

### 5.1 FAQ and forum pages

**Always ask first.** For both the FAQ page and the forum page, ask the owner whether they're supplying the content or want it auto-generated — never assume either way, and treat it as part of the required inputs checklist (section 1). If the owner supplies content, use it as given (follow it the same way the keyword-research package is followed in section 4.1: don't silently add, cut, or rewrite it beyond this file's normal formatting rules).

**If the FAQ is auto-generated:**
- Every question must be genuinely relevant to the site's topic and niche — no generic filler questions that could belong to any site.
- Pull real information from the affiliate/product page the owner supplied (features, pricing, policies, specs) so answers are factually grounded, not invented. Anything the source page doesn't cover gets a `TODO:` instead of a guess (section 0, rule 4).
- Cover a mix of intents across the question set, matching the keyword map where relevant (section 4.1): some informational ("how does X work," "what is X"), some commercial-investigation ("is X worth it," "X vs the alternative"), some transactional ("where to buy X," "how much does X cost"). Don't make every question push toward a purchase — that reads as thin and fails the "genuinely useful" standard above.
- Writing style: catchy and genuinely engaging, not a flat Q: / A: list — but never at the expense of actually answering the question. Each answer should be explanatory and helpful first, persuasive second. Follow the "No AI-flavored filler" rules just above: no stock openings, no buzzword padding, varied sentence structure, nothing that reads like a template repeated per question.

**If the forum is auto-generated — read this carefully, it's a hard limit, not a style note:**
- A forum implies real people having a real conversation. Auto-generating fake usernames, avatars, post dates/times, reply counts, upvotes, or back-and-forth exchanges designed to look like genuine user posts is fabricated social proof — the same category of violation as a fake review or testimonial (section 0, rule 4), and it risks being treated as fake engagement under Google's spam policies, which undermines the entire point of this file.
- Build it instead as genuine editorial content in the site's own voice, styled like a community/discussion page (grouped topics, a conversational tone, "Common questions from the community" framing) but **never attributed to invented individual people**. Don't invent names, avatars, timestamps, or reply chains.
- If the owner actually wants a real, functioning multi-user forum (real accounts, real posts accumulating over time), that's a product/engineering decision, not a content-generation one — flag this back to the owner rather than faking the content to simulate one.
- Everything else about auto-generated FAQ content above (relevance to niche, pulling real info from the affiliate page, mixed keyword intent, engaging-but-substantive writing) applies equally here.

---

## 6. Internal linking and navigation

- Every indexable page is linked from at least one other page (no orphan pages) and appears in the XML sitemap.
- Use descriptive anchor text that describes the destination. Never "click here" or "read more" as the only anchor. Vary anchors naturally; do not exact-match the same keyword every time.
- Hub-and-spoke structure: pillar pages link to sub-pages; sub-pages link back to the pillar and to closely related siblings.
- Add visible **breadcrumbs** on all non-home pages, with `BreadcrumbList` structured data matching them.
- Primary navigation and footer link to the most important pages only. Avoid giant link dumps.
- Pagination uses real crawlable links, and each paginated page has its own self-referencing canonical. Do not canonicalize page 2+ to page 1.
- Link to authoritative outside sources where it helps the reader. Outbound links are not a ranking boost by themselves; use them for credibility and usefulness.
- **Affiliate and sponsored links:** `rel="sponsored nofollow noopener"` (add `target="_blank"` only if the design calls for it). Untrusted user-generated links: `rel="ugc nofollow"`.

---

### 6.1 Anchor text rules

1. **Descriptive and accurate.** The anchor tells readers and search engines what the destination is about, usually in 2 to 6 words, and must truthfully describe that page.
2. **In context.** Prefer links inside body sentences where the topic naturally comes up over blocks of stacked links.
3. **Vary naturally.** For each target page, mix the exact primary keyword (fine for internal links, which you control, but not on every link), partial and long-tail variants, the page's name, and phrases that fit the sentence. Do not use the identical anchor to the same page from every page. Do not be robotic.
4. **One anchor phrase, one destination.** The same anchor text must never point to different URLs. Different anchors pointing to the same URL are fine.
5. **Never use these as the only link text:** "click here," "here," "read more," "learn more," "more," "this link," "link," or a raw URL (unless the URL is itself the content).
6. **"Read more" buttons in the design:** keep the visible text and add visually hidden text with the topic so the accessible name is descriptive, for example `Read more<span class="sr-only"> about [topic]</span>`. For cards, make the card's heading the link text instead of a bare "Read more."
7. **Image links:** the image's alt text acts as the anchor, so it must describe the destination.
8. **Navigation labels:** short, clear, and descriptive, with a keyword where it reads naturally ("Gaming Guides," not "Resources"). The same label always goes to the same destination. Breadcrumb labels use each page's own name.
9. **No stuffing, no redundancy:** no keyword lists as anchors, no sentence-long anchors, no wrapping whole paragraphs in links, and no repeating the same linked phrase within a paragraph. Do not link the same phrase to the same destination more than once within the same page unless it's a repeated, deliberate call-to-action (like a "Buy now" button appearing at top and bottom) — once a page has already linked to a destination, don't re-link the identical anchor text to it again further down for no navigational reason.
10. **Relevance and count:** link only where the destination genuinely helps the reader at that spot. Each page should connect to its parent hub, closely related pages, and logical next steps, not to everything.
11. **External and affiliate anchors:** describe the destination or product ("official patch notes," the product name). Call-to-action buttons such as "Check price" are fine when the product name appears in the surrounding text or the accessible name. Apply the `rel` values from section 6.
12. **Audit it.** On every pass, crawl all internal links and produce an anchor-to-destination table. Flag generic or empty anchors, the same anchor pointing to different URLs, image links without alt text, broken or redirecting links, and identical anchors used everywhere for the same target.

## 7. Structured data (JSON-LD)

- Use JSON-LD in the initial HTML. Markup must describe content that is **visible on the page** and must be accurate.
- Baseline for most sites: `Organization` (or `Person`) and `WebSite` (with `name`) on the homepage, `BreadcrumbList` on inner pages.
- Add by page type where it truly applies: `Article`/`BlogPosting` (headline, image, datePublished, dateModified, author), `Product` (only for pages genuinely about a product, with real data), `SoftwareApplication`, `VideoObject`, `ImageObject` on pages where a specific image is the point of the content (a screenshot guide, a gallery), `LocalBusiness` for real physical businesses.
- Only mark up `Review`/`AggregateRating` for genuine, visible reviews. Never fabricate.
- Do not add `FAQPage` or `HowTo` markup expecting rich results; Google has drastically limited or removed those. An FAQ section is fine as regular visible content.
- Validate every template with Google's Rich Results Test and the Schema.org validator during verification. Fix all errors and warnings you can.

---

## 8. Performance and Core Web Vitals

Targets at the 75th percentile: **LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1.** Aim for Lighthouse mobile Performance, Accessibility, Best Practices, and SEO scores of 90+.

- **Images**
  - Serve modern formats (AVIF/WebP) with fallbacks, in responsive sizes via `srcset`/`sizes`, and never upscale.
  - Always set `width` and `height` (or `aspect-ratio`) to prevent layout shift.
  - Lazy-load below-the-fold images. **Do not lazy-load the LCP image**; give it `fetchpriority="high"` and preload if needed.
  - Keep images high-definition and sharp: use sources at least as large as the largest rendered size (and 2x for dense screens where sensible), then compress sensibly.
  - Use descriptive file names (`red-mountain-bike-frame.webp`, not `IMG_0042.webp`).
- **Fonts:** self-host, subset, limit weights and families, use `font-display: swap`, preload only the critical font files.
- **JavaScript:** ship as little as possible. Code-split, defer non-critical scripts, avoid heavy libraries for simple effects, and load third-party scripts (analytics, widgets, chat) late and sparingly.
- **CSS:** Astro scopes and bundles component CSS automatically and inlines small stylesheets by default — don't fight that by pulling in a heavy global CSS framework for a few utility classes. Remove unused CSS; keep third-party stylesheets to a minimum.
- **Animations:** animate `transform` and `opacity` only, avoid layout-triggering properties, never let animation cause layout shift or block first paint, and respect `prefers-reduced-motion`.
- **Delivery:** enable Brotli/gzip, long-lived immutable caching for hashed static assets, and use a CDN if hosting allows.
- No intrusive interstitials or popups that cover content on load, especially on mobile.

---


## 9. Images, media, and alt text

- Meaningful images have concise, descriptive `alt` text that describes what the image shows in context. Decorative images use `alt=""`. Do not stuff keywords into alt text.
- Images are embedded with `<img>` or `<picture>` (not only as CSS backgrounds) when they carry content.
- Provide an XML image sitemap only when images are a major traffic source; otherwise list them naturally in page content.
- Every image must load and be sharp. No broken paths, no blurry placeholders left in production, no stretched images.
- Open Graph and Twitter Card images: 1200×630, unique per key page, with `og:title`, `og:description`, `og:url`, `og:type`, `og:image`, and `twitter:card`.
- Provide a favicon (SVG or PNG in multiples of 48×48), an Apple touch icon, and a web manifest.
- Video: provide a real, crawlable page for each video, with a transcript or descriptive text, and `VideoObject` markup where applicable.

**Relevance and uniqueness**
- Every image must genuinely relate to the content next to it. Don't drop in a generic stock photo just to fill space; pick (or generate) something that actually illustrates the topic on that page.
- **Avoid picture repetition.** Don't reuse the same image more than once across the site as a default habit — check what's already been used elsewhere before placing an image, and pick a different one from the provided set (or a different crop/angle of the same subject) when one's available. A provided image repeated purely for convenience, not because it's genuinely the right image for that spot, is what this rule is against. Repeated generic imagery also reads as thin, templated content, which works against the "genuinely useful" standard in section 5.
- Each page's hero/primary image should be distinct from its siblings' where the content itself is distinct (e.g. different products, different guides), not a copy-pasted placeholder.

**Upscaling and resolution**
- For every provided image, serve it at the sharpest resolution that's actually useful for where it's displayed: if the source's native resolution is lower than what the largest rendered size needs (accounting for 2x pixel density on retina/high-DPI screens), upscale it with a quality method (e.g. Sharp's Lanczos/cubic resampling, or a proper AI upscaler if the project has one available) rather than letting the browser stretch a low-res file — that's what causes the blurry/stretched look section 9's base rules already prohibit.
- **Don't upscale past what's needed.** More pixels beyond the largest display context (2x the biggest rendered size) adds file weight with no visible benefit and works directly against the performance budget in section 8 — this is the balance the owner asked for: maximize sharpness up to the point of diminishing returns, not indefinitely.
- An upscaled image still goes through the normal pipeline: generate the responsive `srcset` sizes down from the upscaled master, convert to modern formats, and compress, so the delivered bytes stay within the LCP and page-weight targets even though the source was enhanced. In Astro, this means feeding the upscaled file into `<Image />`/`<Picture />` (section 2.1) rather than serving the raw upscaled file directly.
- If a source image is so low-resolution that even upscaling can't make it look acceptably sharp at the size it needs to display, don't ship a visibly artifacted result — flag it and ask the owner for a better source instead.
- Never upscale an image that's already high resolution; there's nothing to gain and it only adds weight.

**Authenticity**
- Never present an AI-generated, stock, or mockup image as if it were an authentic screenshot, in-product photo, or user-submitted photo. This falls under section 0 rule 4 (never fabricate): a misleading image is the visual equivalent of a fake testimonial.
- If an image is AI-generated, illustrative, or a stock photo standing in for the real thing, don't caption or alt-text it in a way that claims otherwise (no "actual gameplay screenshot" on an image that isn't one).
- Where a real screenshot is used, make sure it's actually current and accurate to what it claims to depict; don't reuse an outdated or mismatched screenshot because it's convenient.

**Rights and licensing**
- Only use images you own, have properly licensed (purchased stock, a platform's press kit, a similar legitimate source), or are generating yourself. Never scrape or copy images directly from another site.
- Where a source requires attribution, credit it visibly (a caption or a credits page), and follow the source's specific usage terms (e.g. a game's press/fan-art policy) rather than assuming any image found online is free to use.

**Captions**
- Add a visible caption where it adds context a reader would want (what a screenshot shows, a source credit, a data label). Not every image needs one; use them where they genuinely help, not as decoration.

---

## 10. Crawling and indexing files

**robots.txt** (at the site root)
- Allow crawling of all public content. Disallow only true utility paths (admin, cart, internal search, API endpoints).
- Include `Sitemap: https://<domain>/sitemap.xml`.
- Do not use `robots.txt` to try to hide content that should not be public.

**XML sitemap**
- Generated automatically at build/deploy time. Include only canonical, indexable, 200-status URLs. Exclude redirects, `noindex` pages, and 404s.
- Include `<lastmod>` with the real last-modified date only when content actually changed. Google ignores `priority` and `changefreq`, so leave them out.
- Split into multiple sitemaps (with an index) if you exceed 50,000 URLs or 50 MB.

---

## 11. Accessibility (also supports SEO)

Target WCAG 2.2 AA.

- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`, `<button>` for actions and `<a>` for navigation. Exactly one `<main>` per page, and heading levels are never skipped (matches section 4's `<h1>`–`<h3>` rule).
- Landmark and screen-reader support: unique `aria-label`s where multiple `<nav>` regions exist, a logical reading and tab order that matches the visual layout, and no content or functionality available only via hover, drag, or color alone.
- A visible focus style on every interactive element; full keyboard operability (everything clickable is reachable and usable by keyboard alone, including menus, modals, and carousels); a "skip to main content" link as the first focusable element.
- Color contrast at least 4.5:1 for body text and 3:1 for large text and UI components.
- Touch targets at least 24×24 CSS px (aim for 44×44 on mobile), with adequate spacing.
- Forms: a visible, programmatically associated `<label>` on every field, grouped fields use `<fieldset>`/`<legend>`, required fields are marked both visually and in markup, and validation errors are specific, associated with their field, and announced to screen readers (not conveyed by color alone). Correct `aria-*` only where native HTML cannot express the semantics; do not add redundant ARIA.
- Media: video and audio content gets captions or a transcript, and no content autoplays with sound.
- Images and icons follow section 9's alt-text rules; purely decorative icons are hidden from assistive tech (`aria-hidden="true"`).
- Text must scale and reflow up to 200% zoom without loss of content. No horizontal scrolling at 320 px width.
- Respect `prefers-reduced-motion` and `prefers-color-scheme` where the design supports it.
- `lang="en-US"` is set correctly on the `<html>` tag so screen readers use the right pronunciation.
- Run an automated scan (e.g. axe) as part of section 13's audit passes.

---

## 12. Design and UX guardrails

These support engagement and keep the site from looking generic or auto-generated. Default aesthetic direction: clean and minimalistic — this guides the *amount* of decoration and effects below, not an excuse to skip them.

- The site must feel professional and polished, with a consistent design system: spacing scale, type scale, limited palette, and reusable components. If a template is provided, follow it; do not introduce a different style.
- **No pill-shaped (fully rounded) buttons** unless the supplied template already uses them. Use the template's or design system's button shape consistently.
- Avoid the generic AI-site look: default gradient blobs, glassmorphism on everything, unexplained emoji as icons, stock three-column "features" grids on every page, and identical hero layouts across pages.
- **Avoid unnecessary empty space.** Use the spacing scale deliberately — generous whitespace around content is fine and often desirable, but don't leave large dead gaps just because a section has little content; pull sections together, add a supporting element, or resize to fill the layout intentionally. This cuts both ways: don't cram content either.
- Motion should be smooth, purposeful, and subtle (see section 8). Buttons and interactive elements need clear hover, focus, and active states.
- Fully responsive from 320 px to large desktop, tested on both mobile and desktop layouts. No overflow, clipped text, or overlapping elements.
- Fast, obvious navigation and a clear primary call to action on every page. Buttons that lead to external destinations (such as affiliate links) must open correctly, be clearly labeled, and follow the link rules in section 6.
- No layout shift from late-loading ads, embeds, images, or fonts.
- **Internal linking is a design requirement, not just a technical one.** Weave contextual links into body copy, cards, and related-content modules throughout the site, not only in the nav and footer, so visitors (and crawlers) always have an obvious next page to go to — follow the anchor rules in section 6.1.

**Homepage image preview.** If the owner supplies product/game images, the homepage includes a clearly visible preview or gallery section showcasing them (a grid, carousel, or featured-image block, matching the template's component style where one is supplied). Images in it follow section 9's relevance, authenticity, and licensing rules — no filler stock images standing in for real provided ones.

**Hover animations.** Give interactive elements (buttons, cards, nav items, images in a gallery) a clear, consistent hover treatment — a subtle scale, color shift, underline, or elevation change. Keep it uniform across the site rather than a different effect per component. Every hover effect needs a matching focus state for keyboard users (section 11) — never make hover the only way to reveal something.

**Dynamic reveal, 3D scroll, and text effects.** Scroll-triggered reveals, parallax/3D-style scroll effects, and 2D text effects (fades, reveals, subtle gradient or split-text animations) are welcome for visual appeal, within hard limits:
- The underlying content must already be present in the initial HTML (section 2) — these are presentation effects layered on content that exists regardless of JS or scroll position, never a substitute for it. A crawler or a user with JS disabled must still get the full text.
- Animate only `transform` and `opacity` (section 8); never animate properties that trigger layout, and never let an effect cause layout shift.
- Respect `prefers-reduced-motion` (sections 8 and 11): provide a reduced or static fallback, not just a shorter version of the same motion.
- Text used in a "2D text effect" stays real, selectable text in the DOM (not an image or canvas rendering of it) so it's still indexable and accessible.
- In Astro, isolate these effects in their own components hydrated with the lightest directive that works (`client:visible` for below-the-fold scroll effects) rather than hydrating the whole page (section 2.1) — this is what keeps heavy animation from wrecking the Core Web Vitals budget in section 8.

**Libraries and resources.** Use free, popular, well-maintained libraries for animation and scroll effects (for example GSAP's free core and ScrollTrigger, AOS, Intersection-Observer-based vanilla approaches, or a lightweight smooth-scroll library) rather than hand-rolling complex effects from scratch. Before relying on a specific plugin or feature, confirm it's actually covered by the library's free tier/open-source license — some ecosystems gate specific plugins behind a paid plan — and avoid pulling one in if it isn't. Self-host or load from the approved script hosts only if the site will later be published as a standalone artifact (section 2's hosting constraints); for a full Astro project built and deployed normally, install via npm like any other dependency and keep bundle size part of the section 8 performance budget.

---

## 13. Multi-pass verification and regression protection (mandatory)

The goal is a site where everything is correct **at the same time**. Fixing one thing must never quietly break another, and no fix may be left half-done. Follow this protocol exactly. Do not report "done" until the completion criteria at the end of this section are met.

### 13.1 While building

- Build in small vertical slices (for example: global layout, then homepage, then one page template, then the next). After each slice, run the build and check that slice against the checklist in 13.5 before starting the next one.
- Put shared logic (metadata helpers, SEO components, JSON-LD generators, link components, image components) in **one place** and reuse it, so a fix applies everywhere at once instead of page by page.

### 13.2 Baseline snapshot

Once the first complete build works, record a baseline in chat:

- The full list of URLs and their status codes.
- For every page: title, meta description, canonical, `<h1>`, robots directive, and the JSON-LD types present.
- Sitemap URL count and `robots.txt` contents.
- Lighthouse mobile scores and LCP, INP (or TBT as a lab proxy), and CLS for the homepage and each distinct page template.
- Internal link count per page and any broken links.

Use commands or throwaway scripts to collect this from **every** URL programmatically. Do not spot-check a few pages and assume the rest match. Do not leave throwaway audit scripts in the repository unless the owner asks.

### 13.3 The passes

| Pass | Purpose | What to do |
|---|---|---|
| **Pass 1: Audit** | Find everything that is wrong | Run the full checklist in 13.5 across every page template and both mobile and desktop widths. Write a numbered **defect log** of every issue. Do **not** start fixing piecemeal. Group defects by root cause. |
| **Pass 2: Fix** | Resolve root causes | Fix by root cause, one logical change at a time, following the fix rules in 13.4. After each change, rebuild and re-run the checks it could affect (see 13.6) before moving on. |
| **Pass 3: Full regression audit** | Prove the fixes worked and broke nothing | Start from scratch: rerun the **entire** checklist on **everything**, and diff against the baseline. Any difference not intended is a regression. Add new defects to the log. |
| **Pass 4 and beyond** | Converge to zero | Repeat fix, then full audit, until one complete audit finds **zero** defects (a "clean pass"). |

Minimum: three passes after the first working build. If the defect count has not dropped after three fix-and-audit cycles, stop adding patches. Report the stuck items, what you tried, and your recommended approach, and let the owner decide, rather than piling on risky changes.

### 13.4 Fix rules (prevents half-fixes and new breakage)

1. **Fix the cause, not the symptom.** Find why the problem exists, then fix it at that level (component, layout, config, helper), not by patching one page.
2. **Fix every instance.** After finding one occurrence of a problem, search the whole codebase and all built output for the same pattern (search for the class, prop, tag, or string) and fix all of them across the whole site. A fix is only complete when the search finds zero remaining occurrences.
3. **One logical change at a time.** Rebuild and verify after each. If a change causes a new problem, **revert that change** and rethink. Do not stack workarounds on top of a broken fix.
4. **Never "fix" by removal or suppression.** Do not delete content, features, pages, structured data, or images; disable lint, type, or accessibility rules; add `noindex`; block pages in `robots.txt`; loosen a threshold; or hide an error, just to make a check pass. If a requirement seems impossible, say so in the report.
5. **Keep diffs minimal and focused.** Do not refactor, rename, reformat, or restyle unrelated code while fixing. Review the diff (`git diff`) at the end of each fix batch and confirm every changed line is intentional. Do not commit unless the owner has explicitly told you to (section 0, rule 3, and 13.8).
6. **Preserve what was already correct.** Anything that passed in an earlier pass must still pass. If a later fix changes it, that is a regression to be fixed immediately.
7. **Do not guess.** If you are unsure whether a change is safe, test it in a build first or ask the owner.
8. **Evidence over claims.** Never write "fixed," "verified," or "passes" for something you did not actually run and observe. State what you checked and how. State plainly what you could not check.

### 13.5 The checklist (run in full on every audit pass)

Run what the environment allows, and state clearly what you could not run.

- [ ] Production build succeeds with no errors or warnings that affect output.
- [ ] Every indexable page has a unique title, meta description, one `<h1>`, and a self-referencing canonical. Titles and descriptions are direct and literal, with no clickbait or unsupported hype.
- [ ] Information architecture: no duplicate or overlapping categories, no orphaned sections, breadcrumb depth matches the URL hierarchy.
- [ ] Template isolation (if built from a provided template) — **absolute requirement, section 0 rule 7:** a full-codebase and rendered-output search finds zero leftover text, images, video, links, structured data, or filenames from the template's original subject matter; the original template repository has no local edits and was not committed or pushed to. Any match found fails this pass outright.
- [ ] Buy, purchase, and pricing buttons all point to the single affiliate-link placeholder (or the real link, once supplied) via the one config source, never a fabricated URL, and any placeholder still in place is listed in the final report.
- [ ] View the rendered HTML source of key templates: primary content, links, metadata, and JSON-LD are present without JavaScript.
- [ ] No broken internal links, no redirect chains, no orphan pages; every old URL that changed has a 301.
- [ ] `robots.txt` and `sitemap.xml` are reachable, correct, and consistent with the pages' indexability.
- [ ] Structured data validates (Rich Results Test / Schema validator).
- [ ] Lighthouse (mobile) and, if possible, PageSpeed Insights: Performance, Accessibility, Best Practices, SEO all 90+; LCP, INP, CLS meet targets.
- [ ] Accessibility scan (e.g. axe) passes with no critical or serious issues; keyboard test done on key flows including menus, modals, and forms; form labels and error messages are correctly associated.
- [ ] Images: all load, sharp, correctly sized, with dimensions, alt text, and modern formats. Each image is genuinely relevant to its page, and no provided image is reused across the site where a different one was available; nothing AI-generated, stock, or mocked-up is captioned or alt-texted as an authentic screenshot or photo; every image is owned, properly licensed, or self-generated, with attribution where the source requires it. Low-resolution sources are upscaled to match their display size (not beyond it), with no stretched or artifacted results, and the delivered file sizes still fit the section 8 performance budget.
- [ ] Affiliate/external links carry the right `rel` values. Every page with affiliate links shows the short unnamed disclosure in the initial HTML at the specified placement, the text comes from the single config source, and it names no company or brand.
- [ ] Keywords: every supplied keyword is mapped to exactly one page; no two pages share a primary keyword; each page's primary keyword appears naturally in its title, `<h1>`, slug, and first paragraph; no keyword stuffing, unnatural repetition, keyword-rich boilerplate, or duplicated copy across pages; no filler phrases from section 5. Where volume/difficulty data was supplied, each page's primary keyword is the best realistic combination of the two, not just the highest-volume option; no invented volume or ranking-chance figures anywhere.
- [ ] Slugs: every path segment matches `^[a-z0-9]+(-[a-z0-9]+)*$`; slugs contain the primary keyword, are short, and have no stop-word clutter, repeated words, dates, IDs, or extensions; every parent path segment resolves to a real page; no duplicate slugs; uppercase URLs 301 to lowercase.
- [ ] Anchors: the crawled anchor-to-destination table shows no generic or empty anchors, no anchor pointing to more than one URL, no image links without alt text, no overly repetitive identical anchors, and no broken or redirecting internal links.
- [ ] Responsive check at 320, 375, 768, 1024, and 1440 px widths.
- [ ] Pricing plans: names, prices, and features match the real affiliate/product page exactly, with nothing invented; the plans are up to date if the source page changed since the last pass.
- [ ] FAQ/forum pages (if auto-generated): every question is genuinely relevant to the niche; facts trace back to the real affiliate/product page or carry a `TODO:`; question intents are mixed (informational/commercial/transactional) rather than all pushing a sale; no invented usernames, avatars, timestamps, or fake engagement on the forum page; writing passes the "No AI-flavored filler" check.
- [ ] Homepage image preview/gallery is present, uses only real provided images (no filler), and follows section 9's relevance and authenticity rules.
- [ ] Every hover effect has a matching keyboard focus state; nothing essential is revealed only on hover.
- [ ] Dynamic/scroll/text effects: the underlying content is present in the page's initial HTML regardless of JS or scroll position; only `transform`/`opacity` are animated; `prefers-reduced-motion` has a real fallback; animated text is still real, selectable DOM text.
- [ ] No `TODO:` placeholders left in indexable pages without being listed in the report.
- [ ] Coverage: every URL and every page template was checked programmatically, not only the homepage.
- [ ] No regressions against the baseline: URLs, titles, descriptions, canonicals, structured data, sitemap entries, redirects, alt text, and Lighthouse scores are unchanged or improved, except where a change was intended and logged.

### 13.6 Fixes that commonly break other things (re-check these after related changes)

| If you change... | Re-check... |
|---|---|
| Image sizes, formats, or lazy loading | Layout shift (CLS), LCP image not lazy-loaded, alt text, broken paths, sharpness |
| Fonts or CSS | Layout shift, text reflow, contrast, responsive layouts at all widths |
| Animations or scripts | INP, LCP, reduced-motion support, no content hidden from the initial HTML |
| Layout, header, footer, or nav components | Every template, internal links, breadcrumbs, focus order, mobile menu |
| A URL, slug, or route | 301 redirects, internal links, canonicals, sitemap, breadcrumbs, structured data URLs |
| Canonical or robots settings | Sitemap contents, `noindex` pages not blocked in `robots.txt` |
| Structured data | Match with visible content, validity, every template using it |
| Titles, headings, or copy | Uniqueness across pages, keyword stuffing, primary keyword still present in title, `<h1>`, and first paragraph, character lengths, one `<h1>` |
| Internal links, anchor text, or nav labels | Anchor-to-destination consistency, generic anchors, breadcrumbs, broken or redirecting links, link counts against the baseline |
| Third-party scripts or embeds | Performance scores, layout shift, privacy and consent behavior |
| Dependencies, `astro.config.mjs`, or integrations | Full build (`astro build` / `astro check`), prerendered HTML output for every route, sitemap config still correct |
| Any file copied from the template | Re-run the template-leakage search (1.1) — a copy-paste during a fix can reintroduce old content |

### 13.7 Completion criteria

You may report the work as finished only when **all** of these are true:

- A full audit pass (the entire checklist, all URLs, both viewports) found **zero** defects.
- If the site was built from a template repo, the template-leakage search (section 1.1) was re-run on the final build and found **zero** matches. This is an absolute requirement (section 0, rule 7) — not negotiable against any other criterion here.
- The final build succeeded after the last change, and the final audit ran **after** that build. Never make a change after the last clean pass without re-running a full pass.
- No unintended difference from the baseline remains.
- The defect log shows every item as fixed and verified, or explicitly listed as an open item with the reason.

---

### 13.8 Committing and pushing (only when the owner explicitly says so)

Follow this only after an explicit instruction as defined in section 0, rule 3. Without one, leave all changes uncommitted in the working tree.

1. **Confirm the target.** Run `git remote -v` and `git branch --show-current`. The remote must be the owner's own project repository, not the original template repository or an upstream. The branch must be the one the owner named (normally `main`). If either is wrong, stop and tell the owner.
2. **Review what will be committed.** Run `git status` and `git diff`. Only intended files may be included. Never commit secrets (`.env` files, API keys, tokens), throwaway audit scripts, editor or OS junk files, or accidental large files. Fix `.gitignore` if needed.
3. **Check readiness.** The latest build must pass and the last audit pass must have been clean (section 13.7). If not, tell the owner exactly what is failing and push only if they confirm again after hearing it.
4. **Commit clearly.** Use a clear, descriptive message that says what changed and why. Keep commits focused on one logical change where practical.
5. **Mention auto-deploy.** If you can see that `main` is connected to automatic deployment (for example a Vercel or Netlify config), tell the owner that pushing will publish the site before you push.
6. **Push normally.** Never use `--force` or rewrite history. If the push is rejected because the remote has newer commits, or there are merge conflicts, stop, explain what happened, and offer options. Do not overwrite the remote.
7. **Report back.** State the commit hash, branch, remote, and a short summary of the files changed.
8. **Permission ends here.** The instruction covered this commit and push only. Any further commit or push needs a new explicit instruction.

## 14. Final report to the owner

When finished, reply in chat with:

1. **What was built**, in a few lines, and any assumptions made.
2. **Verification results:** how many passes you ran, the defect log (each issue, its root cause, the fix, and how you verified it), before and after scores, confirmation that the final pass was clean, and anything you could not check.
3. **Open TODOs** the owner must supply or confirm (real content, contact details, legal pages, the production domain, the real affiliate link to replace the `AFFILIATE_LINK_PLACEHOLDER`).
4. **Human-only SEO tasks** to do after launch:
   - Verify the site in Google Search Console and submit the sitemap; check the Pages and Core Web Vitals reports after a few weeks.
   - Set up Bing Webmaster Tools.
   - Set up privacy-compliant analytics.
   - Build authority through legitimate, relevant backlinks: original data or tools, digital PR, guest contributions, and partnerships. No paid link networks or bulk directories.
   - Keep publishing and updating content that deserves to rank; refresh pages as facts change.
   - Monitor rankings and fix indexing or performance issues as they appear.

Do not commit, push, deploy, or publish anything unless the owner has explicitly told you to (section 0, rule 3). Finish by asking whether they want you to commit and push to `main`, and wait for their answer.
