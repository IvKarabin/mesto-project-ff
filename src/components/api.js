// конфиг взаимодействия с API
const configApi = {
    authToken: '78f31f15-73b9-4ec6-815a-1198e0b9aa25',
    cardsApiUrl: 'https://nomoreparties.co/v1/wff-cohort-33/cards',
    userApiUrl: 'https://nomoreparties.co/v1/wff-cohort-33/users/me',
};

// проверка успешного выполнения
const statusCheck = (res) => {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Статус ошибки: ${res.status}`);
    }
};

// функции на экспорт
// получение данных пользователя
export function getUserData() {
    return fetch(configApi.userApiUrl, {
        headers: {
            authorization: configApi.authToken
        }
    })
    .then((res) => statusCheck(res));
};

// получение карточек
export function getCardData() {
    return fetch(configApi.cardsApiUrl, {
        headers: {
            authorization: configApi.authToken,
        }
    })
    .then((res) => statusCheck(res));
};

// постинг карточек
export function postCard(cardData) {
    return fetch(configApi.cardsApiUrl, {
        method: 'POST',
        headers: {
            authorization: configApi.authToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: cardData.name,
            link: cardData.link,
        })
    })
    .then((res) => statusCheck(res));
};

// удаление карточек
export function deleteCardApi (cardId) {
    return fetch(`${configApi.cardsApiUrl}/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: configApi.authToken
        }
    })
    .then((res) => statusCheck(res));
};

// изменение информации о пользователе
export function patchUserData(name, about) {
    return fetch(configApi.userApiUrl, {
        method: 'PATCH',
        headers: {
            authorization: configApi.authToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            about: about
        })
    })
    .then((res) => statusCheck(res));
};

// изменение аватарки пользователя
export function patchUserAvatar(avatar) {
    return fetch(`${configApi.userApiUrl}/avatar`, {
        method: 'PATCH',
        headers: {
            authorization: configApi.authToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: avatar
        })
    })
    .then((res) => statusCheck(res));
};

// лайк карточек
export function likeCardApi(cardId) {
    return fetch(`${configApi.cardsApiUrl}/likes/${cardId}`, {
        method: 'PUT',
        headers: {
            authorization: configApi.authToken
        }
    })
    .then((res) => statusCheck(res));
};

// удаление лайка карточек
export function unlikeCardApi(cardId) {
    return fetch(`${configApi.cardsApiUrl}/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: configApi.authToken
        }
    })
    .then((res) => statusCheck(res));
};
// конец функций для экспорта