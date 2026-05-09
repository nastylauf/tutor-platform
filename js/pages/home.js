// js/pages/home.js
import { debounce } from '../modules/utils.js';

export function initHome() {
  // Загрузка цитаты дня
  loadQuoteOfTheDay();

  const searchInput = document.getElementById('searchInput');

  // Функция плавного перехода
  function smoothNavigate(url) {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.4s ease';
    setTimeout(() => {
      window.location.href = url;
    }, 400);
  }

  const searchButton = document.querySelector('.btn-search');

  if (searchInput) {
    searchInput.addEventListener(
      'input',
      debounce(() => {
        const query = searchInput.value.trim();
        if (query.length > 2) {
          smoothNavigate(`tutors.html?search=${encodeURIComponent(query)}`);
        }
      }, 500)
    );
  }

  if (searchButton && searchInput) {
    searchButton.addEventListener('click', () => {
      const query = searchInput.value.trim();
      if (query.length > 2) {
        smoothNavigate(`tutors.html?search=${encodeURIComponent(query)}`);
      } else {
        alert('Введите не менее 3 символов для поиска.');
      }
    });
  }

  // Клик по популярным предметам
  document.querySelectorAll('.subject-card').forEach((card) => {
    card.addEventListener('click', () => {
      const subject = card.dataset.subject;
      smoothNavigate(`tutors.html?subject=${encodeURIComponent(subject)}`);
    });
  });

  // Анимация появления карточек при загрузке
  animateOnLoad();

  // Восстанавливаем прозрачность при загрузке страницы
  document.body.style.transition = 'opacity 0.4s ease';
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
}

async function loadQuoteOfTheDay() {
  try {
    const response = await fetch('https://api.quotable.io/random');
    if (!response.ok) {
      throw new Error('Failed to fetch quote');
    }
    const quote = await response.json();
    const quoteElement = document.getElementById('quoteOfTheDay');
    if (quoteElement) {
      quoteElement.innerHTML = `
        <blockquote>"${quote.content}"</blockquote>
        <cite>— ${quote.author}</cite>
      `;
    }
  } catch (error) {
    console.error('Error loading quote:', error);
    const quoteElement = document.getElementById('quoteOfTheDay');
    if (quoteElement) {
      quoteElement.innerHTML =
        '<p>Цитата дня: "Образование — это оружие, самое мощное, которым вы можете изменить мир." — Нельсон Мандела</p>';
    }
  }
}

function animateOnLoad() {
  // Анимация для hero секции
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(30px)';
    heroContent.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';

    setTimeout(() => {
      heroContent.style.opacity = '1';
      heroContent.style.transform = 'translateY(0)';
    }, 200);
  }

  // Анимация для иллюстрации
  const heroImage = document.querySelector('.hero-image');
  if (heroImage) {
    heroImage.style.opacity = '0';
    heroImage.style.transform = 'translateX(30px)';
    heroImage.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';

    setTimeout(() => {
      heroImage.style.opacity = '1';
      heroImage.style.transform = 'translateX(0)';
    }, 400);
  }

  // Анимация для карточек предметов
  const subjectCards = document.querySelectorAll('.subjects .subject-card');
  subjectCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px)';
    card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';

    setTimeout(
      () => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      },
      300 + index * 100
    );
  });

  // Анимация для секции "Почему мы"
  const features = document.querySelectorAll('.about .feature');
  features.forEach((feature, index) => {
    feature.style.opacity = '0';
    feature.style.transform = 'translateY(40px)';
    feature.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';

    setTimeout(
      () => {
        feature.style.opacity = '1';
        feature.style.transform = 'translateY(0)';
      },
      500 + index * 120
    );
  });

  // Анимация для отзывов
  const reviews = document.querySelectorAll('.reviews .review-card');
  reviews.forEach((review, index) => {
    review.style.opacity = '0';
    review.style.transform = 'translateY(40px)';
    review.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';

    setTimeout(
      () => {
        review.style.opacity = '1';
        review.style.transform = 'translateY(0)';
      },
      700 + index * 120
    );
  });

  // Анимация для CTA
  const ctaSection = document.querySelector('.cta');
  if (ctaSection) {
    ctaSection.style.opacity = '0';
    ctaSection.style.transform = 'translateY(30px)';
    ctaSection.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';

    setTimeout(() => {
      ctaSection.style.opacity = '1';
      ctaSection.style.transform = 'translateY(0)';
    }, 900);
  }
}
