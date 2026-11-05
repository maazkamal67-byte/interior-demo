/**
 * Linden & Loom Interiors - Main JavaScript Engine
 * Handles Navbar Scrolling, AOS init & fallback, Lightbox,
 * Portfolio Filtering, FAQ Live Search, Contact Form Validation,
 * and Universal Image Error Fallback.
 */

(function () {
  'use strict';

  // 1. AOS Initialization & 1.5s Fallback
  function initAOS() {
    if (typeof AOS !== 'undefined') {
      try {
        AOS.init({
          duration: 800,
          easing: 'ease-out-cubic',
          once: true,
          offset: 40,
          disable: function () {
            return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          }
        });
      } catch (err) {
        console.warn('AOS initialization caught:', err);
      }
    }

    // Safety fallback: after 1.5 seconds, reveal any [data-aos] element
    setTimeout(function () {
      const aosElements = document.querySelectorAll('[data-aos]');
      aosElements.forEach(function (el) {
        if (!el.classList.contains('aos-animate')) {
          el.classList.add('aos-animate');
          el.style.opacity = '1';
          el.style.transform = 'none';
          el.style.visibility = 'visible';
        }
      });
    }, 1500);
  }

  // 2. Scroll Progress & Navbar Scrolled State
  function initScrollTracking() {
    const progressBar = document.getElementById('scroll-progress');
    const navbar = document.getElementById('mainNav');
    const backToTop = document.getElementById('back-to-top');

    function onScroll() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      if (progressBar) {
        progressBar.style.width = scrollPercent + '%';
      }

      if (navbar) {
        if (scrollTop > 30) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }

      if (backToTop) {
        if (scrollTop > 450) {
          backToTop.classList.add('visible');
        } else {
          backToTop.classList.remove('visible');
        }
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (backToTop) {
      backToTop.addEventListener('click', function () {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  }

  // 3. Fallback Image Error Handler (Soft Taupe SVG)
  const fallbackSvg = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800' viewBox='0 0 1200 800'><defs><linearGradient id='g' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%23C7B6A6'/><stop offset='100%' stop-color='%239E8876'/></linearGradient></defs><rect width='100%' height='100%' fill='url(%23g)'/><text x='50%' y='48%' fill='%23FAF6F0' font-family='serif' font-size='32' text-anchor='middle' dy='.3em'>Linden &amp; Loom Interiors</text><text x='50%' y='55%' fill='%23F0ECE4' font-family='sans-serif' font-size='16' letter-spacing='2' text-anchor='middle'>STUDIO CONCEPT ARCHIVE</text></svg>";

  function initImageFallbacks() {
    document.querySelectorAll('img').forEach(function (img) {
      img.addEventListener('error', function () {
        if (this.src !== fallbackSvg) {
          this.src = fallbackSvg;
        }
      });
    });
  }

  // 4. Portfolio Filter Engine
  function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.portfolio-filter-btn');
    const items = document.querySelectorAll('.portfolio-item');

    if (!filterButtons.length || !items.length) return;

    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterButtons.forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');

        const filterValue = this.getAttribute('data-filter');

        items.forEach(function (item) {
          const category = item.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue || (filterValue === 'kitchen-bath' && (category === 'kitchen' || category === 'bath'))) {
            item.style.display = 'block';
            setTimeout(function () {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 30);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.97)';
            setTimeout(function () {
              item.style.display = 'none';
            }, 250);
          }
        });
      });
    });
  }

  // 5. Lightbox Engine
  function initLightbox() {
    // Check if lightbox already exists, otherwise create it
    let lightbox = document.getElementById('studio-lightbox');
    if (!lightbox) {
      lightbox = document.createElement('div');
      lightbox.id = 'studio-lightbox';
      lightbox.className = 'custom-lightbox';
      lightbox.setAttribute('role', 'dialog');
      lightbox.setAttribute('aria-modal', 'true');
      lightbox.setAttribute('aria-label', 'Gallery Lightbox');
      lightbox.innerHTML = `
        <button class="lightbox-btn-close" id="lightboxClose" aria-label="Close Lightbox">&times;</button>
        <button class="lightbox-btn-nav lightbox-btn-prev" id="lightboxPrev" aria-label="Previous image">
          <i class="bi bi-chevron-left"></i>
        </button>
        <button class="lightbox-btn-nav lightbox-btn-next" id="lightboxNext" aria-label="Next image">
          <i class="bi bi-chevron-right"></i>
        </button>
        <div class="lightbox-content-box">
          <img class="lightbox-img" id="lightboxImg" src="" alt="Project view">
          <div class="lightbox-caption" id="lightboxCaption"></div>
          <div class="lightbox-counter" id="lightboxCounter"></div>
        </div>
      `;
      document.body.appendChild(lightbox);
    }

    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxCounter = document.getElementById('lightboxCounter');
    const closeBtn = document.getElementById('lightboxClose');
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');

    let galleryItems = [];
    let currentIndex = 0;

    function openLightbox(index) {
      currentIndex = index;
      const current = galleryItems[currentIndex];
      if (!current) return;

      lightboxImg.src = current.src;
      lightboxCaption.textContent = current.title;
      lightboxCounter.textContent = `Concept ${currentIndex + 1} of ${galleryItems.length}`;
      lightbox.classList.add('show');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('show');
      document.body.style.overflow = '';
      lightboxImg.src = '';
    }

    function showNext() {
      if (!galleryItems.length) return;
      currentIndex = (currentIndex + 1) % galleryItems.length;
      openLightbox(currentIndex);
    }

    function showPrev() {
      if (!galleryItems.length) return;
      currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
      openLightbox(currentIndex);
    }

    // Attach click events to triggers
    function refreshGalleryTriggers() {
      const triggers = Array.from(document.querySelectorAll('[data-lightbox-src]'));
      if (!triggers.length) return;

      galleryItems = triggers.map(function (el) {
        return {
          src: el.getAttribute('data-lightbox-src') || el.querySelector('img')?.src || '',
          title: el.getAttribute('data-lightbox-title') || el.querySelector('img')?.alt || 'Sample project (concept)'
        };
      });

      triggers.forEach(function (el, idx) {
        el.style.cursor = 'pointer';
        el.addEventListener('click', function (e) {
          e.preventDefault();
          openLightbox(idx);
        });
      });
    }

    refreshGalleryTriggers();

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (nextBtn) nextBtn.addEventListener('click', showNext);
    if (prevBtn) prevBtn.addEventListener('click', showPrev);

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('show')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    });
  }

  // 6. FAQ Live Search Engine
  function initFAQSearch() {
    const searchInput = document.getElementById('faqSearchInput');
    const accordionItems = document.querySelectorAll('#faqAccordion .accordion-item');

    if (!searchInput || !accordionItems.length) return;

    searchInput.addEventListener('input', function () {
      const query = this.value.toLowerCase().trim();
      let matchCount = 0;

      accordionItems.forEach(function (item) {
        const questionText = item.querySelector('.accordion-button')?.textContent.toLowerCase() || '';
        const answerText = item.querySelector('.accordion-body')?.textContent.toLowerCase() || '';
        const match = questionText.includes(query) || answerText.includes(query);

        if (match) {
          item.style.display = 'block';
          matchCount++;
          // If query has 3+ characters, automatically open matching items
          if (query.length >= 3) {
            const collapseEl = item.querySelector('.accordion-collapse');
            const buttonEl = item.querySelector('.accordion-button');
            if (collapseEl && buttonEl && !collapseEl.classList.contains('show')) {
              collapseEl.classList.add('show');
              buttonEl.classList.remove('collapsed');
              buttonEl.setAttribute('aria-expanded', 'true');
            }
          }
        } else {
          item.style.display = 'none';
        }
      });

      const noResultsMsg = document.getElementById('faqNoResults');
      if (noResultsMsg) {
        noResultsMsg.style.display = matchCount === 0 ? 'block' : 'none';
      }
    });
  }

  // 7. Contact Consultation Form (Validation & Query Param Preselect)
  function initContactForm() {
    const form = document.getElementById('consultationForm');
    const serviceSelect = document.getElementById('serviceSelect');
    const successBanner = document.getElementById('formSuccessBanner');

    // Preselect service dropdown from URL param (?service=...)
    if (serviceSelect) {
      const urlParams = new URLSearchParams(window.location.search);
      const serviceParam = urlParams.get('service');
      if (serviceParam) {
        const normalized = serviceParam.toLowerCase().trim();
        for (let i = 0; i < serviceSelect.options.length; i++) {
          const optVal = serviceSelect.options[i].value.toLowerCase();
          if (optVal && (optVal.includes(normalized) || normalized.includes(optVal))) {
            serviceSelect.selectedIndex = i;
            serviceSelect.value = serviceSelect.options[i].value;
            break;
          }
        }
      }
    }

    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      e.stopPropagation();

      let isValid = true;

      // Inputs to validate
      const fullName = document.getElementById('fullName');
      const email = document.getElementById('emailAddress');
      const phone = document.getElementById('phoneNumber');
      const service = document.getElementById('serviceSelect');
      const projectType = document.getElementById('projectType');
      const message = document.getElementById('projectMessage');

      function validateField(field, condition) {
        if (!field) return true;
        if (!condition) {
          field.classList.add('is-invalid');
          field.classList.remove('is-valid');
          return false;
        } else {
          field.classList.remove('is-invalid');
          field.classList.add('is-valid');
          return true;
        }
      }

      // Name validation
      if (!validateField(fullName, fullName && fullName.value.trim().length >= 2)) {
        isValid = false;
      }

      // Email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!validateField(email, email && emailPattern.test(email.value.trim()))) {
        isValid = false;
      }

      // Phone validation (at least 7 digits/characters)
      if (!validateField(phone, phone && phone.value.trim().length >= 7)) {
        isValid = false;
      }

      // Service selection
      if (!validateField(service, service && service.value !== '')) {
        isValid = false;
      }

      // Project type
      if (!validateField(projectType, projectType && projectType.value !== '')) {
        isValid = false;
      }

      // Message validation
      if (!validateField(message, message && message.value.trim().length >= 10)) {
        isValid = false;
      }

      if (isValid) {
        if (successBanner) {
          successBanner.classList.add('show');
          successBanner.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        form.reset();
        document.querySelectorAll('.is-valid').forEach(function (el) {
          el.classList.remove('is-valid');
        });
      }
    });
  }

  // Boot all systems on DOM ready
  document.addEventListener('DOMContentLoaded', function () {
    initAOS();
    initScrollTracking();
    initImageFallbacks();
    initPortfolioFilter();
    initLightbox();
    initFAQSearch();
    initContactForm();
  });
})();
