const userFirstName = document.querySelector('#user-first-name');
const userLastName = document.querySelector('#user-last-name');
const email = document.querySelector('#email');
const pass = document.querySelector('#password');
const confirmPass = document.querySelector('#confirm-password');
const submit = document.querySelector('.btn[type=submit]');
const modal = document.querySelector('.form__modal');

email.addEventListener('change', function () {
  if (!this.validity.valid) {
    this.classList.add('form__input_invalid');
    this.setCustomValidity('Please, enter correct email address!');
  } else {
    this.classList.remove('form__input_invalid');
    this.classList.add('form__input_valid');
    this.setCustomValidity('');
  }
});

pass.addEventListener('blur', function () {
  if (!this.validity.valid) {
    this.classList.add('form__input_invalid');
    this.setCustomValidity('Password must contain at least one uppercase and lower case letter and one digit. Password lenth is 8 characters minimum!');
  } else {
    this.classList.remove('form__input_invalid');
    this.classList.add('form__input_valid');
    this.setCustomValidity('');
  }
});

confirmPass.addEventListener('blur', function () {
  if (this.value !== pass.value) {
    this.classList.add('form__input_invalid');
    this.setCustomValidity('Does not match');
  } else {
    this.classList.remove('form__input_invalid');
    this.classList.add('form__input_valid');
    this.setCustomValidity('');
  }
});

submit.addEventListener('click', (e) => {
  if (!userFirstName.validity.valid) {
    submit.classList.add('btn_error');
    userFirstName.setCustomValidity('Please, enter your first name');
  } else if (!userLastName) {
    submit.classList.add('btn_error');
    userLastName.setCustomValidity('Please, enter your last name');
  } else if (!email) {
    submit.classList.add('btn_error');
    email.setCustomValidity('Please, enter your email');
  } else if (!pass) {
    submit.classList.add('btn_error');
    pass.setCustomValidity('Please, enter your password');
  } else if (!confirmPass) {
    submit.classList.add('btn_error');
    confirmPass.setCustomValidity('Please, enter your password');
  } else {
    e.preventDefault();
    modal.classList.add('form__modal_active');
  }

  setTimeout(() => {
    submit.classList.remove('btn_error');
  }, 500);
});
