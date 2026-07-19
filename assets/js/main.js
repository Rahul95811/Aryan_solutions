/**
 * Aryan Software Solutions - Main JavaScript
 * Handles navigation, scroll animations, counters, and form validation
 */

(function () {
  'use strict';

  /* ---------- Header & Floating CTA Scroll Effect ---------- */
  const header = document.querySelector('.header');
  const floatingCta = document.getElementById('floatingCta');
  if (header || floatingCta) {
    const onScroll = () => {
      const scrolled = window.scrollY > 10;
      if (header) header.classList.toggle('header--scrolled', scrolled);
      if (floatingCta) floatingCta.classList.toggle('is-visible', window.scrollY > 300);
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
      { threshold: 0.02, rootMargin: '0px 0px 150px 0px' }
    );

    animatedElements.forEach((el) => observer.observe(el));

    // Safety fallback: ensure no element stays invisible
    setTimeout(() => {
      animatedElements.forEach((el) => el.classList.add('is-visible'));
    }, 400);
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
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = prefix + target.toLocaleString() + suffix;
          const wrapper = el.closest('.stat-pulse-wrapper');
          if (wrapper) wrapper.classList.add('stat-pulse');
        }
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

  /* ---------- Parallax Mousemove Effect ---------- */
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX - window.innerWidth / 2) / 50;
    const y = (e.clientY - window.innerHeight / 2) / 50;

    document.querySelectorAll('.shield-container').forEach(el => {
      el.style.transform = `rotateX(${-y}deg) rotateY(${x}deg) scale3d(1, 1, 1)`;
    });

    document.querySelectorAll('.floating-node').forEach(el => {
      const speed = el.classList.contains('node-1') ? 2 : el.classList.contains('node-2') ? -1.5 : 1;
      el.style.transform = `translate3d(${x * speed}px, ${y * speed}px, 0)`;
    });
  });

  /* ---------- Form Validation & Async Submit ---------- */
  const forms = document.querySelectorAll('[data-validate-form]');

  forms.forEach((form) => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Clear all previous errors and invalid states
      form.querySelectorAll('.form-error').forEach((el) => el.remove());
      form.querySelectorAll('[aria-invalid]').forEach((el) => el.removeAttribute('aria-invalid'));

      let valid = true;

      form.querySelectorAll('[required]').forEach((field) => {
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

      if (!valid) return;

      // --- UI: enter loading state ---
      const submitBtn = form.querySelector('[type="submit"]');
      const btnText = submitBtn && submitBtn.querySelector('.btn__text');
      const btnSpinner = submitBtn && submitBtn.querySelector('.btn__spinner');
      const originalBtnText = btnText ? btnText.textContent : '';

      if (submitBtn) submitBtn.disabled = true;
      if (btnText) btnText.textContent = 'Sending\u2026';
      if (btnSpinner) btnSpinner.hidden = false;

      const successEl = form.querySelector('.form-success');
      const formspreeId = form.getAttribute('data-formspree-id');

      try {
        if (formspreeId && formspreeId !== 'YOUR_FORM_ID') {
          // Send to Formspree
          const response = await fetch('https://formspree.io/f/' + formspreeId, {
            method: 'POST',
            body: new FormData(form),
            headers: { 'Accept': 'application/json' },
          });
          if (!response.ok) {
            const body = await response.json().catch(() => ({}));
            throw new Error(body.error || 'Server error');
          }
        }
        // --- Success ---
        if (successEl) {
          successEl.style.cssText = '';
          successEl.hidden = false;
          successEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        form.reset();
        setTimeout(() => { if (successEl) successEl.hidden = true; }, 6000);

      } catch (err) {
        // --- Error: graceful fallback ---
        if (successEl) {
          const originalMsg = successEl.textContent;
          successEl.textContent = 'Something went wrong. Please email us directly at sriaryan.dev@gmail.com';
          successEl.style.background = 'rgb(239 68 68 / 0.08)';
          successEl.style.borderColor = 'rgb(239 68 68 / 0.2)';
          successEl.style.color = '#EF4444';
          successEl.hidden = false;
          setTimeout(() => {
            successEl.hidden = true;
            successEl.textContent = originalMsg;
            successEl.style.cssText = '';
          }, 6000);
        }
      } finally {
        // --- Restore button ---
        if (submitBtn) submitBtn.disabled = false;
        if (btnText) btnText.textContent = originalBtnText;
        if (btnSpinner) btnSpinner.hidden = true;
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

  /* ---------- Home Hero Service Slider ---------- */
  function initHeroSlider() {
    // Support both old card class and new showcase class
    const card = document.querySelector('.hero-showcase-container') ||
      document.querySelector('.hero-slider-card');
    if (!card) return;

    const slides = card.querySelectorAll('.hero-showcase__slide, .hero-slider__slide');
    const dots = card.querySelectorAll('.showcase-dot, .hero-slider__dot');
    const progressBar = card.querySelector('.showcase-progress-bar, .hero-slider__progress-bar');
    if (!slides.length) return;

    // Badge elements (only present in new showcase layout)
    const badgeTitle = card.querySelector('.showcase-badge__title');
    const badgeChips = card.querySelector('.showcase-badge__chips');

    // Per-slide metadata: must match HTML order
    const SLIDE_META = [
      { title: 'Software Development', chips: 'Java  •  Spring Boot  •  MySQL' },
      { title: 'Artificial Intelligence', chips: 'Python  •  Machine Learning  •  AI Systems' },
      { title: 'Cybersecurity', chips: 'Network Security  •  Security Audits' },
      { title: 'Web Development', chips: 'HTML5  •  CSS3  •  React' },
      { title: 'Mobile Development', chips: 'Swift  •  Kotlin  •  Flutter' },
      { title: 'Cloud Solutions', chips: 'AWS  •  Docker  •  Cloud Infrastructure' },
      { title: 'IoT Solutions', chips: 'MQTT  •  Raspberry Pi  •  Smart Sensors' },
      { title: 'Technology Consulting', chips: 'Agile  •  Architecture  •  IT Strategy' },
    ];

    let activeIndex = 0;

    function updateBadge(index) {
      const meta = SLIDE_META[index];
      if (!meta) return;
      if (badgeTitle) {
        badgeTitle.style.opacity = '0';
        badgeTitle.style.transform = 'translateY(4px)';
        setTimeout(() => {
          badgeTitle.textContent = meta.title;
          badgeTitle.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
          badgeTitle.style.opacity = '1';
          badgeTitle.style.transform = 'translateY(0)';
        }, 180);
      }
      if (badgeChips) {
        setTimeout(() => {
          badgeChips.textContent = meta.chips;
        }, 180);
      }
    }

    function goToSlide(index) {
      // Remove active state from current slide and dot
      slides[activeIndex].classList.remove('active');
      if (dots[activeIndex]) dots[activeIndex].classList.remove('active');

      // Set new active index
      activeIndex = index;

      // Add active state to new slide and dot
      slides[activeIndex].classList.add('active');
      if (dots[activeIndex]) dots[activeIndex].classList.add('active');

      // Update floating badge
      updateBadge(activeIndex);

      // Reset progress bar animation
      card.classList.remove('autoplay-running');
      void progressBar.offsetWidth; // Force reflow to restart animation
      card.classList.add('autoplay-running');
    }

    function nextSlide() {
      const nextIndex = (activeIndex + 1) % slides.length;
      goToSlide(nextIndex);
    }

    // Dot indicators click handlers
    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        const slideIndex = parseInt(dot.getAttribute('data-slide'), 10);
        if (slideIndex !== activeIndex) {
          goToSlide(slideIndex);
        }
      });
    });

    // Listen to progress bar animation completion to transition automatically
    if (progressBar) {
      progressBar.addEventListener('animationend', () => {
        nextSlide();
      });
    }

    // Start progress bar animation initially
    card.classList.add('autoplay-running');
    updateBadge(0);
  }

  // Initialize the slider
  initHeroSlider();

  /* ---------- Theme Toggle ---------- */
  (function initThemeToggle() {
    const root = document.documentElement;
    const toggles = document.querySelectorAll('.theme-toggle');
    if (!toggles.length) return;

    const applyTheme = (theme) => {
      if (theme === 'dark') {
        root.setAttribute('data-theme', 'dark');
      } else {
        root.removeAttribute('data-theme');
      }
      try { localStorage.setItem('theme', theme); } catch (e) { }
    };

    toggles.forEach((btn) => {
      btn.addEventListener('click', () => {
        const isDark = root.getAttribute('data-theme') === 'dark';
        applyTheme(isDark ? 'light' : 'dark');
      });
    });
  })();

  /* ---------- Marquee Cloner ---------- */
  document.querySelectorAll('.marquee-track').forEach((track) => {
    const content = track.querySelector('.marquee-content');
    if (content) {
      const clone = content.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    }
  });

})();

