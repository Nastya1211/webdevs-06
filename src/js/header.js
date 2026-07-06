const menuOverlay = document.querySelector('.menu-overlay');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');

document
  .querySelectorAll('.mobile-menu-btn, .navbar-btn-close')
  .forEach(btn => {
    btn.addEventListener('click', function () {
      menuOverlay.classList.toggle('is-open');

      const isOpen = menuOverlay.classList.contains('is-open');
      mobileMenuBtn.setAttribute('aria-expanded', isOpen);

      if (window.matchMedia('(max-width: 767px)').matches) {
        document.body.style.overflow = isOpen ? 'hidden' : '';
      }
    });
  });

document.querySelectorAll('.menu-nav-link, .menu-mk-btn').forEach(link => {
  link.addEventListener('click', function () {
    document.body.style.overflow = '';
    menuOverlay.classList.remove('is-open');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
  });
});

window.addEventListener('resize', () => {
  if (window.matchMedia('(min-width: 768px)').matches) {
    menuOverlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }
});
