// js/pages/profile.js
import { tutorsData } from '../data/tutors.js';
import { getFromLocalStorage, saveToLocalStorage } from '../modules/utils.js';

export function initProfilePage() {
  // Плавное появление страницы
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s ease';
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);

  // Данные из localStorage
  let myLessons = getFromLocalStorage('myLessons', []);
  let favorites = getFromLocalStorage('favorites', []);
  let userProfile = getFromLocalStorage('userProfile', {
    name: 'Анна',
    surname: 'Иванова',
    role: 'Студентка',
    course: '2 курс',
    city: 'Москва',
  });

  // Элементы профиля
  const profileNameEl = document.getElementById('profileName');
  const profileDetailsEl = document.getElementById('profileDetails');
  const profileAvatarEl = document.getElementById('profileAvatar');

  // Модальное окно
  const editProfileModal = document.getElementById('editProfileModal');
  const editProfileBtn = document.getElementById('editProfileBtn');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const cancelEditBtn = document.getElementById('cancelEditBtn');
  const saveProfileBtn = document.getElementById('saveProfileBtn');

  // Поля ввода
  const editName = document.getElementById('editName');
  const editSurname = document.getElementById('editSurname');
  const editRole = document.getElementById('editRole');
  const editCourse = document.getElementById('editCourse');
  const editCity = document.getElementById('editCity');

  // Функция отображения профиля
  function renderProfile() {
    profileNameEl.textContent = `${userProfile.name} ${userProfile.surname}`;
    profileDetailsEl.textContent = `${userProfile.role} • ${userProfile.course} • ${userProfile.city}`;
    profileAvatarEl.textContent = `${userProfile.name.charAt(0)}${userProfile.surname.charAt(0)}`;
  }

  // Открыть модальное окно
  editProfileBtn.addEventListener('click', () => {
    editName.value = userProfile.name;
    editSurname.value = userProfile.surname;
    editRole.value = userProfile.role;
    editCourse.value = userProfile.course;
    editCity.value = userProfile.city;
    editProfileModal.classList.remove('hidden');
  });

  // Закрыть модальное окно
  function closeModal() {
    editProfileModal.classList.add('hidden');
  }

  closeModalBtn.addEventListener('click', closeModal);
  cancelEditBtn.addEventListener('click', closeModal);

  // Закрытие по клику вне окна
  editProfileModal.addEventListener('click', (e) => {
    if (e.target === editProfileModal) {
      closeModal();
    }
  });

  // Сохранить изменения
  saveProfileBtn.addEventListener('click', () => {
    const newName = editName.value.trim();
    const newSurname = editSurname.value.trim();
    const newRole = editRole.value;
    const newCourse = editCourse.value.trim();
    const newCity = editCity.value.trim();

    if (!newName || !newSurname) {
      alert('Пожалуйста, заполните имя и фамилию.');
      return;
    }

    userProfile = {
      name: newName,
      surname: newSurname,
      role: newRole,
      course: newCourse || 'Не указан',
      city: newCity || 'Не указан',
    };

    saveToLocalStorage('userProfile', userProfile);
    renderProfile();
    closeModal();
    alert('Профиль успешно обновлён!');
  });

  // Инициализация профиля
  renderProfile();

  // Элементы
  const upcomingLessonsEl = document.getElementById('upcomingLessons');
  const historyLessonsEl = document.getElementById('historyLessons');
  const favoritesListEl = document.getElementById('favoritesList');

  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  // Переключение вкладок
  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      tabButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      tabContents.forEach((content) => content.classList.add('hidden'));
      document.getElementById(btn.dataset.tab + 'Tab').classList.remove('hidden');
    });
  });

  function renderUpcomingLessons() {
    const upcoming = myLessons.filter((lesson) => lesson.status === 'upcoming');

    if (upcoming.length === 0) {
      upcomingLessonsEl.innerHTML = `<p class="empty-state">У вас пока нет предстоящих занятий.</p>`;
      return;
    }

    upcomingLessonsEl.innerHTML = upcoming
      .map((lesson) => {
        const tutor = tutorsData.find((t) => t.id === lesson.tutorId);
        return `
        <div class="lesson-card">
          <div class="lesson-info">
            <h3>${lesson.tutorName}</h3>
            <p>${lesson.specialty}</p>
            <p><strong>Дата:</strong> ${lesson.date} • <strong>Время:</strong> ${lesson.time}</p>
          </div>
          <div class="lesson-actions">
            <button class="btn-cancel" data-id="${lesson.id}">Отменить</button>
          </div>
        </div>
      `;
      })
      .join('');

    // Обработчик отмены занятия
    document.querySelectorAll('.btn-cancel').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.target.dataset.id);
        cancelLesson(id);
      });
    });
  }

  function renderHistoryLessons() {
    const history = myLessons.filter((lesson) => lesson.status === 'completed');

    if (history.length === 0) {
      historyLessonsEl.innerHTML = `<p class="empty-state">История занятий пуста.</p>`;
      return;
    }

    historyLessonsEl.innerHTML = history
      .map(
        (lesson) => `
      <div class="lesson-card">
        <div class="lesson-info">
          <h3>${lesson.tutorName}</h3>
          <p>${lesson.specialty}</p>
          <p><strong>Дата:</strong> ${lesson.date}</p>
        </div>
        <div class="lesson-status completed">Завершено</div>
      </div>
    `
      )
      .join('');
  }

  function renderFavorites() {
    if (favorites.length === 0) {
      favoritesListEl.innerHTML = `<p class="empty-state">В избранном пока ничего нет.</p>`;
      return;
    }

    const favoriteTutors = tutorsData.filter((t) => favorites.includes(t.id));

    favoritesListEl.innerHTML = favoriteTutors
      .map(
        (tutor) => `
      <div class="tutor-card">
        <div class="tutor-avatar">${tutor.avatar}</div>
        <div class="tutor-info">
          <h3>${tutor.name}</h3>
          <p class="specialty">${tutor.specialty}</p>
          <div class="rating">⭐ ${tutor.rating}</div>
          <button class="btn-remove-favorite" data-id="${tutor.id}">Удалить из избранного</button>
        </div>
      </div>
    `
      )
      .join('');

    // Удаление из избранного
    document.querySelectorAll('.btn-remove-favorite').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.target.dataset.id);
        favorites = favorites.filter((favId) => favId !== id);
        saveToLocalStorage('favorites', favorites);
        renderFavorites();
      });
    });
  }

  function cancelLesson(lessonId) {
    if (confirm('Вы действительно хотите отменить занятие?')) {
      myLessons = myLessons.filter((lesson) => lesson.id !== lessonId);
      saveToLocalStorage('myLessons', myLessons);
      renderUpcomingLessons();
      alert('Занятие отменено.');
    }
  }

  // Инициализация страницы
  renderUpcomingLessons();
  renderHistoryLessons();
  renderFavorites();

  // Для демонстрации: добавим одно завершённое занятие, если история пустая
  if (myLessons.filter((l) => l.status === 'completed').length === 0) {
    myLessons.push({
      id: Date.now() - 100000,
      tutorId: 2,
      tutorName: 'Елена Петрова',
      specialty: 'Английский',
      date: '2026-04-20',
      time: '17:00',
      status: 'completed',
    });
    saveToLocalStorage('myLessons', myLessons);
  }
}
