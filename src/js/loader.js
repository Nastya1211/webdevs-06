export function createLoader(parentElement, text = 'Завантаження...') {
  if (!parentElement) {
    console.error(
      'Loader Error: Не вказано батьківський елемент (parentElement).'
    );
    return null;
  }
  const loaderEl = document.createElement('div');
  loaderEl.className = 'shared-loader';
  loaderEl.setAttribute('aria-live', 'polite');
  loaderEl.setAttribute('aria-hidden', 'true');

  loaderEl.innerHTML = `
    <span class="shared-loader-spinner"></span>
    <span class="shared-loader-text">${text}</span>
  `;

  parentElement.appendChild(loaderEl);

  return {
    show() {
      loaderEl.classList.add('is-visible');
      loaderEl.setAttribute('aria-hidden', 'false');
    },
    hide() {
      loaderEl.classList.remove('is-visible');
      loaderEl.setAttribute('aria-hidden', 'true');
    },
  };
}
