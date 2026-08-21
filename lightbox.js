// Лайтбокс с листанием групп (карусели, галереи).
// Клик по картинке в .carousel или .gallery открывает всю группу
// со стрелками и точками. Одиночная картинка — без навигации.
document.addEventListener('DOMContentLoaded', function () {
  const box = document.createElement('div');
  box.className = 'lightbox';
  box.innerHTML =
    '<span class="close">&times;</span>' +
    '<span class="lb-nav lb-prev">&#10094;</span>' +
    '<span class="lb-nav lb-next">&#10095;</span>' +
    '<div class="lightbox-content">' +
      '<img src="" alt="">' +
      '<div class="lightbox-caption"></div>' +
      '<div class="lightbox-dots"></div>' +
    '</div>';
  document.body.appendChild(box);

  const boxImg     = box.querySelector('img');
  const boxCaption = box.querySelector('.lightbox-caption');
  const boxDots    = box.querySelector('.lightbox-dots');
  const content    = box.querySelector('.lightbox-content');

  let group = [];   // список картинок текущей группы
  let index = 0;    // какая сейчас показана

  // показать картинку под номером i
  function show(i) {
    index = (i + group.length) % group.length;   // зацикливаем
    const img = group[index];
    boxImg.src = img.src;
    boxCaption.textContent = img.dataset.caption || img.alt || '';
    // подсветка активной точки
    boxDots.querySelectorAll('span').forEach(function (dot, n) {
      dot.classList.toggle('active', n === index);
    });
  }

  // открыть лайтбокс с заданной группой
  function open(imgs, startIndex) {
    group = imgs;
    // строим точки
    boxDots.innerHTML = '';
    imgs.forEach(function (img, n) {
      const dot = document.createElement('span');
      dot.addEventListener('click', function () { show(n); });
      boxDots.appendChild(dot);
    });
    // если картинка одна — прячем стрелки/точки через класс single
    box.classList.toggle('single', imgs.length < 2);
    show(startIndex);
    box.classList.add('open');
  }

  function close() { box.classList.remove('open'); }

  // навешиваем клик на все картинки внутри main
  document.querySelectorAll('main img:not(.no-zoom)').forEach(function (img) {
    img.classList.add('zoomable');
    img.addEventListener('click', function (e) {
      e.preventDefault();
      const container = img.closest('.carousel, .gallery, .gallery-grid');
      const imgs = container
        ? Array.from(container.querySelectorAll('img:not(.no-zoom)'))
        : [img];
      open(imgs, imgs.indexOf(img));
    });

  });

  // стрелки
  box.querySelector('.lb-prev').addEventListener('click', function (e) {
    e.stopPropagation();
    show(index - 1);
  });
  box.querySelector('.lb-next').addEventListener('click', function (e) {
    e.stopPropagation();
    show(index + 1);
  });

  // клик внутри контента не закрывает
  content.addEventListener('click', function (e) { e.stopPropagation(); });
  // клик по фону или крестику закрывает
  box.addEventListener('click', close);

  // клавиатура: Esc закрыть, стрелки листать
  document.addEventListener('keydown', function (e) {
    if (!box.classList.contains('open')) return;
    if (e.key === 'Escape')     close();
    if (e.key === 'ArrowLeft')  show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });
});
