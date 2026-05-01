// js/pages/tutors.js
import { tutorsData } from '../data/tutors.js';
import { debounce, getFromLocalStorage, saveToLocalStorage } from '../modules/utils.js';

let currentTutors = [...tutorsData];

export function initTutorsPage() {
  // Плавное появление страницы
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s ease';
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
  const searchInput = document.getElementById('searchInput');
  const filterSubject = document.getElementById('filterSubject');
  const filterPrice = document.getElementById('filterPrice');
  const filterRating = document.getElementById('filterRating');
  const sortSelect = document.getElementById('sortSelect');
  const tutorsGrid = document.getElementById('tutorsGrid');

  function renderTutors(tutors) {
    if (tutors.length === 0) {
      tutorsGrid.innerHTML = `<p class="no-results">По вашему запросу ничего не найдено.</p>`;
      return;
    }

    tutorsGrid.innerHTML = tutors
      .map(
        (tutor) => `
      <div class="tutor-card">
        <div class="tutor-avatar">${tutor.avatar}</div>
        <div class="tutor-info">
          <h3>${tutor.name}</h3>
          <p class="specialty">${tutor.specialty}</p>
          <div class="rating">⭐ ${tutor.rating} (${tutor.reviews} отзывов)</div>
          <div class="price">${tutor.price} ₽/час</div>
          <p class="description">${tutor.description}</p>
          
          <div class="tutor-actions">
            <button class="btn-book" data-id="${tutor.id}">Записаться на занятие</button>
            <button class="btn-favorite" data-id="${tutor.id}">★ В избранное</button>
          </div>
        </div>
      </div>
    `
      )
      .join('');

    // Обработчики кнопок
    document.querySelectorAll('.btn-book').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.target.dataset.id);
        bookLesson(id);
      });
    });

    // Обработчик избранного
    document.querySelectorAll('.btn-favorite').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.target.dataset.id);
        toggleFavorite(id, e.target);
      });
    });

    // Обновить текст кнопок в зависимости от избранного
    const favorites = getFromLocalStorage('favorites', []);
    document.querySelectorAll('.btn-favorite').forEach((btn) => {
      const id = parseInt(btn.dataset.id);
      if (favorites.includes(id)) {
        btn.textContent = '✓ В избранном';
        btn.classList.add('active');
      }
    });
  }

  function filterAndSortTutors() {
    let filtered = [...tutorsData];

    const searchValue = searchInput.value.toLowerCase().trim();
    const subject = filterSubject.value;
    const priceRange = filterPrice.value;
    const minRating = parseFloat(filterRating.value) || 0;
    const sortValue = sortSelect.value;

    // Поиск
    if (searchValue) {
      filtered = filtered.filter(
        (t) =>
          t.name.toLowerCase().includes(searchValue) ||
          t.specialty.toLowerCase().includes(searchValue) ||
          t.description.toLowerCase().includes(searchValue)
      );
    }

    // Фильтр по предмету
    if (subject) {
      filtered = filtered.filter((t) => t.specialty === subject);
    }

    // Фильтр по цене
    if (priceRange) {
      if (priceRange === '1000+') {
        filtered = filtered.filter((t) => t.price >= 1000);
      } else {
        const [min, max] = priceRange.split('-').map(Number);
        filtered = filtered.filter((t) => t.price >= min && (max ? t.price <= max : true));
      }
    }

    // Фильтр по рейтингу
    if (minRating > 0) {
      filtered = filtered.filter((t) => t.rating >= minRating);
    }

    // Сортировка
    switch (sortValue) {
      case 'rating-desc':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'rating-asc':
        filtered.sort((a, b) => a.rating - b.rating);
        break;
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
    }

    currentTutors = filtered;
    renderTutors(filtered);
  }

  // Запись на занятие
  function bookLesson(tutorId) {
    const tutor = tutorsData.find((t) => t.id === tutorId);
    if (!tutor) return;

    let myLessons = getFromLocalStorage('myLessons', []);

    const newLesson = {
      id: Date.now(),
      tutorId: tutor.id,
      tutorName: tutor.name,
      specialty: tutor.specialty,
      date: new Date().toISOString().split('T')[0],
      time: '18:00',
      status: 'upcoming',
    };

    myLessons.unshift(newLesson);
    saveToLocalStorage('myLessons', myLessons);

    alert(`Вы записались к репетитору: ${tutor.name}!\nЗанятие добавлено в ваш личный кабинет.`);
  }

  // Добавление/удаление из избранного
  function toggleFavorite(tutorId, btnElement) {
    let favorites = getFromLocalStorage('favorites', []);
    const index = favorites.indexOf(tutorId);

    if (index === -1) {
      // Добавить в избранное
      favorites.push(tutorId);
      btnElement.textContent = '✓ В избранном';
      btnElement.classList.add('active');
      alert('Репетитор добавлен в избранное!');
    } else {
      // Удалить из избранного
      favorites.splice(index, 1);
      btnElement.textContent = '★ В избранное';
      btnElement.classList.remove('active');
      alert('Репетитор удалён из избранного.');
    }

    saveToLocalStorage('favorites', favorites);
  }

  // Обработчики событий
  const debouncedFilter = debounce(filterAndSortTutors, 300);

  searchInput.addEventListener('input', debouncedFilter);
  filterSubject.addEventListener('change', filterAndSortTutors);
  filterPrice.addEventListener('change', filterAndSortTutors);
  filterRating.addEventListener('input', debouncedFilter);
  sortSelect.addEventListener('change', filterAndSortTutors);

  // Инициализация + поддержка параметров из URL
  const urlParams = new URLSearchParams(window.location.search);
  const urlSubject = urlParams.get('subject');
  const urlSearch = urlParams.get('search');

  if (urlSubject) filterSubject.value = urlSubject;
  if (urlSearch) searchInput.value = urlSearch;

  filterAndSortTutors();
}
