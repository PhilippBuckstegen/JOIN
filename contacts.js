"use strict";

const addContactBtn = document.getElementById("addContactBtn");
const displayContactsContainer = document.getElementById(
  "displayContactsContainer"
);

const currentAbbrNameContainer = document.getElementById(
  "currentAbbrNameContainer"
);
const currentAbbrName = document.getElementById("currentAbbrName");
const currentName = document.getElementById("currentName");
const currentEmail = document.getElementById("currentEmail");
const currentPhone = document.getElementById("currentPhone");

let contacts = [
  {
    name: "Erika Krawotki",
    email: "erika.krawotki@yahoo.de",
    phone: "+49 1523659879",
  },
  {
    name: "Ralf Ralleisen",
    email: "ralle.ralleisen@einsenralle.com",
    phone: "+49 178965123544",
  },
  {
    name: "Hans Müller",
    email: "hans.mueller@gmail.com",
    phone: "+49 15123456789",
  },
  {
    name: "Anna Schmidt",
    email: "anna.schmidt@web.de",
    phone: "+49 1716543210",
  },
  {
    name: "Peter Fischer",
    email: "peter.fischer@yahoo.de",
    phone: "+49 15112345678",
  },
  {
    name: "Katrin Wagner",
    email: "katrin.wagner@hotmail.com",
    phone: "+49 17012345678",
  },
  {
    name: "Jürgen Becker",
    email: "juergen.becker@outlook.de",
    phone: "+49 15781234567",
  },
  {
    name: "Monika Hoffmann",
    email: "monika.hoffmann@gmx.de",
    phone: "+49 16321234567",
  },
  {
    name: "Thomas Schäfer",
    email: "thomas.schaefer@yahoo.de",
    phone: "+49 17887654321",
  },
  {
    name: "Sabine Bauer",
    email: "sabine.bauer@t-online.de",
    phone: "+49 15212345678",
  },
  {
    name: "Andreas Keller",
    email: "andreas.keller@gmail.com",
    phone: "+49 17312345678",
  },
  {
    name: "Martina Klein",
    email: "martina.klein@web.de",
    phone: "+49 15212345679",
  },
  {
    name: "Michael Richter",
    email: "michael.richter@hotmail.com",
    phone: "+49 16012345678",
  },
  {
    name: "Sandra Wolf",
    email: "sandra.wolf@yahoo.de",
    phone: "+49 17812345678",
  },
  {
    name: "Frank König",
    email: "frank.koenig@outlook.de",
    phone: "+49 15612345678",
  },
  {
    name: "Nina Krause",
    email: "nina.krause@t-online.de",
    phone: "+49 16312345678",
  },
  {
    name: "Uwe Frank",
    email: "uwe.frank@gmx.de",
    phone: "+49 17512345678",
  },
  {
    name: "Julia Neumann",
    email: "julia.neumann@gmail.com",
    phone: "+49 17212345678",
  },
  {
    name: "Stefan Schwarz",
    email: "stefan.schwarz@web.de",
    phone: "+49 17012345679",
  },
  {
    name: "Karin Weber",
    email: "karin.weber@yahoo.de",
    phone: "+49 17212345679",
  },
  {
    name: "Wolfgang Schröder",
    email: "wolfgang.schroeder@hotmail.com",
    phone: "+49 17312345679",
  },
  {
    name: "Birgit Zimmermann",
    email: "birgit.zimmermann@outlook.de",
    phone: "+49 17412345678",
  },
  {
    name: "Oliver Hartmann",
    email: "oliver.hartmann@t-online.de",
    phone: "+49 17512345679",
  },
  {
    name: "Ingrid Böhm",
    email: "ingrid.boehm@gmx.de",
    phone: "+49 16012345679",
  },
  {
    name: "Philipp Langer",
    email: "philipp.langer@gmail.com",
    phone: "+49 15912345678",
  },
  {
    name: "Heike Schubert",
    email: "heike.schubert@web.de",
    phone: "+49 17812345679",
  },
  {
    name: "Torsten Huber",
    email: "torsten.huber@yahoo.de",
    phone: "+49 16012345680",
  },
  {
    name: "Michaela Werner",
    email: "michaela.werner@hotmail.com",
    phone: "+49 15212345680",
  },
  {
    name: "Rolf Meier",
    email: "rolf.meier@outlook.de",
    phone: "+49 17012345680",
  },
  {
    name: "Claudia Kraus",
    email: "claudia.kraus@t-online.de",
    phone: "+49 17312345680",
  },
];

function displayContacts() {
  displayContactsContainer.innerHTML = "";

  for (let i = 0; i < contacts.length; i++) {
    displayContactsContainer.innerHTML += `
        <div id="contactContainer${i}" class="contactContainers flexContainer">
            <div id="nameAbbrContainer${i}" class="nameAbbrContainers flexContainer"><p class="namesAbbr">${nameAbbreviation(
      contacts[i].name
    )}</p></div>
            <div id="nameEmailContainer${i}" class="nameEmailContainers">
                <p class="namesPar">${contacts[i].name}</p>
                <p class="emailsPar">${contacts[i].email}</p>
            </div>
        </div>
      `;

    document.getElementById(`nameAbbrContainer${i}`).style.backgroundColor =
      getRandomColor();
  }
}

function nameAbbreviation(fullName) {
  let nameSurname = fullName.split(" ");
  let name = nameSurname[0].slice(0, 1);
  let surname = nameSurname[1].slice(0, 1);

  return name + surname;
}

/*
function getInitials(contact) {
    let initials = contact.name.split(' ').map(name => name[0]).join('');
    return initials.toUpperCase();
}
*/

displayContacts();

currentAbbrName.textContent = nameAbbreviation(contacts[0].name);
currentName.textContent = contacts[0].name;

currentEmail.textContent = contacts[0].email;
currentPhone.textContent = contacts[0].phone;

function getRandomColor() {
  const colors = [
    "#FF7A00",
    "#9327FF",
    "#6E52FF",
    "#FC71FF",
    "#FFBB2B",
    "#1FD7C1",
    "#462F8A",
    "#FF4646",
    "#00BEE8",
    "#FF7A00",
  ];

  // Generate a random index based on the length of the colors array
  const randomIndex = Math.floor(Math.random() * colors.length);

  // Return the color at the randomly selected index
  return colors[randomIndex];
}
