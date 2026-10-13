/**
 * Parses Battlefield 6 content MDX (frontmatter + markdown body) from pages/*.mdx.
 * No MDX runtime — content source only.
 */

export interface Bf6PageFrontmatter {
  title: string;
  description: string;
  slug: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  schema: string[];
  imageAlt: string;
  /** Short hero blurb (one line). */
  heroLead?: string;
}

export type Bf6Block =
  | { type: 'h2'; text: string; id: string }
  | { type: 'h3'; text: string; id: string }
  | { type: 'p'; text: string }
  | { type: 'faq'; heading: string; items: { q: string; a: string }[] };

export interface Bf6ParsedPage {
  meta: Bf6PageFrontmatter;
  h1: string;
  leadParagraphs: string[];
  blocks: Bf6Block[];
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function parseQuotedYamlValue(line: string): string {
  const match = line.match(/^[^:]+:\s*"(.*)"\s*$/);
  if (match) return match[1]!.replace(/\\"/g, '"');
  const plain = line.split(':').slice(1).join(':').trim();
  return plain.replace(/^['"]|['"]$/g, '');
}

export function parseFrontmatter(raw: string): { meta: Bf6PageFrontmatter; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    throw new Error('MDX file missing frontmatter');
  }
  const yaml = match[1]!;
  const body = match[2]!;
  const lines = yaml.split(/\r?\n/);

  const meta: Bf6PageFrontmatter = {
    title: '',
    description: '',
    slug: '/',
    primaryKeyword: '',
    secondaryKeywords: [],
    schema: [],
    imageAlt: '',
  };

  let inSecondary = false;
  let inSchema = false;

  for (const line of lines) {
    if (line.startsWith('secondaryKeywords:')) {
      inSecondary = true;
      inSchema = false;
      continue;
    }
    if (line.startsWith('schema:')) {
      inSchema = true;
      inSecondary = false;
      continue;
    }
    if (inSecondary && line.trim().startsWith('- ')) {
      meta.secondaryKeywords.push(line.trim().slice(2).replace(/^['"]|['"]$/g, ''));
      continue;
    }
    if (inSchema && line.trim().startsWith('- ')) {
      meta.schema.push(line.trim().slice(2).replace(/^['"]|['"]$/g, ''));
      continue;
    }
    if (line.match(/^\s+-/) && (inSecondary || inSchema)) continue;
    inSecondary = false;
    inSchema = false;

    if (line.startsWith('title:')) meta.title = parseQuotedYamlValue(line);
    else if (line.startsWith('description:')) meta.description = parseQuotedYamlValue(line);
    else if (line.startsWith('slug:')) meta.slug = parseQuotedYamlValue(line);
    else if (line.startsWith('primaryKeyword:')) meta.primaryKeyword = parseQuotedYamlValue(line);
    else if (line.startsWith('imageAlt:')) meta.imageAlt = parseQuotedYamlValue(line);
    else if (line.startsWith('heroLead:')) meta.heroLead = parseQuotedYamlValue(line);
  }

  return { meta, body };
}

export function renderInlineMarkdown(text: string): string {
  return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_full, label: string, href: string) => {
    const path = href.trim();
    if (!path.startsWith('/')) {
      return label;
    }
    return `<a href="${path}">${label}</a>`;
  });
}

function isFaqHeading(text: string): boolean {
  return /frequently asked questions/i.test(text);
}

export function parseBf6Body(body: string): Pick<Bf6ParsedPage, 'h1' | 'leadParagraphs' | 'blocks'> {
  const lines = body.split(/\r?\n/);
  let i = 0;
  let h1 = '';

  while (i < lines.length) {
    const line = lines[i]!.trim();
    if (line.startsWith('# ')) {
      h1 = line.slice(2).trim();
      i++;
      break;
    }
    i++;
  }

  const leadParagraphs: string[] = [];
  while (i < lines.length) {
    const line = lines[i]!.trim();
    if (line.startsWith('## ')) break;
    if (line.length > 0) leadParagraphs.push(line);
    i++;
  }

  const blocks: Bf6Block[] = [];

  while (i < lines.length) {
    const line = lines[i]!.trim();
    if (!line.startsWith('## ')) {
      i++;
      continue;
    }
    const h2Text = line.slice(3).trim();
    i++;

    if (isFaqHeading(h2Text)) {
      const items: { q: string; a: string }[] = [];
      while (i < lines.length) {
        const faqLine = lines[i]!.trim();
        if (faqLine.startsWith('## ')) break;
        if (faqLine.startsWith('### ')) {
          const q = faqLine.slice(4).trim();
          i++;
          const answerParts: string[] = [];
          while (i < lines.length) {
            const ansLine = lines[i]!.trim();
            if (ansLine.startsWith('### ') || ansLine.startsWith('## ')) break;
            if (ansLine.length > 0) answerParts.push(ansLine);
            i++;
          }
          items.push({ q, a: answerParts.join(' ') });
          continue;
        }
        i++;
      }
      blocks.push({ type: 'faq', heading: h2Text, items });
      continue;
    }

    blocks.push({ type: 'h2', text: h2Text, id: slugifyHeading(h2Text) });

    while (i < lines.length) {
      const inner = lines[i]!.trim();
      if (inner.startsWith('## ')) break;
      if (inner.startsWith('### ')) {
        const h3Text = inner.slice(4).trim();
        blocks.push({ type: 'h3', text: h3Text, id: slugifyHeading(h3Text) });
        i++;
        const paraParts: string[] = [];
        while (i < lines.length) {
          const pl = lines[i]!.trim();
          if (pl.startsWith('### ') || pl.startsWith('## ')) break;
          if (pl.length > 0) paraParts.push(pl);
          i++;
        }
        if (paraParts.length > 0) {
          blocks.push({ type: 'p', text: paraParts.join(' ') });
        }
        continue;
      }
      if (inner.length === 0) {
        i++;
        continue;
      }
      const paraParts: string[] = [];
      while (i < lines.length) {
        const pl = lines[i]!.trim();
        if (pl.startsWith('### ') || pl.startsWith('## ')) break;
        if (pl.length > 0) paraParts.push(pl);
        i++;
      }
      if (paraParts.length > 0) {
        blocks.push({ type: 'p', text: paraParts.join(' ') });
      }
    }
  }

  return { h1, leadParagraphs, blocks };
}

export function parseBf6Mdx(raw: string): Bf6ParsedPage {
  const { meta, body } = parseFrontmatter(raw);
  const { h1, leadParagraphs, blocks } = parseBf6Body(body);
  return { meta, h1, leadParagraphs, blocks };
}
