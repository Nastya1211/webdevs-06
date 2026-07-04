import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';

const accordion = new Accordion('.faq-list', {
  duration: 400,
  showMultiple: false,
  elementClass: 'faq-item',
  triggerClass: 'faq-btn',
  panelClass: 'faq-content',
});
