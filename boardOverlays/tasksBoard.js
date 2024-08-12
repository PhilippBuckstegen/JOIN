let taskContacts = [
    {
      "backgroundColor": "#6E52FF",
      "email": "anna.mueller@example.com",
      "initials": "AM",
      "lastAdded": false,
      "lastEdited": false,
      "name": "Anna Müller",
      "phone": "+49151123456987"
    },
    {
      "backgroundColor": "#FC71FF",
      "email": "anette.svenson@internet.swe",
      "initials": "AS",
      "lastAdded": false,
      "lastEdited": false,
      "name": "Anette Svenson",
      "phone": "+4585452587"
    },
    {
      "backgroundColor": "#9327FF",
      "email": "bernd.seiler@beispiel.de",
      "initials": "BS",
      "lastAdded": false,
      "lastEdited": true,
      "name": "Bernd Seiler",
      "phone": "+151818182619"
    },
    {
      "background-color": "#651445",
      "backgroundColor": "#1FD7C1",
      "email": "franz.meier@gmx.net",
      "initials": "FM",
      "lastAdded": false,
      "lastEdited": false,
      "name": "Franz Meier",
      "phone": "+4916518158181"
    },
    {
      "backgroundColor": "#FF4646",
      "email": "franz.mustermann@web.de",
      "initials": "FM",
      "lastAdded": false,
      "lastEdited": false,
      "name": "Franz Mustermann",
      "phone": "+49245584254"
    },
    {
      "backgroundColor": "#462F8A",
      "email": "hans.mustermann@web.de",
      "initials": "HM",
      "lastAdded": false,
      "lastEdited": false,
      "name": "Hans Mustermann",
      "phone": "+4924558753286"
    },
    {
      "backgroundColor": "#9327FF",
      "email": "heinz.schmitz@arcor.de",
      "initials": "HS",
      "lastAdded": false,
      "lastEdited": false,
      "name": "Heinz Schmitz",
      "phone": "+49219181808"
    },
    {
      "backgroundColor": "#FC71FF",
      "email": "julia.koch@example.com",
      "initials": "JK",
      "lastAdded": false,
      "lastEdited": false,
      "name": "Julia Koch",
      "phone": "+4915990123456"
    },
    {
      "backgroundColor": "#FF7A00",
      "email": "laura.fischer@example.com",
      "initials": "LF",
      "lastAdded": false,
      "lastEdited": false,
      "name": "Laura Fischer",
      "phone": "+4915334567890"
    },
    {
      "backgroundColor": "#9327FF",
      "email": "lisa.wagner@example.com",
      "initials": "LW",
      "lastAdded": false,
      "lastEdited": false,
      "name": "Lisa Wagner",
      "phone": "+4915556789012"
    },
    {
      "backgroundColor": "#462F8A",
      "email": "michael.bauer@example.com",
      "initials": "MB",
      "lastAdded": false,
      "lastEdited": false,
      "name": "Michael Bauer",
      "phone": "+4915110234567"
    },
    {
      "backgroundColor": "#9327FF",
      "email": "max.schmidt@example.com",
      "initials": "MS",
      "lastAdded": false,
      "lastEdited": false,
      "name": "Max Schmidt",
      "phone": "+4915223456789"
    },
    {
      "backgroundColor": "#00BEE8",
      "email": "maria.hoffmann@example.com",
      "initials": "M",
      "lastAdded": false,
      "lastEdited": false,
      "name": " Maria Hoffmann",
      "phone": "+4915778901234"
    },
    {
      "backgroundColor": "#6E52FF",
      "email": "natalie.imbruglia@web.de",
      "initials": "NI",
      "lastAdded": false,
      "lastEdited": false,
      "name": "Natalie Imbruglia",
      "phone": "+45854524565"
    },
    {
      "backgroundColor": "#FF4646",
      "email": "peter.weber@example.com",
      "initials": "PW",
      "lastAdded": false,
      "lastEdited": false,
      "name": "Peter Weber",
      "phone": "+4915445678901"
    },
    {
      "backgroundColor": "#9327FF",
      "email": "reiner.steinberg@arcor.com",
      "initials": "RS",
      "lastAdded": false,
      "lastEdited": false,
      "name": "Reiner Steinberg",
      "phone": "+51812158618"
    },
    {
      "backgroundColor": "#FF7A00",
      "email": "thomas.becker@example.com",
      "initials": "TB",
      "lastAdded": false,
      "lastEdited": false,
      "name": "Thomas Becker",
      "phone": "+4915667890123"
    }
  ];

let tasks = [];
let subtask = [];

function firstCall(){
    renderDropdown(); 
    getTasksFromDatabase();
    // editRenderDropdown(); 
}

async function getTasksFromDatabase() {
    let data = await loadData("https://devakademie-default-rtdb.europe-west1.firebasedatabase.app/","tasks");
    if (Array.isArray(data)) {
        tasks = data;
    } else if (typeof data === 'object') {
        tasks = Object.values(data);
    } else {
        tasks = [];
    }
}


async function writeTasksToDatabase() {
    await postData("https://devakademie-default-rtdb.europe-west1.firebasedatabase.app/", "tasks", tasks);
    // await getContactsFromDatabase();
  }
  

async function addNewTaskToDatabase(state){
    // setAllPrevousItemsLastAddedFalse(contacts);
    writeNewTaskToLocalArray(state);
    // toggleAddContactOverlay()
    // sortContactsByInitials(contacts);
    // addRandomColorToJSON(contacts);
    await writeTasksToDatabase();
    cleanAddtaskArea();
    // await renderContacts();
    // showContactDetails(findLastAddedIndex(contacts));
  }

function writeNewTaskToLocalArray(state) {
    let addTaskTitle = document.getElementById('boardTitle');
    let addTaskDescription = document.getElementById('boardDescription');
    // let addTaskAssignedTo = document.getElementById('newTaskAssignedTo');
    let addTaskDueDate = document.getElementById('boardDate');
    // let addTaskPriority = priority;
    let addTaskCategory = document.getElementById('boardCategory');
    // let addTaskSubtask = document.getElementById('newTaskSubtasks');
    let newTask = {
        "status" : state,
        "title": addTaskTitle.value,
        "description": addTaskDescription.value,
        "dueDate": addTaskDueDate.value,
        "priority": priority,
        "taskCategory": addTaskCategory.value,
        "assignedTo": updateSelectedContacts(),
        "subtask": subtask
    };
    tasks.push(newTask);
}


// Dropdown User List und Checkbox 
function renderDropdown() {
    const dropdownContent = document.querySelector('.dropdown-content');

    taskContacts.forEach((contact, index) => {
        // Erstelle ein label-Element
        const label = document.createElement('label');

        // Erstelle ein gemeinsames span-Element für Initialen und Name
        const nameSpan = document.createElement('span');
        nameSpan.className = 'label-initials';

        // Erstelle ein span-Element für die Initialen
        const initialsSpan = document.createElement('span');
        initialsSpan.textContent = contact.initials;  // Initialen hinzufügen

        // Erstelle ein Text-Node für den Namen
        const nameTextNode = document.createTextNode(`${contact.name}`);

        // Füge Initialen und Namen in das gemeinsame span-Element ein
        nameSpan.appendChild(initialsSpan);
        nameSpan.appendChild(nameTextNode);

        // Erstelle die Checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `contact_${index}`;
        checkbox.value = contact.name;

        // Füge das gemeinsame span-Element und die Checkbox zum label-Element hinzu
        label.appendChild(nameSpan);
        label.appendChild(checkbox);

        // Füge das label zum Dropdown-Inhalt hinzu
        dropdownContent.appendChild(label);
    });
}

function toggleDropdown() {
    const dropdown = document.getElementById('contactDropdown');
    dropdown.classList.toggle('open');
    if (!dropdown.classList.contains('open')) {
        updateSelectedContacts();
    }
}

function updateSelectedContacts() {
    const selectedContactsDiv = document.getElementById('selectedContacts');
    selectedContactsDiv.innerHTML = '';  // Clear previous selections
    const selectedContacts = [];
    for (let i = 0; i < taskContacts.length; i++) {
        const checkbox = document.getElementById(`contact_${i}`);
        if (checkbox.checked) {
            selectedContacts.push({
                user : taskContacts[i].name,
                initials : generateInitials(taskContacts[i].name)  // hier muss später contacts[i].initials rein!
                },
            );      
            const contactDiv = document.createElement('div');
            contactDiv.textContent = taskContacts[i].name;
            selectedContactsDiv.innerHTML += `<span>${taskContacts[i].initials}</span>`;
        }
    }
    return selectedContacts;
}


// Subtasks Liste

function createSubtask(){
    let subtaskText = document.getElementById('boardSubtasks').value;
    subtask.push({task : subtaskText});
    renderSubtasks();
    deleteSubtaskInputField();
}


function renderSubtasks(){
    let listArea = document.getElementById('subtaskList');
    listArea.innerHTML = "";
    for(i=0; i < subtask.length; i++){
        listArea.innerHTML += /*html*/ `
        <li id="subtaskListItem${i}">
            <span class="sub-task-text-list" id="subTaskTextListItem${i}">${subtask[i].task}</span>
            <span id="singleSubTaskButtons${i}" class="singleSubtaskButtons">
                <button onclick="editSubtaskItem(${i})">Edit</button>
                <button onclick="deleteSubtaskItem(${i})">Delete</button>
            <span>
        </li>
    `;
    }
}

function deleteSubtaskItem(i){
    subtask.splice(i,1);
    renderSubtasks();
}

function deleteSubtaskInputField(){
    document.getElementById('boardSubtasks').value = "";
}


function editSubtaskItem(i){
    setSubtaskEditModeOn(i);
    document.getElementById(`singleSubTaskButtons${i}`).innerHTML = /*html*/ `
        <button onclick="deleteSubtaskItem(${i})">Delete</button>
        <button onclick="storeEditedSubtaskItem(${i})">Ok</button>
    `;
}


function setSubtaskEditModeOn(i){
    document.getElementById(`subTaskTextListItem${i}`).contentEditable = "true";
    document.getElementById(`subtaskListItem${i}`).style.border = "1px solid black";
}


function setSubtaskEditModeOff(i){
    document.getElementById(`subTaskTextListItem${i}`).contentEditable = "false";
    document.getElementById(`subtaskListItem${i}`).style.border = "none";
}


function storeEditedSubtaskItem(i){
    subtask[i].task = document.getElementById(`subTaskTextListItem${i}`).innerHTML;
    setSubtaskEditModeOff(i);
    renderSubtasks();
}


function cleanAddtaskArea(){
    document.getElementById('boardTitle').value = "";
    document.getElementById('boardDescription').value = "";
    clearAssignedtoArea();
    document.getElementById('boardDate').value = "";
    clearPriorityStates();
    document.getElementById('boardCategory').value = "";
    document.getElementById('boardDate').value = "";
    clearSubtasks();
}


function clearAssignedtoArea(){
    document.getElementById('selectedContacts').innerHTML = "";
    for (let i = 0; i < taskContacts.length; i++) {
        const checkbox = document.getElementById(`contact_${i}`);
        checkbox.checked = false;
    }
}


function clearSubtasks(){
    document.getElementById('boardSubtasks').value = "";
    document.getElementById('subtaskList').innerHTML = "";
    subtask = [];
}


function generateInitials(name) {
    let nameParts = name.split(" ");
    let firstNameInitial = nameParts[0] ? nameParts[0][0].toUpperCase() : "";
    let lastNameInitial = nameParts[1] ? nameParts[1][0].toUpperCase() : "";
    return firstNameInitial + lastNameInitial;
}
// *********************************************************************************************************************************************************************************


function loadTaskDataToEdit(i){
    document.getElementById('editTaskTitle').value = tasks[i].title;
    document.getElementById('editTaskDescription').value = tasks[i].description;;
    document.getElementById('editTaskDueDate').value = tasks[i].dueDate;;
    document.getElementById('editTaskPriority').value = tasks[i].priority;
    document.getElementById('editTaskCategory').value = tasks[i].taskCategory;
    editCheckBoxesForAssignedUsers(i);
    editAreaRenderSubtasks(i);
}


function storeEditedTaskData(x){
    tasks[x].title= document.getElementById('editTaskTitle').value;
    tasks[x].description = document.getElementById('editTaskDescription').value;
    tasks[x].dueDate = document.getElementById('editTaskDueDate').value;
    tasks[x].priority = document.getElementById('editTaskPriority').value;
    tasks[x].taskCategory = document.getElementById('editTaskCategory').value;
    tasks[x].assignedTo = editUpdateSelectedContacts();
}


function editRenderDropdown() {
    const dropdownContent = document.querySelector('.edit-dropdown-content');
    for (let i = 0; i < taskContacts.length; i++) {
        const contact = taskContacts[i];
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `editContact_${i}`;
        checkbox.value = contact.name;
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(contact.name));
        dropdownContent.appendChild(label);
    }
}


function editToggleDropdown() {
    const dropdown = document.getElementById('editContactDropdown');
    dropdown.classList.toggle('open');
    if (!dropdown.classList.contains('open')) {
        editUpdateSelectedContacts();
    }
}

function editUpdateSelectedContacts() {
    const selectedContactsDiv = document.getElementById('editSelectedContacts');
    selectedContactsDiv.innerHTML = '';  // Clear previous selections
    const selectedContacts = [];
    for (let i = 0; i < taskContacts.length; i++) {
        const checkbox = document.getElementById(`editContact_${i}`);
        if (checkbox.checked) {
            selectedContacts.push({user : taskContacts[i].name });
            const contactDiv = document.createElement('div');
            contactDiv.textContent = taskContacts[i].name;
            selectedContactsDiv.innerHTML += `<div>${taskContacts[i].name}</div>`;
        }
    }
    return selectedContacts;
}

function editCheckBoxesForAssignedUsers(x){
    const selectedContactsDiv = document.getElementById('editSelectedContacts');
    selectedContactsDiv.innerHTML = '';  // Clear previous selections
        for(i = 0; i < taskContacts.length; i++){
        const checkbox = document.getElementById(`editContact_${i}`);
        checkbox.checked = false;
        for(j = 0; j < tasks[x].assignedTo.length; j++){
        if(tasks[x].assignedTo[j].user === checkbox.value){
            checkbox.checked = true;
            const contactDiv = document.createElement('div');
            contactDiv.textContent = taskContacts[i].name;
            selectedContactsDiv.innerHTML += `<div>${taskContacts[i].name}</div>`;
        }
        }
    }
}


function editAreaRenderSubtasks(x){
    let listArea = document.getElementById('editSubtaskList');
    listArea.innerHTML = "";
    for(i=0; i < tasks[x].subtask.length; i++){
        listArea.innerHTML += /*html*/ `
        <li id="editSubtaskListItem${i}">
            <span class="sub-task-text-list" id="editSubTaskTextListItem${i}">${tasks[x].subtask[i].task}</span>
            <span id="editSingleSubTaskButtons${i}" class="singleSubtaskButtons">
                <button onclick="editAreaEditSubtaskItem(${x},${i})">Edit</button>
                <button onclick="editAreaDeleteSubtaskItem(${x},${i})">Delete</button>
            <span>
        </li>
    `;
    }
}

function editAreaDeleteSubtaskItem(x, i){
    tasks[x].subtask.splice(i,1);
    editAreaRenderSubtasks(x);
}


function editDeleteSubtaskInputField(){
    document.getElementById('subtaskInput').value = "";
}


function editAreaEditSubtaskItem(x, i){
    editAreaSetSubtaskEditModeOn(i);
    document.getElementById(`editSingleSubTaskButtons${i}`).innerHTML = /*html*/ `
        <button onclick="editAreaDeleteSubtaskItem(${i})">Delete</button>
        <button onclick="editAreaStoreEditedSubtaskItem(${x},${i})">Ok</button>
    `;
}


function editAreaSetSubtaskEditModeOn(i){
    document.getElementById(`editSubTaskTextListItem${i}`).contentEditable = "true";
    document.getElementById(`editSubtaskListItem${i}`).style.border = "1px solid black";
}


function editAreaSetSubtaskEditModeOff(i){
    document.getElementById(`editSubTaskTextListItem${i}`).contentEditable = "false";
    document.getElementById(`editSubtaskListItem${i}`).style.border = "none";
}


function editAreaStoreEditedSubtaskItem(x, i){
    tasks[x].subtask[i].task = document.getElementById(`editSubTaskTextListItem${i}`).innerHTML;
    editAreaSetSubtaskEditModeOff(i);
    editAreaRenderSubtasks(x);
}


function editAreaCreateSubtask(x){
    let subtaskText = document.getElementById('editAreaSubtaskInput').value;
    tasks[x].subtask.push({task : subtaskText});
    editAreaRenderSubtasks(x);
    editDeleteSubtaskInputField();
}

function editDeleteSubtaskInputField(){
    document.getElementById('editAreaSubtaskInput').value = "";
}


