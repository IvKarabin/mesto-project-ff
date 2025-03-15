export function enableValidation(validationConfig) {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    
    formList.forEach((formElement) => {
        const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
        formElement.addEventListener('input', (evt) => {
            const inputElement = evt.target;
            isValid(formElement, inputElement, buttonElement, validationConfig);
            toggleButtonState(formElement, buttonElement, validationConfig);
        });
    });
};

export function clearValidation(formElement, buttonElement, validationConfig) {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    inputList.forEach((inputElement) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        hideInputError(inputElement, errorElement, validationConfig);
    });
    toggleButtonState(formElement, buttonElement, validationConfig);
};

function isValid(formElement, inputElement, buttonElement, validationConfig) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    if (inputElement.validity.valueMissing) {
        inputElement.setCustomValidity('');
    } else if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity('');
    };
    if (inputElement.validity.valid) {
        toggleButtonState(formElement, buttonElement, validationConfig);
        hideInputError(inputElement,errorElement,validationConfig);
    } else {
        showInputError(inputElement, errorElement, validationConfig);
    }
}

function showInputError(inputElement, errorElement, validationConfig) {
    inputElement.classList.add(validationConfig.inputErrorClass);
    if (errorElement) { // Проверяем, найден ли errorElement
        errorElement.classList.add(validationConfig.errorClass);
        errorElement.textContent = inputElement.validationMessage;
    };
};

function hideInputError(inputElement, errorElement, validationConfig) {
    inputElement.classList.remove(validationConfig.inputErrorClass); 
    if (errorElement) { // Проверяем, найден ли элемент ошибки
        errorElement.classList.remove(validationConfig.errorClass);
        errorElement.textContent = '';
    };
};


function toggleButtonState(formElement, buttonElement, validationConfig) {
    const formInputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    if (hasInvalidInput(formInputList)) {
        buttonElement.classList.add(validationConfig.inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(validationConfig.inactiveButtonClass);
        buttonElement.disabled = false;
    }
}

function hasInvalidInput(inputList) {
    return inputList.some(function(inputElement) {
        return !inputElement.validity.valid;
    });
};
