const userFirstName = document.querySelector('#user-first-name');
const userLastName = document.querySelector('#user-last-name');
const email = document.querySelector('#email');
const pass = document.querySelector('#password');
const confirmPass = document.querySelector('#confirm-password');
const submit = document.querySelector('.btn[type=submit]');
const modal = document.querySelector('.form__modal');

function checkValidity() {
  if (!this.validity.valid) {
    this.classList.add('form__input_invalid');
  } else {
    this.classList.remove('form__input_invalid');
    this.classList.add('form__input_valid');
  }
}

userFirstName.addEventListener('blur', checkValidity);

userLastName.addEventListener('blur', checkValidity);

email.addEventListener('blur', checkValidity);

pass.addEventListener('blur', checkValidity);

confirmPass.addEventListener('blur', checkValidity);

submit.addEventListener('click', (e) => {
  if (!userFirstName.validity.valid) {
    e.preventDefault();
    submit.classList.add('btn_error');
    userFirstName.classList.add('form__input_invalid');
  } else if (!userLastName.validity.valid) {
    e.preventDefault();
    submit.classList.add('btn_error');
    userLastName.classList.add('form__input_invalid');
  } else if (!email.validity.valid) {
    e.preventDefault();
    submit.classList.add('btn_error');
    email.classList.add('form__input_invalid');
  } else if (!pass.validity.valid) {
    e.preventDefault();
    submit.classList.add('btn_error');
    pass.classList.add('form__input_invalid');
  } else if (!confirmPass.validity.valid) {
    e.preventDefault();
    submit.classList.add('btn_error');
    confirmPass.classList.add('form__input_invalid');
  } else {
    e.preventDefault();
    modal.classList.add('form__modal_active');
  }

  setTimeout(() => {
    submit.classList.remove('btn_error');
  }, 500);
});
