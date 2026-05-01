const tutorsData = [
  {
    id: 1,
    name: 'Александр Смирнов',
    specialty: 'Математика',
    rating: 4.9,
    reviews: 128,
    price: 800,
    experience: ' лет',
    avatar: '👨‍🏫',
    description: 'Опытный преподаватель с 10 летней практикой. Подготовка к ЕГЭ и ОГЭ.',
  },
  {
    id: 2,
    name: 'Елена Петрова',
    specialty: 'Английский',
    rating: 4.95,
    reviews: 95,
    price: 950,
    experience: '8 лет',
    avatar: '👩‍🏫',
    description:
      'Преподаватель с международным сертификатом. Разговорный английский и подготовка к IELTS.',
  },
  {
    id: 3,
    name: 'Иван Козлов',
    specialty: 'Физика',
    rating: 4.8,
    reviews: 87,
    price: 750,
    experience: '7 лет',
    avatar: '👨‍🏫',
    description: 'Специалист в области физики. Подготовка к олимпиадам и экзаменам.',
  },
  {
    id: 4,
    name: 'Мария Волкова',
    specialty: 'Русский',
    rating: 4.85,
    reviews: 112,
    price: 700,
    experience: '9 лет',
    avatar: '👩‍🏫',
    description: 'Учитель русского языка и литературы. Эссе, тестирование, сочинения.',
  },
  {
    id: 5,
    name: 'Дмитрий Морозов',
    specialty: 'Информатика',
    rating: 4.92,
    reviews: 76,
    price: 1200,
    experience: '6 лет',
    avatar: '👨‍💻',
    description: 'Программист и преподаватель информатики. Python, Java, C++.',
  },
  {
    id: 6,
    name: 'Анна Кузьмина',
    specialty: 'Химия',
    rating: 4.87,
    reviews: 64,
    price: 850,
    experience: '8 лет',
    avatar: '👩‍🔬',
    description: 'Преподаватель химии с опытом сдачи сложных экзаменов.',
  },
  {
    id: 7,
    name: 'Павел Сергеев',
    specialty: 'Математика',
    rating: 4.8,
    reviews: 103,
    price: 950,
    experience: '11 лет',
    avatar: '👨‍🏫',
    description: 'Специалист с опытом преподавания в лучших школах города.',
  },
  {
    id: 8,
    name: 'Олеся Романова',
    specialty: 'Английский',
    rating: 4.78,
    reviews: 89,
    price: 1100,
    experience: '7 лет',
    avatar: '👩‍🏫',
    description: 'Живой разговорный английский в естественной среде обучения.',
  },
];

document.addEventListener('DOMContentLoaded', () => {
  renderTutorsGrid(tutorsData);
  setupEventListeners();
});

function renderTutorsGrid(tutors) {
  const grid = document.getElementById('tutorsGrid');
  grid.innerHTML = tutors
    .map(
      (tutor) => `
        <div class="tutor-card">
            <div class="tutor-header">
                <div class="tutor-avatar">${tutor.avatar}</div>
            </div>
            <div class="tutor-body">
                <div class="tutor-name">${tutor.name}</div>
                <div class="tutor-specialty">${tutor.specialty}</div>
                
                <div class="tutor-info">
                    <div class="info-item">
                        <div class="info-label">Рейтинг</div>
                        <div class="info-value">⭐ ${tutor.rating}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Отзывы</div>
                        <div class="info-value">${tutor.reviews}</div>
                    </div>
                </div>
                
                <div class="tutor-info">
                    <div class="info-item">
                        <div class="info-label">Опыт</div>
                        <div class="info-value">${tutor.experience}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Цена</div>
                        <div class="info-value">${tutor.price} ₽/ч</div>
                    </div>
                </div>
                
                <div class="tutor-description">${tutor.description}</div>
                
                <div class="tutor-footer">
                    <button class="btn-contact" onclick="contactTutor(${tutor.id})">Написать</button>
                    <button class="btn-book" onclick="bookLesson(${tutor.id})">Записаться</button>
                </div>
            </div>
        </div>
    `
    )
    .join('');
}

function filterTutors() {
  const subject = document.getElementById('filterSubject').value.toLowerCase().trim();
  const price = document.getElementById('filterPrice').value;
  const rating = parseFloat(document.getElementById('filterRating').value) || 0;

  let filtered = tutorsData;

  if (subject) {
    filtered = filtered.filter((t) => t.specialty.toLowerCase() === subject);
  }

  if (price) {
    const [min, max] = price.split('-').map((p) => parseInt(p));
    filtered = filtered.filter((t) => {
      if (max === undefined) {
        return t.price >= min;
      }
      return t.price >= min && t.price <= max;
    });
  }

  if (rating > 0) {
    filtered = filtered.filter((t) => t.rating >= rating);
  }

  renderTutorsGrid(filtered);
  updateSubjectCardHighlight();
}

function updateSubjectCardHighlight() {
  const activeSubject = document.getElementById('filterSubject').value.toLowerCase().trim();

  document.querySelectorAll('.subject-card').forEach((card) => {
    const cardSubject = card.dataset.subject.toLowerCase().trim();

    if (activeSubject && cardSubject === activeSubject) {
      card.style.borderBottom = '3px solid var(--primary-color)';
      card.style.backgroundColor = 'rgba(79, 70, 229, 0.05)';
    } else {
      card.style.borderBottom = 'none';
      card.style.backgroundColor = 'white';
    }
  });
}
function setupEventListeners() {
  document.getElementById('filterSubject').addEventListener('change', () => {
    filterTutors();
    updateSubjectCardHighlight();
  });
  document.getElementById('filterPrice').addEventListener('change', filterTutors);
  document.getElementById('filterRating').addEventListener('change', filterTutors);

  // Карточки предметов
  document.querySelectorAll('.subject-card').forEach((card) => {
    card.addEventListener('click', function () {
      const subject = this.dataset.subject;
      document.getElementById('filterSubject').value = subject;
      filterTutors();
      updateSubjectCardHighlight();
      const targetElement = document.getElementById('tutors');
      if (targetElement) {
        const offset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    });
  });

  // Навигационные ссылки
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const offset = 80; // высота навбара
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    });
  });

  // Поиск - находим правильный предмет по введённому тексту
  function performSearch() {
    const searchText = document.getElementById('searchInput').value.trim().toLowerCase();
    if (!searchText) {
      showNotification('Пожалуйста, введите название предмета', 'error');
      return;
    }

    // Ищем предмет по названию (case-insensitive)
    const foundSubject = tutorsData.find((t) => t.specialty.toLowerCase() === searchText);

    if (foundSubject) {
      document.getElementById('filterSubject').value = foundSubject.specialty;
      filterTutors();
      updateSubjectCardHighlight();
      showNotification(`Показаны репетиторы по предмету: ${foundSubject.specialty}`, 'success');
      const targetElement = document.getElementById('tutors');
      if (targetElement) {
        const offset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    } else {
      // Если точное совпадение не найдено, ищем похожие предметы
      const similarSubjects = Array.from(new Set(tutorsData.map((t) => t.specialty))).filter(
        (subject) => subject.toLowerCase().includes(searchText)
      );

      if (similarSubjects.length > 0) {
        document.getElementById('filterSubject').value = similarSubjects[0];
        filterTutors();
        updateSubjectCardHighlight();
        showNotification(`Найден предмет "${similarSubjects[0]}"`, 'success');
        const targetElement = document.getElementById('tutors');
        if (targetElement) {
          const offset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      } else {
        showNotification(`Предмет "${searchText}" не найден. Попробуйте другое название.`, 'error');
      }
    }
  }

  document.querySelector('.btn-search').addEventListener('click', performSearch);

  document.getElementById('searchInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  });

  // Кнопка очистки фильтров
  const filterButtons = document.querySelector('.filters');
  if (filterButtons && !filterButtons.querySelector('.btn-clear-filters')) {
    const clearBtn = document.createElement('button');
    clearBtn.className = 'btn-clear-filters';
    clearBtn.textContent = '✕ Очистить фильтры';
    clearBtn.style.cssText = `
            background-color: #ef4444;
            color: white;
            padding: 10px 15px;
            border-radius: 6px;
            font-size: 1rem;
            min-width: 200px;
            cursor: pointer;
        `;
    clearBtn.addEventListener('click', () => {
      document.getElementById('filterSubject').value = '';
      document.getElementById('filterPrice').value = '';
      document.getElementById('filterRating').value = '';
      renderTutorsGrid(tutorsData);
      updateSubjectCardHighlight();
      showNotification('Фильтры очищены', 'info');
    });
    filterButtons.appendChild(clearBtn);
  }

  // Модальные окна
  setupAuthModals();

  // Кнопки призыва к действию
  document.querySelectorAll('.btn-primary, .btn-secondary').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      if (btn.textContent.includes('Найти')) {
        const targetElement = document.getElementById('tutors');
        if (targetElement) {
          const offset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      } else if (btn.textContent.includes('Узнать')) {
        const targetElement = document.getElementById('about');
        if (targetElement) {
          const offset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }
    });
  });
}

// Работа с localStorage
const UserStorage = {
  STORAGE_KEY: 'tutorapp_users',
  CURRENT_USER_KEY: 'tutorapp_current_user',

  getAllUsers() {
    const users = localStorage.getItem(this.STORAGE_KEY);
    return users ? JSON.parse(users) : [];
  },

  getUserByEmail(email) {
    const users = this.getAllUsers();
    return users.find((u) => u.email === email);
  },

  addUser(name, email, password) {
    const users = this.getAllUsers();

    if (this.getUserByEmail(email)) {
      return { success: false, message: 'Пользователь с таким email уже существует' };
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password: this.hashPassword(password), // простое хеширование
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
    return { success: true, user: newUser };
  },

  login(email, password) {
    const user = this.getUserByEmail(email);

    if (!user) {
      return { success: false, message: 'Пользователь не найден' };
    }

    if (user.password !== this.hashPassword(password)) {
      return { success: false, message: 'Неверный пароль' };
    }

    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
    return { success: true, user };
  },

  logout() {
    localStorage.removeItem(this.CURRENT_USER_KEY);
  },

  getCurrentUser() {
    const user = localStorage.getItem(this.CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  hashPassword(password) {
    // Простое хеширование (в реальном приложении использовать bcrypt на сервере!)
    return btoa(password);
  },
};

// Модальные окна аутентификации
function setupAuthModals() {
  const loginBtn = document.querySelector('.btn-login');
  const signupBtn = document.querySelector('.btn-signup');
  const loginModal = document.getElementById('loginModal');
  const signupModal = document.getElementById('signupModal');

  // Обновляем кнопку после загрузки
  updateAuthButton();

  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      loginModal.classList.remove('hidden');
    });
  }

  if (signupBtn) {
    signupBtn.addEventListener('click', () => {
      signupModal.classList.remove('hidden');
    });
  }

  // Закрытие модальных окон
  document.querySelectorAll('.modal-close').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.target.closest('.modal').classList.add('hidden');
    });
  });

  // Закрытие при клике вне модального окна
  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
      e.target.classList.add('hidden');
    }
  });

  // Переключение между модальнями
  const links = document.querySelectorAll('.modal-text a');
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetModal = link.getAttribute('href');
      document.querySelectorAll('.modal').forEach((m) => m.classList.add('hidden'));
      if (targetModal === '#login') {
        loginModal.classList.remove('hidden');
      } else if (targetModal === '#signup') {
        signupModal.classList.remove('hidden');
      }
    });
  });

  // Отправка формы входа
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = loginForm.querySelector('input[type="email"]').value;
      const password = loginForm.querySelector('input[type="password"]').value;

      const result = UserStorage.login(email, password);

      if (result.success) {
        showNotification(
          `Вход выполнен успешно! Добро пожаловать, ${result.user.name}!`,
          'success'
        );
        loginModal.classList.add('hidden');
        loginForm.reset();
        updateAuthButton();
      } else {
        showNotification(result.message, 'error');
      }
    });
  }

  // Отправка формы регистрации
  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const inputs = signupForm.querySelectorAll('input');
      const name = inputs[0].value;
      const email = inputs[1].value;
      const password = inputs[2].value;
      const confirmPassword = inputs[3].value;

      if (password !== confirmPassword) {
        showNotification('Пароли не совпадают!', 'error');
        return;
      }

      if (password.length < 6) {
        showNotification('Пароль должен быть не менее 6 символов', 'error');
        return;
      }

      const result = UserStorage.addUser(name, email, password);

      if (result.success) {
        showNotification('Регистрация выполнена успешно! Теперь войдите в аккаунт', 'success');
        signupModal.classList.add('hidden');
        signupForm.reset();

        // Переключаемся на форму входа после регистрации
        setTimeout(() => {
          signupModal.classList.add('hidden');
          loginModal.classList.remove('hidden');
        }, 1000);
      } else {
        showNotification(result.message, 'error');
      }
    });
  }
}

// Функции контакта и бронирования
// Обновление кнопки авторизации в зависимости от статуса
function updateAuthButton() {
  const currentUser = UserStorage.getCurrentUser();
  const authButtons = document.querySelector('.auth-buttons');

  if (currentUser) {
    authButtons.innerHTML = `
            <div style="display: flex; align-items: center; gap: 1rem;">
                <span style="color: var(--dark-color); font-weight: 500;">👤 ${currentUser.name}</span>
                <button class="btn-logout" style="background-color: #ef4444; color: white; padding: 8px 20px; border-radius: 6px; font-weight: 600;">Выход</button>
            </div>
        `;

    document.querySelector('.btn-logout').addEventListener('click', () => {
      UserStorage.logout();
      showNotification('Вы вышли из аккаунта', 'info');
      updateAuthButton();
      setupAuthModals();
    });
  } else {
    authButtons.innerHTML = `
            <button class="btn-login">Вход</button>
            <button class="btn-signup">Регистрация</button>
        `;
    setupAuthModals();
  }
}

function contactTutor(tutorId) {
  const currentUser = UserStorage.getCurrentUser();
  if (!currentUser) {
    showNotification('Пожалуйста, войдите в аккаунт', 'error');
    document.getElementById('loginModal').classList.remove('hidden');
    return;
  }

  const tutor = tutorsData.find((t) => t.id === tutorId);
  showNotification(`Откроется чат с ${tutor.name}`, 'info');
}

function bookLesson(tutorId) {
  const currentUser = UserStorage.getCurrentUser();
  if (!currentUser) {
    showNotification('Пожалуйста, войдите в аккаунт', 'error');
    document.getElementById('loginModal').classList.remove('hidden');
    return;
  }

  const tutor = tutorsData.find((t) => t.id === tutorId);
  showNotification(`Вы переходите к бронированию занятия с ${tutor.name}`, 'info');
}

// Уведомления
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        font-weight: 500;
        z-index: 3000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    `;

  if (type === 'success') {
    notification.style.backgroundColor = '#10b981';
    notification.style.color = 'white';
  } else if (type === 'error') {
    notification.style.backgroundColor = '#ef4444';
    notification.style.color = 'white';
  } else {
    notification.style.backgroundColor = '#4f46e5';
    notification.style.color = 'white';
  }

  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Добавляем стили анимации
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

console.log('TutorHub приложение загружено успешно!');
