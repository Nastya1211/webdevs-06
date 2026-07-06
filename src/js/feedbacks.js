import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import axios from 'axios';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const FEEDBACKS_URL = 'https://wedding-photographer.b.goit.study/api/feedbacks';

const feedbacksList = document.querySelector('.feedbacks-list');
const feedbacksPagination = document.querySelector('.feedbacks-pagination');

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
    breakpoints: {
      768: {
        slidesPerView: 3,
      }
    },
    pagination: {
      el: feedbacksPagination,
      type: 'bullets',
      clickable: true,
      dynamicBullets: true,
      dynamicMainBullets: 3,
    },
    navigation: {
      nextEl: '.feedbacks-button-next',
      prevEl: '.feedbacks-button-prev',
      disabledClass: 'swiper-button-disabled',
    },
  });
};

const getFeedbacks = async () => {
  const { data } = await axios.get(FEEDBACKS_URL);
  return data.feedbacks;
};

if (feedbacksList) {
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
