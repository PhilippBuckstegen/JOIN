let signUpUserValid = false;
let signUpEmailValid = false;
let signUpPasswordValid = false;
let signUpPasswordTwoValid = false;
let signUpPrivacyPolicy = false;
// **** Validation!!! For Contacts****

function validateAddInputs(){
    resetInputDataErrors(`fullNameAdd`, `emailAdd`, `phoneAdd`);
    let validName = validateName(`fullNameAdd`);
    let validEmail = validateEmail(`emailAdd`);
    let validPhone = validatePhone(`phoneAdd`);
    if(validName && validEmail && validPhone){
      addNewContactToDatabase();
    }
  }
  
  
  function validateEditInputs(i){
    resetInputDataErrors(`fullName`, `email`, `phone`);
    let validName = validateName(`fullName`);
    let validEmail = validateEmail(`email`);
    let validPhone = validatePhone(`phone`);
    if(validName && validEmail && validPhone){
      storeEditedData(i);
    }
  }
  
  
  function validateName(id){
    let isValid = true;
    let inputToCheck = document.getElementById(`${id}`);
    let errorMessage =  document.getElementById(`${id}ErrorMessage`);
    isValid = checkIfFieldIsEmpty(isValid, inputToCheck, errorMessage);
    if (isValid === true){
      isValid = checkIfFieldContainsNumbers(isValid, inputToCheck, errorMessage);
    }
    return isValid;
  }
  
  
  function validateEmail(id){
    let isValid = true;
    let emailToCheck = document.getElementById(`${id}`);
    let errorMessage =  document.getElementById(`${id}ErrorMessage`);
    isValid = checkIfFieldIsEmpty(isValid, emailToCheck, errorMessage);
    if (isValid === true){
      isValid = checkIfFieldContainsAtSign(isValid, emailToCheck, errorMessage);
    }
    return isValid;
  }
  
  
  function validatePhone(id){
    let isValid = true;
    let inputToCheck = document.getElementById(`${id}`);
    let errorMessage =  document.getElementById(`${id}ErrorMessage`);
    isValid = checkIfFieldIsEmpty(isValid, inputToCheck, errorMessage);
    if (isValid === true){
      isValid = checkIfFieldContainsPlusAndOnlyNumbers(isValid, inputToCheck, errorMessage);
    }
    return isValid;
  }
  
  
  
  function checkIfFieldIsEmpty(isValid, inputToCheck, errorMessage){
    if (inputToCheck.value.trim() === ''){
      inputToCheck.style.border = "1px solid red";
      errorMessage.classList.remove('no-error-visible');
      errorMessage.innerHTML ="This field is required";
      isValid = false;
    }
    return isValid;
  }
  
  
  function checkIfFieldContainsNumbers(isValid, inputToCheck, errorMessage){
    const numberRegex = /\d/;
    if (numberRegex.test(inputToCheck.value)) {
      inputToCheck.style.border = "1px solid red";
      errorMessage.classList.remove('no-error-visible');
      errorMessage.innerHTML = "This field contains numbers";
      isValid = false;
    }
    return isValid;
  }
  
  
  function checkIfFieldContainsAtSign(isValid, inputToCheck, errorMessage){
    const atRegex = /@/;
    if (!atRegex.test(inputToCheck.value)) {
      inputToCheck.style.border = "1px solid red";
      errorMessage.classList.remove('no-error-visible');
      errorMessage.innerHTML = "This field requires @";
      isValid = false;
    }
    return isValid;
  }
  
  
  function checkIfFieldContainsPlusAndOnlyNumbers(isValid, inputToCheck, errorMessage){
    const phoneRegex = /^\+\d+$/;
    if (!phoneRegex.test(inputToCheck.value)) {
      inputToCheck.style.border = "1px solid red";
      errorMessage.classList.remove('no-error-visible');
      errorMessage.innerHTML = "This field requires + as first character followed by numbers";
      isValid = false;
    }
    return isValid;
  }
  
  
  function resetInputDataErrors(id1, id2, id3){
    document.getElementById(`${id1}`).style.border = "1px solid #d1d1d1";
    document.getElementById(`${id2}`).style.border = "1px solid #d1d1d1";
    document.getElementById(`${id3}`).style.border = "1px solid #d1d1d1";
    document.getElementById(`${id1}ErrorMessage`).classList.add('no-error-visible');
    document.getElementById(`${id2}ErrorMessage`).classList.add('no-error-visible');
    document.getElementById(`${id3}ErrorMessage`).classList.add('no-error-visible');
  }

  function resetEditInputDataErrors(id1, id2){
    document.getElementById(`${id1}`).style.border = "1px solid #d1d1d1";
    document.getElementById(`${id2}`).style.border = "1px solid #d1d1d1";
    document.getElementById(`${id1}ErrorMessage`).classList.add('no-error-visible');
    document.getElementById(`${id2}ErrorMessage`).classList.add('no-error-visible');
  }

  function resetSingleInputError(id){
    document.getElementById(`${id}`).style.border = "1px solid #d1d1d1";
    document.getElementById(`${id}ErrorMessage`).classList.add('no-error-visible');
  }
  

  // **** Validation!!! For Tasks****

  function validateAddTask(y, overlay){
    resetInputDataErrors(`boardTitle`, `boardDate`, `boardCategory`);
    let validTitle = validateTitle(`boardTitle`);
    let validDate = validateDate(`boardDate`);
    let validCategory = validateCategory(`boardCategory`);
    if(validTitle && validDate && validCategory){
      addNewTaskToDatabase(y, overlay);
    }
  }


  function validateEditTask(y){
    resetEditInputDataErrors(`editBoardTitle`, `editBoardDate`);
    let validEditTitle = validateTitle(`editBoardTitle`);
    let validEditDate = validateDate(`editBoardDate`);
    if(validEditTitle && validEditDate){
      storeEditedData(y);
    }
  }

   function validateTitle(id){
    let isValid = true;
    let inputToCheck = document.getElementById(`${id}`);
    let errorMessage =  document.getElementById(`${id}ErrorMessage`);
    isValid = checkIfFieldIsEmpty(isValid, inputToCheck, errorMessage);
    return isValid;
  }


  function validateDate(id){
    let isValid = true;
    let inputToCheck = document.getElementById(`${id}`);
    let errorMessage =  document.getElementById(`${id}ErrorMessage`);
    isValid = checkIfFieldIsEmpty(isValid, inputToCheck, errorMessage);
    if (isValid === true){
      isValid = checkIfDateHasValidFormat(isValid, inputToCheck, errorMessage);
    }
    if (isValid === true){
      isValid = checkIfDateIsInPresent(isValid, inputToCheck, errorMessage);
    }
    return isValid;
  }


  function validateCategory(id){
    let isValid = true;
    let inputToCheck = document.getElementById(`${id}`);
    let errorMessage =  document.getElementById(`${id}ErrorMessage`);
    isValid = checkIfFieldIsEmpty(isValid, inputToCheck, errorMessage);
    return isValid;
  }


  function checkIfDateHasValidFormat(isValid, inputToCheck, errorMessage){
    const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    if (!dateRegex.test(inputToCheck.value)) {
      inputToCheck.style.border = "1px solid red";
      errorMessage.classList.remove('no-error-visible');
      errorMessage.innerHTML = "This field requires DD.MM.YYYY format";
      isValid = false;
    }
    return isValid;
  }


  function checkIfDateIsInPresent(isValid, inputToCheck, errorMessage){
    const [year, month, day] = inputToCheck.value.split('-').map(Number);
    const inputDateObj = new Date(year, month - 1, day);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    if (inputDateObj < currentDate) {
      inputToCheck.style.border = "1px solid red";
      errorMessage.classList.remove('no-error-visible');
      errorMessage.innerHTML = "No past date allowed.";
      isValid = false;
    }
    return isValid;
  }

// **** Validation!!! For Login ****


function validateSignUp(){
  resetInputDataErrors(`signUpName`, `signUpEmail`, `signUpPassword`, `signUpPassword2`, `checkboxPrivacyPolicy`);
  let validSignUpUserName = validateUserName(`signUpName`);
  let validSignUpEmail = validateEmail(`signUpEmail`);
  let validSignUpPassword = validatePassword(`signUpPassword`);
  let validSignUpPassword2 = validatePassword2(`signUpPassword2`);
  let validSignUpPrivacy = validatePolicy('checkboxPrivacyPolicy');
  if(validSignUpUserName && validSignUpEmail && validSignUpPassword && validSignUpPassword2 && validSignUpPrivacy){
    // addNewTaskToDatabase(y, overlay);
  }
}


function validateUserName(id){
  let isValid = true;
  let inputToCheck = document.getElementById(`${id}`);
  let errorMessage =  document.getElementById(`${id}ErrorMessage`);
  isValid = checkIfFieldIsEmpty(isValid, inputToCheck, errorMessage);
  if (isValid === true){
    isValid = checkIfFieldContainsNumbers(isValid, inputToCheck, errorMessage);
  }
  if (isValid === true){
    isValid = checkIfFieldHasMinSixCharacters(isValid, inputToCheck, errorMessage);
  }
  signUpUserValid = isValid;
  checkSignUpConditionsTrue();
  return isValid;
}


function validateSignUpEmail(id){
  let isValid = true;
  let emailToCheck = document.getElementById(`${id}`);
  let errorMessage =  document.getElementById(`${id}ErrorMessage`);
  isValid = checkIfFieldIsEmpty(isValid, emailToCheck, errorMessage);
  if (isValid === true){
    isValid = checkIfFieldContainsAtSign(isValid, emailToCheck, errorMessage);
  }
  signUpEmailValid = isValid;
  checkSignUpConditionsTrue();
  return isValid;
}


function validatePassword(id){
  let isValid = true;
  let inputToCheck = document.getElementById(`${id}`);
  let errorMessage =  document.getElementById(`${id}ErrorMessage`);
  isValid = checkIfFieldIsEmpty(isValid, inputToCheck, errorMessage);
  if (isValid === true){
    isValid = checkIfFieldHasMinSixCharacters(isValid, inputToCheck, errorMessage);
  }
  if (isValid === true){
    isValid = checkIfFieldContainsNoNumbers(isValid, inputToCheck, errorMessage);
  }
  if (isValid === true){
    isValid = checkIfFieldContainsCapitalLetters(isValid, inputToCheck, errorMessage);
  }
  if (isValid === true){
    isValid = checkIfFieldContainsSmallLetters(isValid, inputToCheck, errorMessage);
  }
  if (isValid === true){
    isValid =  checkIfFieldContainsSpecialCharacter(isValid, inputToCheck, errorMessage);
  }
  signUpPasswordValid = isValid;
  checkSignUpConditionsTrue();
  return isValid;
}

function validatePassword2(id1, id2){
  let isValid = true;
  let inputToCheck = document.getElementById(`${id1}`);
  let referenceInput = document.getElementById(`${id2}`);
  let errorMessage =  document.getElementById(`${id1}ErrorMessage`);
  isValid = checkIfFieldIsEmpty(isValid, inputToCheck, errorMessage);
  if (isValid === true){
    isValid = checkIfPasswordTwoFitsPasswordOne(isValid, inputToCheck, referenceInput, errorMessage);
  }
  signUpPasswordTwoValid = isValid;
  checkSignUpConditionsTrue();
  return isValid;
}


function validateCheckbox(id){
  let isValid = true;
  let inputToCheck = document.getElementById(`${id}`);
  let errorMessage =  document.getElementById(`${id}ErrorMessage`);
  isValid = checkStatusOfCheckbox(isValid, inputToCheck, errorMessage);
  return isValid;
}


function checkIfFieldHasMinSixCharacters(isValid, inputToCheck, errorMessage){
  if (inputToCheck.value.trim().length < 6) {
    inputToCheck.style.border = "1px solid red";
    errorMessage.classList.remove('no-error-visible');
    errorMessage.innerHTML = "This field requires at least 6 characters";
    isValid = false;
  }
  return isValid;
}

function checkIfFieldContainsNoNumbers(isValid, inputToCheck, errorMessage){
  const numberRegex = /\d/;
  if (!numberRegex.test(inputToCheck.value)) {
    inputToCheck.style.border = "1px solid red";
    errorMessage.classList.remove('no-error-visible');
    errorMessage.innerHTML = "This field requires at least one number";
    isValid = false;
  }
  return isValid;
}

function checkIfFieldContainsCapitalLetters(isValid, inputToCheck, errorMessage){
  const dateRegex = /[A-Z]/;
  if (!dateRegex.test(inputToCheck.value)) {
    inputToCheck.style.border = "1px solid red";
    errorMessage.classList.remove('no-error-visible');
    errorMessage.innerHTML = "This field requires at least one capital character";
    isValid = false;
  }
  return isValid;
}


function checkIfFieldContainsSmallLetters(isValid, inputToCheck, errorMessage){
  const dateRegex = /[a-z]/;
  if (!dateRegex.test(inputToCheck.value)) {
    inputToCheck.style.border = "1px solid red";
    errorMessage.classList.remove('no-error-visible');
    errorMessage.innerHTML = "This field requires at least one small character";
    isValid = false;
  }
  return isValid;
}


function checkIfFieldContainsSpecialCharacter(isValid, inputToCheck, errorMessage){
  const dateRegex = /[!@#$%^&*(),.?":{}|<>]/;
  if (!dateRegex.test(inputToCheck.value)) {
    inputToCheck.style.border = "1px solid red";
    errorMessage.classList.remove('no-error-visible');
    errorMessage.innerHTML = "This field requires at least one special character";
    isValid = false;
  }
  return isValid;
}


function checkIfPasswordTwoFitsPasswordOne(isValid, inputToCheck, inputReference, errorMessage){
  if (inputToCheck.value !== inputReference.value) {
    inputToCheck.style.border = "1px solid red";
    errorMessage.classList.remove('no-error-visible');
    errorMessage.innerHTML = "Confirm password does not fit password";
    isValid = false;
  }
  return isValid;
}


function checkStatusOfCheckbox(isValid, inputToCheck, errorMessage){
  if(inputToCheck.checked == true){
    isValid = true;
  } else {
  isValid = false;
}
  return isValid;
}


// Validation For Login Event-Listeners

function loadSignUpValidationEventListeners(){
// signUpUserNameEventListener(`signUpName`);
// signUpEmailEventListener(`signUpEmail`);
// signUpPasswordEventListener(`signUpPassword`);
// signUpPasswordTwoEventListener(`signUpPassword2`, `signUpPassword`);
signUpCheckboxEventListener(`checkboxPrivacyPolicy`);
}


// function signUpUserNameEventListener(id){
//   let signUpUserName = document.getElementById(`${id}`);  
//   signUpUserName.addEventListener('blur', function(event) {
//   signUpUserValid = validateUserName(id);
//   checkSignUpConditionsTrue();
//   });  
//   signUpUserName.addEventListener('focus', function(event) {
//   resetSingleInputError(id);
// });
// } 

// function signUpEmailEventListener(id){
//   let signUpUserName = document.getElementById(`${id}`);  
//   signUpUserName.addEventListener('blur', function(event) {
//   signUpEmailValid = validateEmail(id);
//   checkSignUpConditionsTrue();
//   });  
//   signUpUserName.addEventListener('focus', function(event) {
//   resetSingleInputError(id);
// });
// } 

// function signUpPasswordEventListener(id){
//   let signUpUserName = document.getElementById(`${id}`);  
//   signUpUserName.addEventListener('blur', function(event) {
//     signUpPasswordValid = validatePassword(id);
//     checkSignUpConditionsTrue();
//   });  
//   signUpUserName.addEventListener('focus', function(event) {
//   resetSingleInputError(id);
// });
// } 


// function signUpPasswordTwoEventListener(id1, id2){
//   let signUpPasswordTwo= document.getElementById(`${id1}`);  
//   signUpPasswordTwo.addEventListener('blur', function(event) {
//     signUpPasswordTwoValid = validatePassword2(id1, id2);
//     checkSignUpConditionsTrue();
//   });  
//   signUpPasswordTwo.addEventListener('focus', function(event) {
//   resetSingleInputError(id1);
// });
// } 


function signUpCheckboxEventListener(id){
  let signUpCheckbox = document.getElementById(`${id}`);  
  signUpCheckbox.addEventListener('change', function(event) {
    signUpPrivacyPolicy = validateCheckbox(id);
    checkSignUpConditionsTrue();
  });  
}

function checkSignUpConditionsTrue(){
  if(signUpUserValid && signUpEmailValid && signUpPasswordValid && signUpPasswordTwoValid && signUpPrivacyPolicy){
    document.getElementById(`signUpBtn`).disabled = false;
    document.getElementById('signUpBtn').classList.remove('signUpBtn-disabled');
  } else{
    document.getElementById(`signUpBtn`).disabled = true;
    document.getElementById('signUpBtn').classList.add('signUpBtn-disabled');
  }
}


// Validation Login

function validateLoginPassword(id){
  let isValid = true;
  let inputToCheck = document.getElementById(`${id}`);
  let errorMessage =  document.getElementById(`${id}ErrorMessage`);
  isValid = checkIfFieldIsEmpty(isValid, inputToCheck, errorMessage);
  return isValid;
}



