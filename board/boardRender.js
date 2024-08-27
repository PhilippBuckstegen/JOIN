/**
 * This function generates HTML Code for single task overview
 * @param {number} i                   - index of task
 * @param {image} priorityImage        - image for priority 
 * @param {class} priorityImageClass   - class for priority
 * @returns                            - HTML Code
 */
function renderSingleTaskOverviewHTML(i, priorityImage, priorityImageClass){
    return /*html*/ `
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
  }

  /**
 * This function renders Progress Container for subtasks
 * @param {number} i                   - index of task
 * @param {number} progressPercentage  - percentage of progress
 * @param {number} completedSubtasks   - completed subtasks
 * @param {number} totalSubtasks       - total subtasks
 * @returns                       - HTML Code
 */
function renderSingleTaskOverviewHTMLProgressContainer(i, progressPercentage, completedSubtasks, totalSubtasks){
    return /*html*/ `
    <div class="progress">
        <div class="progress-style" style="width: ${progressPercentage}%"></div>
    </div>
    <span><span id="progressLowValue${i}">${completedSubtasks}</span>/${totalSubtasks} Done</span>
  `;
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