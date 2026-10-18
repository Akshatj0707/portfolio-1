import { app, footer, header } from './components.js';
import { perspectives, profile } from './data.js';

const safeStorage = {
  get(key) {
    try { return window.localStorage.getItem(key); } catch { return null; }
  },
  set(key, value) {
    try { window.localStorage.setItem(key, value); } catch { /* Motion still works for this visit. */ }
  },
};

const motionToggle = safeStorage.get('portfolio-motion');
const reduceMotionByDefault = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const motionEnabled = motionToggle === null ? !reduceMotionByDefault : motionToggle === 'on';
document.body.classList.toggle('motion-on', motionEnabled);
document.body.classList.toggle('motion-off', !motionEnabled);

document.querySelector('#site-header').innerHTML = header();
document.querySelector('#app').innerHTML = app();
document.querySelector('#site-footer').innerHTML = footer();
document.querySelector('#year').textContent = new Date().getFullYear();

const siteHeader = document.querySelector('#site-header');
const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navLinkItems = [...document.querySelectorAll('.nav-link')];
const progressBar = document.querySelector('.scroll-progress span');
const motionButton = document.querySelector('.motion-toggle');
const motionLabel = document.querySelector('.motion-label');

const setActiveNav = (sectionId) => {
  const currentLink = navLinkItems.find((link) => link.getAttribute('href') === `#${sectionId}`);
  if (!currentLink) return;
  navLinkItems.forEach((link) => {
    const active = link === currentLink;
    link.classList.toggle('is-active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
};
setActiveNav('about');

const setMenu = (open) => {
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  menuButton.innerHTML = `${open ? 'Close' : 'Menu'} <span>${open
    ? '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>'
    : '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>'}</span>`;
  navLinks.classList.toggle('is-open', open);
  document.body.classList.toggle('menu-open', open);
};

menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
navLinkItems.forEach((link) => link.addEventListener('click', () => setMenu(false)));
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menuButton.focus();
  }
});

const updateScrollUI = () => {
  siteHeader.classList.toggle('is-scrolled', window.scrollY > 24);
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.transform = `scaleX(${scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0})`;
};
let scrollFrame = 0;
const scheduleScrollUI = () => {
  if (scrollFrame) return;
  scrollFrame = window.requestAnimationFrame(() => {
    updateScrollUI();
    scrollFrame = 0;
  });
};
updateScrollUI();
window.addEventListener('scroll', scheduleScrollUI, { passive: true });
window.addEventListener('resize', scheduleScrollUI, { passive: true });

const sections = document.querySelectorAll('main section[id]');
if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      setActiveNav(entry.target.id);
    });
  }, { rootMargin: '-32% 0px -58% 0px', threshold: 0 });
  sections.forEach((section) => sectionObserver.observe(section));
}

const revealElements = [...document.querySelectorAll('.reveal, .reveal-scale')];
let revealObserver;
if ('IntersectionObserver' in window) {
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle('is-visible', entry.isIntersecting);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -34px 0px' });
}

const updateMotionControl = (enabled) => {
  document.body.classList.toggle('motion-on', enabled);
  document.body.classList.toggle('motion-off', !enabled);
  motionButton.setAttribute('aria-pressed', String(enabled));
  motionButton.setAttribute('aria-label', `Turn motion ${enabled ? 'off' : 'on'}`);
  motionLabel.textContent = enabled ? 'MOTION ON' : 'MOTION OFF';
  safeStorage.set('portfolio-motion', enabled ? 'on' : 'off');

  revealObserver?.disconnect();
  revealElements.forEach((element) => element.classList.remove('is-visible'));
  if (enabled && revealObserver) revealElements.forEach((element) => revealObserver.observe(element));
  else if (enabled) revealElements.forEach((element) => element.classList.add('is-visible'));
};

motionButton.addEventListener('click', () => {
  updateMotionControl(motionButton.getAttribute('aria-pressed') !== 'true');
});
motionButton.setAttribute('aria-pressed', String(motionEnabled));
motionButton.setAttribute('aria-label', `Turn motion ${motionEnabled ? 'off' : 'on'}`);
motionLabel.textContent = motionEnabled ? 'MOTION ON' : 'MOTION OFF';
if (motionEnabled && revealObserver) revealElements.forEach((element) => revealObserver.observe(element));
else if (motionEnabled) revealElements.forEach((element) => element.classList.add('is-visible'));

const tabButtons = [...document.querySelectorAll('.perspective-tab')];
const perspectivePanel = document.querySelector('#perspective-content');
const selectPerspective = (id, focus = false) => {
  const selected = perspectives.find((item) => item.id === id);
  if (!selected) return;
  tabButtons.forEach((button) => {
    const active = button.dataset.perspective === id;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-selected', String(active));
    button.tabIndex = active ? 0 : -1;
    if (active && focus) button.focus();
  });
  perspectivePanel.setAttribute('aria-labelledby', `tab-${selected.id}`);
  perspectivePanel.innerHTML = `
    <p class="micro-label">${selected.label.toUpperCase()}</p>
    <h3>${selected.title}</h3>
    <p class="perspective-detail">${selected.detail}</p>
    <p class="perspective-stack">${selected.skills}</p>`;
};

tabButtons.forEach((button, index) => {
  button.addEventListener('click', () => selectPerspective(button.dataset.perspective));
  button.addEventListener('keydown', (event) => {
    let nextIndex = index;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % tabButtons.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + tabButtons.length) % tabButtons.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = tabButtons.length - 1;
    else return;
    event.preventDefault();
    selectPerspective(tabButtons[nextIndex].dataset.perspective, true);
  });
});

const toast = document.querySelector('#toast');
let toastTimer;
const showToast = (message) => {
  toast.textContent = message;
  toast.classList.add('is-visible');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 4200);
};

document.querySelector('#contact-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const values = new FormData(form);
  if (values.get('company')) return;
  if (!form.checkValidity()) return form.reportValidity();

  const name = String(values.get('name')).trim();
  const email = String(values.get('email')).trim();
  const message = String(values.get('message')).trim();
  const subject = `Portfolio enquiry from ${name}`;
  const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
  showToast('Opening your email app with the message ready to send.');
  window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  form.reset();
});
