let loggedInUser = [];

/**
 * This function loads functions for initial call
 */
async function firstLoadLogin() {
  await getUsersFromDatabase();
  document.getElementById("loginButton").classList.add("loginBtn-disabled");
  loadLoginFromLocalStorage();
  animationLogin();
  checkboxRememberMe.addEventListener("click", acceptRememberMe);
}


/**
* This function checks if typed in user and password is valid 
*
* @param {string} enteredUserEmail    - value of login email input field 
* @param {string} enteredUserPassword - value of login password input field 
*/ 
function loginUser(enteredUserEmail, enteredUserPassword) {
  for (let i = 0; i < users.length; i++) {
    let user = users[i];
    if (
      user.email === enteredUserEmail &&
      user.password === enteredUserPassword
    ) {
      return user;
    }
  }
}


/**
 * This function handles user login
 */
function logIn() {
  let loginSucceed = checkLoginData();
  if (loginSucceed) {
    storeLoginToLocalStorage();
    clearLoginInputFields();
    loginEmailValid = false;
    loginPasswordValid = false;
    window.location.href = "../summary/summary.html";
  }
}


/**
 * This function handles guest login
 */
function guestLogin() {
  deleteCurrentUserFromLocalStorage();
  const currentUser = [
    {
      name: "Guest",
      initials: "G",
    },
  ];
  loggedInUser[0] = currentUser;
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  window.location.href = "../summary/summary.html";
}


/**
 * This function deletes current user from local storage (logout)
 */
function deleteCurrentUserFromLocalStorage() {
  if (localStorage.getItem("currentUser")) {
    localStorage.removeItem("currentUser");
  }
}


/**
 * This function checks the login data
 */
function checkLoginData() {
  let success = false;
  let enteredUserEmail = document.getElementById("loginEmail").value;
  let enteredUserPassword = document.getElementById("loginPassword").value;
  let loggedInData = loginUser(enteredUserEmail, enteredUserPassword);
  if (loggedInData) {
    success = true;
    loggedInUser[0] = loggedInData;
  } else {
    document.getElementById("loginPasswordErrorMessage").classList.remove("no-error-visible");
    document.getElementById("loginPasswordErrorMessage").innerHTML = "Login failed: invalid username or password.";
  }
  return success;
}


/**
 * This function clears login input fields
 */
function clearLoginInputFields() {
  document.getElementById("loginEmail").value = "";
  document.getElementById("loginPassword").value = "";
  document.getElementById("checkboxRememberMe").checked = false;
  resetSingleInputError("loginEmail");
  resetSingleInputError("loginPassword");
}


/**
 * This function loads the logged in user data from local storage 
 */
function loadLoginFromLocalStorage() {
  const loginEmail = document.getElementById("loginEmail");
  const loginPassword = document.getElementById("loginPassword");
  const savedUserData = JSON.parse(localStorage.getItem("userDataRemember"));
  if (savedUserData) {
    loginEmail.value = savedUserData[0].email;
    loginPassword.value = savedUserData[0].password;
    validateLoginEmail("loginEmail");
    validateLoginPassword("loginPassword");
  }
}


/**
 * This function stores the logged in user in the local storage
 */
function storeLoginToLocalStorage() {
  rememberMe = document.getElementById("checkboxRememberMe").checked;
  const currentUser = [
    {
      email: loggedInUser[0].email,
      password: loggedInUser[0].password,
      name: loggedInUser[0].userName,
      initials: loggedInUser[0].initials,
    },
  ];
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  if (rememberMe) {
    const userData = currentUser;
    localStorage.setItem("userDataRemember", JSON.stringify(userData));
  } else {
    if (localStorage.getItem("userDataRemember")) {
      localStorage.removeItem("userDataRemember");
    }
  }
}


/**
 * This function loads current user from local storage
 */
function getCurrentUserFromLocalStorage() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (currentUser) {
    loggedInUser = currentUser;
  }
}


/**
 * This function renders the logged in user initials in the header
 */
function renderInitialsInHeader() {
  document.getElementById(
    "user-logged-in"
  ).innerHTML = `${loggedInUser[0].initials}`;
}


/**
 * This function handles the logout
 */
function logOut() {
  loggedInUser = [];
  deleteCurrentUserFromLocalStorage();
  window.location.href = "../log_in/log_in.html";
}


/**
* This function is to change the background image for the password from lock to unvisible and to show an overlay for change the passowrd visibility
* 
* @param {id} idPW  - id of input field where background image should be changed
* @param {id} idOvl - od of ovl wihich shoukd be shown
*/ 
function passwordFieldActive(idPw, idOvl){
  let passwordField = document.getElementById(idPw);
  let passwordOverlay = document.getElementById(idOvl);
    passwordField.style.backgroundImage = "url('../database/images/visibility_off.svg')";
    passwordOverlay.classList.remove('d-none');
} 

 
/**
* This function is to change the background image for the password from unvisible to lock
* 
* @param {id} idPW  - id of input field where background image should be changed
* @param {id} idOvl - od of ovl wihich shoukd be not shown
*/ 
function passwordFieldInactive(idPw, idOvl){
  let passwordField = document.getElementById(idPw);
  let passwordOverlay = document.getElementById(idOvl);
  if(passwordField.value.length > 0){
    passwordField.style.backgroundImage = "url('../database/images/visibility_off.svg')";
  } else {
    passwordField.style.backgroundImage = "url('../database/images/lockSU.svg')";
    passwordOverlay.classList.add('d-none');
  }
}  


/**
* This function is to change the password visibilty
* 
* @param {id} id  - id of input field where password should be shown or not
*/ 
function togglePasswordVisibility(id){
  let passwordField = document.getElementById(id);
  if (passwordField.type === 'password') {
    passwordField.style.backgroundImage = "url('../database/images/visibility.svg')";
    passwordField.type = 'text';
  } else {
    passwordField.type = 'password';
    passwordField.style.backgroundImage = "url('../database/images/visibility_off.svg')";
  }
}


/**
* This function animates the logo at login
*/ 
function animationLogin() {
  setTimeout(() => {
    addClassToElement("animationJoin", "d-none");
    removeClassFromElement("joinLogo", "d-none");
    removeClassFromElement("notAuser", "d-none");
  }, 900);
}


/**
* This function adds a class to a specific element
* @param {id} elementId    - id of element to which a class should be added
* @param {class} className - name of class which should ba added to id
*/ 
function addClassToElement(elementId, className) {
  let element = document.getElementById(elementId);
  element.classList.add(className);
}


/**
* This function removes a class to a specific element
* @param {id} elementId    - id of element from which a class should be removed
* @param {class} className - name of class which should ba removed from id
*/ 
function removeClassFromElement(elementId, className) {
  let element = document.getElementById(elementId);
  element.classList.remove(className);
}


/**
* This function handles the remember me checkbox
*/ 
function acceptRememberMe() {
  if (!checkboxRememberMe.classList.contains("checkboxChecked")) {
    checkboxRememberMe.classList.remove("checkboxUnchecked");
    checkboxRememberMe.classList.add("checkboxChecked");
    return 1;
  } else {
    checkboxRememberMe.classList.remove("checkboxChecked");
    checkboxRememberMe.classList.add("checkboxUnchecked");
    return 0;
  }
}