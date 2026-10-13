import type { Bf6ParsedPage } from './bf6-mdx';

export function firstSentence(text: string): string {
  const trimmed = text.trim();
  const match = trimmed.match(/^[^.!?]+[.!?]/);
  if (match) return match[0]!.trim();
  return trimmed.length > 160 ? `${trimmed.slice(0, 157)}…` : trimmed;
}

export function excerptText(text: string, max = 200): string {
  const trimmed = text.trim();
  if (trimmed.length <= max) return trimmed;
  return `${trimmed.slice(0, max - 1).trim()}…`;
}

export function resolveHeroLead(page: Bf6ParsedPage): string {
  const fromMeta = (page.meta as { heroLead?: string }).heroLead;
  if (fromMeta?.trim()) return fromMeta.trim();
  const lead = page.leadParagraphs.join(' ');
  return firstSentence(lead);
}
