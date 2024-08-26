"use strict";


/**
 * This function generates the task detail view
 * 
 * @param {number} i - index of task which should be shown in detail view
 */
function generateTask(i) {
  removeClassFromElement("taskOverlaySection", "none");
  let currentTaskOverlay = "";
  currentTaskOverlay = generateTaskHTML(i);
  const taskOverlaySection = document.getElementById("taskOverlaySection");
  if (taskOverlaySection) {
    taskOverlaySection.innerHTML = currentTaskOverlay;
    renderAssignedNames(i);
    addBackgroundColorToCategoryDetail(i);
  }
  setSubtasks(i);
}


/**
 * This function generates the bakchround to the category in tasl detail view
 * 
 * @param {*} i - index of task which should be shown in detail view
 */
function addBackgroundColorToCategoryDetail(i) {
  let categoryContainer = document.getElementById(`taskType${i}`);
  tasks[i].taskCategory == "Technical Task"
    ? (categoryContainer.style.backgroundColor = "#1fd7c1")
    : (categoryContainer.style.backgroundColor = "#0038ff");
}


/**
 * This function presets the priority buttons for add task and edit task
 * 
 * @param {number} priority - priotity which should be presetted
 * @returns                 - HTML Code for priority buttons
 */
function setPriority(priority) {
  if (priority === 0) {
    return /* HTML */ `<p id="noPriorityPar">Keine Priorität</p>`;
  } else if (priority === 3) {
    return /* HTML */ ` <p id="urgentPar">Urgent</p>
      <img id="urgentImg" class="overlayBtnIcons" src="../database/images/prio_alta.svg" alt="icon"/>`;
  } else if (priority === 2) {
    return /* HTML */ ` <p id="mediumPar">Medium</p>
      <img id="mediumImg" class="overlayBtnIcons" src="../database/images/prio_media.svg" alt="icon"/>`;
  } else {
    return /* HTML */ ` <p id="lowPar">Low</p>
      <img id="lowImg" class="overlayBtnIcons" src="../database/images/prio_baja.svg" alt="icon"/>`;
  }
}


/**
 * This function renders created subtsaks
 * 
 * @param {number} i - number of main task where subtasks are added
 */
function setSubtasks(i) {
  if (tasks[i].subtask) {
    document.getElementById("subtasksContainer").innerHTML = /*html*/ `
    <div class="flexContainerStart"><p id="subtasksPar" class="subtasksPars">Subtasks</p></div>
    <div id="subtasksContactsContainer" class="subtasksContactsContainers flexContainerColStart"></div>
    `;
    for (let j = 0; j < tasks[i].subtask.length; j++) {
      document.getElementById("subtasksContactsContainer").innerHTML += /* HTML */ `
        <div id="subContainer" class="subContainers flexContainer">
          <input type="checkbox" id="checkboxSubtask${j}" class="subtaskboxes" name="checkbox${j}" value="subtask${j}" onclick="writeClickToVariable(${i}, ${j})"/>
          <div class="subtaskboxesLabels">${tasks[i].subtask[j].task}</div>
        </div>
      `;
      presetCheckboxes(i, j);
    }
  }
}


/**
 * This function renders the assigned names for a single task
 * 
 * @param {number} i - index of task 
 */
function renderAssignedNames(i) {
  let limit = 4;
  if (tasks[i].assignedTo) {
    if (tasks[i].assignedTo.length <= limit) {
      for (let j = 0; j < tasks[i].assignedTo.length; j++) {
        document.getElementById("assignContactsContainer").innerHTML += renderAssignedNamesNoUserLimitHTML(i,j);
        document.getElementById(`initialsDropdown${j}`).style.backgroundColor = tasks[i].assignedTo[j].backgroundColor;
      }
    } else {
      for (let j = 0; j < limit; j++) {
        document.getElementById("assignContactsContainer").innerHTML += renderAssignedNamesUserLimitHTML(i,j);
        document.getElementById(`initialsDropdown${j}`).style.backgroundColor = tasks[i].assignedTo[j].backgroundColor;
      }
      renderAssignedNamesGreaterThanLimit(i, limit);
    }
  }
}



/**
 * This function generates the icon when users maximun is reached 
 * 
 * @param {number} i     - index of task
 * @param {number} limit - limit of max shown users
 */
function renderAssignedNamesGreaterThanLimit(i, limit) {
  document.getElementById("assignContactsContainer").innerHTML += /*html*/ `
       <div id='assignedContactsDetail${limit}'>
          <span class="label-initials">
            <span class="initials-dropdown" id='initialsDropdown${limit}'>+${calculateRestOfAssigendToGreaterThanLimit(i,limit)}</span>
            further users
          </span>
       </div>
       `;
  document.getElementById(`initialsDropdown${limit}`).style.backgroundColor ="#301934";
}


/**
 * This function calculates the amount of users which are over the setup limit
 * 
 * @param {number} i      - index of task
 * @param {number} limit - limit of max shown users
 * @returns         - returns amount of users over setup limit
 */
function calculateRestOfAssigendToGreaterThanLimit(i, limit) {
  let restOfAssignedUsers = tasks[i].assignedTo.length - limit;
  return restOfAssignedUsers;
}


/**
 * This function presete the checkboxes for the subtasks in task detail view
 * 
 * @param {number} i - index of task
 * @param {number} j - index of subtask
 */
function presetCheckboxes(i, j) {
  let presetCheckboxes = document.getElementById(`checkboxSubtask${j}`);
  if (tasks[i].subtask[j].status == 1) {
    presetCheckboxes.classList.add("checkboxChecked");
  } else {
    presetCheckboxes.checked = false;
    presetCheckboxes.classList.remove("checkboxChecked");
  }
}


/**
 * This function writes the subtask checkbox click to task array variable
 * 
 * @param {number} i - index of task
 * @param {number} j -index of subtask
 */
function writeClickToVariable(i, j) {
  let actCheckbox = document.getElementById(`checkboxSubtask${j}`);
  if (!actCheckbox.classList.contains("checkboxChecked")) {
    actCheckbox.classList.add("checkboxChecked");
    tasks[i].subtask[j].status = 1;
  } else {
    actCheckbox.classList.remove("checkboxChecked");
    tasks[i].subtask[j].status = 0;
  }
}


/**
 * This function closes the tasl detail view and stores the subtask checkbox status
 */
async function closeAndStore() {
  addClassToElement("taskOverlaySection", "none");
  await writeTasksToDatabase();
  await getTasksFromDatabase();
  renderTasksInBoard();
}


/**
 * This function creates the edit view
 * 
 * @param {number} i - index of task for edit view
 */
function generateEditView(i) {
  removeClassFromElement("taskOverlaySection", "none");
  document.getElementById("currentUserTaskOverlay").innerHTML = generateEditViewHTML(i);
  renderDropdown();
  loadDataToEdit(i);
  editRenderSubtasks(i);
}


/**
 * This function loads the data for task edit view
 * 
 * @param {number} i - index of task to edit
 */
function loadDataToEdit(i) {
  document.getElementById("editBoardTitle").value = tasks[i].title;
  document.getElementById("editBoardDescription").value = tasks[i].description;
  document.getElementById("editBoardDate").value = tasks[i].dueDate;
  loadAndSetPriorityToEdit(i);
  editCheckBoxesForAssignedUsers(i);
}


/**
 * This function stores the edited data
 * 
 * @param {number} i index of task to edit 
 */
function storeEditedData(i) {
  tasks[i].title = document.getElementById("editBoardTitle").value;
  tasks[i].description = document.getElementById("editBoardDescription").value;
  tasks[i].dueDate = document.getElementById("editBoardDate").value;
  //  priority wird direkt aus Button Funktion in den Local Array geschrieben
  tasks[i].assignedTo = updateSelectedContacts();
  tasks[i].subtask = subtask;
  closeWindowWriteEditedDataToDatabase();
}


/**
 * This function closes the edit view and stores the edited data
 */
async function closeWindowWriteEditedDataToDatabase() {
  cancelEditArea();
  await writeTasksToDatabase();
  await getTasksFromDatabase();
  showMessage('messageOverlay', 'Task successfully edited!', 'show')
  renderTasksInBoard();
}


/**
 * This function presets the priority buttin in edit view
 * 
 * @param {number} i - number of task to edit
 */
function loadAndSetPriorityToEdit(i) {
  switch (tasks[i].priority) {
    case 3:
      editUrgentBtnToggle(i);
      break;
    case 2:
      editMediumBtnToggle(i);
      break;
    case 1:
      editLowBtnToggle(i);
      break;
    default:
  }
}


/**
 * This functions toggles the state of the priority low button
 * 
 * @param {number} i - index of task
 * @returns 
 */
function editLowBtnToggle(i) {
  editVariablesPriorityButtons();
  if (editLowBtn.classList.contains("whiteButtons")) {
    editLowBtn.classList.remove("whiteButtons");
    editLowBtn.style.backgroundColor = "#7AE229";
    editLowBtn.style.color = "#fff";
    editLowImg.src = "../database/images/prio_baja_white.svg";
  } else {
    editLowBtn.classList.add("whiteButtons");
    editLowImg.src = "../database/images/prio_baja.svg";
  }
  if (!editUrgentBtn.classList.contains("whiteButtons")) {
    editUrgentBtn.classList.add("whiteButtons");
    editUrgentImg.src = "../database/images/prio_alta.svg";
  }
  if (!editMediumBtn.classList.contains("whiteButtons")) {
    editMediumBtn.classList.add("whiteButtons");
    editMediumImg.src = "../database/images/prio_media.svg";
  }
  const lowSelected = !editLowBtn.classList.contains("whiteButtons") ? true : false;
  evaluateLowState(lowSelected);
  tasks[i].priority = priority;
  return lowSelected;
}


/**
 * This functions toggles the state of the priority urgent button
 * 
 * @param {number} i - index of task
 * @returns 
 */
function editUrgentBtnToggle(i) {
  editVariablesPriorityButtons();
  if (editUrgentBtn.classList.contains("whiteButtons")) {
    editUrgentBtn.classList.remove("whiteButtons");
    editUrgentBtn.style.backgroundColor = "#FF3D00";
    editUrgentBtn.style.color = "#fff";
    editUrgentImg.src = "../database/images/prio_alta_white.svg";
  } else {
    editUrgentBtn.classList.add("whiteButtons");
    editUrgentImg.src = "../database/images/prio_alta.svg";
  }
  if (!editUrgentBtn.classList.contains("whiteButtons")) {
    editMediumBtn.classList.add("whiteButtons");
    editMediumImg.src = "../database/images/prio_media.svg";
  }
  if (!editLowBtn.classList.contains("whiteButtons")) {
    editLowBtn.classList.add("whiteButtons");
    editLowImg.src = "../database/images/prio_baja.svg";
  }
  const urgentSelected = !editUrgentBtn.classList.contains("whiteButtons") ? true : false;
  evaluateUrgentState(urgentSelected);
  tasks[i].priority = priority;
  return urgentSelected;
}


/**
 * This functions toggles the state of the priority medium button
 * 
 * @param {number} i - index of task
 * @returns 
 */
function editMediumBtnToggle(i) {
  editVariablesPriorityButtons();
  if (editMediumBtn.classList.contains("whiteButtons")) {
    editMediumBtn.classList.remove("whiteButtons");
    editMediumBtn.style.backgroundColor = "#FFA800";
    editMediumBtn.style.color = "#fff";
    editMediumImg.src = "../database/images/prio_media_white.svg";
  } else {
    editMediumBtn.classList.add("whiteButtons");
    editMediumImg.src = "../database/images/prio_media.svg";
  }
  if (!editUrgentBtn.classList.contains("whiteButtons")) {
    editUrgentBtn.classList.add("whiteButtons");
    editUrgentImg.src = "../database/images/prio_alta.svg";
  }
  if (!editLowBtn.classList.contains("whiteButtons")) {
    editLowBtn.classList.add("whiteButtons");
    editLowImg.src = "../database/images/prio_baja.svg";
  }
  const mediumSelected = !editMediumBtn.classList.contains("whiteButtons") ? true : false;
  evaluateMediumState(mediumSelected);
  tasks[i].priority = priority;
  return mediumSelected;
}


/**
 * This function declares the variables for priority buttons
 */
function editVariablesPriorityButtons() {
  let editUrgentBtn = document.getElementById(`editUrgentBtn`);
  let editUrgentImg = document.getElementById("editurgentImg");
  let editMediumBtn = document.getElementById("editMediumBtn");
  let editMediumImg = document.getElementById("editMediumImg");
  let editLowBtn = document.getElementById("editLowBtn");
  let editLowImg = document.getElementById("editLowImg");
}


/**
 * This function presets the checkboxes for assigned users in edit view
 * 
 * @param {number} x - index of task
 */
function editCheckBoxesForAssignedUsers(x) {
  if (tasks[x].assignedTo) {
    const selectedContactsDiv = document.getElementById("selectedContacts");
    selectedContactsDiv.innerHTML = ""; 
    for (let i = 0; i < contacts.length; i++) {
      const checkbox = document.getElementById(`contact_${i}`);
      checkbox.checked = false;
      for (let j = 0; j < tasks[x].assignedTo.length; j++) {
        if (tasks[x].assignedTo[j].user === checkbox.value) {
          checkbox.checked = true;
          const contactDiv = document.createElement("div");
          contactDiv.textContent = tasks[x].assignedTo[j].user;
        }
      }
    }
    renderAssignedNamesEditView(x);
  }
}


/**
 * This function renders the assigend names in edit view
 * 
 * @param {number} x - index of task
 */
function renderAssignedNamesEditView(x){
  let limit = 3;
  if(tasks[x].assignedTo){
    if(tasks[x].assignedTo.length <= limit){
  for (let j = 0; j < tasks[x].assignedTo.length; j++) {
      let assignedContacts = document.getElementById(`selectedContacts`);
      const contact = tasks[x].assignedTo[j];
      assignedContacts.innerHTML += /*html*/ `
          <span id="editShowAssignedContacts${j}" class="contact-icon assigned-contact-icon">${tasks[x].assignedTo[j].initials}</span>
      `;
    document.getElementById(`editShowAssignedContacts${j}`).style.backgroundColor = contact.backgroundColor;
      }
    } else {
    for(let j = 0; j < limit; j++){
        let assignedContacts = document.getElementById(`selectedContacts`);
        const contact = tasks[x].assignedTo[j];
        assignedContacts.innerHTML += /*html*/ `
            <span id="editShowAssignedContacts${j}" class="contact-icon assigned-contact-icon">${tasks[x].assignedTo[j].initials}</span>
        `;
        document.getElementById(`editShowAssignedContacts${j}`).style.backgroundColor = contact.backgroundColor;
    }
    renderAssignedNamesEditGreaterThanLimit(x, limit);
  }
}
}


/**
 * This function calculates the assigned names which are greater than limit
 * 
 * @param {number} x     - index of task
 * @param {number} limit - limit of users to be shown
 */
function renderAssignedNamesEditGreaterThanLimit(x, limit){
  let assignedContacts = document.getElementById(`selectedContacts`);
        assignedContacts.innerHTML += /*html*/ `
            <div id="editShowAssignedContacts${limit}" class="contact-icon assigned-contact-icon">+${calculateRestOfAssigendToGreaterThanLimit(x, limit)}</div>
        `;
    document.getElementById(`editShowAssignedContacts${limit}`).style.backgroundColor = "#301934"; 
}


/**
 * This function renders the subtasks for edit view
 * 
 * @param {number} x - index of task
 */
function editRenderSubtasks(x) {
  subtask = [];
  if (tasks[x].subtask) {
    let listArea = document.getElementById("subtaskList");
    subtask = [];
    listArea.innerHTML = "";
    for (let i = 0; i < tasks[x].subtask.length; i++) {
      listArea.innerHTML += editRenderSubtasksHTML(x,i);
      subtask.push({
        task: tasks[x].subtask[i].task,
        status: tasks[x].subtask[i].status,
      });
    }
  }
}


/**
 * This function deletes a single task
 * 
 * @param {number} i - index of task
 */
async function deleteSingleTask(i) {
  tasks.splice(i, 1);
  addClassToElement("taskOverlaySection", "none");
  await writeTasksToDatabase();
  await getTasksFromDatabase();
  showMessage('messageOverlay', 'Task successfully deleted!', 'show')
  renderTasksInBoard();
}
