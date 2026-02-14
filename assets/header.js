(function () {
  const stickyTargets = document.querySelectorAll('.ozh-sticky-target');
  const onScroll = function () {
    const scrolled = window.scrollY > 10;
    stickyTargets.forEach(function (el) { el.classList.toggle('is-scrolled', scrolled); });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const utilityToggle = document.querySelector('[data-utility-toggle]');
  const utilityContent = document.querySelector('.ozh-utility__content');
  if (utilityToggle && utilityContent) {
    utilityToggle.addEventListener('click', function () {
      const open = utilityContent.classList.toggle('is-open');
      utilityToggle.setAttribute('aria-expanded', String(open));
    });
  }

  const mobileDrawer = document.getElementById('MobileDrawer');
  const mobileToggles = document.querySelectorAll('[data-mobile-toggle]');
  mobileToggles.forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (!mobileDrawer) return;
      const hidden = mobileDrawer.hasAttribute('hidden');
      if (hidden) {
        mobileDrawer.removeAttribute('hidden');
      } else {
        mobileDrawer.setAttribute('hidden', 'hidden');
      }
      mobileToggles.forEach(function (t) {
        if (t.hasAttribute('aria-expanded')) t.setAttribute('aria-expanded', String(hidden));
      });
    });
  });

  const categoryOverlay = document.getElementById('CategoryOverlay');
  const categoryToggles = document.querySelectorAll('[data-category-overlay-toggle]');
  categoryToggles.forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (!categoryOverlay) return;
      const hidden = categoryOverlay.hasAttribute('hidden');
      if (hidden) categoryOverlay.removeAttribute('hidden');
      else categoryOverlay.setAttribute('hidden', 'hidden');
      categoryToggles.forEach(function (t) {
        if (t.hasAttribute('aria-expanded')) t.setAttribute('aria-expanded', String(hidden));
      });
    });
  });

  const deliveryInfo = document.getElementById('DeliveryInfo');
  const deliveryToggles = document.querySelectorAll('[data-delivery-toggle]');
  deliveryToggles.forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (!deliveryInfo) return;
      const hidden = deliveryInfo.hasAttribute('hidden');
      if (hidden) deliveryInfo.removeAttribute('hidden');
      else deliveryInfo.setAttribute('hidden', 'hidden');
      if (btn.hasAttribute('aria-expanded')) btn.setAttribute('aria-expanded', String(hidden));
    });
  });

  const searchWrap = document.querySelector('[data-search-wrap]');
  const searchDropdown = document.querySelector('[data-search-dropdown]');
  if (searchWrap && searchDropdown) {
    searchWrap.addEventListener('focusin', function () {
      searchDropdown.removeAttribute('hidden');
    });
    document.addEventListener('click', function (event) {
      if (!searchWrap.contains(event.target)) {
        searchDropdown.setAttribute('hidden', 'hidden');
      }
    });
  }

  const megaTrigger = document.querySelector('[data-mega-trigger]');
  const megaPanel = document.querySelector('[data-mega-panel]');
  if (megaTrigger && megaPanel && window.matchMedia('(min-width: 990px)').matches) {
    let enterTimer;
    let leaveTimer;

    const openMega = function () {
      clearTimeout(leaveTimer);
      enterTimer = setTimeout(function () {
        megaPanel.removeAttribute('hidden');
      }, 120);
    };

    const closeMega = function () {
      clearTimeout(enterTimer);
      leaveTimer = setTimeout(function () {
        megaPanel.setAttribute('hidden', 'hidden');
      }, 160);
    };

    megaTrigger.addEventListener('mouseenter', openMega);
    megaTrigger.addEventListener('mouseleave', closeMega);
    megaPanel.addEventListener('mouseenter', openMega);
    megaPanel.addEventListener('mouseleave', closeMega);
  }

  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;
    if (categoryOverlay && !categoryOverlay.hasAttribute('hidden')) categoryOverlay.setAttribute('hidden', 'hidden');
    if (mobileDrawer && !mobileDrawer.hasAttribute('hidden')) mobileDrawer.setAttribute('hidden', 'hidden');
    if (deliveryInfo && !deliveryInfo.hasAttribute('hidden')) deliveryInfo.setAttribute('hidden', 'hidden');
  });
})();
