import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import axios from 'axios';

const FEEDBACKS_URL = 'https://wedding-photographer.b.goit.study/api/feedbacks';

const feedbacksList = document.querySelector('.feedbacks-list');
const feedbacksPagination = document.querySelector('.feedbacks-pagination');

const escapeHtml = value =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

const createFeedbackCard = ({ descr = '', name = '' }) => `
  <li class="feedbacks-item swiper-slide">
    <p class="feedbacks-text">"${escapeHtml(descr)}"</p>
    <p class="feedbacks-author">${escapeHtml(name)}</p>
  </li>
`;

const initFeedbacksSlider = () => {
  const feedbacksSwiper = new Swiper('.feedbacks-slider', {
    modules: [Navigation, Pagination],
    slidesPerView: 'auto',
    slidesPerGroup: 1,
    spaceBetween: 0,
    speed: 500,
    autoHeight: false,
    watchOverflow: false,
    init: false,
    pagination: {
      el: feedbacksPagination,
      type: 'bullets',
      clickable: true,
      dynamicBullets: true,
      dynamicMainBullets: 1,
    },
    navigation: {
      nextEl: '.feedbacks-button-next',
      prevEl: '.feedbacks-button-prev',
      disabledClass: 'swiper-button-disabled',
    },
  });

  feedbacksSwiper.init();
  feedbacksSwiper.pagination.render();
  feedbacksSwiper.pagination.update();
};

const renderFeedbacks = feedbacks => {
  feedbacksList.innerHTML = feedbacks.map(createFeedbackCard).join('');
};

const getFeedbacks = async () => {
  const response = await fetch(FEEDBACKS_URL);

  if (!response.ok) {
    throw new Error(`Feedbacks request failed with status ${response.status}`);
  }

  const data = await response.json();

  return data.feedbacks;
};

if (feedbacksList) {
  getFeedbacks()
    .then(feedbacks => {
      if (!Array.isArray(feedbacks) || feedbacks.length === 0) {
        return;
      }

      renderFeedbacks(feedbacks);
      initFeedbacksSlider();
    })
    .catch(error => {
      console.error(error);
    });
}
