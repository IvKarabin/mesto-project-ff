// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

function createCard(cardDesc, deleteCardCall) {
  
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  
  cardElement.querySelector('.card__title').textContent = cardDesc.name;
  cardImage.src = cardDesc.link;
  cardImage.alt = `"Фотография ${cardDesc.name}"`;
  cardElement.querySelector('.card__delete-button').addEventListener('click', function() {
    
    deleteCardCall(cardElement);
  });

  return cardElement;
};

function deleteCard(cardElement) {
  
  cardElement.remove();
};

initialCards.forEach(function (card) { 

  const cardElement = createCard(card, deleteCard); 

  placesList.append(cardElement); 
}); 
