
// **** Validation!!! ****

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
      // addNewContactToDatabase();
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
  
  