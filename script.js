const body = document.body;
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('[data-nav-links]');
const links = [...document.querySelectorAll('.nav-links a')];

if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    const isOpen = body.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  links.forEach((link) => {
    link.addEventListener('click', () => {
      body.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealItems = document.querySelectorAll('.reveal, .card, .cert-card, .service-card, .case-study, .contact-card');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => {
  item.classList.add('reveal');
  revealObserver.observe(item);
});

const sections = [...document.querySelectorAll('main section[id]')];
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const active = entry.target.getAttribute('id');
    links.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${active}`);
    });
  });
}, { rootMargin: '-35% 0px -55% 0px', threshold: 0.01 });

sections.forEach((section) => sectionObserver.observe(section));