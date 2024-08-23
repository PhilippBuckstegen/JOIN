let loggedInUser = [];

async function firstLoadLogin() {
  await getUsersFromDatabase();
  document.getElementById("loginButton").classList.add("loginBtn-disabled");
  loadLoginFromLocalStorage();
  animationLogin();
  checkboxRememberMe.addEventListener("click", acceptRememberMe);

}

function loginUser(enteredUserEmail, enteredUserPassword) {
  for (let i = 0; i < users.length; i++) {
    let user = users[i];
    if (
      user.email === enteredUserEmail &&
      user.password === enteredUserPassword
    ) {
      return user; // Rückgabe des passenden Benutzers
    }
  }
}

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

function deleteCurrentUserFromLocalStorage() {
  if (localStorage.getItem("currentUser")) {
    localStorage.removeItem("currentUser");
  }
}

function checkLoginData() {
  let success = false;
  let enteredUserEmail = document.getElementById("loginEmail").value;
  let enteredUserPassword = document.getElementById("loginPassword").value;
  let loggedInData = loginUser(enteredUserEmail, enteredUserPassword);
  if (loggedInData) {
    console.log("Login erfolgreich:", loggedInUser);
    success = true;
    loggedInUser[0] = loggedInData;
  } else {
    document
      .getElementById("loginPasswordErrorMessage")
      .classList.remove("no-error-visible");
    document.getElementById("loginPasswordErrorMessage").innerHTML =
      "Login failed: invalid username or password.";
  }
  return success;
}

function clearLoginInputFields() {
  document.getElementById("loginEmail").value = "";
  document.getElementById("loginPassword").value = "";
  document.getElementById("checkboxRememberMe").checked = false;
  resetSingleInputError("loginEmail");
  resetSingleInputError("loginPassword");
}

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

function getCurrentUserFromLocalStorage() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (currentUser) {
    loggedInUser = currentUser;
  }
}

function renderInitialsInHeader() {
  document.getElementById(
    "user-logged-in"
  ).innerHTML = `${loggedInUser[0].initials}`;
}

function logOut() {
  loggedInUser = [];
  deleteCurrentUserFromLocalStorage();
  window.location.href = "../log_in/log_in.html";
}
// Philipp zugefügt für Animation Start Log in-------------------------

function animationLogin() {
  setTimeout(() => {
    addClassToElement("animationJoin", "d-none");
    removeClassFromElement("joinLogo", "d-none");
    removeClassFromElement("notAuser", "d-none");
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

//checkboxRememberMe.addEventListener("click", acceptRememberMe);
