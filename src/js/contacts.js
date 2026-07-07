import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { createLoader } from './loader.js';

const form = document.getElementById('contacts-form');
const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');
const messageInput = document.getElementById('message');
const submitBtn = document.getElementById('submit-btn');
const successModal = document.getElementById('success-modal');

const formLoader = createLoader(form, 'Sending...');

let isDeleting = false;

phoneInput.addEventListener('keydown', (event) => {
  isDeleting = event.key === 'Backspace' || event.key === 'Delete';
});

function maskPhone(event) {
  const input = event.target;
  let inputNumbersValue = input.value.replace(/\D/g, '');
  let formattedInputValue = '';

  if (isDeleting) {
    return;
  }

  if (!inputNumbersValue) {
    input.value = '';
    return;
  }

  formattedInputValue = '+' + inputNumbersValue.substring(0, 1);

  if (inputNumbersValue.length > 1) {
    formattedInputValue += ' (' + inputNumbersValue.substring(1, 4);
  }
  if (inputNumbersValue.length >= 4) {
    formattedInputValue += ') ';
  }
  if (inputNumbersValue.length > 4) {
    formattedInputValue += inputNumbersValue.substring(4, 7);
  }
  if (inputNumbersValue.length >= 7) {
    formattedInputValue += ' ' + inputNumbersValue.substring(7, 12);
  }

  input.value = formattedInputValue;
}

function toggleFieldError(inputElement, isValid, errorMessage = "") {
  const formGroup = inputElement.closest('.form-group');
  const errorSpan = formGroup.querySelector('.error-message');

  if (inputElement.value.trim() === "") {
    formGroup.classList.remove('has-error');
    if (errorSpan) errorSpan.textContent = "";
    return false;
  }

  if (isValid) {
    formGroup.classList.remove('has-error');
    if (errorSpan) errorSpan.textContent = "";
    return true;
  } else {
    formGroup.classList.add('has-error');
    if (errorSpan) errorSpan.textContent = errorMessage;
    return false;
  }
}

function validateForm() {
  const nameValue = nameInput.value.trim();
  const phoneValue = phoneInput.value.trim();
  const messageValue = messageInput.value.trim();

  const nameRegex = /^[a-zA-Zа-яА-ЯіІєЄїЇґҐ\s]+$/;
  const phoneRegex = /^[0-9+\-\s()]+$/;

  const isNameRegexOk = nameRegex.test(nameValue);
  let nameMessage = "";
  if (nameValue.length <= 1) nameMessage = "Name must be longer than 1 character";
  else if (!isNameRegexOk) nameMessage = "Only letters and spaces allowed";
  const isNameValid = toggleFieldError(nameInput, nameValue.length > 1 && isNameRegexOk, nameMessage);

  const isPhoneRegexOk = phoneRegex.test(phoneValue);
  const onlyDigits = phoneValue.replace(/\D/g, ''); 
  
  let phoneMessage = "";
  if (phoneValue.length === 0) phoneMessage = "";
  else if (!isPhoneRegexOk || onlyDigits.length !== 12) {
    phoneMessage = "Phone must contain exactly 12 digits";
  }
  const isPhoneValid = toggleFieldError(phoneInput, isPhoneRegexOk && onlyDigits.length === 12, phoneMessage);

  let isMessageValid = true;
  if (messageValue.length > 0 && messageValue.length <= 2) {
    isMessageValid = toggleFieldError(messageInput, false, "Message must be longer than 2 characters");
  } else {
    const formGroup = messageInput.closest('.form-group');
    const errorSpan = formGroup.querySelector('.error-message');
    formGroup.classList.remove('has-error');
    if (errorSpan) errorSpan.textContent = "";
    isMessageValid = true;
  }

  if (nameValue && phoneValue && isNameValid && isPhoneValid && isMessageValid) {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
}

nameInput.addEventListener('input', validateForm);

phoneInput.addEventListener('input', maskPhone);
phoneInput.addEventListener('input', validateForm);

messageInput.addEventListener('input', validateForm);

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = {
    name: nameInput.value.trim(),
    phone: phoneInput.value.trim().replace(/\D/g, ''),
    message: messageInput.value.trim()
  };

  try {
    submitBtn.disabled = true;
    formLoader.show(); 

    const response = await fetch('https://wedding-photographer.b.goit.study/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Server error occurred');
    }

    const result = await response.json();
    console.log('Успіх:', result);
    successModal.classList.remove('is-hidden');
    form.reset();

  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: error.message || 'Something went wrong. Please try again.',
      position: 'topRight'
    });
  } finally {
    formLoader.hide();
    submitBtn.disabled = true;
  }
});