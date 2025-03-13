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
// popup_type
const editPopup = document.querySelector('.popup_type_edit');
const addCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const avatarPopup = document.querySelector('.popup_type_avatar');
// popup
const popupImage = document.querySelector('.popup__image');
const popupImageDescription = document.querySelector('.popup__caption');
// формы
const formProfile = document.forms.editProfile;
const formCard = document.forms.newPlace;
const formAvatar = document.forms.editAvatar;

const popupImageTitle = evt.target.closest('.card').querySelector('.card__title');

let userId = '';
// конец переменных

getData();

// Вызов валидации
enableValidation(validationConfig);

// Слушатели нажатия кнопок
profileEditButton.addEventListener('click', () => {
    clearValidation(formProfile, validationConfig);
    setProfileInfo(formProfile, profileTitle, profileDescription);
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

// обработка сабмитов
// профиль
formProfile.addEventListener('submit', (evt) => {
    evt.preventDefault();
    changeButtonStatus(formProfile, true);
    patchUserData(formProfile.elements.name.value, formProfile.elements.description.value)
        .then((res) => {
            changeButtonStatus(formProfile, false);
            setUserInfoApi(profileTitle, profileDescription, profileImage, res);
            closeModal(editPopup);
        })
        .catch((err) => {
            changeButtonStatus(formProfile, false, true);
            console.log(err);
        });
});

// аватар
avatarPopup.addEventListener('submit', (evt) => {
    evt.preventDefault();
    changeButtonStatus(formAvatar, true);
    patchUserAvatar(formAvatar.elements.avatar.value)
        .then((res) => {
            setUserInfoApi(profileTitle, profileDescription, profileImage, res);
            changeButtonStatus(formAvatar, false);
            closeModal(avatarPopup);
        })
        .catch((err) => {
            changeButtonStatus(formAvatar, false, true);
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
            cardInfo._id = res._id;
            cardInfo.likes = res.likes;
            const creatingCard = createCard(cardInfo, deleteCardApi, likeCardApi, unlikeCardApi, openCardModal, userId);
            changeButtonStatus(formCard, false);
            places.prepend(creatingCard);
            closeModal(addCardPopup);
        })
        .catch((err) => {
            changeButtonStatus(formCard, false, true);
            console.log(err);
        });
});
// конец обработки сабмитов

// объявление функций
// функция открытия картинки по нажатию
function openImage(evt) {
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupImageDescription.textContent = popupImageTitle.textContent;
    openModal(imagePopup);
};

// info
function setProfileInfo(form, title, description) {
    form.elements.name.value = title.textContent;
    form.elements.description.value = description.textContent;
};

//
function setUserInfoApi(userName, userDescription, userAvatar, apiDataList) {
    userName.textContent = apiDataList.name;
    userDescription = apiDataList.about;
    userAvatar.style.backgroundImage = 'url(' + apiDataList.avatar + ')';
};

//
function getData() {
    Promise.all([getUserData(), getCardData()])
        .then(([userData, cardsData]) => {
            userId = userData['_id'];
            setUserInfoApi(profileTitle, profileDescription, profileImage, userData);
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
    imageData(imageSrc, textImage);
    openModal(imagePopup);
};

function imageData(imageSrc, textImage) {
    popupImage.src = imageSrc;
    popupImage.alt = textImage;
    popupImageDescription.textContent = textImage;
}

// button-status
function changeButtonStatus(form, status, error = false) {
    const formButton = form.querySelector('.popup__button');
    if (status) {
        if (form.name === 'newPlace') {
            formButton.textContent = 'Создание...';
        } else {
            formButton.textContent = 'Сохранение...';
        };
    } else {
        if (form.name === 'newPlace') {
            formButton.textContent = 'Создать';
        } else {
            formButton.textContent = 'Сохранить';
        };
        if (error) {
            formButton.textContent = 'У-у-пс';
        };
    };
};
// конец объявления функций
