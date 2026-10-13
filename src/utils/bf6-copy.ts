import { renderInlineMarkdown } from './bf6-mdx';

/** MDX bullets on one line: "- [a](u) — x - [b](u) — y" */
function tryParseInlineList(text: string): string[] | null {
  const trimmed = text.trim();
  if (!trimmed.startsWith('-')) return null;
  const chunks = trimmed
    .split(/\s+-\s+(?=\[)/)
    .map((chunk) => chunk.replace(/^-\s*/, '').trim())
    .filter(Boolean);
  return chunks.length >= 2 ? chunks : null;
}

function listFromParagraphs(paragraphs: string[]): string[] | null {
  const items = paragraphs
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => (p.startsWith('-') ? p.replace(/^-\s*/, '') : p));
  if (items.length >= 2 && paragraphs.every((p) => p.trim().startsWith('-'))) {
    return items;
  }
  return null;
}

export function formatSectionCopy(paragraphs: string[]): { html: string; isList: boolean } {
  if (!paragraphs.length) return { html: '', isList: false };

  const multiList = listFromParagraphs(paragraphs);
  if (multiList) {
    return {
      isList: true,
      html: `<ul class="bf6-link-list">${multiList
        .map((item) => `<li>${renderInlineMarkdown(item)}</li>`)
        .join('')}</ul>`,
    };
  }

  if (paragraphs.length === 1) {
    const listItems = tryParseInlineList(paragraphs[0]!);
    if (listItems) {
      return {
        isList: true,
        html: `<ul class="bf6-link-list">${listItems
          .map((item) => `<li>${renderInlineMarkdown(item)}</li>`)
          .join('')}</ul>`,
      };
    }
  }

  return {
    isList: false,
    html: paragraphs
      .map((p) => `<p class="bf6-body">${renderInlineMarkdown(p)}</p>`)
      .join(''),
  };
}
