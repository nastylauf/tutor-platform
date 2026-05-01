// js/pages/subjects.js
import { tutorsData } from '../data/tutors.js';

const subjectsList = [
  'Математика',
  'Английский',
  'Русский',
  'Физика',
  'Химия',
  'Информатика',
  'Биология',
  'История',
  'География',
];

export function initSubjectsPage() {
  // Плавное появление страницы
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s ease';
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);

  const grid = document.getElementById('subjectsGrid');

  const subjectsHTML = subjectsList
    .map((subject) => {
      return `
      <div class="subject-card" data-subject="${subject}">
        <div class="subject-icon">${getSubjectIcon(subject)}</div>
        <h3>${subject}</h3>
        <p>Найти репетитора</p>
      </div>
    `;
    })
    .join('');

  grid.innerHTML = subjectsHTML;

  // Плавный переход на страницу репетиторов
  document.querySelectorAll('.subject-card').forEach((card) => {
    card.addEventListener('click', () => {
      const subject = card.dataset.subject;
      smoothNavigate(`tutors.html?subject=${encodeURIComponent(subject)}`);
    });
  });

  // Анимация появления карточек
  setTimeout(() => {
    animateCards();
  }, 300);
}

function smoothNavigate(url) {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s ease';
  setTimeout(() => {
    window.location.href = url;
  }, 400);
}

function animateCards() {
  const cards = document.querySelectorAll('.subject-card');

  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px) scale(0.95)';
    card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';

    setTimeout(
      () => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0) scale(1)';
      },
      100 + index * 80
    );
  });
}

function getSubjectIcon(subject) {
  const icons = {
    Математика: '🔢',
    Английский: '🌍',
    Русский: '📖',
    Физика: '⚛️',
    Химия: '🧪',
    Информатика: '💻',
    Биология: '🧬',
    История: '🏛️',
    География: '🗺️',
  };
  return icons[subject] || '📚';
}
