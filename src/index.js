import './pages/index.css';
import { createCard } from './components/card';
import { openModal, closeModal } from './components/modal';
import { enableValidation, clearValidation } from './components/validation';
import { getUserData, getCardData, postCard, deleteCardApi, patchUserData, patchUserAvatar, likeCardApi, unlikeCardApi} from './components/api'

// Конфиг для проверки валидации
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

// DOM-узлы и переменные
// общее
const places = document.querySelector('.places__list');
const page = document.querySelector('.page');
// профиль
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image')
// кнопки
const profileEditButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const profileEditAvatarButton = document.querySelector('.profile__edit-avatar-button');
const closeButtons = document.querySelectorAll('.popup__close');
// popup_type
const editPopup = document.querySelector('.popup_type_edit');
const addCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const avatarPopup = document.querySelector('.popup_type_avatar');
// popup
const popupImage = document.querySelector('.popup__image');
const popupImageDescription = document.querySelector('.popup__caption');
// формы
const formProfile = document.forms['edit-profile'];
const formCard = document.forms['new-place'];
const formAvatar = document.forms['new-avatar'];

let userId = '';
// конец переменных

getData();

// Вызов валидации
enableValidation(validationConfig);

// Слушатели нажатия кнопок
profileEditButton.addEventListener('click', () => {  
    formProfile.elements.name.value = profileTitle.textContent;
    formProfile.elements.description.value = profileDescription.textContent;
    clearValidation(formProfile, validationConfig);
    openModal(editPopup);
});

addButton.addEventListener('click', () => {
    clearValidation(formCard, validationConfig);
    openModal(addCardPopup);
});

profileEditAvatarButton.addEventListener('click', () => {
    clearValidation(formAvatar, validationConfig);
    openModal(avatarPopup);
});

closeButtons.forEach((button) => {
    button.addEventListener('click', (evt) => {
        const modalW = evt.target.closest('.popup');
        closeModal(modalW);
    });
});

// обработка сабмитов
// профиль
formProfile.addEventListener('submit', (evt) => {
    evt.preventDefault();
    changeButtonStatus(formProfile, true);
    patchUserData(formProfile.elements.name.value, formProfile.elements.description.value)
        .then((res) => {
            changeButtonStatus(formProfile, false);
            setUserInfoApi(res);
            closeModal(editPopup);
        })
        .catch((err) => {
            changeButtonStatus(formProfile, false);
            console.log(err);
        });
});

// аватар
avatarPopup.addEventListener('submit', (evt) => {
    evt.preventDefault();
    changeButtonStatus(formAvatar, true);
    patchUserAvatar(formAvatar.elements.avatar.value)
        .then((res) => {
            setUserInfoApi(res);
            changeButtonStatus(formAvatar, false);
            closeModal(avatarPopup);
        })
        .catch((err) => {
            changeButtonStatus(formAvatar, false);
            console.log(err);
        });
});

// карточка
formCard.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const cardInfo = {
        name: formCard.elements['place-name'].value,
        link: formCard.elements.link.value,
    };
    changeButtonStatus(formCard, true);
    postCard(cardInfo)
        .then((res) => {
            const creatingCard = createCard(res, deleteCardApi, likeCardApi, unlikeCardApi, openCardModal, userId);
            places.prepend(creatingCard);
            closeModal(addCardPopup);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            changeButtonStatus(formCard, false);
        });
});
// конец обработки сабмитов

// объявление функций

// info
//
function setUserInfoApi(apiDataList) {
    profileTitle.textContent = apiDataList.name;
    profileDescription.textContent = apiDataList.about;
    profileImage.style.backgroundImage = 'url(' + apiDataList.avatar + ')';
};

//
function getData() {
    Promise.all([getUserData(), getCardData()])
        .then(([userData, cardsData]) => {
            userId = userData['_id'];
            setUserInfoApi(userData);
            initialCardsApi(cardsData, userId);
        })
        .catch((err) => console.log(err))
};

// создание карточек
function initialCardsApi(apiDataList, userId) {
    apiDataList.forEach(item => {
        const creatingCard = createCard(item, deleteCardApi, likeCardApi, unlikeCardApi, openCardModal, userId);
        places.append(creatingCard);
    });
};

function openCardModal(imageSrc, textImage) {
    popupImage.src = imageSrc;
    popupImage.alt = textImage;
    popupImageDescription.textContent = textImage;
    openModal(imagePopup);
};

// button-status
function changeButtonStatus(form, status) {
    const formButton = form.querySelector('.popup__button');
    if (status) {
        formButton.textContent = 'Сохранение...';
    } else {
        formButton.textContent = 'Сохранить';
    };
    formButton.disabled = status;
};
// конец объявления функций
