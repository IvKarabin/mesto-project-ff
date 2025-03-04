//функция открытия
export function openModal(modal) {
    modal.classList.add('popup_is-animated');
    modal.classList.add('popup_is-opened');

    document.addEventListener('keydown', handleEscape);
    modal.addEventListener('click', handleOverlayClick);
}

//функция закрытия
export function closeModal(modal) {
    setTimeout(() => {modal.classList.remove('popup_is-animated')}, 600);
    modal.classList.remove('popup_is-opened');

    modal.removeEventListener('click', handleOverlayClick);
    document.removeEventListener('keydown', handleEscape);
};

//обработка нажатия эскейпа
function handleEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
            closeModal(openedPopup);
        };
    };
};

//обработка клика по оверлею
function handleOverlayClick(evt) {
    if (evt.target.classList.contains('popup_is-opened')) {
        closeModal(evt.target);
    };
};