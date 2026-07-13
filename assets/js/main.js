/**
 * Aryan Software Solutions - Main JavaScript
 * Handles navigation, scroll animations, counters, and form validation
 */

(function () {
  'use strict';

  /* ---------- Header Scroll Effect ---------- */
  const header = document.querySelector('.header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('header--scrolled', window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Mobile Navigation ---------- */
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('nav--open');
      navToggle.classList.toggle('nav-toggle--open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    nav.querySelectorAll('.nav__link').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('nav--open');
        navToggle.classList.remove('nav-toggle--open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close menu when clicking on the background overlay (left side of the drawer)
    nav.addEventListener('click', (e) => {
      if (e.target === nav || e.clientX < window.innerWidth - 280) {
        nav.classList.remove('nav--open');
        navToggle.classList.remove('nav-toggle--open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ---------- Scroll Animations ---------- */
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  if (animatedElements.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    animatedElements.forEach((el) => observer.observe(el));
  } else {
    animatedElements.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- Counter Animation ---------- */
  const counters = document.querySelectorAll('[data-counter]');

  if (counters.length && 'IntersectionObserver' in window) {
    const animateCounter = (el) => {
      const target = parseInt(el.getAttribute('data-counter'), 10);
      const suffix = el.getAttribute('data-suffix') || '';
      const prefix = el.getAttribute('data-prefix') || '';
      const duration = 2000;
      const start = performance.now();

      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(eased * target);
        el.textContent = prefix + current.toLocaleString() + suffix;
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = prefix + target.toLocaleString() + suffix;
      };

      requestAnimationFrame(step);
    };

    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((counter) => counterObserver.observe(counter));
  }

  /* ---------- Form Validation ---------- */
  const forms = document.querySelectorAll('[data-validate-form]');

  forms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      form.querySelectorAll('[required]').forEach((field) => {
        const errorEl = field.parentElement.querySelector('.form-error');
        if (errorEl) errorEl.remove();

        if (!field.value.trim()) {
          valid = false;
          showError(field, 'This field is required.');
        } else if (field.type === 'email' && !isValidEmail(field.value)) {
          valid = false;
          showError(field, 'Please enter a valid email address.');
        } else if (field.type === 'tel' && field.value.trim() && !isValidPhone(field.value)) {
          valid = false;
          showError(field, 'Please enter a valid phone number.');
        }
      });

      if (valid) {
        const successEl = form.querySelector('.form-success');
        if (successEl) {
          successEl.hidden = false;
          form.reset();
          setTimeout(() => { successEl.hidden = true; }, 5000);
        }
      }
    });
  });

  function showError(field, message) {
    const error = document.createElement('p');
    error.className = 'form-error';
    error.textContent = message;
    error.setAttribute('role', 'alert');
    field.parentElement.appendChild(error);
    field.setAttribute('aria-invalid', 'true');
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function isValidPhone(phone) {
    return /^[\d\s\-+()]{7,20}$/.test(phone);
  }

  /* ---------- Current Year ---------- */
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
