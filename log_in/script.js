let loggedInUser = [];


async function firstLoadLogin(){
    await getUsersFromDatabase();
    document.getElementById('loginButton').classList.add('loginBtn-disabled');
    loadLoginFromLocalStorage();
    animationLogin();
}


function loginUser(enteredUserEmail, enteredUserPassword) {
    for (let i = 0; i < users.length; i++) {
        let user = users[i];
        if (user.email === enteredUserEmail && user.password === enteredUserPassword) {
            return user; // Rückgabe des passenden Benutzers
        }
    }
}


function logIn(){
    let loginSucceed = checkLoginData();
    if (loginSucceed){
    storeLoginToLocalStorage();
    clearLoginInputFields();
    loginEmailValid = false;
    loginPasswordValid = false;
    window.location.href = "../summary/summary.html";
    }
}


function guestLogin(){
    deleteCurrentUserFromLocalStorage();
    const currentUser = [{
        "name" : "Guest",
        "initials" : "G"
    }]
    loggedInUser[0] = currentUser;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    window.location.href = "../summary/summary.html";
}


function deleteCurrentUserFromLocalStorage(){
    if (localStorage.getItem('currentUser')) {
        localStorage.removeItem('currentUser');
    }
}


function checkLoginData(){
    let success = false;
    let enteredUserEmail = document.getElementById('loginEmail').value;
    let enteredUserPassword = document.getElementById('loginPassword').value;
    let loggedInData = loginUser(enteredUserEmail, enteredUserPassword);
    if (loggedInData) {
        console.log("Login erfolgreich:", loggedInUser);
        success = true;
        loggedInUser[0] = loggedInData;
    } else {
        console.log("Login fehlgeschlagen: Benutzername oder Passwort ist falsch.");
    }
    return success;
}


function clearLoginInputFields(){
    document.getElementById("loginEmail").value = "";
    document.getElementById("loginPassword").value = "";
    document.getElementById("formRemember").checked = false;
    resetSingleInputError("loginEmail");
    resetSingleInputError("loginPassword");
}



function loadLoginFromLocalStorage(){
    const loginEmail = document.getElementById('loginEmail');
    const loginPassword = document.getElementById('loginPassword');
    const savedUserData = JSON.parse(localStorage.getItem('userDataRemember'));
    if (savedUserData) {
        loginEmail.value = savedUserData[0].email;
        loginPassword.value = savedUserData[0].password;
        validateLoginEmail('loginEmail');
        validateLoginPassword('loginPassword');
    }
}



function storeLoginToLocalStorage(){
    rememberMe = document.getElementById('formRemember').checked;
    const currentUser = [{
        "email" : loggedInUser[0].email,
        "password" : loggedInUser[0].password,
        "name" : loggedInUser[0].userName,
        "initials" : loggedInUser[0].initials
    }]
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    if (rememberMe) {
        const userData = currentUser;
        localStorage.setItem('userDataRemember', JSON.stringify(userData));
    } else {
        if (localStorage.getItem('userDataRemember')) {
            localStorage.removeItem('userDataRemember');
        }
    }
}


function getCurrentUserFromLocalStorage(){
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
       loggedInUser = currentUser;
    }
}


// Philipp zugefügt für Animation Start Log in-------------------------

function animationLogin() {
    setTimeout(() => {
      addClassToElement('animationJoin', 'd-none');
      removeClassFromElement('joinLogo', 'd-none');
      removeClassFromElement('notAuser', 'd-none');
    }, 900);
}


function addClassToElement(elementId, className) {
    let element = document.getElementById(elementId);
    element.classList.add(className);
}
  

function removeClassFromElement(elementId, className) {
    let element = document.getElementById(elementId);
    element.classList.remove(className);
}