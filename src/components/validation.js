export function enableValidation(validationConfig) {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('input', (evt) => {
            const inputElement = evt.target;
            const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
            if (inputElement.validity.patternMismath) {
                inputElement.setCustomValidity(inputElement.dataset.errorMessage);
            } else {
                inputElement.setCustomValidity('');
            };
            if (inputElement.validity.valid) {
                toggleButtonState(formElement, validationConfig);
                hideInputError(inputElement,errorElement,validationConfig);
            } else {
                toggleButtonState(formElement, validationConfig);
                showInputError(inputElement, errorElement, validationConfig);
            };
        });
    });
};

export function clearValidation(formElement, validationConfig) {
    clearForm(formElement);
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    inputList.forEach((inputElement) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        hideInputError(inputElement, errorElement, validationConfig);
    });
    toggleButtonState(formElement, validationConfig);
};

function showInputError(inputElement, errorElement, validationConfig) {
    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.classList.add(validationConfig.errorClass);
    errorElement.textContent = inputElement.validationMessage;
};

function hideInputError(inputElement, errorElement, validationConfig) {
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = '';
};

function toggleButtonState(formElement, validationConfig) {
    const formInputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
    if (hasInvalidInput(formInputList)) {
        buttonElement.classList.add(validationConfig.inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(validationConfig.inactiveButtonClass);
        buttonElement.disabled = false;
    };
};

function hasInvalidInput(inputList) {
    return inputList.some(function(inputElement) {
        return !inputElement.validity.valid;
    });
};

function clearForm(formElement) {
    formElement.reset();
};