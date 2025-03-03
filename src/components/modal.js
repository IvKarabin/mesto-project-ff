//функция открытия
export function openModal(modal) {
    modal.classList.add('popup_is-active');
    modal.classList.add('popup_is-open');

    document.addEventListener('keydown', handleEscape);
    modal.addEventListener('click', handleOverlayClick);
}

//функция закрытия
export function closeModal(modal) {
    modal.classList.remove('popup_is-active');
    modal.classList.remove('popup_is-open');

    modal.removeEventListener('click', handleOverlayClick);
    document.removeEventListener('keydown', handleEscape);
};

//обработка нажатия эскейпа
function handleEscape(evt) {
    const openedPopup = document.querySelector('.popup_is-open');
    if (openedPopup && evt.key === 'Escape') {
        closeModal(openedPopup);
    };
};

//обработка клика по оверлею
function handleOverlayClick(evt) {
    if (evt.target.classList.contains('popup_is-open')) {
        closeModal(evt.target);
    };
};