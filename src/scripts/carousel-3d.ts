import { createCarousel } from '@starwind-ui/runtime/carousel';

function getCarouselRoot(wrap: HTMLElement): HTMLElement | null {
  return wrap.querySelector<HTMLElement>('[data-slot="carousel"]');
}

function bindCarousel3d(wrap: HTMLElement) {
  const carouselRoot = getCarouselRoot(wrap);
  if (!carouselRoot) return;

  const slides = [...wrap.querySelectorAll<HTMLElement>('[data-carousel-3d-slide]')];

  let carousel: ReturnType<typeof createCarousel>;
  try {
    carousel = createCarousel(carouselRoot);
  } catch {
    return;
  }

  const update = () => {
    const selected = carousel.api.selectedScrollSnap();
    slides.forEach((slide, index) => {
      const offset = index - selected;
      const clamped = Math.max(-2, Math.min(2, offset));
      const rotateY = clamped * -5;
      const scale = 1 - Math.min(Math.abs(clamped) * 0.04, 0.1);
      const translateZ = -Math.abs(clamped) * 16;
      slide.style.transform = `rotateY(${rotateY}deg) scale(${scale}) translateZ(${translateZ}px)`;
      slide.classList.toggle('is-active', index === selected);
    });
  };

  update();
  carousel.api.on('select', update);
  carousel.api.on('reInit', update);
}

export function setupCarousel3d() {
  document.querySelectorAll<HTMLElement>('[data-carousel-3d]').forEach((wrap) => {
    if (wrap.dataset.carousel3dBound === 'true') return;
    wrap.dataset.carousel3dBound = 'true';
    bindCarousel3d(wrap);
  });
}
