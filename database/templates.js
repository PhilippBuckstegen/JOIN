/**
 * This function returns HTML Code for renderContacts function
 * @returns - HTML Code
 */
function renderContactsWithLetterContainerHTML(){
  return /*html*/ `
    <div id="letterContainer${alphabet[j]}" class="letter-contacts-container">
      <div class="letter-header">${alphabet[j]}</div>
      <div class="letter-header-border"></div>
    <div onclick="showContactDetails(${i})" id="contact${i}" class="contact">
      <div class="contact-icon contact-icon-wh bg-color" id="initialsCircle${i}">${contacts[i].initials}</div>
      <div class="name-mail">
        <span class="name">${contacts[i].name}</span>
        <span class="mail">${contacts[i].email}</span>
      </div>
    </div>
  `;
}
  

/**
 * This function returns HTML Code for renderContacts function
 * 
 * @returns - HTML Code
 */
function renderContactsWithoutLetterContainerHTML(){
  return /*html*/ `
    <div onclick="showContactDetails(${i})" id="contact${i}" class="contact">
      <div class="contact-icon contact-icon-wh bg-color" id="initialsCircle${i}">${contacts[i].initials}</div>
      <div class="name-mail">
        <span class="name">${contacts[i].name}</span>
        <span class="mail">${contacts[i].email}</span>
      </div>
    </div>
  `;
}
  

/**
 * This function returns HTML Code for deleteContact function
 * 
 * @returns - HTML Code
 */
function renderDeleteContactMessageHTML(){
  return /*html*/`
    <div class="deleted-contact" id="deleteMessageContainer">
      <p class="delete-message fade" id="deleteText">Der Kontakt wurde gelöscht!</p>
    </div>
  `;
}

  
/**
 * This function returns HTML Code for editContact function
 * 
 * @param {number} i - index of cantact which should be edited
 * @returns          - HTML Code
 */
function renderEditAreaHTML(i){
  return /*html*/ `
    <div class="overlayAbbrContainer flexContainer">
      <div id="overlayAbbr" class="flexContainer">
        <p id="overlayAbbrPar">${contacts[i].initials}</p>
      </div>
    </div>
    <div class="overlayFormContainer flexContainerCol">
      <div id="closeContainer" class="flexContainer">
        <img id="closeBtn" src="./images/close.svg" alt="icon" onclick="toggleEditContactOverlay()"/>
      </div>
      <form id="editForm" action="" class="flexContainerCol">
      <div class="input-and-error">
        <input type="text" id="fullName" name="fullName" placeholder="Name" minlength="5" required/>
        <span id="fullNameErrorMessage" class="error-message no-error-visible">This field is required</span>
      </div>
      <div class="input-and-error">
        <input type="email" id="email" name="email" placeholder="hans.mustermann@web.de" required/>
        <span id="emailErrorMessage" class="error-message no-error-visible">This field is required</span>
      </div>
      <div class="input-and-error">
        <input type="tel" id="phone" name="phone" placeholder="+49123456789" pattern="^[+][0-9]{5,20}" required/>
        <span id="phoneErrorMessage" class="error-message no-error-visible">This field is required</span>
      </div>
          <div class="overlayBtnsContainer flexContainer">
            <button type="button" id="deleteBtn" class="overlayBtns" onclick="toggleEditContactOverlay()">Cancel</button>
            <button type="button" id="saveBtn" class="overlayBtns flexContainer" onclick="validateEditInputs(${i})">
              Save
              <img id="checkImg" src="./images/check.svg" alt="icon" />
            </button>
          </div>
      </form>
    </div>
  `;
}


/**
 * This functions returns HTML Code for showContactdetals function
 * 
 * @param {object} contact - single JSON object which should be shwon in detail
 * @param {number} index   - index of JSON object in local JSON array which should be shown in detail
 * @returns                - HTML Code
 */
function renderShowContactDetailsHTML(contact, index){
    return /*html*/ `
      <div id="ContactDetailsOverlay" class="contact-details-overlay show">
        <div class="contact-icon-name">
          <div class="contact-overlay-icon contact-icon detail-name" id="initialsDetailsCircle">${contact.initials}</div>
          <div class="name-edit-delete">
            <span class="detail-name">${contact.name}</span>
              <div class="edit-delete">
                <div class="edit" onclick="getDataToEdit(${index})">
                  <img src="../assets/icons/edit.svg" alt="icon-edit"/>
                  <span>Edit</span>
                </div>
                <div class="delete" onclick="deleteContact(${index})">
                  <img src="../assets/icons/delete.svg" alt="icon-delete"/>
                  <span>Delete</span>
                </div>
              </div>
            </div>
          </div>
          <div class="contact-info-edit">
            <div class="information">Contact Information</div>
          </div>
          <div class="contact-details-email">
            <b>Email</b>
            <a href="mailto:${contact.email}">${contact.email}</a>
          </div>
          <div class="contact-details-phone">
            <b>Phone</b>
            <a href="tel:${contact.phone}">${contact.phone}</a>
          </div>
      </div>        
    `;
  }