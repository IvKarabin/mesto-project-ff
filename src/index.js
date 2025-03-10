import './pages/index.css';
import { initialCards } from './scripts/cards';
import { createCard, removeCard, likeCard } from './components/card';
import { openModal, closeModal } from './components/modal';
import { enableValidation, clearValidation } from './components/validation';

// Конфиг для проверки валидации
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

// DOM-узлы
const places = document.querySelector('.places__list');
const page = document.querySelector('.page');
const profileEditButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_new-card');
const editFormProfile = document.querySelector('.popup__form[name="edit-profile"]');
const editFormProfileTitle = document.querySelector('.profile__title');
const editFormProfileDescription = document.querySelector('.profile__description');
const editFormProfileInputName = document.querySelector('.popup__input_type_name');
const editFormProfileInputDescription = document.querySelector('.popup__input_type_description');
const addFormCard = document.querySelector('.popup__form[name="new-place"]');
const addFormPlaceInputName = document.querySelector('.popup__input_type_card-name');
const addFormPlaceInputUrl = document.querySelector('.popup__input_type_url');
const addCardButton = document.querySelector('.profile__add-button');
const addCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupImageTitle = evt.target.closest('.card').querySelector('.card__title');
const popupImageDescription = document.querySelector('.popup__caption');

// Вызов валидации
enableValidation(validationConfig);

// Вывод карточек
initialCards.forEach(function(item) {
    places.append(createCard(item, removeCard, likeCard, openImage));
});

// Слушатели нажатия кнопок
profileEditButton.addEventListener('click', function() {
    editFormProfileInputName.value = editFormProfileTitle.textContent;
    editFormProfileInputDescription.value = editFormProfileDescription.textContent;
    openModal(editPopup);
});

addCardButton.addEventListener('click', function() {
    openModal(addCardPopup);
});

//функция открытия картинки по нажатию
function openImage(evt) {
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupImageDescription.textContent = popupImageTitle.textContent;
    openModal(imagePopup);
};

// закрытие по крестику
page.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('popup__close')) {
        const popup = evt.target.closest('.popup');
        if (popup) {
            closeModal(popup);
        };
    };
});

// сохранение профиля
function editFormProfileHandler(evt) {
    evt.preventDefault();
    editFormProfileTitle.textContent = editFormProfileInputName.value;
    editFormProfileDescription.textContent = editFormProfileInputDescription.value;
    closeModal(editPopup);
};

// сохранение карточек
function addFormCardHandler(evt) {
    evt.preventDefault();
    const newCard = {
        name: addFormPlaceInputName.value,
        link: addFormPlaceInputUrl.value,
        alt: addFormPlaceInputName.value,
    };
    places.prepend(createCard(newCard, removeCard, likeCard, openImage));
    evt.target.reset();
    closeModal(addPopup);
};

// вызов сабмитов
editFormProfile.addEventListener('submit', editFormProfileHandler);
addFormCard.addEventListener('submit', addFormCardHandler);