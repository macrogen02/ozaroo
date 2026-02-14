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
      if (hidden) mobileDrawer.removeAttribute('hidden');
      else mobileDrawer.setAttribute('hidden', 'hidden');
      mobileToggles.forEach(function (t) {
        if (t.hasAttribute('aria-expanded')) t.setAttribute('aria-expanded', String(hidden));
      });
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

  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;
    if (mobileDrawer && !mobileDrawer.hasAttribute('hidden')) mobileDrawer.setAttribute('hidden', 'hidden');
  });
})();
