import { createLoader } from './loader.js';

(function () {
  const API_BASE = 'https://wedding-photographer.b.goit.study/api';
  const CATEGORIES_URL = `${API_BASE}/categories`;
  const PHOTOS_URL = `${API_BASE}/wedding-photos`;

  const INITIAL_LIMIT = 9;
  const LOAD_MORE_LIMIT = 3;

  const CATEGORY_ORDER = [
    'Candid Moments',
    'Portrait Perfection',
    'Ceremony & Vows',
    'Joyful Celebrations',
    'Standart',
    'Attention to Detail',
  ];

  const filtersEl = document.getElementById('portfolioFilters');
  const listEl = document.getElementById('portfolioList');
  const loaderWrap = document.getElementById('portfolioLoaderWrap');
  const showMoreBtn = document.getElementById('portfolioShowMore');

  const loader = createLoader(loaderWrap, 'Uploading photo...');

  let state = {
    categoryId: '',
    loadedCount: 0,
    totalItems: 0,
    page: 1,
  };

  function sortCategories(categories) {
    return [...categories].sort((a, b) => {
      const indexA = CATEGORY_ORDER.indexOf(a.category);
      const indexB = CATEGORY_ORDER.indexOf(b.category);
      return indexA - indexB;
    });
  }

  function renderFilters(categories) {
    const allBtn = `
      <li class="portfolio__filter-item" role="presentation">
        <button
          type="button"
          class="portfolio__filter-btn is-active"
          role="tab"
          aria-selected="true"
          data-category-id=""
        >All Photos</button>
      </li>
    `;

    const categoryBtns = categories
      .map(
        cat => `
      <li class="portfolio__filter-item" role="presentation">
        <button
          type="button"
          class="portfolio__filter-btn"
          role="tab"
          aria-selected="false"
          data-category-id="${cat._id}"
        >${cat.category}</button>
      </li>
    `
      )
      .join('');

    filtersEl.innerHTML = allBtn + categoryBtns;
  }

  function renderPhotos(photos, { append }) {
    const markup = photos
      .map(
        photo => `
      <li class="portfolio__item">
        <img
          class="portfolio__img"
          src="${photo.img}"
          alt="${photo.title}"
          loading="lazy"
        />
      </li>
    `
      )
      .join('');

    if (append) {
      listEl.insertAdjacentHTML('beforeend', markup);
    } else {
      listEl.innerHTML = markup;
    }
  }

  function updateShowMoreVisibility() {
    if (state.loadedCount >= state.totalItems) {
      showMoreBtn.classList.add('is-hidden');
    } else {
      showMoreBtn.classList.remove('is-hidden');
      showMoreBtn.disabled = false;
    }
  }

  function buildPhotosUrl({ page, limit, categoryId }) {
    const url = new URL(PHOTOS_URL);
    url.searchParams.set('page', page);
    url.searchParams.set('limit', limit);
    if (categoryId) {
      url.searchParams.set('categoryId', categoryId);
    }
    return url.toString();
  }

  async function fetchCategories() {
    try {
      const res = await fetch(CATEGORIES_URL);
      if (!res.ok) throw new Error(`Categories request failed: ${res.status}`);
      const categories = await res.json();
      renderFilters(sortCategories(categories));
    } catch (err) {
      console.error(err);
      filtersEl.innerHTML = `<li class="portfolio__filter-item">Не вдалося завантажити фільтри</li>`;
    }
  }

  async function fetchPhotos({ page, limit, categoryId, append }) {
    loader.show();
    showMoreBtn.disabled = true;

    try {
      const url = buildPhotosUrl({ page, limit, categoryId });
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Photos request failed: ${res.status}`);
      const data = await res.json();

      renderPhotos(data.weddingPhotos, { append });

      state.totalItems = data.totalItems;
      state.loadedCount = append
        ? state.loadedCount + data.weddingPhotos.length
        : data.weddingPhotos.length;

      updateShowMoreVisibility();
    } catch (err) {
      console.error(err);
      if (!append) {
        listEl.innerHTML = `<li class="portfolio__item portfolio__item--error">Failed to load the photo</li>`;
      }
    } finally {
      loader.hide();
    }
  }

  function loadInitial(categoryId) {
    state.categoryId = categoryId;
    state.page = 1;
    fetchPhotos({ page: 1, limit: INITIAL_LIMIT, categoryId, append: false });
  }

  function loadMore() {
    const nextPage = Math.floor(state.loadedCount / LOAD_MORE_LIMIT) + 1;
    fetchPhotos({
      page: nextPage,
      limit: LOAD_MORE_LIMIT,
      categoryId: state.categoryId,
      append: true,
    });
  }

  filtersEl.addEventListener('click', e => {
    const btn = e.target.closest('.portfolio__filter-btn');
    if (!btn) return;

    filtersEl.querySelectorAll('.portfolio__filter-btn').forEach(b => {
      b.classList.remove('is-active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('is-active');
    btn.setAttribute('aria-selected', 'true');

    const categoryId = btn.dataset.categoryId || '';
    loadInitial(categoryId);
  });

  showMoreBtn.addEventListener('click', loadMore);

  fetchCategories();
  loadInitial('');
})();
