// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

function createCard(cardDesc, deleteCardCall) {
  
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = cardDesc.name;
  cardElement.querySelector('.card__image').src = cardDesc.link;
  cardElement.querySelector('.card__image').alt = `"Фотография ${cardDesc.name}"`;
  cardElement.querySelector('.card__delete-button').addEventListener('click', function() {deleteCardCall(cardElement);});

  return cardElement;
};

function deleteCard(cardElement) {
  
  cardElement.remove();
};

initialCards.forEach(function (card) {
  
  const cardElement = createCard(card, deleteCard);
  
  placesList.append(cardElement);
});
