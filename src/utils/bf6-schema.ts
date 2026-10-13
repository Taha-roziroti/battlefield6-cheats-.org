import { checkoutPath } from '../config/checkout';
import { CLOUD_DMA_PLAN, HWID_SPOOFER_PLANS, MAIN_PRODUCT_PLANS } from '../data/fragpunk/pricing';
import type { Bf6ParsedPage } from './bf6-mdx';
import {
  breadcrumbSchema,
  faqPageSchema,
  organizationSchema,
  productSchema,
  techArticleSchema,
  webPageSchema,
  websiteSchema,
} from './schema';
import type { BreadcrumbItem } from './schema';

const monthly = MAIN_PRODUCT_PLANS[0]!;

function faqItemsFromPage(page: Bf6ParsedPage) {
  const faqBlock = page.blocks.find((b) => b.type === 'faq');
  if (!faqBlock || faqBlock.type !== 'faq') return [];
  return faqBlock.items;
}

export function buildBf6JsonLd(page: Bf6ParsedPage, breadcrumbs: BreadcrumbItem[]) {
  const url = page.meta.slug;
  const schemas: Record<string, unknown>[] = [];
  const types = new Set(page.meta.schema);

  if (url === '/') {
    schemas.push(websiteSchema(), organizationSchema());
  }

  if (types.has('WebPage')) {
    schemas.push(
      webPageSchema({
        name: page.meta.title,
        description: page.meta.description,
        url,
      }),
    );
  }

  if (types.has('TechArticle')) {
    schemas.push(
      techArticleSchema({
        name: page.meta.title,
        description: page.meta.description,
        url,
      }),
    );
  }

  if (types.has('Product')) {
    const offerUrl =
      url === '/cloud-dma/'
        ? checkoutPath('cloudDma')
        : url === '/battlefield-6-hwid-spoofer/'
          ? checkoutPath('hwidSpoofer')
          : checkoutPath('main');

    const priceUsd =
      url === '/cloud-dma/'
        ? CLOUD_DMA_PLAN.priceUsd
        : url === '/battlefield-6-hwid-spoofer/'
          ? HWID_SPOOFER_PLANS[0]!.priceUsd
        : url === '/'
          ? monthly.priceUsd
          : undefined;

    schemas.push(
      productSchema({
        name: page.h1,
        description: page.meta.description,
        url,
        offerUrl,
        ...(priceUsd !== undefined ? { priceUsd } : {}),
      }),
    );
  }

  if (types.has('BreadcrumbList')) {
    schemas.push(breadcrumbSchema(breadcrumbs));
  }

  const faqs = faqItemsFromPage(page);
  if (faqs.length > 0) {
    schemas.push(faqPageSchema(faqs));
  }

  return schemas;
}
