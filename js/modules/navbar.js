// js/modules/navbar.js
import { saveToLocalStorage } from './utils.js';

export function initNavbar() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-menu a').forEach((link) => {
    const href = link.getAttribute('href').replace('#', '');
    if (currentPage.includes(href) || (currentPage === 'index.html' && href === 'home')) {
      link.classList.add('active');
    }
  });

  // Модальные окна входа и регистрации
  initAuthModals();
}

function initAuthModals() {
  // Вход
  const loginBtn = document.getElementById('loginBtn');
  const loginModal = document.getElementById('loginModal');
  const closeLoginModal = document.getElementById('closeLoginModal');
  const cancelLoginBtn = document.getElementById('cancelLoginBtn');
  const submitLoginBtn = document.getElementById('submitLoginBtn');

  // Регистрация
  const signupBtn = document.getElementById('signupBtn');
  const signupModal = document.getElementById('signupModal');
  const closeSignupModal = document.getElementById('closeSignupModal');
  const cancelSignupBtn = document.getElementById('cancelSignupBtn');
  const submitSignupBtn = document.getElementById('submitSignupBtn');

  // Открыть окно входа
  if (loginBtn && loginModal) {
    loginBtn.addEventListener('click', () => {
      loginModal.classList.remove('hidden');
    });

    closeLoginModal.addEventListener('click', () => {
      loginModal.classList.add('hidden');
    });

    cancelLoginBtn.addEventListener('click', () => {
      loginModal.classList.add('hidden');
    });

    loginModal.addEventListener('click', (e) => {
      if (e.target === loginModal) {
        loginModal.classList.add('hidden');
      }
    });

    submitLoginBtn.addEventListener('click', () => {
      const email = document.getElementById('loginEmail').value.trim();
      const password = document.getElementById('loginPassword').value;

      if (!email || !password) {
        alert('Пожалуйста, заполните все поля.');
        return;
      }

      // Заглушка: успешный вход
      alert(`Добро пожаловать, ${email}!`);
      loginModal.classList.add('hidden');
      saveToLocalStorage('isLoggedIn', true);
      updateAuthButtons(true);
    });
  }

  // Открыть окно регистрации
  if (signupBtn && signupModal) {
    signupBtn.addEventListener('click', () => {
      signupModal.classList.remove('hidden');
    });

    closeSignupModal.addEventListener('click', () => {
      signupModal.classList.add('hidden');
    });

    cancelSignupBtn.addEventListener('click', () => {
      signupModal.classList.add('hidden');
    });

    signupModal.addEventListener('click', (e) => {
      if (e.target === signupModal) {
        signupModal.classList.add('hidden');
      }
    });

    submitSignupBtn.addEventListener('click', () => {
      const name = document.getElementById('signupName').value.trim();
      const surname = document.getElementById('signupSurname').value.trim();
      const email = document.getElementById('signupEmail').value.trim();
      const password = document.getElementById('signupPassword').value;
      const confirmPassword = document.getElementById('signupConfirmPassword').value;

      if (!name || !surname || !email || !password) {
        alert('Пожалуйста, заполните все обязательные поля.');
        return;
      }

      if (password !== confirmPassword) {
        alert('Пароли не совпадают.');
        return;
      }

      if (password.length < 6) {
        alert('Пароль должен быть не менее 6 символов.');
        return;
      }

      // Заглушка: успешная регистрация
      alert(`Аккаунт успешно создан! Добро пожаловать, ${name}!`);
      signupModal.classList.add('hidden');
      saveToLocalStorage('isLoggedIn', true);
      saveToLocalStorage('userProfile', {
        name: name,
        surname: surname,
        role: 'Студент',
        course: '',
        city: '',
      });
      updateAuthButtons(true);
    });
  }
}

function updateAuthButtons(isLoggedIn) {
  const authButtons = document.querySelector('.auth-buttons');
  if (!authButtons) return;

  if (isLoggedIn) {
    authButtons.innerHTML = `<button class="btn-logout" id="logoutBtn">Выйти</button>`;
    document.getElementById('logoutBtn').addEventListener('click', () => {
      saveToLocalStorage('isLoggedIn', false);
      updateAuthButtons(false);
      alert('Вы вышли из аккаунта.');
    });
  } else {
    authButtons.innerHTML = `
      <button class="btn-login" id="loginBtn">Вход</button>
      <button class="btn-signup" id="signupBtn">Регистрация</button>
    `;
    initAuthModals();
  }
}
