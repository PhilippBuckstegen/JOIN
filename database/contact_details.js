function showContactDetails(index) {
  let previousContact = document.querySelector(".contact-is-active");
  if (previousContact) {
    previousContact.classList.remove("contact-is-active");
  }
  let contactDetails = document.getElementById("contactDetailsContainer");
  let contact = contacts[index];
  contactDetails.innerHTML = /*html*/ `
        <div id="ContactDetailsOverlay" class="contact-details-overlay show">
            <div class="contact-icon-name">
                <div class="contact-overlay-icon contact-icon detail-name" id="initialsDetailsCircle">${contact.initials}</div>
                <div class="name-edit-delete">
                    <span class="detail-name">${contact.name}</span>
                    <div class="edit-delete">
                        <div class="edit" onclick="getDataToEdit(${index})">
                            <img src="/assets/icons/edit.svg" alt="icon-edit"/>
                            <span>Edit</span>
                        </div>
                        <div class="delete" onclick="deleteContact(${index})">
                            <img src="/assets/icons/delete.svg" alt="icon-delete"/>
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

  let currentContact = document.getElementById(`contact${index}`);
  if (currentContact) {
      currentContact.classList.add("contact-is-active");
  }

  if (window.innerWidth <= 1200) {
    addClassToElement('contactsContainer', 'd-none');
    removeClassFromElement('contactInfoContainer', 'd-none');
  }
  document.getElementById(`initialsDetailsCircle`).style.backgroundColor = contacts[index].backgroundColor;
  // addBackgroundColorToDetailsCircle(index, "initialsDetailsCircle");
}

function addClassToElement(elementId, className) {
    let element = document.getElementById(elementId);
    element.classList.add(className);
}
  
function removeClassFromElement(elementId, className) {
    let element = document.getElementById(elementId);
    element.classList.remove(className);
}
  
function hideContactDetails() {
    let activeContacts = document.querySelectorAll('.contact-is-active');
    activeContacts.forEach(contact => contact.classList.remove('contact-is-active'));
    removeClassFromElement('contactsContainer', 'd-none');
    addClassToElement('contactInfoContainer', 'd-none');
}
  
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
  
handleResize();
  
window.addEventListener('resize', handleResize);

// function addBackgroundColorToDetailsCircle(i, id){
//   document.getElementById(`${id}`).style.backgroundColor = contacts[i].backgroundColor;
// }