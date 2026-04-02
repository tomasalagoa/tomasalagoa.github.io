// ── NAV scroll state ─────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Mobile menu ───────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ── Intersection Observer: reveal sections ────────────
const revealEls = document.querySelectorAll('.reveal, .timeline-item');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      // stagger timeline items
      const idx = el.dataset.index;
      if (idx !== undefined) {
        setTimeout(() => el.classList.add('visible'), idx * 120);
      } else {
        el.classList.add('visible');
      }
      observer.unobserve(el);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

// ── Skill bars: animate when visible ─────────────────
const barFills = document.querySelectorAll('.bar-fill');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target;
      const w = fill.dataset.w;
      fill.style.width = w + '%';
      barObserver.unobserve(fill);
    }
  });
}, { threshold: 0.3 });

barFills.forEach(fill => barObserver.observe(fill));

// ── Add reveal class to sections ─────────────────────
document.querySelectorAll('.section-label, .about-text, .about-stats, .skill-group, .domain-card, .edu-card, .languages-block, .contact-heading, .contact-sub, .contact-links').forEach(el => {
  if (!el.classList.contains('timeline-item')) {
    el.classList.add('reveal');
    observer.observe(el);
  }
});

// ── Active nav link highlight on scroll ───────────────
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));

// Active nav style
const styleEl = document.createElement('style');
styleEl.textContent = `.nav-links a.active { color: var(--white); } .nav-links a.active::after { right: 0; }`;
document.head.appendChild(styleEl);
