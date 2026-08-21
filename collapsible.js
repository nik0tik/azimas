// Скрипт для раскрывающихся блоков с динамическим расчётом высоты
document.addEventListener('DOMContentLoaded', function() {
  const collapsibles = document.querySelectorAll('.collapsible');
  
  collapsibles.forEach(function(collapsible) {
    const header = collapsible.querySelector('.collapsible-header');
    const content = collapsible.querySelector('.collapsible-content');
    
    if (header && content) {
      header.addEventListener('click', function() {
        const isOpen = collapsible.classList.contains('open');
        
        if (isOpen) {
          // Закрываем: сначала устанавливаем текущую высоту, потом 0
          content.style.maxHeight = content.scrollHeight + 'px';
          // Небольшая задержка для корректной анимации
          setTimeout(function() {
            content.style.maxHeight = '0';
          }, 10);
          collapsible.classList.remove('open');
        } else {
          // Открываем: устанавливаем высоту = реальной высоте контента
          collapsible.classList.add('open');
          content.style.maxHeight = content.scrollHeight + 'px';
          
          // После завершения анимации убираем max-height, чтобы контент мог расти
          setTimeout(function() {
            if (collapsible.classList.contains('open')) {
              content.style.maxHeight = 'none';
            }
          }, 500);  // совпадает с transition в CSS
        }
      });
    }
  });
  
  // Пересчитываем высоту при ресайзе окна (если открыт)
  window.addEventListener('resize', function() {
    document.querySelectorAll('.collapsible.open .collapsible-content').forEach(function(content) {
      if (content.style.maxHeight !== 'none') {
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
});
