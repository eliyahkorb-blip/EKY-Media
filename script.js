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
