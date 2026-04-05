/* =========================================
   EKY Media GbR — Homepage Script
   ========================================= */

(function () {
  'use strict';

  // =========================================
  // Nav: dark/light + scrolled state
  // =========================================
  const nav = document.getElementById('nav');

  function updateNav() {
    if (!nav) return;
    const scrolled = window.scrollY > 40;
    nav.classList.toggle('scrolled', scrolled);
    // Keep dark-style classes when not scrolled (over dark hero)
    nav.classList.toggle('nav--dark', !scrolled);
  }

  if (nav) {
    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();
  }

  // =========================================
  // Mobile hamburger menu
  // =========================================
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      hamburger.setAttribute('aria-label', isOpen ? 'Menü schließen' : 'Menü öffnen');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Menü öffnen');
        document.body.style.overflow = '';
      });
    });
  }

  // =========================================
  // Scroll reveal
  // =========================================
  function initReveal() {
    if (!('IntersectionObserver' in window)) return;

    const targets = document.querySelectorAll([
      '.section-label',
      '.section-title',
      '.section-body',
      '.service-card',
      '.industry-item',
      '.pricing-card',
      '.positioning__list',
      '.hero__badges',
      '.contact__actions'
    ].join(', '));

    targets.forEach((el, i) => {
      el.classList.add('reveal');
      // Stagger siblings within the same grid parent
      const siblings = el.parentElement
        ? Array.from(el.parentElement.children).filter(c => c.classList.contains(el.classList[0]))
        : [];
      const sibIdx = siblings.indexOf(el);
      if (sibIdx > 0 && sibIdx <= 3) {
        el.classList.add(`reveal--delay-${sibIdx}`);
      }
    });

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -48px 0px' }
    );

    targets.forEach(el => observer.observe(el));
  }

  initReveal();

  // =========================================
  // Gallery filter tabs
  // =========================================
  const filterBtns = document.querySelectorAll('.gallery__filter');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (filterBtns.length && galleryItems.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        // Update active tab state
        filterBtns.forEach(b => {
          b.classList.remove('gallery__filter--active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('gallery__filter--active');
        btn.setAttribute('aria-selected', 'true');

        // Show / hide items
        galleryItems.forEach(item => {
          const match = filter === 'alle' || item.dataset.category === filter;
          item.classList.toggle('gallery-item--hidden', !match);
        });
      });
    });

    // Keyboard: arrow navigation between tabs
    filterBtns.forEach((btn, i) => {
      btn.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight') filterBtns[(i + 1) % filterBtns.length].focus();
        if (e.key === 'ArrowLeft')  filterBtns[(i - 1 + filterBtns.length) % filterBtns.length].focus();
      });
    });
  }

  // =========================================
  // FAQ accordion
  // =========================================
  const faqItems = document.querySelectorAll('.faq-item');

  function openFaq(item) {
    const panel = item.querySelector('.faq-item__panel');
    const trigger = item.querySelector('.faq-item__trigger');
    panel.removeAttribute('hidden');
    // Set max-height to scrollHeight so CSS transition animates smoothly
    panel.style.maxHeight = panel.scrollHeight + 'px';
    trigger.setAttribute('aria-expanded', 'true');
    item.classList.add('faq-item--open');
  }

  function closeFaq(item) {
    const panel = item.querySelector('.faq-item__panel');
    const trigger = item.querySelector('.faq-item__trigger');
    panel.style.maxHeight = '0';
    trigger.setAttribute('aria-expanded', 'false');
    item.classList.remove('faq-item--open');
    // Restore hidden after transition ends so it's properly inert
    panel.addEventListener('transitionend', () => {
      if (!item.classList.contains('faq-item--open')) {
        panel.setAttribute('hidden', '');
      }
    }, { once: true });
  }

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-item__trigger');

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('faq-item--open');

      // Close all open items first
      faqItems.forEach(i => {
        if (i.classList.contains('faq-item--open')) closeFaq(i);
      });

      // Open clicked item only if it was closed
      if (!isOpen) openFaq(item);
    });

    // Keyboard: Space/Enter already fire click on <button>;
    // add Home/End navigation across triggers
    trigger.addEventListener('keydown', e => {
      const triggers = [...document.querySelectorAll('.faq-item__trigger')];
      const idx = triggers.indexOf(trigger);
      if (e.key === 'ArrowDown') { e.preventDefault(); triggers[Math.min(idx + 1, triggers.length - 1)].focus(); }
      if (e.key === 'ArrowUp')   { e.preventDefault(); triggers[Math.max(idx - 1, 0)].focus(); }
      if (e.key === 'Home')      { e.preventDefault(); triggers[0].focus(); }
      if (e.key === 'End')       { e.preventDefault(); triggers[triggers.length - 1].focus(); }
    });
  });

  // =========================================
  // Legal modals
  // =========================================
  function openModal(id) {
    const modal = document.getElementById('modal-' + id);
    if (!modal) return;
    modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    // Focus first focusable element
    const focusable = modal.querySelector('button, a, input, [tabindex]');
    if (focusable) focusable.focus();
  }

  function closeModal(modal) {
    modal.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }

  // Open via footer buttons
  document.querySelectorAll('[data-modal]').forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.dataset.modal));
  });

  // Close via × button or backdrop click
  document.querySelectorAll('.modal').forEach(modal => {
    modal.querySelector('.modal__close')?.addEventListener('click', () => closeModal(modal));
    modal.querySelector('.modal__backdrop')?.addEventListener('click', () => closeModal(modal));
  });

  // Close with Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal:not([hidden])').forEach(closeModal);
    }
  });

  // =========================================
  // Smooth anchor scroll (account for nav height)
  // =========================================
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navH = nav ? nav.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

})();
