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

let contacts = [
  {
    name: "Erika Krawotki",
    email: "erika.krawotki@yahoo.de",
    phone: "+491523659879",
  },
  {
    name: "Ralf Ralleisen",
    email: "ralle.ralleisen@einsenralle.com",
    phone: "+49178965123544",
  },
  {
    name: "Hans Müller",
    email: "hans.mueller@gmail.com",
    phone: "+4915123456789",
  },
  {
    name: "Anna Schmidt",
    email: "anna.schmidt@web.de",
    phone: "+491716543210",
  },
  {
    name: "Peter Fischer",
    email: "peter.fischer@yahoo.de",
    phone: "+4915112345678",
  },
  {
    name: "Katrin Wagner",
    email: "katrin.wagner@hotmail.com",
    phone: "+4917012345678",
  },
  {
    name: "Jürgen Becker",
    email: "juergen.becker@outlook.de",
    phone: "+4915781234567",
  },
  {
    name: "Monika Hoffmann",
    email: "monika.hoffmann@gmx.de",
    phone: "+4916321234567",
  },
  {
    name: "Thomas Schäfer",
    email: "thomas.schaefer@yahoo.de",
    phone: "+4917887654321",
  },
  {
    name: "Sabine Bauer",
    email: "sabine.bauer@t-online.de",
    phone: "+4915212345678",
  },
  {
    name: "Andreas Keller",
    email: "andreas.keller@gmail.com",
    phone: "+4917312345678",
  },
  {
    name: "Martina Klein",
    email: "martina.klein@web.de",
    phone: "+4915212345679",
  },
  {
    name: "Michael Richter",
    email: "michael.richter@hotmail.com",
    phone: "+4916012345678",
  },
  {
    name: "Sandra Wolf",
    email: "sandra.wolf@yahoo.de",
    phone: "+4917812345678",
  },
  {
    name: "Frank König",
    email: "frank.koenig@outlook.de",
    phone: "+4915612345678",
  },
  {
    name: "Nina Krause",
    email: "nina.krause@t-online.de",
    phone: "+4916312345678",
  },
  {
    name: "Uwe Frank",
    email: "uwe.frank@gmx.de",
    phone: "+4917512345678",
  },
  {
    name: "Julia Neumann",
    email: "julia.neumann@gmail.com",
    phone: "+4917212345678",
  },
  {
    name: "Stefan Schwarz",
    email: "stefan.schwarz@web.de",
    phone: "+4917012345679",
  },
  {
    name: "Karin Weber",
    email: "karin.weber@yahoo.de",
    phone: "+4917212345679",
  },
  {
    name: "Wolfgang Schröder",
    email: "wolfgang.schroeder@hotmail.com",
    phone: "+4917312345679",
  },
  {
    name: "Birgit Zimmermann",
    email: "birgit.zimmermann@outlook.de",
    phone: "+4917412345678",
  },
  {
    name: "Oliver Hartmann",
    email: "oliver.hartmann@t-online.de",
    phone: "+4917512345679",
  },
  {
    name: "Ingrid Böhm",
    email: "ingrid.boehm@gmx.de",
    phone: "+4916012345679",
  },
  {
    name: "Philipp Langer",
    email: "philipp.langer@gmail.com",
    phone: "+4915912345678",
  },
  {
    name: "Heike Schubert",
    email: "heike.schubert@web.de",
    phone: "+4917812345679",
  },
  {
    name: "Torsten Huber",
    email: "torsten.huber@yahoo.de",
    phone: "+4916012345680",
  },
  {
    name: "Michaela Werner",
    email: "michaela.werner@hotmail.com",
    phone: "+4915212345680",
  },
  {
    name: "Rolf Meier",
    email: "rolf.meier@outlook.de",
    phone: "+4917012345680",
  },
  {
    name: "Claudia Kraus",
    email: "claudia.kraus@t-online.de",
    phone: "+4917312345680",
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
  }
}

function nameAbbreviation(fullName) {
  let nameSurname = fullName.split(" ");
  let name = nameSurname[0].slice(0, 1);
  let surname = nameSurname[1].slice(0, 1);

  return name + surname;
}

displayContacts();

currentAbbrName.textContent = nameAbbreviation(contacts[0].name);
currentName.textContent = contacts[0].name;
