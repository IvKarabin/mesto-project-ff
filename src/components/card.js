//функция вывода
export function createCard(card, removeCard, likeCard, openImage) {
    const cardTemplate = document.querySelector('#card-template').textContent;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');

    cardImage.src = card.link;
    cardImage.alt = card.alt;
    card.name = cardElement.querySelector('.card__title').textContent;

    deleteButton.addEventListener('click', () => removeCard(cardImage));
    likeButton.addEventListener('click', () => likeCard(likeButton));
    cardImage.addEventListener('click', openImage);

    return cardElement;
};

//функция удаления
export function removeCard(item) {
    item.closest('.places__item').remove();
};

//функция лайка
export function likeCard(item) {
    item.classList.toggle('card__like-button_is_active');
};