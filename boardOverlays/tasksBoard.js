let tasks = [];
let subtask = [];

/**
 * This function is the initial call
 */
function firstCall() {
  renderDropdown();
  getTasksFromDatabase();
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
async function addNewTaskToDatabase(state, overlay) {
  writeNewTaskToLocalArray(state);
  await writeTasksToDatabase();
  cleanAddtaskArea();
  showMessage('messageOverlay', 'Task successfully added', 'show')
  if (overlay === 1) {
    addClassToElement("addTaskBoardOverlayContainer", "none");
    renderTasksInBoard();
  }
  if (overlay !==1) {
    setTimeout(() => {
      window.location.href="../board/board.html";
    }, 2000);
  }
}


/**
 * This function writes new tasks to the local array
 */
function writeNewTaskToLocalArray(state) {
  let addTaskTitle = document.getElementById("boardTitle");
  let addTaskDescription = document.getElementById("boardDescription");
  let addTaskDueDate = document.getElementById("boardDate");
  let addTaskCategory = document.getElementById("boardCategory");
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


/**
 * This function renders the dropdown list for assigend users
 */
function renderDropdown() {
  const dropdownContent = document.querySelector(".dropdown-content");
  contacts.forEach((contact, index) => {
    const label = document.createElement("label");
    const nameSpan = document.createElement("span");
    nameSpan.className = "label-initials";
    const initialsSpan = document.createElement("span");
    initialsSpan.className = "initials-dropdown";
    initialsSpan.id = `initials${index}`;
    initialsSpan.textContent = contact.initials;
    const nameTextNode = document.createTextNode(`${contact.name}`);
    nameSpan.appendChild(initialsSpan);
    nameSpan.appendChild(nameTextNode);
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `contact_${index}`;
    checkbox.value = contact.name;
    label.appendChild(nameSpan);
    label.appendChild(checkbox);
    dropdownContent.appendChild(label);
    document.getElementById(
      `initials${index}`
    ).style.backgroundColor = `${contact.backgroundColor}`;
  });
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
 * This function closes the edit area
 */
function cancelEditArea(){
  document.getElementById("currentUserTaskOverlay").innerHTML = "";
  addClassToElement('taskOverlaySection', 'none')
}


/**
 * This function updates the selected contacts in edit view
 * 
 * @returns - selected contacts in edit view
 */
function updateSelectedContacts() {
  const selectedContactsDiv = document.getElementById("selectedContacts");
  selectedContactsDiv.innerHTML = "";
  const selectedContacts = [];
  for (let i = 0; i < contacts.length; i++) {
    const checkbox = document.getElementById(`contact_${i}`);
    if (checkbox.checked) {
      selectedContacts.push({
        user: contacts[i].name,
        initials: contacts[i].initials, 
        backgroundColor: contacts[i].backgroundColor,
      });
  }
}
renderSelectedNames(selectedContacts);
return selectedContacts;
}


/**
 * This function renders the selected names
 * 
 * @param {JSON} selectedContacts - JSON with selected contacts
 */
function renderSelectedNames(selectedContacts){
  let limit = 3;
  if(selectedContacts.length > 0){
    if(selectedContacts.length <= limit){
    for (let j = 0; j < selectedContacts.length; j++) {
      let selectedContactsArea = document.getElementById(`selectedContacts`);
      const contact = selectedContacts[j];
      selectedContactsArea.innerHTML += /*html*/ `
          <div id="selectedContactIcon${j}" class="contact-icon assigned-contact-icon">${selectedContacts[j].initials}</div>
      `;
    document.getElementById(`selectedContactIcon${j}`).style.backgroundColor = contact.backgroundColor;
      }
    } else {
    for(let j = 0; j < limit; j++){
        let selectedContactsArea = document.getElementById(`selectedContacts`);
        const contact = selectedContacts[j];
        selectedContactsArea.innerHTML += /*html*/ `
             <div id="selectedContactIcon${j}" class="contact-icon assigned-contact-icon">${selectedContacts[j].initials}</div>
        `;
        document.getElementById(`selectedContactIcon${j}`).style.backgroundColor = contact.backgroundColor;
    }
    renderSelectedNamesGreaterThanLimitOverview(selectedContacts, limit);
  }
}
}


/**
 * This function renders a workaround for users freater than limit
 * 
 * @param {JSON} selectedContacts - JSON with selected contacts
 * @param {number} limit          - limit of max users to be shown
 */
function renderSelectedNamesGreaterThanLimitOverview(selectedContacts, limit){
  let selectedContactsArea = document.getElementById(`selectedContacts`);
    selectedContactsArea.innerHTML += /*html*/ `
            <div id="selectedContactIcon${limit}" class="contact-icon assigned-contact-icon">+${calculateRestOfSelectedToGreaterThanLimit(selectedContacts, limit)}</div>
        `;
    document.getElementById(`selectedContactIcon${limit}`).style.backgroundColor = "#301934"; 
}


/**
 * This function 
 * 
 * @param {JSON} selectedContacts - JSON with selected contacts
 * @param {number} limit          - limit of max users to be shown
 * @returns                       - amount of users above limit
 */
function calculateRestOfSelectedToGreaterThanLimit(selectedContacts, limit) {
  let restOfAssignedUsers = selectedContacts.length - limit;
  return restOfAssignedUsers;
}


// /**
//  * This function creates a subtask
//  */
// function createSubtask() {
//   let subtaskText = document.getElementById("boardSubtasks").value;
//   subtask.push({ task: subtaskText });
//   renderSubtasks();
//   deleteSubtaskInputField();
// }


/**
 * This function deletes a subtask
 */
function decideSubtask() {
  if (document.getElementById("boardSubtasks").value) {
    document.getElementById("plusIcon").classList.add("none");
    document.getElementById("closeIcon").classList.remove("none");
    document.getElementById("checkIcon").classList.remove("none");
  }
}


/**
 * This function cancels edit view of subtask
 */
function cancelSubtask() {
  document.getElementById("plusIcon").classList.remove("none");
  document.getElementById("closeIcon").classList.add("none");
  document.getElementById("checkIcon").classList.add("none");
  document.getElementById("boardSubtasks").value = "";
}


/**
 * This function creates a subtask
 */
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


/**
 * This function renders subtasks
 */
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


/**
 * This fnction deletes specific subtask item
 * 
 * @param {number} i - index of subtask item
 */
function deleteSubtaskItem(i) {
  subtask.splice(i, 1);
  renderSubtasks();
}


/**
 * This function clears subtask input field
 */
function deleteSubtaskInputField() {
  document.getElementById("boardSubtasks").value = "";
}


/**
 * This function clears add task input field
 */
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


/**
 * This function edits subtask item
 * 
 * @param {number} i - index of subtask item
 */
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


/**
 * This function sets edit mode on for subtask in edit view
 * 
 * @param {number} i - index of subtask item
 */
function setSubtaskEditModeOn(i) {
  document.getElementById(`subTaskTextListItem${i}`).contentEditable = "true";
  document.getElementById(`subtaskListItem${i}`).style.border =
    "1px solid black";
}


/**
 * This function sets edit mode on for subtask in edit view
 * 
 * @param {number} i - index of subtask item
 */
function setSubtaskEditModeOff(i) {
  document.getElementById(`subTaskTextListItem${i}`).contentEditable = "false";
  document.getElementById(`subtaskListItem${i}`).style.border = "none";
}


/**
 * This function stores edited subtask item in edit view
 * 
 * @param {number} x - index of task
 * @param {number} i - index of subtask item
 */
function storeEditedSubtaskItem(i) {
  subtask[i].task = document.getElementById(
    `subTaskTextListItem${i}`
  ).innerHTML;
  setSubtaskEditModeOff(i);
  renderSubtasks();
}


/**
 * This function clears Add task input field
 */
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


/**
 * This function cleras assigned to area
 */
function clearAssignedtoArea() {
  document.getElementById("selectedContacts").innerHTML = "";
  for (let i = 0; i < contacts.length; i++) {
    const checkbox = document.getElementById(`contact_${i}`);
    checkbox.checked = false;
  }
}


/**
 * This function cleras subtask area
 */
function clearSubtasks() {
  document.getElementById("boardSubtasks").value = "";
  document.getElementById("subtaskList").innerHTML = "";
  subtask = [];
}


/**
 * This function generetes initials of user names
 * 
 * @param {string} name - name if user
 * @returns             - initials of user
 */
function generateInitials(name) {
  let nameParts = name.split(" ");
  let firstNameInitial = nameParts[0] ? nameParts[0][0].toUpperCase() : "";
  let lastNameInitial = nameParts[1] ? nameParts[1][0].toUpperCase() : "";
  return firstNameInitial + lastNameInitial;
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
  const selectedContacts = [];
  for (let i = 0; i < contacts.length; i++) {
    const checkbox = document.getElementById(`contact_${i}`);
    if (checkbox.checked) {
      selectedContacts.push({ user: contacts[i].name });
    }
  }
  return selectedContacts;
}


/**
 * This function preselects assigend users in dropwdown iin edit view
 * 
 * @param {number} x - index of task
 */
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
function editDeleteSubtaskInputField() {
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
