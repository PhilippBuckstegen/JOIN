"use strict";

function generateTask(i) {
  removeClassFromElement('taskOverlaySection', 'none')
  let currentTaskOverlay = "";
  currentTaskOverlay = /*HTML*/ `

        <div id="currentUserTaskOverlay" class="currentUserTaskOverlays">
          <div id="taskTypeContainer" class="taskTypeContainers flexContainer">
            <div id="taskType" class="taskTypes">${tasks[i].taskCategory}</div>
            <div>
              <img onclick="closeAndStore()"
                id="contactCloseBtn"
                src="../database/images/close.svg"
                alt="icon"
              />
            </div>
          </div>
          <div id="titleContainer" class="titleContainers">
            <p id="contactTitle" class="contactTitles">${tasks[i].title}</p>
          </div>
          <div id="taskContainer" class="taskContainers">
            <p id="contactTask" class="contactTasks">${tasks[i].description}</p>
          </div>
          <div id="dateContainer" class="dateContainers flexContainerStart">
            <div><p id="dueDatePar" class="dueDatePars">Due date:</p></div>
            <div><p id="contactDate" class="contactDates">${
              tasks[i].dueDate
            }</p></div>
          </div>
          <div id="priorityContainer" class="priorityContainers flexContainerStart">
            <div><p id="priorityPar" class="priorityPars">Priority:</p></div>
            <div id="contactPriority" class="contactPriorities flexContainer">${setPriority(
              tasks[i].priority
            )}</div>
          </div>
          <div id="assignContainer" class="assignContainers flexContainerColStart">
            <div><p id="assignPar" class="assignPars">Assigned To:</p></div>
            <div id="assignContactsContainer" class="assignContactsContainers flexContainerColStart">
              <div id="assignContact" class="assignContacts flexContainerStart">
              <!-- Assigened to wird hierein gerendert -->
            </div>
          </div>
            <div id="subtasksContainer" class="subtasksContainers flexContainerColStart">
            <!-- Subtasks werden hierein gerendert -->
            </div>
          </div>
          <div id="deleteEditBtnsContainer" class="deleteEditBtnsContainers flexContainerStart">
            <button id="deleteBtnContacts" class="flexContainer">
              <img
                id="deleteImgContacts"
                src="../database/images/delete.svg"
                alt="icon"
              />
              Delete
            </button>
            <button id="editBtnContacts" class="flexContainer">
              <img
                id="editImgContacts"
                src="../database/images//edit.svg"
                alt="icon"
              />
              Edit
            </button>
          </div>
        </div>`;

  const taskOverlaySection = document.getElementById("taskOverlaySection");
  if (taskOverlaySection) {
    taskOverlaySection.innerHTML = currentTaskOverlay;
    renderAssignedNames(i);
  }
  setSubtasks(i);
}

function setPriority(priority) {
  if (priority === 0) {
    return /* HTML */ `<p id="noPriorityPar">Keine Priorität</p>`;
  } else if (priority === 1) {
    return /* HTML */ ` <p id="urgentPar">Urgent</p>
      <img
        id="urgentImg"
        class="overlayBtnIcons"
        src="../database/images/prio_alta.svg"
        alt="icon"
      />`;
  } else if (priority === 2) {
    return /* HTML */ ` <p id="mediumPar">Medium</p>
      <img
        id="mediumImg"
        class="overlayBtnIcons"
        src="../database/images/prio_media.svg"
        alt="icon"
      />`;
  } else {
    return /* HTML */ ` <p id="lowPar">Low</p>
      <img
        id="lowImg"
        class="overlayBtnIcons"
        src="../database/images/prio_baja.svg"
        alt="icon"
      />`;
  }
}

function setSubtasks(i) {
  if (tasks[i].subtask) {
    document.getElementById('subtasksContainer').innerHTML = /*html*/`
    <div class="flexContainerStart"><p id="subtasksPar" class="subtasksPars">Subtasks</p></div>
    <div id="subtasksContactsContainer" class="subtasksContactsContainers flexContainerColStart"></div>
    `;
    for (let j = 0; j < tasks[i].subtask.length; j++) {
      document.getElementById('subtasksContactsContainer').innerHTML += /* HTML */ `
          <div id="subContainer" class="subContainers flexContainer">
            <input
              type="checkbox"
              id="checkboxSubtask${j}"
              class="subtaskboxes"
              name="checkbox${j}"
              value="subtask${j}"
              onclick="writeClickToVariable(${i}, ${j})"
            />
            <div class="subtaskboxesLabels">
              ${tasks[i].subtask[j].task}
            </div>
          </div>
        `;       
        presetCheckboxes(i,j);
    }
  }
}

// Heiko Code ab hier

function renderAssignedNames(i){
  for(let j = 0; j < tasks[i].assignedTo.length; j++){
    document.getElementById('assignContactsContainer').innerHTML += /*html*/`
       <div id='assignedContactsDetail${j}'>
          <span class="label-initials">
            <span class="initials-dropdown" id='initialsDropdown${j}'>${tasks[i].assignedTo[j].initials}</span>
            ${tasks[i].assignedTo[j].user}
          </span>
       </div>
    `;
    document.getElementById(`initialsDropdown${j}`).style.backgroundColor = tasks[i].assignedTo[j].backgroundColor;
  }
}


function presetCheckboxes(i,j) {
  let presetCheckboxes = document.getElementById(`checkboxSubtask${j}`);
    if (tasks[i].subtask[j].status == 1){
        presetCheckboxes.classList.add("checkboxChecked");
      } else {
        presetCheckboxes.checked = false;
        presetCheckboxes.classList.remove("checkboxChecked");
      }
};


function writeClickToVariable(i,j){
  let actCheckbox = document.getElementById(`checkboxSubtask${j}`);
  if (!actCheckbox.classList.contains("checkboxChecked")) {
      actCheckbox.classList.add("checkboxChecked");
      tasks[i].subtask[j].status = 1;
  } else {
      actCheckbox.classList.remove("checkboxChecked");
      tasks[i].subtask[j].status = 0;
  }
}


async function closeAndStore(){
  await writeTasksToDatabase();
  await getTasksFromDatabase();
  renderTasksInBoard();
  addClassToElement('taskOverlaySection', 'none');
}