const DIALOG_ID = 'image-lightbox';
const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.25;

type State = {
  scale: number;
  translateX: number;
  translateY: number;
  dragging: boolean;
  pointerId: number | null;
  startX: number;
  startY: number;
  originX: number;
  originY: number;
};

function defaultState(): State {
  return {
    scale: 1,
    translateX: 0,
    translateY: 0,
    dragging: false,
    pointerId: null,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
  };
}

function applyTransform(stage: HTMLElement, state: State) {
  stage.style.transform = `translate(${state.translateX}px, ${state.translateY}px) scale(${state.scale})`;
}

export function initImageLightbox() {
  const dialog = document.getElementById(DIALOG_ID);
  if (!(dialog instanceof HTMLDialogElement)) return;

  const img = dialog.querySelector<HTMLImageElement>('[data-lightbox-img]');
  const caption = dialog.querySelector<HTMLElement>('[data-lightbox-caption]');
  const stage = dialog.querySelector<HTMLElement>('[data-lightbox-stage]');
  const viewport = dialog.querySelector<HTMLElement>('[data-lightbox-viewport]');
  const zoomLabel = dialog.querySelector<HTMLElement>('[data-lightbox-zoom-label]');

  if (!img || !caption || !stage || !viewport || !zoomLabel) return;

  let state = defaultState();

  const reset = () => {
    state = defaultState();
    applyTransform(stage, state);
    zoomLabel.textContent = '100%';
    viewport.classList.remove('is-dragging');
  };

  const setZoom = (next: number) => {
    state.scale = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, next));
    if (state.scale === 1) {
      state.translateX = 0;
      state.translateY = 0;
    }
    applyTransform(stage, state);
    zoomLabel.textContent = `${Math.round(state.scale * 100)}%`;
  };

  const openWith = (trigger: HTMLElement) => {
    const fullSrc = trigger.getAttribute('data-lightbox-src');
    const srcset = trigger.getAttribute('data-lightbox-srcset');
    const alt = trigger.getAttribute('data-lightbox-alt') ?? '';

    if (!fullSrc) return;

    img.src = fullSrc;
    img.srcset = srcset ?? '';
    img.sizes = '100vw';
    img.alt = alt;
    caption.textContent = alt;
    reset();

    if (!dialog.open) dialog.showModal();
  };

  document.querySelectorAll<HTMLElement>('[data-lightbox-open]').forEach((trigger) => {
    trigger.addEventListener('click', () => openWith(trigger));
    trigger.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      openWith(trigger);
    });
  });

  dialog.querySelectorAll<HTMLElement>('[data-lightbox-close]').forEach((btn) => {
    btn.addEventListener('click', () => {
      dialog.close();
      reset();
    });
  });

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) {
      dialog.close();
      reset();
    }
  });

  dialog.querySelector('[data-lightbox-zoom-in]')?.addEventListener('click', () => {
    setZoom(state.scale + ZOOM_STEP);
  });

  dialog.querySelector('[data-lightbox-zoom-out]')?.addEventListener('click', () => {
    setZoom(state.scale - ZOOM_STEP);
  });

  viewport.addEventListener(
    'wheel',
    (event) => {
      if (!dialog.open) return;
      event.preventDefault();
      const delta = event.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP;
      setZoom(state.scale + delta);
    },
    { passive: false },
  );

  viewport.addEventListener('pointerdown', (event) => {
    if (!dialog.open || state.scale <= 1) return;
    state.dragging = true;
    state.pointerId = event.pointerId;
    state.startX = event.clientX;
    state.startY = event.clientY;
    state.originX = state.translateX;
    state.originY = state.translateY;
    viewport.classList.add('is-dragging');
    viewport.setPointerCapture(event.pointerId);
  });

  viewport.addEventListener('pointermove', (event) => {
    if (!state.dragging || state.pointerId !== event.pointerId) return;
    state.translateX = state.originX + (event.clientX - state.startX);
    state.translateY = state.originY + (event.clientY - state.startY);
    applyTransform(stage, state);
  });

  const endDrag = (event: PointerEvent) => {
    if (state.pointerId !== event.pointerId) return;
    state.dragging = false;
    state.pointerId = null;
    viewport.classList.remove('is-dragging');
  };

  viewport.addEventListener('pointerup', endDrag);
  viewport.addEventListener('pointercancel', endDrag);

  dialog.addEventListener('close', reset);
}
