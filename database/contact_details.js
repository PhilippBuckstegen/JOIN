function showContactDetails(index) {
  //document.getElementById(`contact${i}`).classList.add('contact-is-active');
  let contactDetails = document.getElementById('contactDetailsContainer');
  let contact = contacts[index];
  //contactDetails = '';
  contactDetails.innerHTML = /*html*/ `
        <div id="ContactDetailsOverlay" class="contact-details-overlay">
            <div class="contact-icon-name">
                <div class="contact-overlay-icon contact-icon detail-name">${contact.initials}</div>
                <div class="name-edit-delete">
                    <span class="detail-name">${contact.name}</span>
                    <div class="edit-delete">
                        <div class="edit">
                            <img src="/assets/icons/edit.svg" alt="icon-edit" />
                            <span>Edit</span>
                        </div>
                        <div class="delete">
                            <img src="/assets/icons/delete.svg" alt="icon-delete" />
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
