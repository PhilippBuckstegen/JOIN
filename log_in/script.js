let loggedInUser = [];

async function firstLoadLogin(){
    await getUsersFromDatabase();
    loadLoginFromLocalStorage();
    // clearLoginInputFields();
    


}

function loginUser(enteredUserEmail, enteredUserPassword) {
    // Iteriere durch das Array der Benutzer
    for (let i = 0; i < users.length; i++) {
        let user = users[i];
        
        // Überprüfe, ob der aktuelle Benutzername und das Passwort übereinstimmen
        if (user.email === enteredUserEmail && user.password === enteredUserPassword) {
            return user; // Rückgabe des passenden Benutzers
        }
    }
    
    // Wenn kein Benutzer gefunden wurde, gib null zurück
    // return null;
}

// Beispielaufruf

// let loginUsername = "user2";
// let loginPassword = "pass2";

function logIn(){
    let loginSucceed = checkLoginData();
    if (loginSucceed){
    storeLoginToLocalStorage();
    clearLoginInputFields();
    }
}

function checkLoginData(){
    let success = false;
    let enteredUserEmail = document.getElementById('loginEmail').value;
    let enteredUserPassword = document.getElementById('loginPassword').value;
    let loggedInData = loginUser(enteredUserEmail, enteredUserPassword);
    // loggedInUser[0] = loggedInData;

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
    // const rememberMeCheckbox = document.getElementById('formRemember');
    // Überprüfen, ob Daten im Local Storage vorhanden sind
    const savedUserData = JSON.parse(localStorage.getItem('userData'));

    if (savedUserData) {
        loginEmail.value = savedUserData[0].email;
        loginPassword.value = savedUserData[0].password;
        // rememberMeCheckbox.checked = true;
    }
}



function storeLoginToLocalStorage(){
    // Beim Absenden des Formulars Daten speichern
        loginEmail = loggedInUser[0].email;
        loginPassword = loggedInUser[0].password;
        rememberMe = document.getElementById('formRemember').checked;

        if (rememberMe) {
            // Daten im Local Storage speichern
            // const userData = loggedInUser[0];
            const userData = [{
                "email" : loginEmail,
                "password" : loginPassword
            }]
            localStorage.setItem('userData', JSON.stringify(userData));
        } else {
            // Überprüfen, ob Daten vorhanden sind, bevor sie entfernt werden
            if (localStorage.getItem('userData')) {
                localStorage.removeItem('userData');
            }
        }
}
