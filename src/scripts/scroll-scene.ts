const reducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initScrollLayers() {
  if (reducedMotion()) return;

  const layers = document.querySelectorAll<HTMLElement>('[data-scroll-layer]');
  if (!layers.length) return;

  let ticking = false;

  const update = () => {
    const scrollY = window.scrollY;
    layers.forEach((layer) => {
      const depth = Number(layer.dataset.depth ?? '0.3');
      const y = scrollY * depth * -0.12;
      const x = Math.sin(scrollY * 0.002 + depth) * 8;
      layer.style.transform = `translate3d(${x}px, ${y}px, 0) scale(1.05)`;
    });
    ticking = false;
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  update();
  window.addEventListener('scroll', onScroll, { passive: true });
}

function initScrollTilt() {
  if (reducedMotion()) return;

  const nodes = document.querySelectorAll<HTMLElement>('[data-scroll-tilt]');
  if (!nodes.length) return;

  let ticking = false;

  const update = () => {
    const vh = window.innerHeight;
    nodes.forEach((node) => {
      const rect = node.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const progress = (center - vh * 0.5) / vh;
      const clamped = Math.max(-1, Math.min(1, progress));
      const tiltX = clamped * -4;
      const tiltY = clamped * 2.5;
      const tiltZ = Math.abs(clamped) * 6;
      node.style.setProperty('--tilt-x', `${tiltX}deg`);
      node.style.setProperty('--tilt-y', `${tiltY}deg`);
      node.style.setProperty('--tilt-z', `${tiltZ}px`);
    });
    ticking = false;
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  update();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
}

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
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  );

  nodes.forEach((node) => observer.observe(node));
}

export function setupScrollScene() {
  initScrollLayers();
  initScrollTilt();
  initReveal();
}
