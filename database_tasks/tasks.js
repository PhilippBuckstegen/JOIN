let tasks = [];
let subtask = [];


/**
 * This function is the initial call
 */
function firstCall() {
  renderDropdown();
  getTasksFromDatabase();
  editRenderDropdown();
}


/**
 * This functions loads tasks from database
 */
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


/**
 * This function writes new tasks to databse
 */
async function writeTasksToDatabase() {
  await postData(
    "https://devakademie-default-rtdb.europe-west1.firebasedatabase.app/",
    "tasks",
    tasks
  );
}


/**
 * This function adds new tasks to database
 */
async function addNewTaskToDatabase() {
  writeNewTaskToLocalArray();
  await writeTasksToDatabase();
  cleanAddtaskArea();
}


/**
 * This function writes new tasks to the local array
 */
function writeNewTaskToLocalArray() {
  let addTaskTitle = document.getElementById("newTaskTitle");
  let addTaskDescription = document.getElementById("newTaskDescription");
  let addTaskDueDate = document.getElementById("newTaskDueDate");
  let addTaskPriority = document.getElementById("newTaskPriority");
  let addTaskCategory = document.getElementById("newTaskCategory");
  let newTask = {
    title: addTaskTitle.value,
    description: addTaskDescription.value,
    dueDate: addTaskDueDate.value,
    priority: addTaskPriority.value,
    taskCategory: addTaskCategory.value,
    assignedTo: updateSelectedContacts(),
    subtask: subtask,
  };
  tasks.push(newTask);
}


/**
 * This function renders the dropdown list for assigend users
 */
function renderDropdown() {
  const dropdownContent = document.querySelector(".dropdown-content");
    for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `contact_${i}`;
    checkbox.value = contact.name;
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(contact.name));
    dropdownContent.appendChild(label);
  }
}


/**
 * This function toggles the dropdown for the assigned users
 */
function toggleDropdown() {
  const dropdown = document.getElementById("contactDropdown");
  dropdown.classList.toggle("open");
  if (!dropdown.classList.contains("open")) {
    updateSelectedContacts();
  }
}


/**
 * This function creates new subtasks
 */
function createSubtask() {
  let subtaskText = document.getElementById("subtaskInput").value;
  subtask.push({ 
          task: subtaskText,
          status : 0,
   });
  renderSubtasks();
  deleteSubtaskInputField();
}


/**
 * This function renders created subtasks
 */
function renderSubtasks() {
  let listArea = document.getElementById("subtaskList");
  listArea.innerHTML = "";
  for (i = 0; i < subtask.length; i++) {
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


/**
 * This function deletes specific subtask items
 * 
 * @param {number} i - index of subtask item 
 */
function deleteSubtaskItem(i) {
  subtask.splice(i, 1);
  renderSubtasks();
}


/**
 * This function deletes the value of subtask input field
 */
function deleteSubtaskInputField() {
  document.getElementById("subtaskInput").value = "";
}


/**
 * This function edits the subtask item
 * 
 * @param {number} i - index of subtask item to edit
 */
function editSubtaskItem(i) {
  setSubtaskEditModeOn(i);
  document.getElementById(`singleSubTaskButtons${i}`).innerHTML = /*html*/ `
        <button onclick="deleteSubtaskItem(${i})">Delete</button>
        <button onclick="storeEditedSubtaskItem(${i})">Ok</button>
    `;
}


/**
 * This function sets subtask edit mode on
 * 
 * @param {number} i - subtask item to edit
 */
function setSubtaskEditModeOn(i) {
  document.getElementById(`subTaskTextListItem${i}`).contentEditable = "true";
  document.getElementById(`subtaskListItem${i}`).style.border =
    "1px solid black";
}


/**
 * This function sets subtask edit mode off
 * 
 * @param {number} i - subtask item to edit
 */
function setSubtaskEditModeOff(i) {
  document.getElementById(`subTaskTextListItem${i}`).contentEditable = "false";
  document.getElementById(`subtaskListItem${i}`).style.border = "none";
}


/**
 * This function stores the edited subtask item
 * 
 * @param {number} i - subtask item to store
 */
function storeEditedSubtaskItem(i) {
  subtask[i].task = document.getElementById(
    `subTaskTextListItem${i}`
  ).innerHTML;
  setSubtaskEditModeOff(i);
  renderSubtasks();
}


/**
 * This function clears the add task area
 */
function cleanAddtaskArea() {
  document.getElementById("newTaskTitle").value = "";
  document.getElementById("newTaskDescription").value = "";
  document.getElementById("newTaskDueDate").value = "";
  document.getElementById("newTaskPriority").value = "";
  document.getElementById("newTaskCategory").value = "";
  document.getElementById("subtaskList").innerHTML = "";
  cleanAssignedtoArea();
}


/**
 * This function clears the assigned to area
 */
function cleanAssignedtoArea() {
  document.getElementById("selectedContacts").innerHTML = "";
  for (let i = 0; i < taskContacts.length; i++) {
    const checkbox = document.getElementById(`contact_${i}`);
    checkbox.checked = false;
  }
}


/**
 * This function loads the task of whch data should be edited
 * 
 * @param {number} i - index of task 
 */
function loadTaskDataToEdit(i) {
  document.getElementById("editTaskTitle").value = tasks[i].title;
  document.getElementById("editTaskDescription").value = tasks[i].description;
  document.getElementById("editTaskDueDate").value = tasks[i].dueDate;
  document.getElementById("editTaskPriority").value = tasks[i].priority;
  document.getElementById("editTaskCategory").value = tasks[i].taskCategory;
  editCheckBoxesForAssignedUsers(i);
  editAreaRenderSubtasks(i);
}


/**
 * This function stores the edited task data
 * 
 * @param {number} x - index of task to edit
 */
function storeEditedTaskData(x) {
  tasks[x].title = document.getElementById("editTaskTitle").value;
  tasks[x].description = document.getElementById("editTaskDescription").value;
  tasks[x].dueDate = document.getElementById("editTaskDueDate").value;
  tasks[x].priority = document.getElementById("editTaskPriority").value;
  tasks[x].taskCategory = document.getElementById("editTaskCategory").value;
  tasks[x].assignedTo = editUpdateSelectedContacts();
}


/**
 * This function renders the dropdown for assigend users in edit view
 */
function editRenderDropdown() {
  const dropdownContent = document.querySelector(".edit-dropdown-content");
  for (let i = 0; i < taskContacts.length; i++) {
    const contact = taskContacts[i];
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `editContact_${i}`;
    checkbox.value = contact.name;
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(contact.name));
    dropdownContent.appendChild(label);
  }
}


/**
 * This function toggles the dropdown for assigend users in edit view
 */
function editToggleDropdown() {
  const dropdown = document.getElementById("editContactDropdown");
  dropdown.classList.toggle("open");
  if (!dropdown.classList.contains("open")) {
    editUpdateSelectedContacts();
  }
}


/**
 * This function updates the selected contacts in edit view
 * 
 * @returns - selected contacts in edit view
 */
function editUpdateSelectedContacts() {
  const selectedContactsDiv = document.getElementById("editSelectedContacts");
  selectedContactsDiv.innerHTML = ""; // Clear previous selections
  const selectedContacts = [];
  for (let i = 0; i < taskContacts.length; i++) {
    const checkbox = document.getElementById(`editContact_${i}`);
    if (checkbox.checked) {
      selectedContacts.push({ user: taskContacts[i].name });
      const contactDiv = document.createElement("div");
      contactDiv.textContent = taskContacts[i].name;
      selectedContactsDiv.innerHTML += `<div>${taskContacts[i].name}</div>`;
    }
  }
  return selectedContacts;
}


/**
 * This function preselects assigend users in dropwdown iin edit view
 * 
 * @param {number} x 
 */
function editCheckBoxesForAssignedUsers(x) {
  const selectedContactsDiv = document.getElementById("editSelectedContacts");
  selectedContactsDiv.innerHTML = ""; // Clear previous selections
  for (i = 0; i < taskContacts.length; i++) {
    const checkbox = document.getElementById(`editContact_${i}`);
    checkbox.checked = false;
    for (j = 0; j < tasks[x].assignedTo.length; j++) {
      if (tasks[x].assignedTo[j].user === checkbox.value) {
        checkbox.checked = true;
        const contactDiv = document.createElement("div");
        contactDiv.textContent = taskContacts[i].name;
        selectedContactsDiv.innerHTML += `<div>${taskContacts[i].name}</div>`;
      }
    }
  }
}


/**
 * This function renders subtasks in edit view
 * 
 * @param {number} x - index of task for subtask
 */
function editAreaRenderSubtasks(x) {
  let listArea = document.getElementById("editSubtaskList");
  listArea.innerHTML = "";
  for (i = 0; i < tasks[x].subtask.length; i++) {
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


/**
 * This function deletes a subtask item in edit view
 * 
 * @param {number} x - index of task
 * @param {number} i . index of subtask item
 */
function editAreaDeleteSubtaskItem(x, i) {
  tasks[x].subtask.splice(i, 1);
  editAreaRenderSubtasks(x);
}


/**
 * This function deletes the subtask input field
 */
function deleteSubtaskInputField() {
  document.getElementById("subtaskInput").value = "";
}


/**
 * This function renders edit area for subtask in edit view
 * 
 * @param {number} x - index of task
 * @param {number} i - index of subtask item
 */
function editAreaEditSubtaskItem(x, i) {
  editAreaSetSubtaskEditModeOn(i);
  document.getElementById(`editSingleSubTaskButtons${i}`).innerHTML = /*html*/ `
        <button onclick="editAreaDeleteSubtaskItem(${i})">Delete</button>
        <button onclick="editAreaStoreEditedSubtaskItem(${x},${i})">Ok</button>
    `;
}


/**
 * This function sets edit mode on for subtask in edit view
 * 
 * @param {number} i - index of subtask item
 */
function editAreaSetSubtaskEditModeOn(i) {
  document.getElementById(`editSubTaskTextListItem${i}`).contentEditable =
    "true";
  document.getElementById(`editSubtaskListItem${i}`).style.border =
    "1px solid black";
}


/**
 * This function sets edit mode on for subtask in edit view
 * 
 * @param {number} i - index of subtask item
 */
function editAreaSetSubtaskEditModeOff(i) {
  document.getElementById(`editSubTaskTextListItem${i}`).contentEditable =
    "false";
  document.getElementById(`editSubtaskListItem${i}`).style.border = "none";
}


/**
 * This function stores edited subtask item in edit view
 * 
 * @param {number} x - index of task
 * @param {number} i - index of subtask item
 */
function editAreaStoreEditedSubtaskItem(x, i) {
  tasks[x].subtask[i].task = document.getElementById(
    `editSubTaskTextListItem${i}`
  ).innerHTML;
  editAreaSetSubtaskEditModeOff(i);
  editAreaRenderSubtasks(x);
}


/**
 * This function renders subtask in edit view
 * 
 * @param {number} x - index of task
 */
function editAreaCreateSubtask(x) {
  let subtaskText = document.getElementById("editAreaSubtaskInput").value;
  tasks[x].subtask.push({ task: subtaskText });
  editAreaRenderSubtasks(x);
  editDeleteSubtaskInputField();
}


/**
 * This function clears the subtask input field
 */
function editDeleteSubtaskInputField() {
  document.getElementById("editAreaSubtaskInput").value = "";
}
