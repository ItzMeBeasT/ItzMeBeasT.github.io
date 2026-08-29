const header = document.getElementById('header');
const mobileMenu = document.querySelector('.mobile-menu');
const menuToggle = document.querySelector('.menu-toggle');
const modal = document.getElementById('projectModal');
const modalClose = document.querySelector('.modal-close');
const projectTrigger = document.querySelector('.project-trigger');
const projectTitle = document.getElementById('projectTitle');

function updateHeaderState() {
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 24);
}

function toggleMenu(forceOpen) {
  if (!mobileMenu || !menuToggle) return;
  const shouldOpen = typeof forceOpen === 'boolean' ? forceOpen : !mobileMenu.classList.contains('open');
  mobileMenu.classList.toggle('open', shouldOpen);
  menuToggle.setAttribute('aria-expanded', String(shouldOpen));
  document.body.style.overflow = shouldOpen ? 'hidden' : '';
}

if (menuToggle) {
  menuToggle.addEventListener('click', () => toggleMenu());
}

if (mobileMenu) {
  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => toggleMenu(false));
  });
}

window.addEventListener('scroll', updateHeaderState, { passive: true });
window.addEventListener('resize', () => {
  if (window.innerWidth > 900 && mobileMenu) {
    toggleMenu(false);
  }
});
updateHeaderState();

const revealItems = document.querySelectorAll('[data-reveal]');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

function openModal() {
  if (!modal) return;
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', handleEsc);
}

function closeModal() {
  if (!modal) return;
  modal.classList.add('hidden');
  document.body.style.overflow = '';
  document.removeEventListener('keydown', handleEsc);
}

function handleEsc(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}

if (modal) {
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });
}

if (modalClose) {
  modalClose.addEventListener('click', closeModal);
}

const projectButton = document.querySelector('.project-trigger');
if (projectButton) {
  projectButton.addEventListener('click', openModal);
}

if (projectTitle) {
  projectTitle.textContent = 'Kubernetes Monitoring Dashboard';
}
