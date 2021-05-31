import galleryItems from './gallery-items.js';

const refs = {
    galleryList: document.querySelector('.js-gallery'),
    lightBox: document.querySelector('.js-lightbox'),
    lightBoxImage: document.querySelector('.lightbox__image'),
    closeBtn: document.querySelector('[data-action="close-lightbox"]'),
    overlay: document.querySelector('.lightbox__overlay'),
};
let imagesArray = [];
galleryItems.forEach(item => {
  imagesArray.push(item.original)
});
   

function createListMarkup(item) {
    return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${item.original}"
  >
    <img
      class="gallery__image"
      src="${item.preview}"
      data-source="${item.original}"
      alt="${item.description}"
    />
  </a>
</li>`
};

function modalOpen(event) {
  event.preventDefault();
  if (event.target.classList.contains('gallery__image')) {
    refs.lightBox.classList.add('is-open');
    refs.lightBoxImage.src = event.target.dataset.source;
    refs.lightBoxImage.alt = event.target.alt;
  } 
};

function modalClose(event) {
    refs.lightBox.classList.remove('is-open');
    refs.lightBoxImage.src = '';
};

function modalCloseEscape(event) {
    if (event.code === 'Escape') {
    refs.lightBox.classList.remove('is-open');
    refs.lightBoxImage.src = '';
    }
}

function imageNavigation(event) {
  let newIndex;
  const currIndex = imagesArray.indexOf(refs.lightBoxImage.src);
    if (event.code === 'ArrowLeft') {
      newIndex = currIndex - 1;
      if (newIndex === -1) {
        newIndex = imagesArray.length - 1;
      }
    } else
      if (event.code === 'ArrowRight') {
        newIndex = currIndex + 1;
        if (newIndex === imagesArray.length) {
          newIndex = 0;
        }
      }
    return refs.lightBoxImage.src = imagesArray[newIndex];
};

refs.galleryList.innerHTML= galleryItems.map(item => createListMarkup(item)).join('');
refs.galleryList.addEventListener('click', modalOpen);
refs.closeBtn.addEventListener('click', modalClose);
refs.overlay.addEventListener('click', modalClose);
window.addEventListener('keydown', modalCloseEscape);
window.addEventListener('keydown', imageNavigation);



