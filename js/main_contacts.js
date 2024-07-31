let contacts = [
    {
        "name"  : "Erika Krawotki",
        "email" : "erika.krawotki@yahoo.de",
        "phone" : "+491523659879",
    },
    {
        "name"  : "Ralf Ralleisen",
        "email" : "ralle.ralleisen@einsenralle.com",
        "phone" : "+49178965123544",
    },
];

function renderAllContacts() {
    for (let i = 0; i < contacts.length; i++) {
        renderContact(contacts[i], i);
    }
}

function getInitials(contact) {
    let initials = contact.name.split(' ').map(name => name[0]).join('');
    return initials.toUpperCase();
}

function getInitialLetter(contact) {
    return contact.name.charAt(0).toUpperCase();
}

function renderContact(contact, index) {
    let letter = getInitialLetter(contact);
    let letterContainer = document.getElementById(`letterContainer-${letter}`);

    if (letterContainer) {
        letterContainer.innerHTML += /*html*/`
            <div id="contact-${index}" onclick="showContactDetails('${contact.email}')" class="contact">
                <div class="contact-icon contact-icon-wh bg-color">
                    ${getInitials(contact)}
                </div>
                <div class="name-mail">
                    <span class="name">${contact.name}</span>
                    <span class="mail">${contact.email}</span>
                </div>
            </div>
        `;
    }
}

window.onload = function() {
    renderAllContacts();
};