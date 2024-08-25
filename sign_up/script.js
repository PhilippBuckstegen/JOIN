let users = [];
const checkboxPrivacyPolicy = document.getElementById("checkboxPrivacyPolicy");


/**
* This function laods functions for firstCall
*/ 
async function firstLoadSignUp() {
  await getUsersFromDatabase();
  loadSignUpEventListeners();
  loadSignUpValidationEventListeners();
}


/**
* This function loads the users from the database
*/ 
async function getUsersFromDatabase() {
  let data = await loadData(
    "https://devakademie-default-rtdb.europe-west1.firebasedatabase.app/",
    "users"
  );
  if (Array.isArray(data)) {
    users = data;
  } else if (typeof data === "object") {
    tasks = Object.values(data);
  } else {
    users = [];
  }
}


/**
* This function writes new users to the local array
*/ 
function writeNewUserToLocalArray() {
  let userName = document.getElementById("signUpName");
  let userEmail = document.getElementById("signUpEmail");
  let userPassword = document.getElementById("signUpPassword");
  let newUser = {
    userName: userName.value,
    email: userEmail.value,
    password: userPassword.value,
    initials: generateInitials(userName.value),
    backgroundColor: getRandomColor(),
  };
  users.push(newUser);
}


/**
* This function writes new users ti the database
*/ 
async function writeUsersToDatabase() {
  await postData(
    "https://devakademie-default-rtdb.europe-west1.firebasedatabase.app/",
    "users",
    users
  );
}


/**
* This function is for the visualization of the privacy policy checkbox
*/ 
function acceptPrivacyPolicy() {
  if (!checkboxPrivacyPolicy.classList.contains("checkboxChecked")) {
    checkboxPrivacyPolicy.classList.remove("checkboxUnchecked");
    checkboxPrivacyPolicy.classList.add("checkboxChecked");
    return 1;
  } else {
    checkboxPrivacyPolicy.classList.remove("checkboxChecked");
    checkboxPrivacyPolicy.classList.add("checkboxUnchecked");
    return 0;
  }
}


/**
* This function loads the event listener for the signup button
*/ 
function loadSignUpEventListeners(){
    const checkboxPrivacyPolicy = document.getElementById("checkboxPrivacyPolicy");
    checkboxPrivacyPolicy.addEventListener("click", acceptPrivacyPolicy);
    document.getElementById('signUpBtn').classList.add('signUpBtn-disabled');
}


/**
* This function stores new users in database
*/ 
async function storeNewUser(){
  writeNewUserToLocalArray();
  await writeUsersToDatabase();
  await getUsersFromDatabase();
  clearSignUpInputFields();
  showMessage('messageOverlay', 'you signed up successfully!', 'show')
  signUpUserValid = false;
  signUpEmailValid = false;
  signUpPasswordValid = false;
  signUpPasswordTwoValid = false;
  signUpPrivacyPolicy = false;
  checkSignUpConditionsTrue();
  setTimeout(() => {
    window.location.href="../log_in/log_in.html";
  }, 2000);
}


/**
* This function clears the signup input fields
*/ 
function clearSignUpInputFields(){
  document.getElementById("signUpName").value = "";
  document.getElementById("signUpEmail").value = "";
  document.getElementById("signUpPassword").value = "";
  document.getElementById("signUpPassword2").value = "";
  resetSingleInputError("signUpName");
  resetSingleInputError("signUpEmail");
  resetSingleInputError("signUpPassword");
  resetSingleInputError("signUpPassword2");
  acceptPrivacyPolicy();
}


/**
* This function checks if a signup mail already exists
*/ 
function checkIfEmailAlreadyExists(){
  let userEmail = document.getElementById("signUpEmail").value;
  let emailExists = false;
  for(let i =0 ; i < users.length; i++){
    if(users[i].email === userEmail){
     emailExists = true;
    }
  }
  if(emailExists === true){
    document.getElementById('signUpEmailErrorMessage').innerHTML = 'This email is already signed Up! Please use the Login!';
    document.getElementById('signUpEmailErrorMessage').classList.remove('no-error-visible');
  } else if (emailExists === false){
    storeNewUser();
    emailExists = false;
  } 
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


//Marv Hinzugefügt Listener zum verweis zur den Policen
function addEventListeners() {
  const buttons = document.querySelectorAll('#privacy-policy-button1, #legal-notice-button1');

  buttons.forEach(button => {
    button.addEventListener('click', (event) => {
      event.preventDefault(); 
      const targetPage = button.getAttribute('data-target');
      if (targetPage) {
         window.open(targetPage, '_blank');   
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', addEventListeners);
