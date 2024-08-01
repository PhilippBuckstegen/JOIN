const BASE_URL =
  "https://devakademie-default-rtdb.europe-west1.firebasedatabase.app/";
let contacts = {};
// let sortedContacts = [];
let alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

// Funktion um Daten aus der Datenbank zu fetchen
async function loadData(BASE_URL, path = "") {
  try {
    let response = await fetch(BASE_URL + path + ".json");
    if (response.ok == false) {
      console.log("Fehler beim Datenabruf aus der Datenbank!");
    }
    let responseToJson = await response.json();
    return responseToJson;
  } catch (error) {
    console.log("Fehler beim Datenabruf aus der Datenbank!", error);
  }
}

async function getContactsFromDatabase() {
  let data = await loadData(
    "https://devakademie-default-rtdb.europe-west1.firebasedatabase.app/",
    "contacts"
  );
  contacts = data;
  console.log(contacts);
}

async function writeContactsToDatabase() {
  await postData("https://devakademie-default-rtdb.europe-west1.firebasedatabase.app/", "contacts", contacts);
  await getContactsFromDatabase();
}

// Funktion um Daten in die Datenbank zu schreiben
// async function postData(BASE_URL, path="", data){
//   try{
//       let response = await fetch(BASE_URL + path + ".json", {
//       method: "PUT",
//       headers: {
//           "Content-Type" : "application/json",
//       },
//       body: JSON.stringify(data)
//   });
//   if(response.ok == false){
//       console.log("Fehler beim Zugriff zum Schreiben in die Datenbank!");
//   };
//   let responseToJson = await response.json()
//   return responseToJson;
//   } catch (error) {
//       console.log("Fehler beim Zugriff zum Schreiben in die Datenbank!", error);
//   }
//   console.log(responseToJson);
// }

// Funktion um Daten in die Datenbank zu schreiben
async function postData(BASE_URL, path="", data){
  try{
      let response = await fetch(BASE_URL + path + ".json", {
      method: "PUT",
      header: {
          "Content-Type" : "application/json",
      },
      body: JSON.stringify(data)
  });
  if(response.ok == false){
      console.log("Fehler beim Zugriff zum Schreiben in die Datenbank!");
  };
  let responseToJson = await response.json()
  return responseToJson;
  } catch (error) {
      console.log("Fehler beim Zugriff zum Schreiben in die Datenbank!", error);
  }
  console.log(responseToJson);
}


function editContacts(i) {
  document.getElementById(`name${i}`).disabled = false;
  document.getElementById(`email${i}`).disabled = false;
  document.getElementById(`phone${i}`).disabled = false;
}

async function storeEditedData(i) {
  let name = document.getElementById(`name${i}`);
  let email = document.getElementById(`email${i}`);
  let phone = document.getElementById(`phone${i}`);
  contacts[i].name = name.value;
  contacts[i].email = email.value;
  contacts[i].phone = phone.value;
  contacts[i].initials = generateInitials(name.value);
  await writeContactsToDatabase();
  await getContactsFromDatabase();
  await renderContacts();
}

async function renderContacts() {
  await getContactsFromDatabase();
  let contactArea = document.getElementById("listContacts");
  contactArea.innerHTML = "";
  storedCharacter = "";
  for (i = 0; i < contacts.length; i++) {
    for (j = 0; j < alphabet.length; j++) {
      if (
        alphabet[j] === contacts[i].initials[0] &&
        storedCharacter != alphabet[j]
      ) {
        contactArea.innerHTML += /*html*/ `
                    <div id="letterContainer${alphabet[j]}" class="letter-contacts-container">
                        <div class="letter-header">${alphabet[j]}</div>
                        <div class="letter-header-border"></div>
                    <!-- </div> -->
                    <div onclick="showContactDetails(${i})" id="contact${i}" class="contact">
                        <div class="contact-icon contact-icon-wh bg-color">${contacts[i].initials}</div>
                        <div class="name-mail">
                            <span class="name">${contacts[i].name}</span>
                            <span class="mail">${contacts[i].email}</span>
                        </div>
                    </div>
                `;
        storedCharacter = alphabet[j];
        break;
      } else if (
        alphabet[j] === contacts[i].initials[0] &&
        storedCharacter === alphabet[j]
      ) {
        let letterContainer = document.getElementById(
          `letterContainer${alphabet[j]}`
        );
        letterContainer.innerHTML += /*html*/ `
                <!-- <div> -->
                    <div onclick="showContactDetails(${i})" id="contact${i}" class="contact">
                        <div class="contact-icon contact-icon-wh bg-color">${contacts[i].initials}</div>
                        <div class="name-mail">
                            <span class="name">${contacts[i].name}</span>
                            <span class="mail">${contacts[i].email}</span>
                        </div>
                    </div>
                `;
        storedCharacter = alphabet[j];
      }
    }
  }
}

function addNewContact() {
  let contactArea = document.getElementById("contactArea");
  contactArea.innerHTML += /*html*/ `
        <div>
            <input type="text" id="addName">
            <input type="email" id="addEmail">
            <input type="phone" id="addPhone">
            <button onclick="addNewContactToDatabase()">Save to Database</button>
        </div>
    `;
}

async function addNewContactToDatabase(event){
  event.preventDefault();
  let addName = document.getElementById('fullNameAdd');
  let addEmail = document.getElementById('emailAdd');
  let addPhone = document.getElementById('phoneAdd');
  let newContact = {
    "name": addName.value,
    "email": addEmail.value,
    "phone": addPhone.value,
    "initials": generateInitials(addName.value),
  }
  contacts.push(newContact);
  sortContactsByInitials(contacts);
  await writeContactsToDatabase();
  await renderContacts();
}

async function deleteContact(i) {
  contacts.splice(i, 1);
  sortContactsByInitials(contacts);
  await writeContactsToDatabase();
  await renderContacts();
}

function generateInitials(name) {
  let nameParts = name.split(" ");
  let firstNameInitial = nameParts[0] ? nameParts[0][0].toUpperCase() : "";
  let lastNameInitial = nameParts[1] ? nameParts[1][0].toUpperCase() : "";
  return firstNameInitial + lastNameInitial;
}

function sortContactsByInitials(contacts) {
  return contacts.sort((a, b) => {
    let initial_1 = a.initials;
    let initial_2 = b.initials;

    if (initial_1[0] < initial_2[0]) {
      return -1;
    }
    if (initial_1[0] > initial_2[0]) {
      return 1;
    }
    if (initial_1[1] < initial_2[1]) {
      return -1;
    }
    if (initial_1[1] > initial_2[1]) {
      return 1;
    }
    return 0;
  });
}

/* Random Color 
z.B.
 document.getElementById(`nameAbbrContainer${i}`).style.backgroundColor =
      getRandomColor();
*/
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


function showAddContactOverlay(){
  document.getElementById('addContactOverlay').classList.remove('none');
}