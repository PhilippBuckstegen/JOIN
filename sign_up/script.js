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
// Ende - Heiko zugefügt

// Start - Heiko auskommentiert

// const checkboxPrivacyPolicy = document.getElementById("checkboxPrivacyPolicy");

// document.addEventListener("DOMContentLoaded", function () {
//   const signUpButton = document.getElementById("signUpBtn");

//   // Event listener für den  sign-up button
//   signUpButton.addEventListener("click", function () {
//     const targetUrl = signUpButton.getAttribute("data-target");
//     window.location.href = targetUrl;
//   });
// });

// checkboxPrivacyPolicy.addEventListener("click", acceptPrivacyPolicy);

// Ende - Heiko auskommentiert

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

// Start - Heiko zugefügt

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
  signUpUserValid = false;
  signUpEmailValid = false;
  signUpPasswordValid = false;
  signUpPasswordTwoValid = false;
  signUpPrivacyPolicy = false;
  checkSignUpConditionsTrue();
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

//Marv Hinzugefügt Listener zum verweis zur den Policen
function addEventListeners() {
  const buttons = document.querySelectorAll('#privacy-policy-button1, #legal-notice-button1');

  buttons.forEach(button => {
    button.addEventListener('click', (event) => {
      event.preventDefault(); 
      const targetPage = button.getAttribute('data-target');
      if (targetPage) {
        window.location.href = targetPage;
      }
    });
  });
}

// Event Listener hinzufügen, wenn das DOM vollständig geladen ist
document.addEventListener('DOMContentLoaded', addEventListeners);
