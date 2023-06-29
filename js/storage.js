export const layoutLoginPopup = `
<div class="popup popup_login">
        <div class="content">
            <h2 class="title">Log In to BTH</h2>
            <p class="subtitle">Dive into the World of Brain Teasers!</p>
            <form action="#">
                <div class="input-box">
                    <span class="input-title">EMAIL ADRRESS</span>
                    <input class="default-input" type="email" placeholder="Enter Email Adrress" autocomplete="off"
                        required>
                </div>
                <div class="input-box">
                    <span class="input-title">PASSWORD</span>
                    <input class="default-input password-input" type="password" placeholder="Enter Password" autocomplete="off"
                        required>
                    <div class="views-password">
                        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="ex-icon/eye">
                                <g id="eye">
                                    <mask id="mask0_12_2056" style="mask-type:luminance" maskUnits="userSpaceOnUse"
                                        x="0" y="0" width="16" height="17">
                                        <rect id="Background" y="0.25" width="16" height="16" fill="white" />
                                    </mask>
                                    <g mask="url(#mask0_12_2056)">
                                        <path id="Shape" fill-rule="evenodd" clip-rule="evenodd"
                                            d="M16 8.25C16 8.25 13 2.75 8 2.75C3 2.75 0 8.25 0 8.25C0 8.25 3 13.75 8 13.75C13 13.75 16 8.25 16 8.25ZM1.173 8.25C1.65652 8.98488 2.21265 9.66931 2.83301 10.293C4.12 11.582 5.88 12.75 8 12.75C10.12 12.75 11.879 11.582 13.168 10.293C13.7884 9.66931 14.3445 8.98487 14.828 8.25C14.3445 7.51512 13.7884 6.83068 13.168 6.207C11.879 4.918 10.119 3.75 8 3.75C5.88 3.75 4.121 4.918 2.832 6.207C2.21164 6.83069 1.65551 7.51513 1.172 8.25001L1.173 8.25Z" />
                                        <path id="Shape_2" fill-rule="evenodd" clip-rule="evenodd"
                                            d="M8 5.75C6.61929 5.75 5.5 6.86928 5.5 8.24999C5.5 9.6307 6.61928 10.75 7.99999 10.75C9.3807 10.75 10.5 9.63072 10.5 8.25001C10.5 6.8693 9.38072 5.75001 8.00001 5.75H8ZM4.5 8.25C4.5 6.99957 5.1671 5.84413 6.25 5.21891C7.3329 4.5937 8.66709 4.5937 9.75 5.21891C10.8329 5.84412 11.5 6.99957 11.5 8.25C11.5 9.50043 10.8329 10.6559 9.75 11.2811C8.6671 11.9063 7.3329 11.9063 6.25 11.2811C5.1671 10.6559 4.5 9.50043 4.5 8.25V8.25Z" />
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </div>
                </div>
                <div class="checkbox-container">
                    <input type="checkbox" id="loginCheckbox" name="loginCheckbox">
                    <label for="loginCheckbox">Remember Me</label>
                    <span class="checkmark"></span>
                </div>
                <button class="submit-btn" type="submit">send</button>
            </form>
            <div class="close-btn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50px" height="50px">
                    <path
                        d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z" />
                </svg>
            </div>
        </div>
        <div class="overlay"></div>
    </div>
`;

export const layoutSignupPopup = `
<div class="popup popup_signup">
        <div class="content">
            <h2 class="title">Sign up to BTH</h2>
            <p class="subtitle">Dive into the World of Brain Teasers!</p>
            <form action="#">
                <div class="input-box">
                    <span class="input-title">FIRST NAME</span>
                    <input class="default-input" type="text" placeholder="Enter First Name" autocomplete="off" required>
                </div>
                <div class="input-box">
                    <span class="input-title">EMAIL ADRRESS</span>
                    <input class="default-input" type="email" placeholder="Enter Email Adrress" autocomplete="off"
                        required>
                </div>
                <div class="input-box">
                    <span class="input-title">PASSWORD</span>
                    <input class="default-input password-input" type="password" placeholder="Enter Password" autocomplete="off"
                        required>
                    <div class="views-password">
                        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="ex-icon/eye">
                                <g id="eye">
                                    <mask id="mask0_12_2056" style="mask-type:luminance" maskUnits="userSpaceOnUse"
                                        x="0" y="0" width="16" height="17">
                                        <rect id="Background" y="0.25" width="16" height="16" fill="white" />
                                    </mask>
                                    <g mask="url(#mask0_12_2056)">
                                        <path id="Shape" fill-rule="evenodd" clip-rule="evenodd"
                                            d="M16 8.25C16 8.25 13 2.75 8 2.75C3 2.75 0 8.25 0 8.25C0 8.25 3 13.75 8 13.75C13 13.75 16 8.25 16 8.25ZM1.173 8.25C1.65652 8.98488 2.21265 9.66931 2.83301 10.293C4.12 11.582 5.88 12.75 8 12.75C10.12 12.75 11.879 11.582 13.168 10.293C13.7884 9.66931 14.3445 8.98487 14.828 8.25C14.3445 7.51512 13.7884 6.83068 13.168 6.207C11.879 4.918 10.119 3.75 8 3.75C5.88 3.75 4.121 4.918 2.832 6.207C2.21164 6.83069 1.65551 7.51513 1.172 8.25001L1.173 8.25Z" />
                                        <path id="Shape_2" fill-rule="evenodd" clip-rule="evenodd"
                                            d="M8 5.75C6.61929 5.75 5.5 6.86928 5.5 8.24999C5.5 9.6307 6.61928 10.75 7.99999 10.75C9.3807 10.75 10.5 9.63072 10.5 8.25001C10.5 6.8693 9.38072 5.75001 8.00001 5.75H8ZM4.5 8.25C4.5 6.99957 5.1671 5.84413 6.25 5.21891C7.3329 4.5937 8.66709 4.5937 9.75 5.21891C10.8329 5.84412 11.5 6.99957 11.5 8.25C11.5 9.50043 10.8329 10.6559 9.75 11.2811C8.6671 11.9063 7.3329 11.9063 6.25 11.2811C5.1671 10.6559 4.5 9.50043 4.5 8.25V8.25Z" />
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </div>
                </div>
                <div class="checkbox-container">
                    <input type="checkbox" id="signUpCheckbox" name="signUpCheckbox" required>
                    <label for="signUpCheckbox">I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy
                            Policy</a>.</label>
                    <span class="checkmark"></span>
                </div>
                <button class="submit-btn" type="submit">CREATE AN ACCOUNT</button>
            </form>
            <div class="close-btn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50px" height="50px">
                    <path
                        d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z" />
                </svg>
            </div>
        </div>
        <div class="overlay"></div>
    </div>
`;
