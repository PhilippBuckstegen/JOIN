// Globale Variablem
const BASE_URL = "https://devakademie-default-rtdb.europe-west1.firebasedatabase.app/";
let contacts = {};
let alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",];


/**
 * This function is used to fetch data from a database
 * 
 * @param {string} BASE_URL - URL to get data from the databese
 * @param {string} path     - additonal path to get specific data from the database
 * @returns                 - returns data in JSON object format 
 */
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


/**
 * This function is used to post data to a database
 * 
 * @param {string} BASE_URL - URL to post data to databese
 * @param {string} path     - additonal path to post specific to dataset from database
 * @param {any} data        - type of data which should be posted to database
 * @returns                 - returns posted data in JSON object format
 */
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
}


/**
 * This function calls the load data function with specific database URL and path
 */
async function getContactsFromDatabase() {
  let data = await loadData("https://devakademie-default-rtdb.europe-west1.firebasedatabase.app/","contacts");
  contacts = data;
}


/**
 * This function calls the post data function with specific database URL, pah and the data which should be written to the database
 */
async function writeContactsToDatabase() {
  await postData("https://devakademie-default-rtdb.europe-west1.firebasedatabase.app/", "contacts", contacts);
  await getContactsFromDatabase();
}


/**
 * This function stores edited data to a local array and writes the content of the local array to the database
 * 
 * @param {number} i      - index of datset which should be edited
 * @param {event} event   - event to avoid reload page after submit of form element 
 */
async function storeEditedData(i) {
  // event.preventDefault();
  setAllPrevousItemsLastEditedFalse(contacts)
  writeEditedValueFieldsToContacts(i)
  addRandomColorToJSON(contacts);
  sortContactsByInitials(contacts);
  await writeContactsToDatabase();
  await getContactsFromDatabase();
  toggleEditContactOverlay();
  await renderContacts();
  showContactDetails(findLastEditedIndex(contacts));
  editInputsCleanUp();
}


/**
 * This function writes the edited data to the local array
 * 
 * @param {number} i - index of datset which should be edited 
 */
function writeEditedValueFieldsToContacts(i){
  let editedName = document.getElementById('fullName');
  let editedEmail = document.getElementById('email');
  let editedPhone = document.getElementById('phone');
  contacts[i].name = editedName.value;
  contacts[i].email = editedEmail.value;
  contacts[i].phone = editedPhone.value;
  contacts[i].initials = generateInitials(editedName.value);
  contacts[i].lastEdited = true;
}


/**
 * This function renders the contacts overview
 */
async function renderContacts() {
  await getContactsFromDatabase();
  let contactArea = document.getElementById("listContacts");
  contactArea.innerHTML = "";
  storedCharacter = "";
  for (i = 0; i < contacts.length; i++) {
    renderContactsConditions(contactArea, i);
    document.getElementById(`initialsCircle${i}`).style.backgroundColor = contacts[i].backgroundColor;
  }
}


/**
 * This functions is to handle the different conditions for renderContacts function 
 * 
 * @param {element} contactArea - element where contacts are rendered
 * @param {number} i            - running index of for loops to render contacts
 */
function renderContactsConditions(contactArea, i){
  for (j = 0; j < alphabet.length; j++) {
    if (alphabet[j] === contacts[i].initials[0] && storedCharacter != alphabet[j]){
      contactArea.innerHTML += renderContactsWithLetterContainerHTML();
      storedCharacter = alphabet[j];
      break;
    } else if (alphabet[j] === contacts[i].initials[0] && storedCharacter === alphabet[j]) {
      let letterContainer = document.getElementById(`letterContainer${alphabet[j]}`);
      letterContainer.innerHTML += renderContactsWithoutLetterContainerHTML();
      storedCharacter = alphabet[j];
    }
  }
}


/**
 * This function renders the input area to add a new contact to the database 
 */
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


/**
 * This function writes the new contact data to the local array and writes the content of the local array to the database
 * 
 * @param {event} event -  event to avoid reload page after submit of form element 
 */
// async function addNewContactToDatabase(event){
  async function addNewContactToDatabase(){
  // event.preventDefault();
  // validateAddInputs();
  setAllPrevousItemsLastAddedFalse(contacts);
  writeNewContactToLocalArray();
  toggleAddContactOverlay()
  sortContactsByInitials(contacts);
  addRandomColorToJSON(contacts);
  await writeContactsToDatabase();
  await renderContacts();
  showContactDetails(findLastAddedIndex(contacts));
}


/**
 * This function writes the new data of the added contact to the local array
 */
function writeNewContactToLocalArray(){
    let addName = document.getElementById('fullNameAdd');
  let addEmail = document.getElementById('emailAdd');
  let addPhone = document.getElementById('phoneAdd');
  let newContact = {
    "name": addName.value,
    "email": addEmail.value,
    "phone": addPhone.value,
    "initials": generateInitials(addName.value),
    "lastAdded" : true,
  }
  contacts.push(newContact);
}


/**
 * This function sets all items in JSON array with infos about lastAdded to false
 * 
 * @param {object} object - object with name of local JSON object
 */
function setAllPrevousItemsLastAddedFalse(object){
  for(i=0; i < object.length; i++){
    object[i].lastAdded = false;
  }
}


/**
 *  This function sets all items in JSON array with infos about lastEdited to false
 * 
 * @param {object} object - object with name of local JSON object
 */
function setAllPrevousItemsLastEditedFalse(object){
  for(i=0; i < object.length; i++){
    object[i].lastEdited = false;
  }
}


/**
 * This function searches in local JSON array for object which was last added
 * 
 * @param {object} objects - object with name of local JSON object
 * @returns                - returns index of object which was last added
 */
function findLastAddedIndex(objects) {
  for (let i = 0; i < objects.length; i++) {
    if (objects[i].lastAdded === true) {
      return i;
    }
  }
  return -1; // Wenn kein Objekt mit lastAdded = true gefunden wird
}


/**
 * This function searches in local JSON array for object which was last edited
 * 
 * @param {object} objects - object with name of local JSON object
 * @returns                - returns index of object which was last added
 */
function findLastEditedIndex(objects) {
  for (let i = 0; i < objects.length; i++) {
    if (objects[i].lastEdited === true) {
      return i;
    }
  }
  return -1; // Wenn kein Objekt mit lastAdded = true gefunden wird
}


/**
 * This function deletes data from local JSON array and writes the updated local JSON array to database
 * 
 * @param {number} i - index of object which should be deleted
 */
async function deleteContact(i) {
  contacts.splice(i, 1);
  sortContactsByInitials(contacts);
  addRandomColorToJSON(contacts);
  await writeContactsToDatabase();
  await renderContacts();
  document.getElementById("contactDetailsContainer").innerHTML = renderDeleteContactMessageHTML();
  setTimeout(() => {
    document.getElementById("deleteText").classList.add('fade-out');
  }, 2000);
}


/**
 * This function generates initials with the first letter of first name and the first letter of last name
 * 
 * @param {string} name - name for which initials should be created 
 * @returns             - returns created initials
 */
function generateInitials(name) {
  let nameParts = name.split(" ");
  let firstNameInitial = nameParts[0] ? nameParts[0][0].toUpperCase() : "";
  let lastNameInitial = nameParts[1] ? nameParts[1][0].toUpperCase() : "";
  return firstNameInitial + lastNameInitial;
}


/**
 * This function sorts the contacts in alphabetical order for both letters in initials. Letter of first name is the leading element. 
 * 
 * @param {JSON} contacts - JSON object which should be alphabetical sorted 
 * @returns               - returns new position in JSON Array for alphabetical order
 */
function sortContactsByInitials(contacts) {
  return contacts.sort((a, b) => {
    let initial_1 = a.initials;
    let initial_2 = b.initials;
    if (initial_1[0] < initial_2[0]) {
      return -1;
    } else if (initial_1[0] > initial_2[0]) {
      return 1;
    } else if (initial_1[1] < initial_2[1]) {
      return -1;
    } else if (initial_1[1] > initial_2[1]) {
      return 1;
    }
    return 0;
  });
}


/**
 * This functions returns a random color which is used for the initials
 * 
 * @returns - random color code
 */
function getRandomColor() {
  const colors = ["#FF7A00", "#9327FF", "#6E52FF", "#FC71FF", "#FFBB2B", "#1FD7C1", "#462F8A", "#FF4646", "#00BEE8", "#FF7A00",];
  // Generate a random index based on the length of the colors array
  const randomIndex = Math.floor(Math.random() * colors.length);
  // Return the color at the randomly selected index
  return colors[randomIndex];
}


/**
 * This function adds the random color to the local JSON Array
 * 
 * @param {JSON} object - name of local JSON Object where background-color should be added
 */
function addRandomColorToJSON(object){
  for(i = 0; i < object.length; i++){
    object[i].backgroundColor = getRandomColor(); 
  }
}


/**
 * This function toggles the class for the add contact overlay and clears input fields
 */
function toggleAddContactOverlay(){
  document.getElementById('addContactOverlay').classList.toggle('none');
  let fullNameAdd = document.getElementById('fullNameAdd');
  let emailAdd = document.getElementById('emailAdd');
  let phoneAdd = document.getElementById('phoneAdd');
  fullNameAdd.value = "";
  emailAdd.value = "";
  phoneAdd.value = "";
  resetInputDataErrors(`fullNameAdd`, `emailAdd`, `phoneAdd`);
}


/**
 * This function toggles the class for the edit contact overlay
 */
function toggleEditContactOverlay(){
  document.getElementById('editOverlay').classList.toggle('none');
}


/**
 * This function edits existing data 
 * 
 * @param {Number} i - index of contact which should be edited 
 */
function getDataToEdit(i){
  toggleEditContactOverlay();
  writeEditDataToInputs(i);
}


/**
 * This function writes the existing data for contact which should be edited to edit contacts input fields
 * 
 * @param {number} i - index of contact which should be edited  
 */
function writeEditDataToInputs(i){
  renderEditArea(i);
  let editName = document.getElementById('fullName');
  let editEmail = document.getElementById('email');
  let editPhone = document.getElementById('phone');
  editName.value = contacts[i].name;
  editEmail.value = contacts[i].email;
  editPhone.value = contacts[i].phone;
}


/**
 * This function empties the edit input field after being stored
 */
function editInputsCleanUp(){
  document.getElementById('fullName').innerHTML = "";
  document.getElementById('email').innerHTML = "";
  document.getElementById('phone').innerHTML = "";
  resetInputDataErrors(`fullName`, `email`, `phone`);

}


/**
 * This function renders the edit contact area
 * 
 * @param {number} i - index of contact which should be edited 
 */
function renderEditArea(i){
let editArea = document.getElementById('editOverlayContainer');
editArea.innerHTML =  renderEditAreaHTML(i);
document.getElementById(`overlayAbbr`).style.backgroundColor = contacts[i].backgroundColor;
}

