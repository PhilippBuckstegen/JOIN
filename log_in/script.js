let loggedInUser = [];

async function firstLoadLogin(){
    await getUsersFromDatabase();
    clearLoginInputFields();
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
    return null;
}

// Beispielaufruf

// let loginUsername = "user2";
// let loginPassword = "pass2";

function logIn(){
    checkLoginData();
    clearLoginInputFields();
}

function checkLoginData(){
    let enteredUserEmail = document.getElementById('loginEmail').value;
    let enteredUserPassword = document.getElementById('loginPassword').value;
    let loggedInData = loginUser(enteredUserEmail, enteredUserPassword);
    loggedInUser[0] = loggedInData;

if (loggedInUser) {
    console.log("Login erfolgreich:", loggedInUser);
} else {
    console.log("Login fehlgeschlagen: Benutzername oder Passwort ist falsch.");
}
}


function clearLoginInputFields(){
    document.getElementById("loginEmail").value = "";
    document.getElementById("loginPassword").value = "";
    resetSingleInputError("loginEmail");
    resetSingleInputError("loginPassword");
  }
