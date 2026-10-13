const reducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initReveal() {
  const nodes = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (!nodes.length) return;

  if (reducedMotion()) {
    nodes.forEach((node) => node.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -6% 0px', threshold: 0.08 },
  );

  nodes.forEach((node) => observer.observe(node));
}

function initHeadingLines() {
  const nodes = document.querySelectorAll<HTMLElement>('[data-heading-line]');
  if (!nodes.length) return;

  if (reducedMotion()) {
    nodes.forEach((node) => node.classList.add('is-line-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-line-visible');
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.2 },
  );

  nodes.forEach((node) => observer.observe(node));
}

export function setupScrollScene() {
  initReveal();
  initHeadingLines();
}
