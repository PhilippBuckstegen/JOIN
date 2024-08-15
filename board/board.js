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

// Heiko ab hier ___________________________________________________________

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

function renderSingleTaskOverview(i, id) {
  let toDoArea = document.getElementById(id);

  toDoArea.innerHTML += /*html*/ `
        <div onclick="generateTask(${i})" class="task" draggable="true" ondragstart="startDragging(${i})">
            <div id="cardCategory${i}" class="card-category">${tasks[i].taskCategory}</div>
            <h3>${tasks[i].title}</h3>
            <span class="task-description">${tasks[i].description}</span>
            <div id="progressContainer${i}" class="progress-container"></div>
            <div class="assigned-and-prio">
                <div class="assigned-contacts" id="assignedContacts${i}"></div>
                <img src="../assets/icons/Prio baja.svg" alt="prio" onclick="edit(${i})" />
            </div>
        </div>
    `;
  addBackgroundColorToCategory(i); // Heiko eingefügt für Kategoriefarben
  if ("subtask" in tasks[i]) {
    document.getElementById(`progressContainer${i}`).innerHTML = /*html*/ `
            <div class="progress">
                <div class="progress-style"></div>
            </div>
            <span><span id="progressLowValue${i}">0</span>/${tasks[i].subtask.length} Done</span>
        `;
      document.getElementById(`progressLowValue${i}`).innerHTML = countLowProgressValue(i);
  } else {
    document.getElementById(`progressContainer${i}`).remove();
  }

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

