const enableValidation = function (selectors){
    // 1. Найти форму в документе
    const form = document.querySelector(selectors.form);
    // 2. Установить  слушатель сабмита
    form.addEventListener('submit', handleFormSubmit);
    form.addEventListener('input', (event) => {
        handleFormInput(event, selectors);
    });
}

const handleFormSubmit = function (event){
    event.prevntDefault();

    // 1. Определить валидность формы
    const form = event.currentTarget;

    const isValid = form.checkValidity();

    // 2. Вывести алерт.
    if (isValid) {
        alert('Форма валидна!');
        // 3. Если форма валидна, то сбросим её
        form.reset();
    }
}

const handleFormInput = function (event, config){
    const input = event.target;
    const form = event.currentTarget;

    // 1. Валидация паролей (если есть)
    validatePasswordsMatch(form, config);

    // 2. Установить кастомные тексты ошибок
    setCustomError(input);

    // 3. Показать ошибки в контейнере под каждым паролем
    showFieldError(input);

    // 4. Включить или отключить кнопу отправки формы
    setSubmitButtonState(form, config);
}

const setCustomError = function (input){
    const validity = input.validity;

    input.setCustomValidity('');

    if (validity.valueMissing) {
        input.setCustomValidity('Пустое поле не допускается');
    }

    if (validity.tooShort) {
        input.setCustomValidity('Ввод слишком короткий!');
    }

    if (validity.tooLong) {
        input.setCustomValidity('Ввод слишком длинный!');
    }

    if (validity.typeMismatch && input.type === 'url') {
        input.setCustomValidity('Введите ссылку!');
    }

    if (validity.typeMismatch && input.type === 'email') {
        input.setCustomValidity('Введите email!');
    }
}

const showFieldError = function (input){
    const span = input.nextElementSibling;
    span.textContent = input.validationMessage;
}

const setSubmitButtonState = function (form, selectors){
    const button = form.querySelector(selectors.button);
    const isValid = form.checkValidity();

    if (isValid) {
        button.removeAttribute('disabled');
        button.classList.remove(selectors.buttonInvalid);
        button.classList.add(selectors.buttonValid);
    } else {
        button.setAttribute('disabled', true);
        button.classList.add(selectors.buttonInvalid);
        button.classList.remove(selectors.buttonValid);
    }
}

const validatePasswordsMatch = function (form, selectors){
    if (!selectors.password || !selectors.passwordConfirm) {
        return;
    }

    const passwordInput = form.querySelector(selectors.password);
    const passwordConfirmInput = form.querySelector(selectors.passwordConfirm);

    passwordConfirmInput.setCustomValidity('');
    console.log((passwordInput.value, passwordConfirmInput.value, passwordInput.value ===passwordConfirmInput.value));

    if (passwordInput.value !== passwordConfirmInput.value) {
        passwordConfirmInput.setCustomValidity('Пароли не совпадают');
    }

    showFieldError(passwordConfirmInput);
}
