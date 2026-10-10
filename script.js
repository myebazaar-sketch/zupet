/* ==========================================================================
   Zupet — Premium Fish Food
   script.js
   --------------------------------------------------------------------------
   Vanilla JavaScript (no libraries, no build tools).
   Features:
     1. Sticky header "scrolled" state
     2. Mobile hamburger menu toggle
     3. Scroll-reveal animations (IntersectionObserver)
     4. Active nav-link highlighting while scrolling
     5. Rotating homepage product feature
     6. Front-end only contact form handler (no backend)
     7. Dynamic footer year
   ========================================================================== */

(function () {
  'use strict';

  // Small query helpers
  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ------------------------------------------------------------------
     1. ROTATING HOMEPAGE PRODUCT
     Cycles through the existing product photos and links. The rotation
     pauses while the shopper is interacting with the feature.
     ------------------------------------------------------------------ */
  const heroProduct = $('#hero-product-link');
  const heroProductImage = $('#hero-product-image');
  const heroProductName = $('#hero-product-name');
  const heroProductCaption = $('#hero-product-caption');

  if (heroProduct && heroProductImage && heroProductName && heroProductCaption) {
    const products = [
      {
        image: 'https://m.media-amazon.com/images/I/61jZ9udtQ0L._SL1024_.jpg',
        name: 'River shrimp',
        caption: 'A naturally delicious favourite',
        alt: 'Zupet River Shrimp Sun Dried Krill Fish Food',
        href: '#product-premium-flakes'
      },
      {
        image: 'https://m.media-amazon.com/images/I/617h3Wos4nL._SL1195_.jpg',
        name: 'Shrimp + larva',
        caption: 'Two protein-rich favourites',
        alt: 'Zupet River Shrimp and Meal Worm Fly Larva Pet Food Combo',
        href: '#product-color-boost'
      },
      {
        image: 'https://m.media-amazon.com/images/I/8135bV7ZreL._SL1500_.jpg',
        name: 'Insect treats',
        caption: 'Crunchy, naturally rich bites',
        alt: 'Zupet Black Soldier Fly Larvae and Mealworm Treat',
        href: '#product-spirulina-wafers'
      },
      {
        image: 'https://m.media-amazon.com/images/I/71POME8NPZL._SL1448_.jpg',
        name: 'A handy two-pack',
        caption: 'Mealworm + black soldier fly',
        alt: 'Zupet Meal Worm and Black Soldier Fly Larva Puffed Pack of 2',
        href: '#product-nano-granules'
      },
      {
        image: 'https://m.media-amazon.com/images/I/61EIKLCOBRL._SL1195_.jpg',
        name: 'Jumbo shrimp',
        caption: 'Made for your bigger fish',
        alt: 'Zupet Jumbo Shrimp Fish Food 50gm',
        href: '#product-shrimp-delight'
      },
      {
        image: 'https://images.meesho.com/images/products/999591450/nzvoj_512.avif?width=512',
        name: 'Catappa leaves',
        caption: 'A natural touch for your tank',
        alt: 'Zupet Natural Dried Catappa Almond Leaves for Aquarium',
        href: '#product-betta-bites'
      }
    ];
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let productIndex = 0;

    heroProductImage.addEventListener('load', () => {
      heroProductImage.classList.remove('is-changing');
    });

    heroProductImage.addEventListener('error', () => {
      console.error('Failed to load homepage featured product image:', heroProductImage.src);
      heroProductImage.classList.remove('is-changing');
    });

    window.setInterval(() => {
      if (
        document.hidden ||
        reducedMotion.matches ||
        heroProduct.matches(':hover, :focus-within')
      ) return;

      productIndex = (productIndex + 1) % products.length;
      const product = products[productIndex];
      heroProductImage.classList.add('is-changing');
      heroProductImage.src = product.image;
      heroProductImage.alt = product.alt;
      heroProduct.href = product.href;
      heroProduct.setAttribute('aria-label', 'Explore ' + product.name);
      heroProductName.textContent = product.name;
      heroProductCaption.textContent = product.caption;
    }, 4200);
  }

  /* ------------------------------------------------------------------
     2. STICKY HEADER STATE
     Adds a subtle shadow / stronger background once the page is scrolled.
     ------------------------------------------------------------------ */
  const header = $('.site-header');

  const updateHeader = () => {
    header.classList.toggle('scrolled', window.scrollY > 12);
  };

  updateHeader(); // set correct state on load (e.g. page refresh mid-scroll)
  window.addEventListener('scroll', updateHeader, { passive: true });

  /* ------------------------------------------------------------------
     3. MOBILE NAVIGATION
     Hamburger button toggles .nav-open on the header, which shows the
     links panel (see CSS). Closes on link click, Escape, or desktop resize.
     ------------------------------------------------------------------ */
  const navToggle = $('#nav-toggle');

  const closeNav = () => {
    header.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
  };

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const isOpen = header.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // Close the menu when a nav link is tapped
  $$('.nav-links a').forEach((link) => link.addEventListener('click', closeNav));

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeNav();
  });

  // Reset menu state when resizing back to desktop widths
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) closeNav();
  });

  /* ------------------------------------------------------------------
     4. SCROLL-REVEAL ANIMATIONS
     Elements with class .reveal fade/slide in the first time they enter
     the viewport. Falls back to instantly-visible if no IntersectionObserver.
     ------------------------------------------------------------------ */
  const revealEls = $$('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // animate only once
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    // Very old browsers: just show everything
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* ------------------------------------------------------------------
     5. ACTIVE NAV-LINK HIGHLIGHTING
     A scroll-spy highlights the nav link for the section currently in view.
     ------------------------------------------------------------------ */
  const navMap = {};
  // Exclude the .nav-cta button — it's a CTA, not a scroll-spy link
  $$('.nav-links a[href^="#"]:not(.nav-cta)').forEach((link) => {
    const id = link.getAttribute('href').slice(1);
    if (document.getElementById(id)) navMap[id] = link;
  });

  const sectionIds = Object.keys(navMap);

  if (sectionIds.length && 'IntersectionObserver' in window) {
    const spyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            $$('.nav-links a').forEach((a) => a.classList.remove('active'));
            const link = navMap[entry.target.id];
            if (link) link.classList.add('active');
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    sectionIds.forEach((id) => spyObserver.observe(document.getElementById(id)));
  }

  /* ------------------------------------------------------------------
     6. CONTACT FORM (FRONT-END ONLY)
     No backend — this simulates a successful submission and shows a
     confirmation message. To send real emails later:
       - Point the <form> action to a service (e.g. Formspree)
       - Remove preventDefault() below, or keep it only for validation.
     ------------------------------------------------------------------ */
  const form = $('#contact-form');
  const status = $('#form-status');

  if (form && status) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Let the browser enforce required/email validation
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const name = $('#form-name').value.trim();
      status.textContent =
        'Thanks, ' + (name || 'friend') +
        '! Your message has been received — we\u2019ll reply within one business day.';
      status.hidden = false;

      form.reset();

      // Auto-hide the confirmation after a few seconds
      window.setTimeout(() => { status.hidden = true; }, 8000);
    });
  }

  /* ------------------------------------------------------------------
     7. FOOTER YEAR
     Keeps the copyright year current without editing the markup.
     ------------------------------------------------------------------ */
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
