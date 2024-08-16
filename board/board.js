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
 * Updates the status of the currently dragged task, moves it to the top of the category,
 * and re-renders the task board.
 * @param {string} status - The new status to assign to the dragged task.
 *                          This status determines the new category (e.g., 'ToDo', 'In Progress', 'Feedback', 'Done').
 * @returns {void}
 */

// Heiko - Funktion abgeändert aufgrund anderen Sortieralgoritmus, so dass in den kategorien die neuesten verschobenen Einträge oben stehen

async function moveTo(status) {
  tasks[currentDraggedElement]["status"] = status;
  let draggedTask = tasks.splice(currentDraggedElement, 1)[0];
  tasks.unshift(draggedTask);
  tasksSort();
  await writeTasksToDatabase();
  await getTasksFromDatabase();
  renderTasksInBoard();
}

function tasksSort() {
  tasks.sort((a, b) => {
    if (a.status !== b.status) {
      return a.status - b.status;
    } else {
      return tasks.indexOf(a) - tasks.indexOf(b);
    }
  });
}

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

function removeHighlight(id) {
  let element = document.getElementById(id);
  element.classList.remove("drag-area-highlight");
  if (highlightTimeout) {
    clearTimeout(highlightTimeout);
    highlightTimeout = null;
  }
}

// Seatchfield "Find Task" on Board

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
 * 
 * @param {element} elementId - element to add class to
 * @param {string} className  - class which should be added to element
 */
function addClassToElement(elementId, className) {
  let element = document.getElementById(elementId);
  element.classList.add(className);
} 

/**
 * This function removes a specific class from an specific element
 * 
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

async function initialCallBoard(){
    await getContactsFromDatabase();
    await getTasksFromDatabase();
    // loadCategoryArrays();
    // updateCategoryArrays();
    renderTasksInBoard();
}

function renderTasksInBoard() {
  clearTaskBoard();
  renderEmptycategories(tasks);
  for (let i = 0; i < tasks.length; i++) {
    checkTaskStatusAndRender(i);
  }
}

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

let priorityImages = {
  0: '',
  1: '../assets/icons/Prio baja.svg',
  2: '../assets/icons/Prio media.svg',
  3: '../assets/icons/Prio alta.svg'
};

function renderSingleTaskOverview(i, id) {
  let toDoArea = document.getElementById(id);

  let task = tasks[i];
  let priorityImage = priorityImages[task.priority];
  let priorityImageClass = task.priority === 0 ? 'priority-image hidden' : 'priority-image';

  toDoArea.innerHTML += /*html*/ `
      <div onclick="generateTask(${i})" id="task${i}" class="task" draggable="true" ondragstart="startDragging(${i})">
          <div class="category-headline">
            <div id="cardCategory${i}" class="card-category">${tasks[i].taskCategory}</div>
         <div id="slideInMenu${i}" class="slide-in-menu d-none"></div>
            <img onclick="openTaskMenu(event, ${i})" src="../assets/icons/moveTo.svg" alt="moveTo">
          </div>
          <h3>${tasks[i].title}</h3>
          <span class="task-description">${tasks[i].description}</span>
          <div id="progressContainer${i}" class="progress-container"></div>
          <div class="assigned-and-prio">
              <div class="assigned-contacts" id="assignedContacts${i}"></div>
              <img src="${priorityImage}" class="${priorityImageClass}" alt="prio" onclick="edit(${i})" />
          </div>
      </div>
  `;

  addBackgroundColorToCategory(i); // Farbe für Kategorie setzen

  // Überprüfen, ob "subtask" definiert ist, bevor darauf zugegriffen wird
  if (tasks[i].subtask && tasks[i].subtask.length > 0) {
      let completedSubtasks = countLowProgressValue(i);
      let totalSubtasks = tasks[i].subtask.length;
      let progressPercentage = (completedSubtasks / totalSubtasks) * 100;

      document.getElementById(`progressContainer${i}`).innerHTML = /*html*/ `
          <div class="progress">
              <div class="progress-style" style="width: ${progressPercentage}%"></div>
          </div>
          <span><span id="progressLowValue${i}">${completedSubtasks}</span>/${totalSubtasks} Done</span>
      `;
  } else {
      document.getElementById(`progressContainer${i}`).remove();
  }

  if(tasks[i].assignedTo){
  // Kontakte rendern
  for (let j = 0; j < tasks[i].assignedTo.length; j++) {
      let assignedContacts = document.getElementById(`assignedContacts${i}`);
      const contact = tasks[i].assignedTo[j];

      assignedContacts.innerHTML += /*html*/ `
          <div id="assignedContactIcon${i}_${j}" class="contact-icon assigned-contact-icon">${contact.initials}</div>
      `;

    document.getElementById(
      `assignedContactIcon${i}_${j}`
    ).style.backgroundColor = contact.backgroundColor;
  }
}
}




function clearTaskBoard() {
  document.getElementById("columnToDo").innerHTML = "";
  document.getElementById("columnProgress").innerHTML = "";
  document.getElementById("columnFeedback").innerHTML = "";
  document.getElementById("columnDone").innerHTML = "";
}

function countStatus(tasks) {
  // Zähler für die verschiedenen Statuswerte initialisieren
  let statusCounts = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
  };

  // Durch die tasks iterieren und die Status zählen
  tasks.forEach((task) => {
    if (statusCounts.hasOwnProperty(task.status)) {
      statusCounts[task.status]++;
    }
  });

  return statusCounts;
}

function renderEmptycategories(tasks) {
  let categoriesCounts = countStatus(tasks);
  if (categoriesCounts[0] == 0) {
    document.getElementById(
      "columnToDo"
    ).innerHTML = `<div class="empty-column">No tasks to do</div>`;
  }
  if (categoriesCounts[1] == 0) {
    document.getElementById(
      "columnProgress"
    ).innerHTML = `<div class="empty-column">No tasks in progress</div>`;
  }
  if (categoriesCounts[2] == 0) {
    document.getElementById(
      "columnFeedback"
    ).innerHTML = `<div class="empty-column">No tasks awaiting</div>`;
  }
  if (categoriesCounts[3] == 0) {
    document.getElementById(
      "columnDone"
    ).innerHTML = `<div class="empty-column">No tasks done</div>`;
  }
}

function openTaskOverlayWithCategoryPreset(x){
   removeClassFromElement('addTaskBoardOverlayContainer', 'none');
   renderBoardOverlays(x);
   preSelectMediumBtn();
}


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


// Setze alle Spalten auf die gleiche höhe
function adjustColumnHeights() {
  let columns = document.querySelectorAll(".column-content");
  let maxHeight = 0;

  // Bestimme die maximale Höhe aller Spalten
  columns.forEach((column) => {
    column.style.height = "auto";
    if (column.scrollHeight > maxHeight) {
      maxHeight = column.scrollHeight;
    }
  });

  // Wende die maximale Höhe auf alle Spalten an
  columns.forEach((column) => {
    column.style.height = maxHeight + "px";
  });
}

// Setzt den Index des aktuell gezogenen Elements und passt die Spaltenhöhen an.
function startDragging(i) {
  currentDraggedElement = i;
  adjustColumnHeights();
}

//Usprüngliche höhe der spalten setzen.
function resetColumnHeights() {
  let columns = document.querySelectorAll(".column-content");
  columns.forEach((column) => {
    column.style.height = "auto";
  });
}

document.addEventListener("dragend", resetColumnHeights);
document.addEventListener("drop", resetColumnHeights);

// Heiko - Funktion für Farben der Category zugefügt
function addBackgroundColorToCategory(i){
  let categoryContainer = document.getElementById(`cardCategory${i}`);
  tasks[i].taskCategory == "Technical Task" ? categoryContainer.style.backgroundColor = "#1fd7c1" : categoryContainer.style.backgroundColor = "#0038ff";
}

/**
 * This function opens the task menu and positions it at the top right of the task element.
 * @param {MouseEvent} event - The event object from the click event.
 * @param {number} index - The index of the task in the tasks array.
 */
function openTaskMenu(event, index) {
  event.stopPropagation();
  event.preventDefault();
  closeDropdownMenus();

  let slideInMenu = document.getElementById(`slideInMenu${index}`);
  if (!slideInMenu) {
    console.error(`Slide-in menu for task ${index} not found`);
    return;
  }
  slideInMenu.classList.remove('d-none');
  slideInMenu.classList.add('slide-in-menu-active');

  let currentStatus = tasks[index].status;
  let filteredStatuses = [0, 1, 2, 3].filter(status => status !== currentStatus);
  slideInMenu.innerHTML = '<div class="move-task">Move Task to</div>';
  filteredStatuses.forEach(status => {
    let categoryName = getCategoryName(status);
    slideInMenu.innerHTML += `<div class="move-task-to" onclick="moveTaskToCategory(${index}, ${status}); closeDropdownMenus();">${categoryName}</div>`;
  });
  document.querySelectorAll('.task').forEach(task => {
    if (task.id !== `task${index}`) {
      task.style.pointerEvents = 'none';
    }
  });

  let closeMenuHandler = event => {
    if (!slideInMenu.contains(event.target)) {
      closeDropdownMenus();
      document.removeEventListener('click', closeMenuHandler);
    }
  };
  document.addEventListener('click', closeMenuHandler);
  slideInMenu.addEventListener('click', event => event.stopPropagation());
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

function addClassToElement(elementId, className) {
  let element = document.getElementById(elementId);
  element.classList.add(className);
}

function removeClassFromElement(elementId, className) {
  let element = document.getElementById(elementId);
  element.classList.remove(className);
}
