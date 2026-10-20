/* Native disclosure stays usable even when JavaScript is unavailable. */
(() => {
  const desktop = window.matchMedia('(min-width: 761px)');
  document.querySelectorAll('.cg-contact-disclosure').forEach(panel => {
    const sync = () => { panel.open = desktop.matches; panel.dataset.responsive = 'true'; };
    sync();
    desktop.addEventListener('change', sync);
    panel.addEventListener('toggle', () => {
      if (desktop.matches && !panel.open) panel.open = true;
    });
  });
})();
