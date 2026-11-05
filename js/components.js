/**
 * Linden & Loom Interiors - Components Engine
 * Replaces fallback navbar and footer with enhanced versions
 * Relative paths only for GitHub Pages compatibility
 */

(function () {
  'use strict';

  // Determine current active page
  const currentPath = window.location.pathname;
  let currentPage = currentPath.split('/').pop() || 'index.html';
  if (!currentPage || currentPage === '/') {
    currentPage = 'index.html';
  }

  const isServicePage = [
    'services.html',
    'residential-design.html',
    'kitchen-and-bath.html',
    'space-planning.html',
    'styling-and-furnishing.html',
    'commercial-interiors.html'
  ].includes(currentPage);

  function renderNavbar() {
    const navbarContainer = document.getElementById('navbar-container');
    if (!navbarContainer) return;

    // Check if the page requested dark navbar initially (hero pages)
    const isHeroPage = document.body.classList.contains('page-has-hero-dark');
    const darkClass = isHeroPage ? 'on-dark' : '';

    const navbarHTML = `
      <!-- Scroll Progress Bar -->
      <div id="scroll-progress" aria-hidden="true"></div>

      <nav class="navbar navbar-expand-lg site-navbar ${darkClass}" id="mainNav" aria-label="Main Navigation">
        <div class="container">
          <!-- Monogram & Brand Logo -->
          <a class="brand-monogram" href="index.html" aria-label="Linden &amp; Loom Interiors Home">
            <span class="monogram-mark" aria-hidden="true">L&amp;L</span>
            <span>Linden &amp; Loom</span>
          </a>

          <!-- Mobile Hamburger Toggle -->
          <button class="navbar-toggler border-0 p-1" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobileNavOffcanvas" aria-controls="mobileNavOffcanvas" aria-label="Toggle navigation">
            <i class="bi bi-list fs-2 text-current"></i>
          </button>

          <!-- Desktop Navigation Menu -->
          <div class="collapse navbar-collapse justify-content-end d-none d-lg-flex" id="navbarNav">
            <ul class="navbar-nav align-items-center me-4">
              <li class="nav-item">
                <a class="nav-link ${currentPage === 'index.html' ? 'active' : ''}" href="index.html">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link ${currentPage === 'about.html' ? 'active' : ''}" href="about.html">About</a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle ${isServicePage ? 'active' : ''}" href="services.html" id="servicesDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Services
                </a>
                <ul class="dropdown-menu border-0" aria-labelledby="servicesDropdown">
                  <li>
                    <a class="dropdown-item ${currentPage === 'services.html' ? 'active' : ''}" href="services.html">
                      <span>All Services Overview</span>
                      <i class="bi bi-arrow-right"></i>
                    </a>
                  </li>
                  <li><hr class="dropdown-divider my-1 opacity-25"></li>
                  <li>
                    <a class="dropdown-item ${currentPage === 'residential-design.html' ? 'active' : ''}" href="residential-design.html">
                      <span>Residential Design</span>
                      <i class="bi bi-arrow-right"></i>
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item ${currentPage === 'kitchen-and-bath.html' ? 'active' : ''}" href="kitchen-and-bath.html">
                      <span>Kitchen &amp; Bath</span>
                      <i class="bi bi-arrow-right"></i>
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item ${currentPage === 'space-planning.html' ? 'active' : ''}" href="space-planning.html">
                      <span>Space Planning</span>
                      <i class="bi bi-arrow-right"></i>
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item ${currentPage === 'styling-and-furnishing.html' ? 'active' : ''}" href="styling-and-furnishing.html">
                      <span>Styling &amp; Furnishing</span>
                      <i class="bi bi-arrow-right"></i>
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item ${currentPage === 'commercial-interiors.html' ? 'active' : ''}" href="commercial-interiors.html">
                      <span>Commercial Interiors</span>
                      <i class="bi bi-arrow-right"></i>
                    </a>
                  </li>
                </ul>
              </li>
              <li class="nav-item">
                <a class="nav-link ${currentPage === 'portfolio.html' ? 'active' : ''}" href="portfolio.html">Portfolio</a>
              </li>
              <li class="nav-item">
                <a class="nav-link ${currentPage === 'process.html' ? 'active' : ''}" href="process.html">Process</a>
              </li>
              <li class="nav-item">
                <a class="nav-link ${currentPage === 'faq.html' ? 'active' : ''}" href="faq.html">FAQ</a>
              </li>
              <li class="nav-item">
                <a class="nav-link ${currentPage === 'contact.html' ? 'active' : ''}" href="contact.html">Contact</a>
              </li>
            </ul>

            <!-- Book Consultation CTA Button -->
            <a href="contact.html" class="btn-consultation">
              Book a Consultation
            </a>
          </div>
        </div>
      </nav>

      <!-- Mobile Offcanvas Drawer -->
      <div class="offcanvas offcanvas-end editorial-offcanvas" tabindex="-1" id="mobileNavOffcanvas" aria-labelledby="mobileNavLabel">
        <div class="offcanvas-header pb-2 border-bottom">
          <div class="brand-monogram" id="mobileNavLabel">
            <span class="monogram-mark" aria-hidden="true">L&amp;L</span>
            <span>Linden &amp; Loom</span>
          </div>
          <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close menu"></button>
        </div>
        <div class="offcanvas-body pt-3 d-flex flex-column justify-content-between">
          <ul class="nav flex-column mb-4">
            <li class="nav-item">
              <a class="nav-link ${currentPage === 'index.html' ? 'active' : ''}" href="index.html">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link ${currentPage === 'about.html' ? 'active' : ''}" href="about.html">About</a>
            </li>
            <li class="nav-item">
              <div class="accordion accordion-flush" id="mobileServicesAccordion">
                <div class="accordion-item bg-transparent border-0">
                  <h2 class="accordion-header" id="headingMobileServices">
                    <button class="accordion-button bg-transparent px-0 py-3 font-serif fs-5 shadow-none ${isServicePage ? '' : 'collapsed'}" type="button" data-bs-toggle="collapse" data-bs-target="#collapseMobileServices" aria-expanded="${isServicePage ? 'true' : 'false'}" aria-controls="collapseMobileServices">
                      Services
                    </button>
                  </h2>
                  <div id="collapseMobileServices" class="accordion-collapse collapse ${isServicePage ? 'show' : ''}" aria-labelledby="headingMobileServices">
                    <div class="accordion-body px-0 pt-1 pb-3">
                      <ul class="list-unstyled ps-3 border-start">
                        <li class="mb-2"><a class="text-decoration-none ${currentPage === 'services.html' ? 'text-sage fw-semibold' : 'text-charcoal'}" href="services.html">All Services Overview</a></li>
                        <li class="mb-2"><a class="text-decoration-none ${currentPage === 'residential-design.html' ? 'text-sage fw-semibold' : 'text-charcoal'}" href="residential-design.html">Residential Design</a></li>
                        <li class="mb-2"><a class="text-decoration-none ${currentPage === 'kitchen-and-bath.html' ? 'text-sage fw-semibold' : 'text-charcoal'}" href="kitchen-and-bath.html">Kitchen &amp; Bath</a></li>
                        <li class="mb-2"><a class="text-decoration-none ${currentPage === 'space-planning.html' ? 'text-sage fw-semibold' : 'text-charcoal'}" href="space-planning.html">Space Planning</a></li>
                        <li class="mb-2"><a class="text-decoration-none ${currentPage === 'styling-and-furnishing.html' ? 'text-sage fw-semibold' : 'text-charcoal'}" href="styling-and-furnishing.html">Styling &amp; Furnishing</a></li>
                        <li class="mb-0"><a class="text-decoration-none ${currentPage === 'commercial-interiors.html' ? 'text-sage fw-semibold' : 'text-charcoal'}" href="commercial-interiors.html">Commercial Interiors</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li class="nav-item">
              <a class="nav-link ${currentPage === 'portfolio.html' ? 'active' : ''}" href="portfolio.html">Portfolio</a>
            </li>
            <li class="nav-item">
              <a class="nav-link ${currentPage === 'process.html' ? 'active' : ''}" href="process.html">Process</a>
            </li>
            <li class="nav-item">
              <a class="nav-link ${currentPage === 'faq.html' ? 'active' : ''}" href="faq.html">FAQ</a>
            </li>
            <li class="nav-item">
              <a class="nav-link ${currentPage === 'contact.html' ? 'active' : ''}" href="contact.html">Contact</a>
            </li>
          </ul>

          <div class="mt-auto pt-3 border-top">
            <a href="contact.html" class="btn-editorial-primary w-100 text-center mb-3">Book a Consultation</a>
            <div class="text-muted small">
              <p class="mb-1"><i class="bi bi-geo-alt me-2"></i>123 Sample Street, Your City</p>
              <p class="mb-0"><i class="bi bi-envelope me-2"></i>hello@example.com</p>
            </div>
          </div>
        </div>
      </div>
    `;

    navbarContainer.innerHTML = navbarHTML;
  }

  function renderFooter() {
    const footerContainer = document.getElementById('footer-container');
    if (!footerContainer) return;

    const footerHTML = `
      <footer class="site-footer" role="contentinfo">
        <div class="container">
          <div class="row g-4 g-lg-5">
            <!-- Col 1: Studio Brand & Concept Blurb -->
            <div class="col-lg-4 col-md-6">
              <div class="brand-monogram mb-3 text-white">
                <span class="monogram-mark border-white text-white" aria-hidden="true">L&amp;L</span>
                <span class="text-white">Linden &amp; Loom</span>
              </div>
              <p class="small text-white-50 pe-lg-4 mb-4">
                Linden &amp; Loom Interiors is an editorial interior architecture and interior styling studio portfolio concept. Crafted with calm proportions, honest tactile materials, and timeless atmosphere.
              </p>
              <!-- Social Icons (Placeholder links) -->
              <div class="d-flex align-items-center">
                <a href="#social-instagram" class="footer-social-link" aria-label="Instagram (Sample Link)" title="Instagram (Concept)">
                  <i class="bi bi-instagram"></i>
                </a>
                <a href="#social-pinterest" class="footer-social-link" aria-label="Pinterest (Sample Link)" title="Pinterest (Concept)">
                  <i class="bi bi-pinterest"></i>
                </a>
                <a href="#social-linkedin" class="footer-social-link" aria-label="LinkedIn (Sample Link)" title="LinkedIn (Concept)">
                  <i class="bi bi-linkedin"></i>
                </a>
                <a href="#social-facebook" class="footer-social-link" aria-label="Facebook (Sample Link)" title="Facebook (Concept)">
                  <i class="bi bi-facebook"></i>
                </a>
              </div>
            </div>

            <!-- Col 2: Quick Links -->
            <div class="col-lg-2 col-md-6 col-6">
              <h5 class="footer-heading">Studio</h5>
              <ul class="footer-nav-list">
                <li><a href="index.html">Home</a></li>
                <li><a href="about.html">Studio Philosophy</a></li>
                <li><a href="portfolio.html">Selected Works</a></li>
                <li><a href="process.html">Design Process</a></li>
                <li><a href="faq.html">FAQ</a></li>
                <li><a href="contact.html">Consultation</a></li>
              </ul>
            </div>

            <!-- Col 3: Services Links -->
            <div class="col-lg-3 col-md-6 col-6">
              <h5 class="footer-heading">Services</h5>
              <ul class="footer-nav-list">
                <li><a href="services.html">All Services</a></li>
                <li><a href="residential-design.html">Residential Design</a></li>
                <li><a href="kitchen-and-bath.html">Kitchen &amp; Bath</a></li>
                <li><a href="space-planning.html">Space Planning</a></li>
                <li><a href="styling-and-furnishing.html">Styling &amp; Furnishing</a></li>
                <li><a href="commercial-interiors.html">Commercial Interiors</a></li>
              </ul>
            </div>

            <!-- Col 4: Contact & Sample Hours -->
            <div class="col-lg-3 col-md-6">
              <h5 class="footer-heading">Contact &amp; Studio</h5>
              <p class="small text-white-50 mb-2">
                <i class="bi bi-geo-alt text-taupe me-2"></i>123 Sample Street, Your City
              </p>
              <p class="small text-white-50 mb-2">
                <i class="bi bi-telephone text-taupe me-2"></i>0000 000 0000
              </p>
              <p class="small text-white-50 mb-3">
                <i class="bi bi-envelope text-taupe me-2"></i>hello@example.com
              </p>
              <div class="p-2 bg-charcoal rounded-1 border border-secondary border-opacity-25 small text-white-50">
                <span class="d-block text-taupe-light fw-semibold mb-1">Sample Studio Hours:</span>
                Mon – Fri: 9:00 AM – 5:30 PM<br>
                Consultations by advance appointment
              </div>
            </div>
          </div>

          <!-- Bottom bar -->
          <div class="footer-bottom-bar d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
            <div>
              &copy; 2026 Linden &amp; Loom Interiors. Sample website, concept demo.
            </div>
            <div>
              Content on this site is placeholder text for demonstration.
            </div>
          </div>
        </div>
      </footer>

      <!-- Floating Back to Top Button -->
      <button id="back-to-top" type="button" aria-label="Back to top" title="Scroll to top">
        <i class="bi bi-arrow-up"></i>
      </button>
    `;

    footerContainer.innerHTML = footerHTML;
  }

  // Initialize components when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      renderNavbar();
      renderFooter();
    });
  } else {
    renderNavbar();
    renderFooter();
  }
})();
