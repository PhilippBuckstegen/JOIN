async function initialCallBoardOverlays() {
  await getContactsFromDatabase();
  await getTasksFromDatabase();
  renderBoardOverlays(3);
  defineVariables();
  preSelectMediumBtn();
  // renderDropdown(); Heiko auskommentiert - wird am Ende vom render tasks aufgerufen
}

async function initialCallBoardSite() {
  await getContactsFromDatabase();
  await getTasksFromDatabase();
  // renderBoardOverlays(2);
  renderDropdown();
  defineVariables();
  // renderBoardOverlays(2);
  preSelectMediumBtn();
}

("use strict");

// Heiko Code added - Start
let priority = 0; // priority States - 0=none; 1=low; 2=medium; 3=urgent
let urgentState = false;
let mediumState = false;
let lowState = false;
// Heiko Code added - End

function defineVariables() {
  let urgentBtn = document.getElementById(`urgentBtn`);
  let urgentImg = document.getElementById("urgentImg");
  let mediumBtn = document.getElementById("mediumBtn");
  let mediumImg = document.getElementById("mediumImg");
  let lowBtn = document.getElementById("lowBtn");
  let lowImg = document.getElementById("lowImg");
}

function urgentBtnToggle() {
  // defineVariables();
  if (urgentBtn.classList.contains("whiteButtons")) {
    urgentBtn.classList.remove("whiteButtons");
    urgentBtn.style.backgroundColor = "#FF3D00";
    urgentBtn.style.color = "#fff";
    urgentImg.src = "../database/images/prio_alta_white.svg";
  } else {
    urgentBtn.classList.add("whiteButtons");
    urgentImg.src = "../database/images/prio_alta.svg";
  }

  if (!urgentBtn.classList.contains("whiteButtons")) {
    mediumBtn.classList.add("whiteButtons");
    mediumImg.src = "../database/images/prio_media.svg";
  }

  if (!lowBtn.classList.contains("whiteButtons")) {
    lowBtn.classList.add("whiteButtons");
    lowImg.src = "../database/images/prio_baja.svg";
  }

  const urgentSelected = !urgentBtn.classList.contains("whiteButtons")
    ? true
    : false;

  // Heiko Code added - Start
  evaluateUrgentState(urgentSelected);
  // Heiko Code added - End
  return urgentSelected;
}

function mediumBtnToggle() {
  // defineVariables();
  if (mediumBtn.classList.contains("whiteButtons")) {
    mediumBtn.classList.remove("whiteButtons");
    mediumBtn.style.backgroundColor = "#FFA800";
    mediumBtn.style.color = "#fff";
    mediumImg.src = "../database/images/prio_media_white.svg";
  } else {
    mediumBtn.classList.add("whiteButtons");
    mediumImg.src = "../database/images/prio_media.svg";
  }

  if (!urgentBtn.classList.contains("whiteButtons")) {
    urgentBtn.classList.add("whiteButtons");
    urgentImg.src = "../database/images/prio_alta.svg";
  }

  if (!lowBtn.classList.contains("whiteButtons")) {
    lowBtn.classList.add("whiteButtons");
    lowImg.src = "../database/images/prio_baja.svg";
  }

  const mediumSelected = !mediumBtn.classList.contains("whiteButtons")
    ? true
    : false;

  // Heiko Code added - Start
  evaluateMediumState(mediumSelected);
  // Heiko Code added - End
  return mediumSelected;
}

function lowBtnToggle() {
  // defineVariables();
  if (lowBtn.classList.contains("whiteButtons")) {
    lowBtn.classList.remove("whiteButtons");
    lowBtn.style.backgroundColor = "#7AE229";
    lowBtn.style.color = "#fff";
    lowImg.src = "../database/images/prio_baja_white.svg";
  } else {
    lowBtn.classList.add("whiteButtons");
    lowImg.src = "../database/images/prio_baja.svg";
  }

  if (!urgentBtn.classList.contains("whiteButtons")) {
    urgentBtn.classList.add("whiteButtons");
    urgentImg.src = "../database/images/prio_alta.svg";
  }

  if (!mediumBtn.classList.contains("whiteButtons")) {
    mediumBtn.classList.add("whiteButtons");
    mediumImg.src = "../database/images/prio_media.svg";
  }

  const lowSelected = !lowBtn.classList.contains("whiteButtons") ? true : false;

  // Heiko Code added - Start
  evaluateLowState(lowSelected);
  // Heiko Code added - End
  return lowSelected;
}

// urgentBtn.addEventListener("click", urgentBtnToggle);

// mediumBtn.addEventListener("click", mediumBtnToggle);

// lowBtn.addEventListener("click", lowBtnToggle);

// mediumBtn.click();

// Heiko Code addded
function evaluateUrgentState(urgentSelected) {
  mediumState = false;
  lowState = false;
  urgentSelected ? (priority = 3) : (priority = 0);
}

function evaluateMediumState(mediumSelected) {
  urgentState = false;
  lowState = false;
  mediumSelected ? (priority = 2) : (priority = 0);
}

function evaluateLowState(lowSelected) {
  urgentState = false;
  mediumState = false;
  lowSelected ? (priority = 1) : (priority = 0);
}

function clearPriorityStates() {
  switch (priority) {
    case 3:
      urgentBtnToggle();
      break;
    case 2:
      mediumBtnToggle();
      break;
    case 1:
      lowBtnToggle();
      break;
    default:
      priority = 0;
  }
}

function preSelectMediumBtn() {
  mediumBtnToggle();
}

function renderBoardOverlays(i) {
  let boardContainer = document.getElementById("addTaskBoardOverlayContainer");
  boardContainer.innerHTML = /*html*/ `
     <!-- <div id="addTaskBoardOverlayContainer" class="flexContainerCol"> -->
              <div id="headerXbtnContainer" class="flexContainer">
                <div id="taskBoardOverlayHeader">
                  <h1 id="taskBoardHeader">Add Task</h1>
                </div>
                <div id="xBtnContainer">
                  <img id="xBtn" src="../database/images/close.svg" alt="icon"
                  onclick="addClassToElement('addTaskBoardOverlayContainer', 'none')"/>
                </div>
              </div>
              <div id="addTaskBoardOverlays" class="flexContainer">
                <div id="addTaskBoardOverlay1" class="flexContainerCol">
                  <div id="addTaskBoardOverlayForm1">
                    <div id="taskBoardOverlayForm" class="flexContainerCol">
                      <div id="boardTitleContainer">
                        <label for="boardTitle">Title<span id="asteriskTitle" class="">*</span></label>
                        <br />
                        <input type="text" placeholder="Enter a title" id="boardTitle" name="boardTitle"/>
                      </div>
                      <div id="boardDescriptionContainer">
                        <label for="boardDescription">Description</label><br />
                        <textarea placeholder="Enter a Description" rows="4" cols="50" id="boardDescription" name="boardDescription"></textarea>
                      </div>
                      <div id="boardAssignedContainer">
                         <!-- new dropdown start -->
                         <div class="dropdown" id="contactDropdown">
                         <label for="boardAssigned">Assigned to</label><br />
                          <button class="dropdown-button" onclick="toggleDropdown()"></button>
                          <div class="dropdown-content"></div>
                      </div>
                      <div class="selected-contacts" id="selectedContacts"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="addTaskBoardOverlay2" class="flexContainerCol">
                  <div id="addTaskBoardOverlayForm2" class="flexContainerCol">
                    <div id="boardDateContainer">
                      <label for="boardDate">Due date<span id="asteriskDate" class="">*</span></label>
                      <div id="boardDateInputImgContainer" class="flexContainer">
                        <input type="date" data-date-format="DD  MM  YYYY" id="boardDate" name="boardDate" onclick="setMinDateToToday('boardDate')"/>
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
                        <button id="urgentBtn" class="priorityButtons whiteButtons flexContainer" onclick="urgentBtnToggle()">
                          Urgent
                          <img id="urgentImg" class="boardBtnIcons" src="../database/images/prio_alta.svg" alt="icon"/>
                        </button>
                        <button id="mediumBtn" class="priorityButtons whiteButtons flexContainer" onclick="mediumBtnToggle()">
                          Medium
                          <img id="mediumImg" class="boardBtnIcons" src="../database/images/prio_media.svg" alt="icon"/>
                        </button>
                        <button id="lowBtn" class="priorityButtons whiteButtons flexContainer" onclick="lowBtnToggle()">
                          Low
                          <img id="lowImg" class="boardBtnIcons" src="../database/images/prio_baja.svg" alt="icon"/>
                        </button>
                      </div>
                    </div>
                    <div id="boardCategoryContainer">
                      <label for="boardCategory">Category<span id="asteriskCategory" class="">*</span></label>
                      <br />
                      <select id="boardCategory" name="boardCategory">
                        <!--multiple-->
                        <option value="" selected disabled hidden>
                          Select task category
                        </option>
                        <option value="Technical Task">Technical Task</option>
                        <option value="User Story">User Story</option>
                      </select>
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
                  </div>
                </div>
              </div>
              <div id="errorMsgCancelCreateBtnsContainer" class="flexContainer">
                <div id="errorMessageContainer" class="flexContainerCol">
                  <p id="inputErrorMsg" class="">
                    <span id="asteriskRed">*</span>This field is required
                  </p>
                </div>
                <div id="cancelCreateBtnsContainer" class="flexContainer">
                  <button
                    onclick="addClassToElement('addTaskBoardOverlayContainer', 'none')"
                    id="cancelBoardOverlayBtn"
                    class="cancelCreateButtons flexContainer"
                  >
                    Cancel
                    <img
                      src="../database/images/iconoir_cancel.svg"
                      alt="icon"
                    />
                  </button>
                  <button
                    id="createBoardOverlayBtn"
                    class="cancelCreateButtons flexContainer"
                    onclick="addNewTaskToDatabase(${i})"
                  >
                    Create Task
                    <img src="../database/images/check.svg" alt="icon" />
                  </button>
                </div>
              </div>
            <!-- </div> -->
  `;
  renderDropdown();
}
