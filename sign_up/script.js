// Start - Heiko zugefügt

let users = [];

const checkboxPrivacyPolicy = document.getElementById("checkboxPrivacyPolicy");

async function firstLoadSignUp() {
  await getUsersFromDatabase();
  loadSignUpEventListeners();
  loadSignUpValidationEventListeners();
}

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


async function writeUsersToDatabase() {
  await postData(
    "https://devakademie-default-rtdb.europe-west1.firebasedatabase.app/",
    "users",
    users
  );
}


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


function loadSignUpEventListeners(){
    const checkboxPrivacyPolicy = document.getElementById("checkboxPrivacyPolicy");
    checkboxPrivacyPolicy.addEventListener("click", acceptPrivacyPolicy);
    document.getElementById('signUpBtn').classList.add('signUpBtn-disabled');
}


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

// Password Function
function passwordFieldActive(idPw, idOvl){
  let passwordField = document.getElementById(idPw);
  let passwordOverlay = document.getElementById(idOvl);
    passwordField.style.backgroundImage = "url('../database/images/visibility_off.svg')";
    passwordOverlay.classList.remove('d-none');
} 

  
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
       // window.location.href = targetPage; // Im gleichen Tab 
         window.open(targetPage, '_blank');   
      // Öffnet den Link in einem neuen Tab   
      //für die seite wenn einer noch nicht eingeloggt ist auf die seite verweisen im neuen tab
      }
    });
  });
}

// Event Listener hinzufügen, wenn das DOM vollständig geladen ist
document.addEventListener('DOMContentLoaded', addEventListeners);
