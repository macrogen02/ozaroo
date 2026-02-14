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

  document.querySelectorAll('[data-carousel-prev]').forEach(function (button) {
    button.addEventListener('click', function () {
      const target = document.getElementById(button.getAttribute('data-carousel-prev'));
      if (!target) return;
      target.scrollBy({ left: -260, behavior: 'smooth' });
    });
  });

  document.querySelectorAll('[data-carousel-next]').forEach(function (button) {
    button.addEventListener('click', function () {
      const target = document.getElementById(button.getAttribute('data-carousel-next'));
      if (!target) return;
      target.scrollBy({ left: 260, behavior: 'smooth' });
    });
  });

  const heroCarousel = document.querySelector('[data-hero-carousel]');
  if (heroCarousel) {
    const slides = heroCarousel.querySelectorAll('[data-hero-slide]');
    const prev = heroCarousel.querySelector('[data-hero-prev]');
    const next = heroCarousel.querySelector('[data-hero-next]');
    let index = 0;

    const setSlide = function (newIndex) {
      if (!slides.length) return;
      slides[index].classList.remove('is-active');
      index = (newIndex + slides.length) % slides.length;
      slides[index].classList.add('is-active');
    };

    if (prev) prev.addEventListener('click', function () { setSlide(index - 1); });
    if (next) next.addEventListener('click', function () { setSlide(index + 1); });

    if (slides.length > 1) {
      setInterval(function () { setSlide(index + 1); }, 5000);
    }
  }
})();
