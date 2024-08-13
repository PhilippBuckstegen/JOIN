"use strict";

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

function generateTask() {
  let currentTaskOverlay = "";
  for (let i = 0; i < 1; i++) {
    currentTaskOverlay += /*HTML*/ `
            <div id="currentUserTaskOverlay${i}" class="currentUserTaskOverlays">
          <div id="taskTypeContainer${i}" class="taskTypeContainers flexContainer">
            <div id="taskType${i}" class="taskTypes">${
      tasks[i].taskCategory
    }</div>
            <div>
              <img
                id="contactCloseBtn"
                src="../database/images/close.svg"
                alt="icon"
              />
            </div>
          </div>
          <div id="titleContainer${i}" class="titleContainers">
            <p id="contactTitle${i}" class="contactTitles">${tasks[i].title}</p>
          </div>
          <div id="taskContainer${i}" class="taskContainers">
            <p id="contactTask${i}" class="contactTasks">${
      tasks[i].description
    }</p>
          </div>
          <div id="dateContainer${i}" class="dateContainers flexContainerStart">
            <div><p id="dueDatePar${i}" class="dueDatePars">Due date:</p></div>
            <div><p id="contactDate${i}" class="contactDates">${
      tasks[i].dueDate
    }</p></div>
          </div>
          <div id="priorityContainer${i}" class="priorityContainers flexContainerStart">
            <div><p id="priorityPar${i}" class="priorityPars">Priority:</p></div>
            <div id="contactPriority${i}" class="contactPriorities flexContainer">${setPriority(
      tasks[i].priority
    )}</div>
          </div>
          <div id="assignContainer${i}" class="assignContainers flexContainerStart">
            <div><p id="assignPar${i}" class="assignPars">Assigned To:</p></div>
            <div id="assignContactsContainer${i}" class="assignContactsContainers flexContainerStart">
            
            </div>
          </div>
          <div id="subtasksContainer${i}" class="subtasksContainers flexContainerStart">
            <div><p id="subtasksPar${i}" class="subtasksPars">Subtasks</p></div>
            <div id="subtasksContactsContainer${i}" class="subtasksContactsContainers">
            
            </div>
          </div>
          <div id="deleteEditBtnsContainer${i}" class="deleteEditBtnsContainers flexContainerStart">
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
  }
  taskOverlaySection.innerHTML = currentTaskOverlay;
}

setTimeout(function () {
  console.log(tasks);
  generateTask();
}, 1000);

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

function setAssign(assign) {}
