let signUpUserValid = false;
let signUpEmailValid = false;
let signUpPasswordValid = false;
let signUpPasswordTwoValid = false;
let signUpPrivacyPolicy = false;
let loginEmailValid = false;
let loginPasswordValid = false;


// **** Validation!!! For Contacts****


/**
 * This function validates the inputs for the Add Contacts function
 */
function validateAddInputs(){
    resetInputDataErrors(`fullNameAdd`, `emailAdd`, `phoneAdd`);
    let validName = validateName(`fullNameAdd`);
    let validEmail = validateEmail(`emailAdd`);
    let validPhone = validatePhone(`phoneAdd`);
    if(validName && validEmail && validPhone){
      addNewContactToDatabase();
    }
  }
  

/**
 * This function validates the inputs for the Edit Contacts function
 * 
 * @param {number} i - index of datset which should be edited
 */
  function validateEditInputs(i){
    resetInputDataErrors(`fullName`, `email`, `phone`);
    let validName = validateName(`fullName`);
    let validEmail = validateEmail(`email`);
    let validPhone = validatePhone(`phone`);
    if(validName && validEmail && validPhone){
      storeEditedData(i);
    }
  }
  

/**
 * This function validates the inputs which includes names
 * 
 * @param {number} id - id for Error message field of name field
 */
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
  
  
/**
 * This function validates the inputs which includes emails
 * 
 * @param {number} id - id for Error message field of email field
 */
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
  
  
/**
 * This function validates the inputs which includes phonenumber
 * 
 * @param {number} id - id for Error message field of phonenumber field
 */
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
  
  
/**
 * This function checks if an input field is empty
 * 
 * @param {bool} isValid    - parameter for isValid
 * @param {id} inputToCheck - input id of field whoch should be checked
 * @param {id} errorMessage - input id of error message field from input field
 */
  function checkIfFieldIsEmpty(isValid, inputToCheck, errorMessage){
    if (inputToCheck.value.trim() === ''){
      inputToCheck.style.border = "1px solid red";
      errorMessage.classList.remove('no-error-visible');
      errorMessage.innerHTML ="This field is required";
      isValid = false;
    }
    return isValid;
  }
  
  
/**
 * This function checks if an input field contains numbers
 * 
 * @param {bool} isValid    - parameter for isValid
 * @param {id} inputToCheck - input id of field whoch should be checked
 * @param {id} errorMessage - input id of error message field from input field
 */
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
  
  
 /**
 * This function checks if an input field contains @ sign
 * 
 * @param {bool} isValid    - parameter for isValid
 * @param {id} inputToCheck - input id of field whoch should be checked
 * @param {id} errorMessage - input id of error message field from input field
 */
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
  
  
/**
 * This function checks if an input field contains + sign and only numbers
 * 
 * @param {bool} isValid    - parameter for isValid
 * @param {id} inputToCheck - input id of field whoch should be checked
 * @param {id} errorMessage - input id of error message field from input field
 */
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
  
/**
 * This function resets input data errors of 3 inputs
 * 
 * @param {id} id1 - id of data input field from which error should be resetted
 * @param {id} id2 - id of data input field from which error should be resetted
 * @param {id} id3 - id of data input field from which error should be resetted
 */
  function resetInputDataErrors(id1, id2, id3){
    document.getElementById(`${id1}`).style.border = "1px solid #d1d1d1";
    document.getElementById(`${id2}`).style.border = "1px solid #d1d1d1";
    document.getElementById(`${id3}`).style.border = "1px solid #d1d1d1";
    document.getElementById(`${id1}ErrorMessage`).classList.add('no-error-visible');
    document.getElementById(`${id2}ErrorMessage`).classList.add('no-error-visible');
    document.getElementById(`${id3}ErrorMessage`).classList.add('no-error-visible');
  }


/**
 * This function resets input data errors of 2 inputs
 * 
 * @param {id} id1 - id of data input field from which error should be resetted
 * @param {id} id2 - id of data input field from which error should be resetted
 */  
  function resetEditInputDataErrors(id1, id2){
    document.getElementById(`${id1}`).style.border = "1px solid #d1d1d1";
    document.getElementById(`${id2}`).style.border = "1px solid #d1d1d1";
    document.getElementById(`${id1}ErrorMessage`).classList.add('no-error-visible');
    document.getElementById(`${id2}ErrorMessage`).classList.add('no-error-visible');
  }


/**
 * This function resets input data errors of one inputs
 * 
 * @param {id} id1 - id of data input field from which error should be resetted
 */    
  function resetSingleInputError(id){
    document.getElementById(`${id}`).style.border = "1px solid #d1d1d1";
    document.getElementById(`${id}ErrorMessage`).classList.add('no-error-visible');
  }
  

  // **** Validation!!! For Tasks****


/**
  * This function validates the inputs for the add task function
 * 
 * @param {number} y       - number of category where task should be added
 * @param {number} overlay - 0 if boardSite add task / 1 if overlay add task
 */  
  function validateAddTask(y, overlay){
    resetInputDataErrors(`boardTitle`, `boardDate`, `boardCategory`);
    let validTitle = validateTitle(`boardTitle`);
    let validDate = validateDate(`boardDate`);
    let validCategory = validateCategory(`boardCategory`);
    if(validTitle && validDate && validCategory){
      addNewTaskToDatabase(y, overlay);
    }
  }


/**
* This function validates the inputs for the edit task function
* 
* @param {number} y - number of task which should be edited
*/  
  function validateEditTask(y){
    resetEditInputDataErrors(`editBoardTitle`, `editBoardDate`);
    let validEditTitle = validateTitle(`editBoardTitle`);
    let validEditDate = validateDate(`editBoardDate`);
    if(validEditTitle && validEditDate){
      storeEditedData(y);
    }
  }


/**
* This function validates the inputs for titles
* 
* @param {id} id - id of input field which should be validated
*/  
   function validateTitle(id){
    let isValid = true;
    let inputToCheck = document.getElementById(`${id}`);
    let errorMessage =  document.getElementById(`${id}ErrorMessage`);
    isValid = checkIfFieldIsEmpty(isValid, inputToCheck, errorMessage);
    return isValid;
  }


/**
* This function validates the inputs for date
* 
* @param {id} id - id of input field which should be validated
*/   
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


/**
* This function validates the inputs for category
* 
* @param {id} id - id of input field which should be validated
*/ 
  function validateCategory(id){
    let isValid = true;
    let inputToCheck = document.getElementById(`${id}`);
    let errorMessage =  document.getElementById(`${id}ErrorMessage`);
    isValid = checkIfFieldIsEmpty(isValid, inputToCheck, errorMessage);
    return isValid;
  }


/**
* This function checks if the inputs for the date has valid date format
* 
 * @param {bool} isValid    - parameter for isValid
 * @param {id} inputToCheck - input id of field whoch should be checked
 * @param {id} errorMessage - input id of error message field from input field
*/ 
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


/**
* This function checks if the chisen date is in present or future
* 
 * @param {bool} isValid    - parameter for isValid
 * @param {id} inputToCheck - input id of field whoch should be checked
 * @param {id} errorMessage - input id of error message field from input field
*/   
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


/**
* This function validates the sign up input fields
*/  
function validateSignUp(){
  resetInputDataErrors(`signUpName`, `signUpEmail`, `signUpPassword`, `signUpPassword2`, `checkboxPrivacyPolicy`);
  let validSignUpUserName = validateUserName(`signUpName`);
  let validSignUpEmail = validateEmail(`signUpEmail`);
  let validSignUpPassword = validatePassword(`signUpPassword`);
  let validSignUpPassword2 = validatePassword2(`signUpPassword2`);
  let validSignUpPrivacy = validatePolicy('checkboxPrivacyPolicy');
  if(validSignUpUserName && validSignUpEmail && validSignUpPassword && validSignUpPassword2 && validSignUpPrivacy){
  }
}


/**
* This function validates the user name
* 
* @param {id} id - id of input field which should be validated
*/  
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


/**
* This function validates the inputs for email
* 
* @param {id} id - id of input field which should be validated
*/  
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


/**
* This function validates the inputs for password
* 
* @param {id} id - id of input field which should be validated
*/  
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


/**
* This function validates the inputs for password2
* 
* @param {id} id1 - id of input field which should be validated
* @param {id} id2 - id of reference input field for validation
*/  
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


/**
* This function validates a checkbox
* 
* @param {id} id - id of checkbox which should be validated
*/
function validateCheckbox(id){
  let isValid = true;
  let inputToCheck = document.getElementById(`${id}`);
  let errorMessage =  document.getElementById(`${id}ErrorMessage`);
  isValid = checkStatusOfCheckbox(isValid, inputToCheck, errorMessage);
  return isValid;
}


/**
* This function validates the checkbox
* 
* @param {id} id - id of checkbox which should be validated
*/
function checkIfFieldHasMinSixCharacters(isValid, inputToCheck, errorMessage){
  if (inputToCheck.value.trim().length < 6) {
    inputToCheck.style.border = "1px solid red";
    errorMessage.classList.remove('no-error-visible');
    errorMessage.innerHTML = "This field requires at least 6 characters";
    isValid = false;
  }
  return isValid;
}


/**
* This function checks if the input contains NO numbers
* 
 * @param {bool} isValid    - parameter for isValid
 * @param {id} inputToCheck - input id of field whoch should be checked
 * @param {id} errorMessage - input id of error message field from input field
*/ 
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


/**
* This function checks if the input contains capital letters
* 
 * @param {bool} isValid    - parameter for isValid
 * @param {id} inputToCheck - input id of field whoch should be checked
 * @param {id} errorMessage - input id of error message field from input field
*/
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


/**
* This function checks if the input contains small letters
* 
 * @param {bool} isValid    - parameter for isValid
 * @param {id} inputToCheck - input id of field whoch should be checked
 * @param {id} errorMessage - input id of error message field from input field
*/
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


/**
* This function checks if the input contains special characters
* 
 * @param {bool} isValid    - parameter for isValid
 * @param {id} inputToCheck - input id of field whoch should be checked
 * @param {id} errorMessage - input id of error message field from input field
*/
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


/**
* This function checks if two passwords are equal
* 
 * @param {bool} isValid      - parameter for isValid
 * @param {id} inputToCheck   - input id of field whoch should be checked
 * @param {id} inputReference - input id of reference input field
 * @param {id} errorMessage   - input id of error message field from input field
*/
function checkIfPasswordTwoFitsPasswordOne(isValid, inputToCheck, inputReference, errorMessage){
  if (inputToCheck.value !== inputReference.value) {
    inputToCheck.style.border = "1px solid red";
    errorMessage.classList.remove('no-error-visible');
    errorMessage.innerHTML = "Confirm password does not fit password";
    isValid = false;
  }
  return isValid;
}


/**
* This function checks the status of a checkbox
* 
 * @param {bool} isValid    - parameter for isValid
 * @param {id} inputToCheck - input id of field whoch should be checked
 * @param {id} errorMessage - input id of error message field from input field
*/
function checkStatusOfCheckbox(isValid, inputToCheck, errorMessage){
  if(inputToCheck.checked == true){
    isValid = true;
  } else {
  isValid = false;
}
  return isValid;
}


/**
* This function loads the event listeners for signup checkbox
*/
function loadSignUpValidationEventListeners(){
signUpCheckboxEventListener(`checkboxPrivacyPolicy`);
}


/**
* This function defines the event listener for signup checkbox
* 
* @param {id} id - input id of field whoch should be checked
*/
function signUpCheckboxEventListener(id){
  let signUpCheckbox = document.getElementById(`${id}`);  
  signUpCheckbox.addEventListener('change', function(event) {
    signUpPrivacyPolicy = validateCheckbox(id);
    checkSignUpConditionsTrue();
  });  
}


/**
* This function checks if the signup conditions are true
*/
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


/**
* This function validate the email input for login
* 
 * @param {id} inputToCheck - input id of field whoch should be checked
*/
function validateLoginEmail(id){
  let isValid = true;
  let emailToCheck = document.getElementById(`${id}`);
  let errorMessage =  document.getElementById(`${id}ErrorMessage`);
  isValid = checkIfFieldIsEmpty(isValid, emailToCheck, errorMessage);
  if (isValid === true){
    isValid = checkIfFieldContainsAtSign(isValid, emailToCheck, errorMessage);
  }
  loginEmailValid = isValid;
  checkLoginConditionsTrue();
  return isValid;
}


/**
* This function validate the password input for login
* 
 * @param {id} inputToCheck - input id of field whoch should be checked
*/
function validateLoginPassword(id){
  let isValid = true;
  let inputToCheck = document.getElementById(`${id}`);
  let errorMessage =  document.getElementById(`${id}ErrorMessage`);
  isValid = checkIfFieldIsEmpty(isValid, inputToCheck, errorMessage);
  loginPasswordValid = isValid;
  checkLoginConditionsTrue();
  return isValid;
}


/**
* This function validates if login condition are true
*/
function checkLoginConditionsTrue(){
  if(loginEmailValid && loginPasswordValid){
    document.getElementById(`loginButton`).disabled = false;
    document.getElementById('loginButton').classList.remove('loginBtn-disabled');
  } else{
    document.getElementById(`loginButton`).disabled = true;
    document.getElementById('loginButton').classList.add('loginBtn-disabled');
  }
}



