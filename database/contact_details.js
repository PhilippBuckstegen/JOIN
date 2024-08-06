/**
 * This function renders the contact details 
 * 
 * @param {number} index - index of contact for details
 */
function showContactDetails(index) {
  let previousContact = document.querySelector(".contact-is-active");
  if (previousContact) {
    previousContact.classList.remove("contact-is-active");
  }
  let contactDetails = document.getElementById("contactDetailsContainer");
  let contact = contacts[index];
  contactDetails.innerHTML = renderShowContactDetailsHTML(contact, index);
  let currentContact = document.getElementById(`contact${index}`);
  if (currentContact) {
      currentContact.classList.add("contact-is-active");
  }
  checkContactDetailsScreenWidth();
  document.getElementById(`initialsDetailsCircle`).style.backgroundColor = contacts[index].backgroundColor;
  renderSlideInBtns(index);
}


/**
 * This function check the screenwidth for the contact details to display or hide specific elements
 */
function checkContactDetailsScreenWidth(){
  if (window.innerWidth <= 1200) {
    addClassToElement('contactsContainer', 'd-none');
    removeClassFromElement('contactInfoContainer', 'd-none');
  }
}


/**
 * This function renders the slide-in buttons for responsive design 
 * 
 * @param {number} index - index of contact for detail view
 */
function renderSlideInBtns(index){
  let slideInBtns = document.getElementById('slideInBtns');
  slideInBtns.innerHTML = /*html*/`
    <img onclick="addClassToElement('slideInBtns', 'd-none-mobile'), getDataToEdit('${index}')" src="../assets/icons/edit_mobile.svg" alt="edit-mobile"/>
    <img onclick="addClassToElement('slideInBtns', 'd-none-mobile'), deleteContact('${index}')" src="../assets/icons/delete_mobile.svg" alt="edit-mobile"/>
  `;
}


/**
 * This function adds a specific class to an specific element
 * 
 * @param {element} elementId - element to add class to
 * @param {string} className  - class which should be added to element
 */
function addClassToElement(elementId, className) {
  let element = document.getElementById(elementId);
  element.classList.add(className);
}
  

/**
 * This function removes a specific class from an specific element
 * 
 * @param {element} elementId - element to remove class from
 * @param {string} className  - class which should be removed from element
 */
function removeClassFromElement(elementId, className) {
  let element = document.getElementById(elementId);
  element.classList.remove(className);
}


/**
 * This function hides the contact list 
 */
function hideContactDetails() {
    let activeContacts = document.querySelectorAll('.contact-is-active');
    activeContacts.forEach(contact => contact.classList.remove('contact-is-active'));
    removeClassFromElement('contactsContainer', 'd-none');
    addClassToElement('contactInfoContainer', 'd-none');
}
  

/**
 * This function is to handle the resize of the browser window
 */
function handleResize() {
  let contactDetailsVisible = document.querySelector(".contact-is-active") !== null;
  if (window.innerWidth <= 1200) {
    if (contactDetailsVisible) {
      addClassToElement('contactsContainer', 'd-none');
      removeClassFromElement('contactInfoContainer', 'd-none');
    } else {
      removeClassFromElement('contactsContainer', 'd-none');
      addClassToElement('contactInfoContainer', 'd-none');
    }
  } else {
    removeClassFromElement('contactsContainer', 'd-none');
    removeClassFromElement('contactInfoContainer', 'd-none');
  }
}


/**
 * This functions calls the resize function on first load
 */
handleResize();
 

/**
 * This function calls the resize function with every resize of browser window 
 */
window.addEventListener('resize', handleResize);