let tasks = [];
let subtask = [];

function firstCall() {
  renderDropdown();
  getTasksFromDatabase();
  // editRenderDropdown();
}

async function getTasksFromDatabase() {
  let data = await loadData(
    "https://devakademie-default-rtdb.europe-west1.firebasedatabase.app/",
    "tasks"
  );
  if (Array.isArray(data)) {
    tasks = data;
  } else if (typeof data === "object") {
    tasks = Object.values(data);
  } else {
    tasks = [];
  }
}

async function writeTasksToDatabase() {
  await postData(
    "https://devakademie-default-rtdb.europe-west1.firebasedatabase.app/",
    "tasks",
    tasks
  );
  // await getContactsFromDatabase();
}

async function addNewTaskToDatabase(state, overlay) {
  writeNewTaskToLocalArray(state);
  await writeTasksToDatabase();
  // toggleAddContactOverlay()
  // sortContactsByInitials(contacts);
  // addRandomColorToJSON(contacts);
  cleanAddtaskArea();
  if (overlay === 1) {
    addClassToElement("addTaskBoardOverlayContainer", "none");
    renderTasksInBoard();
  }
  // await renderContacts();
  // showContactDetails(findLastAddedIndex(contacts));
}

function writeNewTaskToLocalArray(state) {
  let addTaskTitle = document.getElementById("boardTitle");
  let addTaskDescription = document.getElementById("boardDescription");
  // let addTaskAssignedTo = document.getElementById('newTaskAssignedTo');
  let addTaskDueDate = document.getElementById("boardDate");
  // let addTaskPriority = priority;
  let addTaskCategory = document.getElementById("boardCategory");
  // let addTaskSubtask = document.getElementById('newTaskSubtasks');
  let newTask = {
    status: state,
    title: addTaskTitle.value,
    description: addTaskDescription.value,
    dueDate: addTaskDueDate.value,
    priority: priority,
    taskCategory: addTaskCategory.value,
    assignedTo: updateSelectedContacts(),
    subtask: subtask,
  };
  tasks.push(newTask);
}

// Dropdown User List und Checkbox
function renderDropdown() {
  const dropdownContent = document.querySelector(".dropdown-content");

  // taskContacts.forEach((contact, index) => {

  contacts.forEach((contact, index) => {
    // Erstelle ein label-Element
    const label = document.createElement("label");

    // Erstelle ein gemeinsames span-Element für Initialen und Name
    const nameSpan = document.createElement("span");
    nameSpan.className = "label-initials";

    // Erstelle ein span-Element für die Initialen
    const initialsSpan = document.createElement("span");
    initialsSpan.className = "initials-dropdown";
    initialsSpan.id = `initials${index}`;
    initialsSpan.textContent = contact.initials; // Initialen hinzufügen

    // Erstelle ein Text-Node für den Namen
    const nameTextNode = document.createTextNode(`${contact.name}`);

    // Füge Initialen und Namen in das gemeinsame span-Element ein
    nameSpan.appendChild(initialsSpan);
    nameSpan.appendChild(nameTextNode);

    // Erstelle die Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `contact_${index}`;
    checkbox.value = contact.name;

    // Füge das gemeinsame span-Element und die Checkbox zum label-Element hinzu
    label.appendChild(nameSpan);
    label.appendChild(checkbox);

    // Füge das label zum Dropdown-Inhalt hinzu
    dropdownContent.appendChild(label);
    document.getElementById(
      `initials${index}`
    ).style.backgroundColor = `${contact.backgroundColor}`;
  });
}

function toggleDropdown() {
  const dropdown = document.getElementById("contactDropdown");
  dropdown.classList.toggle("open");
  if (!dropdown.classList.contains("open")) {
    updateSelectedContacts();
  }
}


function cancelEditArea(){
  document.getElementById("currentUserTaskOverlay").innerHTML = "";
  addClassToElement('taskOverlaySection', 'none')
}

function updateSelectedContacts() {
  const selectedContactsDiv = document.getElementById("selectedContacts");
  selectedContactsDiv.innerHTML = ""; // Clear previous selections
  const selectedContacts = [];
  // for (let i = 0; i < taskContacts.length; i++) {
  for (let i = 0; i < contacts.length; i++) {
    const checkbox = document.getElementById(`contact_${i}`);
    if (checkbox.checked) {
      selectedContacts.push({
        // user : taskContacts[i].name,
        // initials : generateInitials(taskContacts[i].name)  // hier muss später contacts[i].initials rein!
        // },
        user: contacts[i].name,
        initials: contacts[i].initials, // hier muss später contacts[i].initials rein!
        backgroundColor: contacts[i].backgroundColor,
      });
      const contactDiv = document.createElement("div");
      // contactDiv.textContent = taskContacts[i].name;
      // selectedContactsDiv.innerHTML += `<span>${taskContacts[i].initials}</span>`;
      contactDiv.textContent = contacts[i].name;
      selectedContactsDiv.innerHTML += `
            <span class="initials-dropdown" id="selectedInitials${i}">${contacts[i].initials}</span>
            `;
      document.getElementById(
        `selectedInitials${i}`
      ).style.backgroundColor = `${contacts[i].backgroundColor}`;
    }
  }
  return selectedContacts;
}

// Subtasks Liste

function createSubtask() {
  let subtaskText = document.getElementById("boardSubtasks").value;
  subtask.push({ task: subtaskText });
  renderSubtasks();
  deleteSubtaskInputField();
}

function decideSubtask() {
  if (document.getElementById("boardSubtasks").value) {
    document.getElementById("plusIcon").classList.add("none");
    document.getElementById("closeIcon").classList.remove("none");
    document.getElementById("checkIcon").classList.remove("none");
  }
}

function cancelSubtask() {
  document.getElementById("plusIcon").classList.remove("none");
  document.getElementById("closeIcon").classList.add("none");
  document.getElementById("checkIcon").classList.add("none");
  document.getElementById("boardSubtasks").value = "";
}

function createSubtask() {
  document.getElementById("plusIcon").classList.remove("none");
  document.getElementById("closeIcon").classList.add("none");
  document.getElementById("checkIcon").classList.add("none");
  if (document.getElementById("boardSubtasks").value) {
    let subtaskText = document.getElementById("boardSubtasks").value;
    subtask.push({ task: subtaskText });
    renderSubtasks();
    deleteSubtaskInputField();
  }

  document.getElementById("boardSubtasks").value = "";
}

function renderSubtasks() {
  let listArea = document.getElementById("subtaskList");
  listArea.innerHTML = "";
  for (i = 0; i < subtask.length; i++) {
    listArea.innerHTML += /*html*/ `
          <li id="subtaskListItem${i}" class="subtaskListItems flexContainer">
            <div class="subtaskListItemsContainers flexContainer"><span class="sub-task-text-list" id="subTaskTextListItem${i}">${subtask[i].task}</span></div>
              
              <span id="singleSubTaskButtons${i}" class="singleSubtaskButtons flexContainer">
                  <img id="editSubtaskIcon" class="hidden" onclick="editSubtaskItem(${i})" src="../database/images/edit.svg" alt="icon">
                  <img id="binSubtaskIcon" class="hidden" onclick="deleteSubtaskItem(${i})" src="../database/images/delete.svg" alt="icon">
              <span>
          </li>
      `;
  }
}

function deleteSubtaskItem(i) {
  subtask.splice(i, 1);
  renderSubtasks();
}

function deleteSubtaskInputField() {
  document.getElementById("boardSubtasks").value = "";
}

function clearInputFields() {
  document.getElementById("boardTitle").value = "";
  document.getElementById("boardDescription").value = "";
  const checkboxes = document.querySelectorAll("input[type=checkbox]");
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = false;
  }
  document.getElementById("selectedContacts").innerHTML = "";
  document.getElementById("boardDate").value = "";
  mediumBtnToggle();
  document.getElementById("boardCategory").value = "";
  document.getElementById("boardSubtasks").value = "";
  document.getElementById("subtaskList").innerHTML = "";
}

function editSubtaskItem(i) {
  setSubtaskEditModeOn(i);
  document
    .getElementById(`subtaskListItem${i}`)
    .classList.add("editCurrentSubtask");
  document.getElementById(`singleSubTaskButtons${i}`).innerHTML = /*html*/ `
    <img id="binSubtaskDeleteIcon" onclick="deleteSubtaskItem(${i})" src="../database/images/delete.svg" alt="icon">
    <img id="tickSubtaskCheckIcon" onclick="storeEditedSubtaskItem(${i})" src="../database/images/check_blue.svg" alt="icon" />
        
      `;
}

function setSubtaskEditModeOn(i) {
  document.getElementById(`subTaskTextListItem${i}`).contentEditable = "true";
  document.getElementById(`subtaskListItem${i}`).style.border =
    "1px solid black";
}

function setSubtaskEditModeOff(i) {
  document.getElementById(`subTaskTextListItem${i}`).contentEditable = "false";
  document.getElementById(`subtaskListItem${i}`).style.border = "none";
}

function storeEditedSubtaskItem(i) {
  subtask[i].task = document.getElementById(
    `subTaskTextListItem${i}`
  ).innerHTML;
  setSubtaskEditModeOff(i);
  renderSubtasks();
}

function cleanAddtaskArea() {
  document.getElementById("boardTitle").value = "";
  document.getElementById("boardDescription").value = "";
  clearAssignedtoArea();
  document.getElementById("boardDate").value = "";
  clearPriorityStates();
  preSelectMediumBtn();
  document.getElementById("boardCategory").value = "";
  document.getElementById("boardDate").value = "";
  clearSubtasks();
}

function clearAssignedtoArea() {
  document.getElementById("selectedContacts").innerHTML = "";
  for (let i = 0; i < contacts.length; i++) {
    const checkbox = document.getElementById(`contact_${i}`);
    checkbox.checked = false;
  }
}

function clearSubtasks() {
  document.getElementById("boardSubtasks").value = "";
  document.getElementById("subtaskList").innerHTML = "";
  subtask = [];
}

function generateInitials(name) {
  let nameParts = name.split(" ");
  let firstNameInitial = nameParts[0] ? nameParts[0][0].toUpperCase() : "";
  let lastNameInitial = nameParts[1] ? nameParts[1][0].toUpperCase() : "";
  return firstNameInitial + lastNameInitial;
}
// *********************************************************************************************************************************************************************************

function loadTaskDataToEdit(i) {
  document.getElementById("editTaskTitle").value = tasks[i].title;
  document.getElementById("editTaskDescription").value = tasks[i].description;
  document.getElementById("editTaskDueDate").value = tasks[i].dueDate;
  document.getElementById("editTaskPriority").value = tasks[i].priority;
  document.getElementById("editTaskCategory").value = tasks[i].taskCategory;
  editCheckBoxesForAssignedUsers(i);
  editAreaRenderSubtasks(i);
}

function storeEditedTaskData(x) {
  tasks[x].title = document.getElementById("editTaskTitle").value;
  tasks[x].description = document.getElementById("editTaskDescription").value;
  tasks[x].dueDate = document.getElementById("editTaskDueDate").value;
  tasks[x].priority = document.getElementById("editTaskPriority").value;
  tasks[x].taskCategory = document.getElementById("editTaskCategory").value;
  tasks[x].assignedTo = editUpdateSelectedContacts();
}

// function editRenderDropdown() {
//   const dropdownContent = document.querySelector(".edit-dropdown-content");
//   for (let i = 0; i < taskContacts.length; i++) {
//     const contact = taskContacts[i];
//     const label = document.createElement("label");
//     const checkbox = document.createElement("input");
//     checkbox.type = "checkbox";
//     checkbox.id = `editContact_${i}`;
//     checkbox.value = contact.name;
//     label.appendChild(checkbox);
//     label.appendChild(document.createTextNode(contact.name));
//     dropdownContent.appendChild(label);
//   }
// }

function editToggleDropdown() {
  const dropdown = document.getElementById("editContactDropdown");
  dropdown.classList.toggle("open");
  if (!dropdown.classList.contains("open")) {
    editUpdateSelectedContacts();
  }
}

function editUpdateSelectedContacts() {
  // const selectedContactsDiv = document.getElementById('selectedContacts');
  // selectedContactsDiv.innerHTML = '';  // Clear previous selections
  const selectedContacts = [];
  for (let i = 0; i < contacts.length; i++) {
    const checkbox = document.getElementById(`contact_${i}`);
    if (checkbox.checked) {
      selectedContacts.push({ user: contacts[i].name });
      // const contactDiv = document.createElement('div');
      // contactDiv.textContent = contacts[i].name;
      // selectedContactsDiv.innerHTML += `<div>${contacts[i].name}</div>`;
    }
  }
  return selectedContacts;
}

function editCheckBoxesForAssignedUsers(x) {
  const selectedContactsDiv = document.getElementById("selectedContacts");
  selectedContactsDiv.innerHTML = ""; // Clear previous selections
  for (i = 0; i < contacts.length; i++) {
    const checkbox = document.getElementById(`contact_${i}`);
    checkbox.checked = false;
    for (j = 0; j < tasks[x].assignedTo.length; j++) {
      if (tasks[x].assignedTo[j].user === checkbox.value) {
        checkbox.checked = true;
        const contactDiv = document.createElement("div");
        contactDiv.textContent = contacts[i].name;
        selectedContactsDiv.innerHTML += `<div>${contacts[i].name}</div>`;
      }
    }
  }
}

function editAreaRenderSubtasks(x) {
  let listArea = document.getElementById("editSubtaskList");
  listArea.innerHTML = "";
  for (i = 0; i < tasks[x].subtask.length; i++) {
    listArea.innerHTML += /*html*/ `
        <li id="editSubtaskListItem${i}" class="subtaskListItems flexContainer">
            <span class="sub-task-text-list" id="editSubTaskTextListItem${i}">${tasks[x].subtask[i].task}</span>
            <span id="editSingleSubTaskButtons${i}" class="singleSubtaskButtons flexContainer">
                  <img id="editSubtaskIcon" class="hidden" onclick="editAreaEditSubtaskItem(${x},${i})" src="../database/images/edit.svg" alt="icon">
                  <img id="binSubtaskIcon" class="hidden" onclick="editAreaDeleteSubtaskItem(${x},${i})" src="../database/images/delete.svg" alt="icon">
              <span>
        </li>


    `;
  }
}

function editAreaDeleteSubtaskItem(x, i) {
  tasks[x].subtask.splice(i, 1);
  editAreaRenderSubtasks(x);
}

function editDeleteSubtaskInputField() {
  document.getElementById("subtaskInput").value = "";
}

function editAreaEditSubtaskItem(x, i) {
  editAreaSetSubtaskEditModeOn(i);
  document.getElementById(`editSingleSubTaskButtons${i}`).innerHTML = /*html*/ `
        <button onclick="editAreaDeleteSubtaskItem(${i})">Delete</button>
        <button onclick="editAreaStoreEditedSubtaskItem(${x},${i})">Ok</button>
    `;
}

function editAreaSetSubtaskEditModeOn(i) {
  document.getElementById(`editSubTaskTextListItem${i}`).contentEditable =
    "true";
  document.getElementById(`editSubtaskListItem${i}`).style.border =
    "1px solid black";
}

function editAreaSetSubtaskEditModeOff(i) {
  document.getElementById(`editSubTaskTextListItem${i}`).contentEditable =
    "false";
  document.getElementById(`editSubtaskListItem${i}`).style.border = "none";
}

function editAreaStoreEditedSubtaskItem(x, i) {
  tasks[x].subtask[i].task = document.getElementById(
    `editSubTaskTextListItem${i}`
  ).innerHTML;
  editAreaSetSubtaskEditModeOff(i);
  editAreaRenderSubtasks(x);
}

function editAreaCreateSubtask(x) {
  let subtaskText = document.getElementById("editAreaSubtaskInput").value;
  tasks[x].subtask.push({ task: subtaskText });
  editAreaRenderSubtasks(x);
  editDeleteSubtaskInputField();
}

function editDeleteSubtaskInputField() {
  document.getElementById("editAreaSubtaskInput").value = "";
}
