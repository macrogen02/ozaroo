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

  const deliveryControl = document.querySelector('[data-delivery-control]');
  const deliveryToggle = document.querySelector('[data-delivery-toggle]');
  const deliveryExpand = document.getElementById('DeliveryAddressInput');
  const deliveryAddressField = document.getElementById('DeliveryAddressField');

  const closeDeliveryExpand = function () {
    if (!deliveryControl || !deliveryToggle || !deliveryExpand) return;
    deliveryControl.classList.remove('is-expanded');
    deliveryToggle.setAttribute('aria-expanded', 'false');
    deliveryExpand.setAttribute('aria-hidden', 'true');
  };

  if (deliveryControl && deliveryToggle && deliveryExpand) {
    deliveryToggle.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      const open = !deliveryControl.classList.contains('is-expanded');
      if (open) {
        deliveryControl.classList.add('is-expanded');
        deliveryToggle.setAttribute('aria-expanded', 'true');
        deliveryExpand.setAttribute('aria-hidden', 'false');
        if (deliveryAddressField) deliveryAddressField.focus();
      } else {
        closeDeliveryExpand();
      }
    });

    deliveryExpand.addEventListener('click', function (event) {
      event.stopPropagation();
    });

    document.addEventListener('click', function (event) {
      if (!deliveryControl.classList.contains('is-expanded')) return;
      if (deliveryControl.contains(event.target)) return;
      closeDeliveryExpand();
    });
  }

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

  const megaToggles = document.querySelectorAll('[data-mega-toggle]');
  const closeMegaPanel = function (panel, toggles) {
    panel.setAttribute('hidden', 'hidden');
    toggles.forEach(function (toggle) {
      toggle.setAttribute('aria-expanded', 'false');
    });
  };

  megaToggles.forEach(function (toggle) {
    const panelId = toggle.getAttribute('aria-controls');
    const megaPanel = panelId ? document.getElementById(panelId) : null;
    if (!megaPanel) return;

    const linkedToggles = Array.prototype.filter.call(megaToggles, function (item) {
      return item.getAttribute('aria-controls') === panelId;
    });

    toggle.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      const hidden = megaPanel.hasAttribute('hidden');
      if (hidden) {
        megaPanel.removeAttribute('hidden');
      } else {
        closeMegaPanel(megaPanel, linkedToggles);
        return;
      }
      linkedToggles.forEach(function (item) {
        item.setAttribute('aria-expanded', String(hidden));
      });
    });

    megaPanel.addEventListener('click', function (event) {
      event.stopPropagation();
    });

    document.addEventListener('click', function () {
      if (megaPanel.hasAttribute('hidden')) return;
      closeMegaPanel(megaPanel, linkedToggles);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key !== 'Escape') return;
      if (!megaPanel.hasAttribute('hidden')) closeMegaPanel(megaPanel, linkedToggles);
    });
  });

  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;
    if (mobileDrawer && !mobileDrawer.hasAttribute('hidden')) mobileDrawer.setAttribute('hidden', 'hidden');
    closeDeliveryExpand();
  });
})();
