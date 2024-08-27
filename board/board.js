// Drag and Drop

/**
 * The index of the currently dragged element.
 * @type {number}
 */
let currentDraggedElement;

/**
 * Timeout identifier for managing highlight removal.
 * @type {?number}
 */
let highlightTimeout;

/**
 * Sets the index of the currently dragged element.
 * @param {number} i - The index of the element being dragged.
 * @returns {void}
 */
function startDragging(i) {
  currentDraggedElement = i;
}

/**
 * Prevents the default behavior of the dragover event to allow for dropping.
 * @param {DragEvent} ev - The drag event object.
 * @returns {void}
 */
function allowDrop(ev) {
  ev.preventDefault();
}

/**
 * This function handles the drag and drop 
 * @param {number} status - status of task to move
 */
async function moveTo(status) {
  tasks[currentDraggedElement]["status"] = status;
  let draggedTask = tasks.splice(currentDraggedElement, 1)[0];
  tasks.unshift(draggedTask);
  tasksSort();
  await writeTasksToDatabase();
  await getTasksFromDatabase();
  renderTasksInBoard();
}

/**
 * This function sorts the displayed tasks
 */
function tasksSort() {
  tasks.sort((a, b) => {
    if (a.status !== b.status) {
      return a.status - b.status;
    } else {
      return tasks.indexOf(a) - tasks.indexOf(b);
    }
  });
}

/**
 * This function higlights the drag and drop area
 * @param {id} id - id of area to be highlighted 
 */
function highlight(id) {
  let element = document.getElementById(id);
  if (highlightTimeout) {
    clearTimeout(highlightTimeout);
  }
  element.classList.add("drag-area-highlight");
  highlightTimeout = setTimeout(() => {
    element.classList.remove("drag-area-highlight");
  }, 300);
}

/**
 * This function removes higlights for drag and drop area
 * @param {id} id - id of area to be highlighted 
 */
function removeHighlight(id) {
  let element = document.getElementById(id);
  element.classList.remove("drag-area-highlight");
  if (highlightTimeout) {
    clearTimeout(highlightTimeout);
    highlightTimeout = null;
  }
}

/**
 * This functions handles the search for a task
 */
let searchTasks = () => {
  let searchTerm = document
    .getElementById("searchInput")
    .value.toLowerCase()
    .trim();
  let filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm) ||
      task.description.toLowerCase().includes(searchTerm)
  );
  renderFilteredTasks(filteredTasks);
};

/**
 * Renders the filtered tasks on the task board.
 * @param {Array} filteredTasks
 * @returns {void}
 */
let renderFilteredTasks = (filteredTasks) => {
  clearTaskBoard();
  filteredTasks.forEach((task) => {
    let taskIndex = tasks.indexOf(task);
    checkTaskStatusAndRender(taskIndex);
  });
};

/**
 * This function adds a specific class to an specific element
 * @param {element} elementId - element to add class to
 * @param {string} className  - class which should be added to element
 */
function addClassToElement(elementId, className) {
  let element = document.getElementById(elementId);
  element.classList.add(className);
} 

/**
 * This function removes a specific class from an specific element
 * @param {element} elementId - element to remove class from
 * @param {string} className  - class which should be removed from element
 */
function removeClassFromElement(elementId, className) {
  let element = document.getElementById(elementId);
  element.classList.remove(className);
}

let todoTasks = [];
let inProgressTasks = [];
let feedbackTasks = [];
let doneTasks = [];

/**
 * This fiunction handles the initial call for board.html
 */
async function initialCallBoard(){
    await getContactsFromDatabase();
    await getTasksFromDatabase();
    getCurrentUserFromLocalStorage();
    renderInitialsInHeader();
    renderTasksInBoard();
}

/**
 * This function renders the tasks in board
 */
function renderTasksInBoard() {
  clearTaskBoard();
  renderEmptycategories(tasks);
  for (let i = 0; i < tasks.length; i++) {
    checkTaskStatusAndRender(i);
  }
}

/**
 * This function checks the status of the task to be rendered in
 * @param {number} i - id of task
 */
function checkTaskStatusAndRender(i) {
  switch (tasks[i].status) {
    case 0:
      renderSingleTaskOverview(i, "columnToDo");
      break;
    case 1:
      renderSingleTaskOverview(i, "columnProgress");
      break;
    case 2:
      renderSingleTaskOverview(i, "columnFeedback");
      break;
    case 3:
      renderSingleTaskOverview(i, "columnDone");
      break;
  }
}

/**
 * This function loads different images depending on priority status
 */
let priorityImages = {
  0: '',
  1: '../assets/icons/Prio baja.svg',
  2: '../assets/icons/Prio media.svg',
  3: '../assets/icons/Prio alta.svg'
};

/**
 * This function renders single task in overview
 * 
 * @param {*} i  - index of task
 * @param {*} id - id of area to be rendered in
 */
function renderSingleTaskOverview(i, id) {
  let toDoArea = document.getElementById(id);
  let task = tasks[i];
  let priorityImage = priorityImages[task.priority];
  let priorityImageClass = task.priority === 0 ? 'priority-image hidden' : 'priority-image';
  toDoArea.innerHTML += renderSingleTaskOverviewHTML(i, priorityImage, priorityImageClass);
  addBackgroundColorToCategory(i); 
  if (tasks[i].subtask && tasks[i].subtask.length > 0) {
      let completedSubtasks = countLowProgressValue(i);
      let totalSubtasks = tasks[i].subtask.length;
      let progressPercentage = (completedSubtasks / totalSubtasks) * 100;
      document.getElementById(`progressContainer${i}`).innerHTML = renderSingleTaskOverviewHTMLProgressContainer(i, progressPercentage, completedSubtasks, totalSubtasks);
  } else {
      document.getElementById(`progressContainer${i}`).remove();
  }
 renderAssignedNamesOverview(i);
}

/**
 * This function renders assigend names
 * @param {number} i - index of task
 */
function renderAssignedNamesOverview(i){
  let limit = 3;
  if(tasks[i].assignedTo){
    if(tasks[i].assignedTo.length <= limit){
  for (let j = 0; j < tasks[i].assignedTo.length; j++) {
      let assignedContacts = document.getElementById(`assignedContacts${i}`);
      const contact = tasks[i].assignedTo[j];
      assignedContacts.innerHTML += /*html*/ `
          <div id="assignedContactIcon${i}_${j}" class="contact-icon assigned-contact-icon">${contact.initials}</div>
      `;
    document.getElementById(`assignedContactIcon${i}_${j}`).style.backgroundColor = contact.backgroundColor;
      }
    } else {
    for(let j = 0; j < limit; j++){
        let assignedContacts = document.getElementById(`assignedContacts${i}`);
        const contact = tasks[i].assignedTo[j];
        assignedContacts.innerHTML += /*html*/ `
            <div id="assignedContactIcon${i}_${j}" class="contact-icon assigned-contact-icon">${contact.initials}</div>
        `;
        document.getElementById(`assignedContactIcon${i}_${j}`).style.backgroundColor = contact.backgroundColor;
    }
    renderAssignedNamesGreaterThanLimitOverview(i, limit);
  }
}
}

/**
 * This function renders workaround when amount of assigend users is greater than limit
 * @param {number} i      - index of task
 * @param {number} limit - limit of assigend users
 */
function renderAssignedNamesGreaterThanLimitOverview(i, limit){
  let assignedContacts = document.getElementById(`assignedContacts${i}`);
        assignedContacts.innerHTML += /*html*/ `
            <div id="assignedContactIcon${i}_${limit}" class="contact-icon assigned-contact-icon">+${calculateRestOfAssigendToGreaterThanLimit(i, limit)}</div>
        `;
    document.getElementById(`assignedContactIcon${i}_${limit}`).style.backgroundColor = "#301934"; 
}

/**
 * This function clers the task areas in biard view
 */
function clearTaskBoard() {
  document.getElementById("columnToDo").innerHTML = "";
  document.getElementById("columnProgress").innerHTML = "";
  document.getElementById("columnFeedback").innerHTML = "";
  document.getElementById("columnDone").innerHTML = "";
}

/**
 * This function counts the amount of tasks in categories
 * @param {JSON} tasks - tasks JSON
 * @returns            - JSON with initialized countervalues
 */
function countStatus(tasks) {
  let statusCounts = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
  };
  tasks.forEach((task) => {
    if (statusCounts.hasOwnProperty(task.status)) {
      statusCounts[task.status]++;
    }
  });
  return statusCounts;
}

/**
 * This function handles if one category has no tasks to display
 * @param {JSON} tasks 
 */
function renderEmptycategories(tasks) {
  let categoriesCounts = countStatus(tasks);
  if (categoriesCounts[0] == 0) {
    document.getElementById("columnToDo").innerHTML = `<div class="empty-column">No tasks to do</div>`;
  }
  if (categoriesCounts[1] == 0) {
    document.getElementById("columnProgress").innerHTML = `<div class="empty-column">No tasks in progress</div>`;
  }
  if (categoriesCounts[2] == 0) {
    document.getElementById("columnFeedback").innerHTML = `<div class="empty-column">No tasks awaiting</div>`;
  }
  if (categoriesCounts[3] == 0) {
    document.getElementById("columnDone").innerHTML = `<div class="empty-column">No tasks done</div>`;
  }
}

/**
 * This function generates Add task overlay with preset for category
 * @param {number} x 
 */
function openTaskOverlayWithCategoryPreset(x){
   subtask = [];
   removeClassFromElement('addTaskBoardOverlayContainer', 'none');
   renderBoardOverlays(x);
   preSelectMediumBtn();
}

/**
 * This function counts low progress value
 * @param {number} i - index of task
 * @returns          - variable with amount if tasks
 */
function countLowProgressValue(i) {
    if(tasks[i].subtask){
    let count = 0;
    for (let j = 0; j < tasks[i].subtask.length; j++) {
      if (tasks[i].subtask[j].status === 1) {
        count++;
      }
    }
    return count;
  }
}

/**
 * This function sets all columns to same height
 */
function adjustColumnHeights() {
  let columns = document.querySelectorAll(".column-content");
  let maxHeight = 0;
  columns.forEach((column) => {
    column.style.height = "auto";
    if (column.scrollHeight > maxHeight) {
      maxHeight = column.scrollHeight;
    }
  });
  columns.forEach((column) => {
    column.style.height = maxHeight + "px";
  });
}

/**
 * This function handles the dragging of tasks
 * @param {number} i - index of task
 */
function startDragging(i) {
  currentDraggedElement = i;
  adjustColumnHeights();
}

/**
 * This function resets the column height
 */
function resetColumnHeights() {
  let columns = document.querySelectorAll(".column-content");
  columns.forEach((column) => {
    column.style.height = "auto";
  });
}

document.addEventListener("dragend", resetColumnHeights);
document.addEventListener("drop", resetColumnHeights);

/**
 * This function sets bakcgorund-colors for categories
 * @param {number} i - index of task 
 */
function addBackgroundColorToCategory(i){
  let categoryContainer = document.getElementById(`cardCategory${i}`);
  tasks[i].taskCategory == "Technical Task" ? categoryContainer.style.backgroundColor = "#1fd7c1" : categoryContainer.style.backgroundColor = "#0038ff";
}

/**
 * This function closes all open dropdown menus by adding the d-none class.
 */
function closeDropdownMenus() {
  document.querySelectorAll('.slide-in-menu').forEach(menu => {
    menu.classList.add('d-none');
    menu.classList.remove('slide-in-menu-active');
  });
  document.querySelectorAll('.task').forEach(task => {
    task.style.pointerEvents = 'auto';
  });
}

/**
 * This function returns the category name based on the status number.
 * @param {number} status - The status number (0-3).
 * @returns {string} - The category name.
 */
function getCategoryName(status) {
  let categories = ['To do', 'In progress', 'Await feedback', 'Done'];
  return categories[status] || '';
}

/**
 * This function moves a task to a new category based on the status number.
 * @param {number} taskIndex - The index of the task in the tasks array.
 * @param {number} newStatus - The new status number (0-3).
 */
async function moveTaskToCategory(taskIndex, newStatus) {
  tasks[taskIndex].status = newStatus;
  let movedTask = tasks.splice(taskIndex, 1)[0];
  tasks.unshift(movedTask);
  tasksSort();
  await writeTasksToDatabase();
  await getTasksFromDatabase();
  renderTasksInBoard();
}

/**
 * This function adds a class to an element
 * @param {id} elementId     - id of element
 * @param {class} className  - class to be added
 */
function addClassToElement(elementId, className) {
  let element = document.getElementById(elementId);
  element.classList.add(className);
}

/**
 * This function removes a class from an element
 * @param {id} elementId     - id of element
 * @param {class} className  - class to be removed
 */
function removeClassFromElement(elementId, className) {
  let element = document.getElementById(elementId);
  element.classList.remove(className);
}