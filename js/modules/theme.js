/**
 * БЭМ-блок: theme
 * Модуль управления тёмной темой
 */

const THEME_KEY = 'user-theme-preference';
const THEME_CLASS = 'theme_dark';

/**
 * Инициализация переключателя темы
 */
export function initThemeToggle() {
  const toggleBtn = document.querySelector('[data-theme-toggle]');
  if (!toggleBtn) return;

  // Применяем сохранённую тему при загрузке
  applySavedTheme();

  // Обработчик клика
  toggleBtn.addEventListener('click', () => {
    toggleTheme();
    saveThemePreference();
  });
}

/**
 * Применяет сохранённую тему из localStorage
 */
function applySavedTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    document.documentElement.classList.add(THEME_CLASS);
  }
}

/**
 * Переключает тему
 */
function toggleTheme() {
  document.documentElement.classList.toggle(THEME_CLASS);
}

/**
 * Сохраняет выбор пользователя в localStorage
 */
function saveThemePreference() {
  const isDark = document.documentElement.classList.contains(THEME_CLASS);
  localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
}