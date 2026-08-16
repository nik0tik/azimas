// Переключатель тем: тёмная и древний свиток
(function() {
  const THEME_KEY = 'azimas-theme';
  
  document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.theme-switcher button');
    const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
    
    function updateActive(theme) {
      buttons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === theme);
      });
    }
    
    // Подсвечиваем активную кнопку (тема уже применена из <head>)
    updateActive(savedTheme);
    
    buttons.forEach(btn => {
      btn.addEventListener('click', function() {
        const theme = this.dataset.theme;
        localStorage.setItem(THEME_KEY, theme);
        document.documentElement.setAttribute('data-theme', theme === 'dark' ? '' : theme);
        updateActive(theme);
      });
    });
  });
})();
