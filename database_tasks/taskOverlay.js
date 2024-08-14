"use strict";

/*
const taskOverlaySection = document.getElementById("taskOverlaySection");
const taskType = document.getElementById("taskType");
const contactTitle = document.getElementById("contactTitle");
const contactTask = document.getElementById("contactTitle");
const contactDate = document.getElementById("contactTitle");
const contactPriority = document.getElementById("contactPriority");
const assignContactsContainer = document.getElementById(
  "assignContactsContainer"
);
const subtasksContactsContainer = document.getElementById(
  "subtasksContactsContainer"
);

function displayCurrentUserTask() {
  taskType.textContent = tasks[0].taskCategory;
  contactTitle.textContent = tasks[0].title;
  contactTask.textContent = tasks[0].description;
  contactDate.textContent = tasks[0].dueDate;
  contactPriority.innerHTML = setPriority();
  assignContactsContainer.innerHTML = setContacts();
  subtasksContactsContainer.innerHTML = setSubTasks();
}
  */

//const taskOverlaySection = document.getElementById("taskOverlaySection");
//taskOverlaySection.innerHTML = currentTaskOverlay;

function generateTask(i) {
  removeClassFromElement('taskOverlaySection', 'none')
  let currentTaskOverlay = "";

  //for (let i = 1; i < 2; i++) {
    currentTaskOverlay = /*HTML*/ `
            <div id="currentUserTaskOverlay" class="currentUserTaskOverlays">
          <div id="taskTypeContainer" class="taskTypeContainers flexContainer">
            <div id="taskType" class="taskTypes">${tasks[i].taskCategory}</div>
            <div>
              <img onclick="addClassToElement('taskOverlaySection', 'none')"
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
              
              /* hard coded */
              <div id="assignContact" class="assignContacts flexContainerStart">
                <div id="bgColor">EM</div>
                <div><p>Emmanuel Mauer</p></div>
              </div>
              /* hard coded */

            </div>

          </div>
          <div id="subtasksContainer" class="subtasksContainers flexContainerColStart">
            <div class="flexContainerStart"><p id="subtasksPar" class="subtasksPars">Subtasks</p></div>
            <div id="subtasksContactsContainer" class="subtasksContactsContainers flexContainerColStart">
            ${setSubtasks(tasks[i].subtask)}
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
  }
  
  let subtaskboxes = document.getElementsByClassName("subtaskboxes");
  checkSubtask(subtaskboxes);
}

setTimeout(function () {
  console.log(tasks);
  generateTask();
}, 500);

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

function setSubtasks(subtasks) {
  let subtasksSubContainer = "";
  if (subtasks) {
    for (let i = 0; i < subtasks.length; i++) {
      subtasksSubContainer += /* HTML */ `
        <div id="subContainer${i}" class="subContainers flexContainer">
          <input
            type="checkbox"
            id="checkbox${i}"
            class="subtaskboxes"
            name="checkbox${i}"
            value="subtask${i}"
          />
          <label
            for="checkbox${i}"
            id="checkboxLabel${i}"
            class="subtaskboxesLabels"
            >${subtasks[i].task}</label
          >
        </div>
      `;
    }
    return subtasksSubContainer;
  } else {
    return "";
  }
}

function checkSubtask(subtaskboxes) {
  for (let i = 0; i < subtaskboxes.length; i++) {
    subtaskboxes[i].addEventListener("click", function () {
      if (!subtaskboxes[i].classList.contains("checkboxChecked")) {
        subtaskboxes[i].classList.add("checkboxChecked");
      } else {
        subtaskboxes[i].classList.remove("checkboxChecked");
      }
    });
  }
}
