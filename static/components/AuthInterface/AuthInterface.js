/**
 * Компонент авторизации
 * @constructor
 * @param {node} formDOM - Нода формы на странице
 * @param {object} loginButtonInfo - Информация о стилях и имени кнопки логина
 * @param {object} notMeButtonInfo - Информация о стилях и имени кнопки "not me"
 * @param {object} registerButtonInfo - Информация о стилях и имени кнопки регистрации
 * @param {function} loginCallback - Калбэк при логине
 * @param {function} registerCallback - Калбэк при регистрации
 * @param {function} successCallback - Калбэк при успешном прохождении логина или регистрации
 */
class AuthInterface {
    constructor (formDOM, loginButtonInfo, notMeButtonInfo, registerButtonInfo, inputInfo, loginCallback, registerCallback, successCallback) {
        let username = localStorage.getItem("username");
        
        let password = localStorage.getItem("password");
                
        let errors = document.createElement("div");
        errors.setAttribute("class", "error-pnl");
        errors.style.visibility = "hidden";

        let usernameLabel = document.createElement("label");
        usernameLabel.setAttribute("for", "username");
        usernameLabel.innerText = inputInfo.username.text;
        usernameLabel.setAttribute("class", inputInfo.username.className);
        usernameLabel.setAttribute("class","username-form");

        let usernameInput = document.createElement("input");
        usernameInput.setAttribute("type", "text");
        usernameInput.setAttribute("id", "username");
        usernameInput.setAttribute("class", inputInfo.username.className + " inp1");
        

        let passwordLabel = document.createElement("label");
        passwordLabel.setAttribute("for", "password");
        passwordLabel.innerText = inputInfo.password.text;
        passwordLabel.setAttribute("class", inputInfo.password.className);
        passwordLabel.setAttribute("class","password-form");

        let passwordInput = document.createElement("input");
        passwordInput.setAttribute("type", "password");
        passwordInput.setAttribute("id", "password");
        passwordInput.setAttribute("class", inputInfo.password.className + " inp2");

        let loginButton = document.createElement("button");
        loginButton.setAttribute("class", loginButtonInfo.className);
        loginButton.setAttribute("class", "login-button");
        loginButton.innerText = loginButtonInfo.text;
        setButtonClickHandler(loginButton, loginCallback);

        let registerButton = document.createElement("button");
        registerButton.setAttribute("class", registerButtonInfo.className);
        registerButton.setAttribute("class", "registr-button");
        registerButton.innerText = registerButtonInfo.text;
        setButtonClickHandler(registerButton, registerCallback);

        let notMeButton = document.createElement("button");
        notMeButton.setAttribute("class", notMeButtonInfo.className);
        notMeButton.innerText = notMeButtonInfo.text;
        notMeButton.onclick = () => {
            localStorage.removeItem("username");
            localStorage.removeItem("password");

            formDOM.innerHTML = "";

            formDOM.appendChild(errors);
            formDOM.appendChild(usernameLabel);
            formDOM.appendChild(usernameInput);
            formDOM.appendChild(passwordLabel);
            formDOM.appendChild(passwordInput);
            formDOM.appendChild(loginButton);
            formDOM.appendChild(registerButton);
        }

        formDOM.onsubmit = (e) => { 
            e.preventDefault();
        }

        function setButtonClickHandler(button, callback){
            button.onclick = () => {
                let username = usernameInput.value || localStorage.getItem('username');
                let password = passwordInput.value || localStorage.getItem('password');

                let submitData = {
                    username: username,
                    password: password
                }

                errors.style.visibility = "hidden";
                errors.innerHTML = "";

                if (submitData.username.trim() == "" || submitData.password.trim() == "") {
                    errors.style.visibility = "visible";
                    errors.innerText = "Please fill in all the fields!";
                    return;
                }

                callback(submitData).then((user) => {
                    successCallback(user);
                }).catch((msgs) => {
                    errors.style.visibility = "visible";
                    for (let msg of msgs) {
                        let errorSpan = document.createElement("span");
                        errorSpan.setAttribute("class", "error-msg");
                        errorSpan.innerText = msg;
                        errors.appendChild(errorSpan);
                    }
                });
            }
        }

        formDOM.appendChild(errors);
        if (username && password) {
            formDOM.appendChild(document.createTextNode(username));
            formDOM.appendChild(loginButton);
            formDOM.appendChild(notMeButton);
        } else {
            formDOM.appendChild(usernameLabel);
            formDOM.appendChild(usernameInput);
            formDOM.appendChild(passwordLabel);
            formDOM.appendChild(passwordInput);
            formDOM.appendChild(loginButton);
            formDOM.appendChild(registerButton);  
        }
    }
}
