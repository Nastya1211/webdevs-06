import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { createLoader } from './loader.js';
import axios from 'axios';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const FEEDBACKS_URL = 'https://wedding-photographer.b.goit.study/api/feedbacks';

const feedbacksList = document.querySelector('.feedbacks-list');
const feedbacksPagination = document.querySelector('.feedbacks-pagination');
const formLoader = createLoader(feedbacksList);

const createFeedbackCard = ({ descr = '', name = '' }) => `
  <li class="feedbacks-item swiper-slide">
    <p class="feedbacks-text">"${descr}"</p>
    <p class="feedbacks-author">${name}</p>
  </li>
`;

const initFeedbacksSlider = () => {
  new Swiper('.feedbacks-slider', {
    modules: [Navigation, Pagination],
    speed: 500,
    spaceBetween: 24,
    slidesPerView: 1,
    slidesPerGroup: 1,
    breakpoints: {
      768: {
        slidesPerView: 3,
        slidesPerGroup: 1,
      },
      1440: {
        slidesPerView: 3,
        slidesPerGroup: 1,
      },
    },
    pagination: {
      el: feedbacksPagination,
      type: 'custom',
      renderCustom: function (swiper, current, total) {
        let bulletsHtml = '';
        const totalCustomBullets = 3;

        const activeIndex = swiper.realIndex % totalCustomBullets;

        for (let i = 0; i < totalCustomBullets; i++) {
          const isActive =
            i === activeIndex ? 'swiper-pagination-bullet-active' : '';
          bulletsHtml += `<span class="swiper-pagination-bullet ${isActive}" data-index="${i}"></span>`;
        }

        return bulletsHtml;
      },
    },
    navigation: {
      nextEl: '.feedbacks-button-next',
      prevEl: '.feedbacks-button-prev',
    },
    on: {
      init: function (swiper) {
        if (!feedbacksPagination) return;
        feedbacksPagination.addEventListener('click', e => {
          if (e.target.classList.contains('swiper-pagination-bullet')) {
            const bulletIndex = parseInt(
              e.target.getAttribute('data-index'),
              10
            );

            const currentRound = Math.floor(swiper.realIndex / 3);
            const targetSlide = currentRound * 3 + bulletIndex;

            if (targetSlide < swiper.slides.length) {
              swiper.slideTo(targetSlide);
            }
          }
        });
      },
    },
  });
};

const getFeedbacks = async () => {
  const { data } = await axios.get(FEEDBACKS_URL);
  formLoader.hide();
  return data.feedbacks;
};

if (feedbacksList) {
  formLoader.show();
  getFeedbacks()
    .then(feedbacks => {
      if (Array.isArray(feedbacks) && feedbacks.length > 0) {
        feedbacksList.innerHTML = feedbacks.map(createFeedbackCard).join('');
        initFeedbacksSlider();
      } else {
        document.querySelector('.feedbacks-controls')?.remove();
      }
    })
    .catch(error => {
      console.error(error);
      document.querySelector('.feedbacks-controls')?.remove();
    });
}
