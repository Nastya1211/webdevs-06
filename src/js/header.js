const menuOverlay = document.querySelector('.menu-overlay');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const menuLinks = document.querySelectorAll('.menu-nav-link, .menu-mk-btn');
const toggleButtons = document.querySelectorAll(
  '.mobile-menu-btn, .navbar-btn-close'
);

function setMenuState(isOpen) {
  menuOverlay.classList.toggle('is-open', isOpen);
  mobileMenuBtn.setAttribute('aria-expanded', isOpen);

  if (window.matchMedia('(max-width: 767.98px)').matches) {
    document.body.style.overflow = isOpen ? 'hidden' : '';
  } else {
    document.body.style.overflow = '';
  }
}

toggleButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const willOpen = !menuOverlay.classList.contains('is-open');
    setMenuState(willOpen);
  });
});

menuLinks.forEach(link => {
  link.addEventListener('click', () => setMenuState(false));
});

const debounce = (func, delay = 100) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

window.addEventListener(
  'resize',
  debounce(() => {
    if (window.matchMedia('(min-width: 768px)').matches) {
      setMenuState(false);
    }
  })
);
