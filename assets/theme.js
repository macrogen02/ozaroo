(function () {
  const header = document.querySelector('[data-site-header]');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const mobileMenu = document.getElementById('MobileMenu');
  const cartToggles = document.querySelectorAll('[data-cart-toggle]');
  const cartDrawer = document.getElementById('CartDrawer');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function () {
      const isOpen = mobileMenu.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  if (cartToggles.length && cartDrawer) {
    const toggleCart = function () {
      const isOpen = cartDrawer.classList.toggle('is-open');
      cartDrawer.setAttribute('aria-hidden', String(!isOpen));
      cartToggles.forEach(function (btn) {
        btn.setAttribute('aria-expanded', String(isOpen));
      });
    };

    cartToggles.forEach(function (btn) {
      btn.addEventListener('click', toggleCart);
    });
  }

  const onScroll = function () {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
