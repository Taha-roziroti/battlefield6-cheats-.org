const PICKER_ID = 'checkout-picker';

export function initCheckoutPicker(): void {
  const dialog = document.getElementById(PICKER_ID);
  if (!(dialog instanceof HTMLDialogElement)) return;

  const open = () => {
    if (!dialog.open) dialog.showModal();
  };

  document.querySelectorAll<HTMLElement>('[data-checkout-chooser]').forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      open();
    });
  });

  dialog.querySelectorAll('[data-checkout-picker-close]').forEach((btn) => {
    btn.addEventListener('click', () => dialog.close());
  });

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
}
