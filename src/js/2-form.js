const LS_KEY = 'feedback-form-state';
const formEl = document.querySelector('.js-form');

formEl.addEventListener('submit', e => {
  e.preventDefault();
  const form = e.currentTarget;
  if (form.elements.email.value.trim() && form.elements.message.value.trim()) {
    console.log(loadFromLocalStorage(LS_KEY));
    localStorage.removeItem(LS_KEY);
    e.currentTarget.reset();
  }
});

formEl.addEventListener('input', e => {
  const form = e.currentTarget;
  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();

  const data = {
    email,
    message,
  };
  saveToLocalStorage(LS_KEY, data);
});

const { email, message } = loadFromLocalStorage(LS_KEY) || {};
console.log('message:', message);
console.log('email:', email);

function saveToLocalStorage(key = 'empty', value = '') {
  const jsonData = JSON.stringify(value);
  localStorage.setItem(key, jsonData);
}
function loadFromLocalStorage(key = 'empty') {
  const data = localStorage.getItem(key);
  try {
    const result = JSON.parse(data);
    return result;
  } catch {
    return data;
  }
}

function fillForm() {
  const { email, message } = loadFromLocalStorage(LS_KEY) || {};
  formEl.elements.email.value = email || '';
  formEl.elements.message.value = message || '';
}

fillForm();
