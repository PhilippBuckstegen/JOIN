"use strict";

function generateTask(i) {
  removeClassFromElement("taskOverlaySection", "none");
  let currentTaskOverlay = "";
  currentTaskOverlay = /*HTML*/ `

        <div id="currentUserTaskOverlay" class="currentUserTaskOverlays flexContainerColStart">
          <div id="userTaskOverlayPart" class="userTaskOverlayParts ">
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
          </div>
          <div id="deleteEditBtnsContainer" class="deleteEditBtnsContainers flexContainerStart">
            <button id="deleteBtnContacts" class="flexContainer" onclick="deleteSingleTask(${i})">
              <img
                id="deleteImgContacts"
                src="../database/images/delete.svg"
                alt="icon"
              />
              Delete
            </button>
            <button id="editBtnContacts" class="flexContainer" onclick="generateEditView(${i})">
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
  } else if (priority === 3) {
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
    document.getElementById("subtasksContainer").innerHTML = /*html*/ `
    <div class="flexContainerStart"><p id="subtasksPar" class="subtasksPars">Subtasks</p></div>
    <div id="subtasksContactsContainer" class="subtasksContactsContainers flexContainerColStart"></div>
    `;
    for (let j = 0; j < tasks[i].subtask.length; j++) {
      document.getElementById(
        "subtasksContactsContainer"
      ).innerHTML += /* HTML */ `
        <div id="subContainer" class="subContainers flexContainer">
          <input
            type="checkbox"
            id="checkboxSubtask${j}"
            class="subtaskboxes"
            name="checkbox${j}"
            value="subtask${j}"
            onclick="writeClickToVariable(${i}, ${j})"
          />
          <div class="subtaskboxesLabels">${tasks[i].subtask[j].task}</div>
        </div>
      `;
      presetCheckboxes(i, j);
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

function presetCheckboxes(i, j) {
  let presetCheckboxes = document.getElementById(`checkboxSubtask${j}`);
  if (tasks[i].subtask[j].status == 1) {
    presetCheckboxes.classList.add("checkboxChecked");
  } else {
    presetCheckboxes.checked = false;
    presetCheckboxes.classList.remove("checkboxChecked");
  }
}

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

async function closeAndStore() {
  addClassToElement("taskOverlaySection", "none");
  await writeTasksToDatabase();
  await getTasksFromDatabase();
  renderTasksInBoard();
  // addClassToElement('taskOverlaySection', 'none');
}

/*
function generateEditView(i) {
  removeClassFromElement("taskOverlaySection", "none");
  // document.getElementById("taskOverlaySection").innerHTML =  "";
  document.getElementById("currentUserTaskOverlay").innerHTML = /*HTML*/ `
     <!-- <div id="addTaskBoardOverlayContainer" class="flexContainerCol"> -->
              <div id="headerXbtnContainer" class="flexContainer">
                <div id="taskBoardOverlayHeader">
                  <h1 id="taskBoardHeader">Edit Task</h1>
                </div>
                <div id="xBtnContainer">
                  <img id="xBtn" src="../database/images/close.svg" alt="icon"
                  onclick="addClassToElement('addTaskBoardOverlayContainer', 'none')"/>
                </div>
              </div>
              <div id="taskBoardOverlayForm" class="flexContainerCol">
                      <div id="boardTitleContainer">
                        <label for="boardTitle">Title<span id="asteriskTitle" class="">*</span></label>
                        <br />
                        <input type="text" placeholder="Enter a title" id="editBoardTitle" name="boardTitle"/>
                      </div>
                      <div id="boardDescriptionContainer">
                        <label for="boardDescription">Description</label><br />
                        <textarea placeholder="Enter a Description" rows="4" cols="50" id="editBoardDescription" name="boardDescription"></textarea>
                      </div>
                      <div id="boardDateContainer">
                      <label for="boardDate">Due date<span id="asteriskDate" class="">*</span></label>
                      <div id="boardDateInputImgContainer" class="flexContainer">
                        <input type="date" data-date-format="DD  MM  YYYY" id="editBoardDate" name="boardDate" onclick="setMinDateToToday('boardDate')"/>
                        <!--<img
                          id="calendarIcon"
                          src="../database/images/event.svg"
                          alt="icon"
                        />-->
                      </div>
                    </div>
                    <div id="boardPriorityContainer" class="flexContainerCol">
                      <div id="priorityHeaderContainer" class="flexContainer">
                        <p>Prio</p>
                      </div>
                      <div id="priorityBtnsContainer" class="flexContainer">
                        <button id="editUrgentBtn" class="priorityButtons whiteButtons flexContainer" onclick="editUrgentBtnToggle(${i})">
                          Urgent
                          <img id="editUrgentImg" class="boardBtnIcons" src="../database/images/prio_alta.svg" alt="icon"/>
                        </button>
                        <button id="editMediumBtn" class="priorityButtons whiteButtons flexContainer" onclick="editMediumBtnToggle(${i})">
                          Medium
                          <img id="editMediumImg" class="boardBtnIcons" src="../database/images/prio_media.svg" alt="icon"/>
                        </button>
                        <button id="editLowBtn" class="priorityButtons whiteButtons flexContainer" onclick="editLowBtnToggle(${i})">
                          Low
                          <img id="editLowImg" class="boardBtnIcons" src="../database/images/prio_baja.svg" alt="icon"/>
                        </button>
                      </div>
                    </div>
                      <div id="boardAssignedContainer">
                         <!-- new dropdown start -->
                         <div class="dropdown" id="contactDropdown">
                          <button class="dropdown-button" onclick="toggleDropdown()">Assigned to</button>
                          <div class="dropdown-content"></div>
                      </div>
                      <div class="selected-contacts" id="selectedContacts"></div>
                      </div>
                    </div>
                    <div id="boardSubtasksContainer">
                      <label for="boardSubtasks">Subtasks</label>
                      <div id="boardSubtasksInputImgContainer" class="flexContainer">
                        <input type="text" placeholder="Add new subtask" id="boardSubtasks" name="boardSubtasks"/>
                        <img id="plusIcon" src="../database/images/plus.svg" alt="icon" onclick="createSubtask()"/>
                      </div>
                      <div>
                        <ul id="subtaskList">
                            <!-- Subtask Liste wird hier gerendert -->
                        </ul>
                      </div>
                    </div>
`;
renderDropdown();
loadDataToEdit(i);
editRenderSubtasks(i);
}
*/

function loadDataToEdit(i){
    document.getElementById('editBoardTitle').value = tasks[i].title;
    document.getElementById('editBoardDescription').value = tasks[i].description;
    document.getElementById('editBoardDate').value = tasks[i].dueDate;
    loadAndSetPriorityToEdit(i);
    tasks[i].assignedTo = editCheckBoxesForAssignedUsers(i);
}

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

  const lowSelected = !editLowBtn.classList.contains("whiteButtons")
    ? true
    : false;

  // Heiko Code added - Start
  evaluateLowState(lowSelected);
  tasks[i].priority = priority;
  // Heiko Code added - End
  return lowSelected;
}

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

  const urgentSelected = !editUrgentBtn.classList.contains("whiteButtons")
    ? true
    : false;

  // Heiko Code added - Start
  evaluateUrgentState(urgentSelected);
  tasks[i].priority = priority;
  // Heiko Code added - End
  return urgentSelected;
}

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

  const mediumSelected = !editMediumBtn.classList.contains("whiteButtons")
    ? true
    : false;

  // Heiko Code added - Start
  evaluateMediumState(mediumSelected);
  tasks[i].priority = priority;
  // Heiko Code added - End
  return mediumSelected;
}

function editVariablesPriorityButtons() {
  let editUrgentBtn = document.getElementById(`editUrgentBtn`);
  let editUrgentImg = document.getElementById("editurgentImg");
  let editMediumBtn = document.getElementById("editMediumBtn");
  let editMediumImg = document.getElementById("editMediumImg");
  let editLowBtn = document.getElementById("editLowBtn");
  let editLowImg = document.getElementById("editLowImg");
}

function editCheckBoxesForAssignedUsers(x) {
  if(tasks[x].assignedTo){
  const selectedContactsDiv = document.getElementById("selectedContacts");
  selectedContactsDiv.innerHTML = ""; // Clear previous selections
  for (let i = 0; i < contacts.length; i++) {
    const checkbox = document.getElementById(`contact_${i}`);
    checkbox.checked = false;
    for (let j = 0; j < tasks[x].assignedTo.length; j++) {
      if (tasks[x].assignedTo[j].user === checkbox.value) {
        checkbox.checked = true;
        const contactDiv = document.createElement("div");
        contactDiv.textContent = tasks[x].assignedTo[j].user;
        selectedContactsDiv.innerHTML += `<span id="editShowAssignedContacts${j}" class="initials-dropdown">${tasks[x].assignedTo[j].initials}</span>`;
        document.getElementById(
          `editShowAssignedContacts${j}`
        ).style.backgroundColor = tasks[x].assignedTo[j].backgroundColor;
      }
    }
  }
}