import { layoutLoginPopup, layoutSignupPopup } from './storage.js';

/* Header Buttons */
const popupsPoint = document.querySelector('.popups');

/* Header Buttons */
const header = document.querySelector('.header');
const loginBtn = header.querySelector('#login-btn');
const signupBtn = header.querySelector('#signup-btn');
// const signoutBtn = header.querySelector('#signout-btn');

const renderPopupProperties = () => {
    const signUpPopup = document.querySelector(".popup");
    const closePopupBtn = signUpPopup.querySelector('.close-btn');
    const closeOverlay = signUpPopup.querySelector('.overlay');
    const passwordInput = signUpPopup.querySelector(".password-input");
    const passwordVisibleBtn = signUpPopup.querySelector(".views-password");

    passwordVisibleBtn.addEventListener("click", () => {
        passwordInput.type === "text"
        ? (passwordInput.type = "password")
        : (passwordInput.type = "text");
        passwordInput.focus();
    });

    closePopupBtn.addEventListener('click', () => {
        popupsPoint.replaceChildren();
    })
    closeOverlay.addEventListener('click', () => {
        popupsPoint.replaceChildren();
    })
}

loginBtn.addEventListener('click', () => {
    popupsPoint.insertAdjacentHTML('beforeend', layoutLoginPopup);
    renderPopupProperties();
})
signupBtn.addEventListener('click', () => {
    popupsPoint.insertAdjacentHTML('beforeend', layoutSignupPopup);
    renderPopupProperties();
})