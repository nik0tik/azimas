// Скрипт для раскрывающихся блоков
document.addEventListener('DOMContentLoaded', function() {
  const collapsibles = document.querySelectorAll('.collapsible');
  
  collapsibles.forEach(function(collapsible) {
    const header = collapsible.querySelector('.collapsible-header');
    
    if (header) {
      header.addEventListener('click', function() {
        collapsible.classList.toggle('open');
      });
    }
  });
});
