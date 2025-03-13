//функция вывода
export function createCard(card, deleteCardApi, likeCardApi, unlikeCardApi, openCard, userId) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item.card').cloneNode(true);
    const cardTitle = cardElement.querySelector('.card__title');
    const cardImage = cardElement.querySelector('.card__image');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const likeCounter = cardElement.querySelector('.card__like-counter');

    cardImage.src = card.link;
    cardImage.alt = card.name;
    cardTitle.textContent = card.name;
    if (card.likes.length > 0) {
        likeCounter.textContent = card.likes.length;
    } else {
        likeCounter.textContent = 0;
    };
    if (card.likes.find((item) => item._id === userId)) {
        likeButton.classList.add('card__like-button_is-active');
    };

    deleteButton.addEventListener('click', () => {
        deleteCardApi(card['_id']).then(() => removeCard(cardElement)).catch((err) => console.log(err));
    });
    likeButton.addEventListener('click', () => {
        if (likeButton.classList.contains('card__like-button_is-active')) {
            unlikeCardApi(card['_id']).then((res) => {
                likeCard(cardElement);
                likeCounter.textContent = res.likes.length;
            }).catch((err) => console.log(err));
        } else {
            likeCardApi(card['_id']).then((res) => {
                likeCard(cardElement);
                likeCounter.textContent = res.likes.length;
            }).catch((err) => console.log(err));
        };
    });
    cardImage.addEventListener('click', () => {
        openCard(cardImage.src, cardTitle.textContent);
    });

    if (card.owner && userId !== card.owner['_id']) {
        deleteButton.remove();
    };

    return cardElement;
};

//функция удаления
export function removeCard(cardElement) {
    cardElement.remove();
};

//функция лайка
export function likeCard(cardElement) {
    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.classList.toggle('card__like-button_is-active');
};
