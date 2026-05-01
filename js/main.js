// js/main.js
import { initNavbar } from './modules/navbar.js';
import { initHome } from './pages/home.js';
import { initTutorsPage } from './pages/tutors.js';
import { initSubjectsPage } from './pages/subjects.js';
import { initProfilePage } from './pages/profile.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();

  const path = window.location.pathname.toLowerCase();

  if (path.includes('tutors.html')) {
    initTutorsPage();
  } else if (path.includes('subjects.html')) {
    initSubjectsPage();
  } else if (path.includes('profile.html')) {
    initProfilePage();
  } else {
    initHome();
  }
});
