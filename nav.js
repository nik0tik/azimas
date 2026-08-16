document.addEventListener('DOMContentLoaded', function() {
  const navHTML = `
    <nav>
      <button class="nav-toggle" aria-label="Toggle menu">
        <span class="burger-icon">
          <span></span>
          <span></span>
          <span></span>
        </span>
        <span class="burger-text">Menu</span>
      </button>
      <div class="nav-menu">
        <a href="index.html">Home</a>
        <a href="magic.html">Magic</a>
        <a href="witches.html">Witches</a>
        <a href="werebeasts.html">Werebeasts</a>
        <a href="beings.html">Beings</a>
        <a href="locations.html">Locations</a>
        <a href="factions.html">Factions</a>
        <a href="gods.html">Gods</a>
        <a href="characters.html">Characters</a>
        <a href="daily-life.html">Daily Life</a>
        <a href="faq.html">Q&A</a>
        <a href="gallery.html">Gallery</a>
      </div>
    </nav>
  `;
  
  const header = document.querySelector('header');
  header.insertAdjacentHTML('afterend', navHTML);
  
  const nav = document.querySelector('nav');
  const toggle = document.querySelector('.nav-toggle');
  
  // Мобильное меню
  toggle.addEventListener('click', function(e) {
    e.stopPropagation();
    nav.classList.toggle('open');
  });
  
  // Подсветка активной страницы
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  nav.querySelectorAll('a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
  
  // Закрытие мобильного меню при клике на ссылку
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function() {
      nav.classList.remove('open');
    });
  });
  
  // Закрытие при клике вне меню
  document.addEventListener('click', function(e) {
    if (nav && !nav.contains(e.target)) {
      nav.classList.remove('open');
    }
  });
});
