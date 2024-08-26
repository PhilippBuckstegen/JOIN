
/**
 * This function generates HTML Code for generate Task
 * 
 * @param {number} i - index of task 
 * @returns          - HTML Code 
 */
function generateTaskHTML(i){
    return /*HTML*/ `
    <div id="currentUserTaskOverlay" class="currentUserTaskOverlays flexContainerColStart">
  
    <div id="taskTypeContainer" class="taskTypeContainers flexContainer">
        <div id="taskType${i}" class="taskTypes">${tasks[i].taskCategory}</div>
        <div>
          <img onclick="closeAndStore()"
            id="contactCloseBtn"
            src="../database/images/close.svg"
            alt="icon"
          />
        </div>
      </div>
      <div id="userTaskOverlayPart" class="userTaskOverlayParts">
    
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
  }


  /**
   * This function generates HTML Code for renderAssigendNames 
   * 
   * @param {number} i - index of task
   * @param {number} j - index of assigend users
   * @returns          - HTML Code
   */
  function renderAssignedNamesNoUserLimitHTML(i,j){
    return  /*html*/ `
            <div id='assignedContactsDetail${j}'>
              <span class="label-initials">
                <span class="initials-dropdown" id='initialsDropdown${j}'>${tasks[i].assignedTo[j].initials}</span>
                ${tasks[i].assignedTo[j].user}
              </span>
          </div>
        `;
  }

  
  /**
   * This function generates HTML Code for renderAssigendNames 
   * 
   * @param {number} i - index of task
   * @param {number} j - index of assigend users
   * @returns          - HTML Code
   */
  function renderAssignedNamesUserLimitHTML(i,j){
    return /*html*/ `
    <div id='assignedContactsDetail${j}'>
      <span class="label-initials">
        <span class="initials-dropdown" id='initialsDropdown${j}'>${tasks[i].assignedTo[j].initials}</span>
        ${tasks[i].assignedTo[j].user}
      </span>
  </div>
  `;
  }


  /**
   * This function renders the edit view
   * 
   * @param {number} i - index of task
   * @returns          - HTML Code
   */
  function generateEditViewHTML(i){
    return /*HTML*/ `
    <div id="xBtnContainerEdit" class="flexContainer">
                <img id="xBtn" src="../database/images/close.svg" alt="icon"
                onclick="cancelEditArea()"/>
              </div>
            <div id="taskBoardOverlayForm" class="taskBoardOverlayFormEdit flexContainerCol">
                    <div id="boardTitleContainer" class="boardTitleContainerEdit flexContainerColStart">
                      <label for="boardTitle">Title<span id="asteriskTitle" class="">*</span></label>
                      <div class="edit-inputs-title-mid">
                        <input type="text" placeholder="Enter a title" id="editBoardTitle" name="boardTitle"/>
                        <span id="editBoardTitleErrorMessage" class="error-message no-error-visible">This field is required</span>
                      </div>
                    </div>
                    <div id="boardDescriptionContainer" class="boardDescriptionContainerEdit flexContainerColStart">
                      <label for="boardDescription">Description</label>
                      <textarea placeholder="Enter a Description" rows="4" cols="50" id="editBoardDescription" name="boardDescription"></textarea>
                    </div>
                    <div id="boardDateContainer" class="boardDateContainerEdit flexContainerColStart">
                    <label for="boardDate">Due date<span id="asteriskDate" class="">*</span></label>
                    <div id="boardDateInputImgContainer" class="flexContainer">
                      <input type="date" data-date-format="DD  MM  YYYY" id="editBoardDate" name="boardDate" onclick="setMinDateToToday('editBoardDate')"/>
                      <span id="editBoardDateErrorMessage" class="error-message no-error-visible">This field is required</span>
                    </div>
                  </div>
                  <div id="boardPriorityContainerCur" class="boardPriorityContainerEdit flexContainerCol">
                    <div id="priorityHeaderContainer" class="flexContainer">
                      <p>Prio</p>
                    </div>
                    <div id="priorityBtnsContainer" class="priorityBtnsContainerEdit flexContainer">
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
                   <div id="boardAssignedContainer" class="boardAssignedContainerEdit flexContainerCol">
                      <!-- new dropdown start -->
                      <div id="contactDropdown" class="contactDropdownCur dropdown flexContainerColStart" >
                        <label for="boardAssigned">Assigned to</label>
                        <button id="dropdownBtn"
                          class="dropdown-button"
                          onclick="toggleDropdown()"
                        >Select contacts to assign</button>
                        <div
                          class="dropdown-content"
                          id="dropdownListContent"
                        ></div>
                      </div>
                      <div
                        class="selected-contacts-edit flexContainerStart"
                        id="selectedContacts"
                      ></div>
                    </div>
                  <div id="boardSubtasksContainerCur" class="boardSubtasksContainerEdit flexContainerColStart">
                    <label for="boardSubtasks">Subtasks</label>
                    <div
                      id="boardSubtasksInputImgContainer"
                      class="flexContainer"
                    >
                      <input
                        type="text"
                        placeholder="Add new subtask"
                        id="boardSubtasks"
                        name="boardSubtasks"
                      />
                      <img
                        id="plusIcon"
                        src="../database/images/plus.svg"
                        alt="icon"
                        onclick="decideSubtask()"
                      />
                      <img
                        id="closeIcon"
                        class="none"
                        src="../database/images/close.svg"
                        alt="icon"
                        onclick="cancelSubtask()"
                      />
                      <img
                        class="none"
                        id="checkIcon"
                        src="../database/images/check_blue.svg"
                        alt="icon"
                        onclick="createSubtask()"
                      />
                    </div>
                    <div>
                      <ul id="subtaskList" class="subtaskListCur">
                        <!-- Subtask Liste wird hier gerendert -->
                      </ul>
                    </div>
                  </div>                   
                </div>
                      <div id="okBtnCurContainer" class="store-edited-data-button flexContainer">
                    <button id="okBtnCur" onclick="validateEditTask(${i})">OK</button>
                    <!-- ????   button id="okBtnCur" onclick="storeEditedData(${i})">OK</button>-->
                  </div>
  `;
  }


  /**
   * This renders the subtasks
   * 
   * @param {number} x - index of task
   * @param {number} i - index of subtask item
   * @returns 
   */
  function editRenderSubtasksHTML(x,i){
    return  /*html*/ `
    <li id="subtaskListItem${i}" class="subtaskListItems subtaskListItemsEdit flexContainer">
        <div id="subTaskTextListItem${i}" class="sub-task-text-list subtaskListItemsContainers flexContainer"><span class="sub-task-text-list" id="subTaskTextListItem${i}">${tasks[x].subtask[i].task}</span></div>
        <span id="singleSubTaskButtons${i}" class="singleSubtaskButtons flexContainer">
              <img id="editSubtaskIcon" class="hidden" onclick="editSubtaskItem(${i})" src="../database/images/edit.svg" alt="icon">
              <img id="binSubtaskIcon" class="hidden" onclick="deleteSubtaskItem(${i})" src="../database/images/delete.svg" alt="icon">
          <span>
        <span>
    </li>
  `;
  }
  