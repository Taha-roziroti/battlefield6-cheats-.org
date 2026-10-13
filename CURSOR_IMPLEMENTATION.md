# Cursor implementation brief

Implement the six Battlefield 6 content pages using the provided MDX files in `pages/`.

## Required routes
- `pages/home.mdx` → `/`
- `pages/aimbot.mdx` → `/battlefield-6-aimbot/`
- `pages/esp.mdx` → `/battlefield-6-esp/`
- `pages/hwid-spoofer.mdx` → `/battlefield-6-hwid-spoofer/`
- `pages/cloud-dma.mdx` → `/cloud-dma/`
- `pages/requirements.mdx` → `/battlefield-6-cheat-requirements/`

## Integration instructions
1. Inspect the existing repository and follow its current framework, route conventions, component system, styles, and SEO metadata approach. Do not replace or restructure working architecture unnecessarily.
2. Integrate the MDX content into the appropriate routes. Preserve the titles, meta descriptions, H1s, H2s, FAQs, internal links, and image alt-text metadata.
3. Use the existing design system for article width, heading spacing, typography, mobile responsiveness, and CTA styling. Do not add a new dependency unless necessary.
4. Render internal links as local routes. Keep every page's primary search intent distinct to reduce keyword cannibalization.
5. Emit valid, page-specific metadata and canonical URLs based on the configured production domain. Add only schema types supported by visible page content; Product/Offer data must reflect a real current offer and should not be invented.
6. Do not invent prices, availability, claims, reviews, guarantees, or unsupported features. Keep system requirement details aligned with the content supplied here and current published specifications.
7. Ensure each route has exactly one H1, meaningful title and meta description, semantic article markup, and working internal links. Verify with the project's existing lint/build commands.

The MDX files are content sources, not a mandate to change the site's framework. Adapt the content to the existing project rather than introducing a parallel routing/content stack.
