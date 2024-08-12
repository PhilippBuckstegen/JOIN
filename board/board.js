
let currentDraggedElement;
let highlightTimeout;

function startDragging(i) {
    currentDraggedElement = i;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(status) {
    tasks[currentDraggedElement]['status'] = status;
    renderTasksInBoard();

}

function highlight(id) {
    let element = document.getElementById(id);
    if (highlightTimeout) {
        clearTimeout(highlightTimeout);
    }
    element.classList.add('drag-area-highlight');
    highlightTimeout = setTimeout(() => {
        element.classList.remove('drag-area-highlight');
    }, 300);
}

function removeHighlight(id) {
    let element = document.getElementById(id);
    element.classList.remove('drag-area-highlight');
    if (highlightTimeout) {
        clearTimeout(highlightTimeout);
        highlightTimeout = null;
    }
}

// Heiko ___________________________________

async function initialCallBoard(){
    await getTasksFromDatabase();
    prepareTasks();
}

function renderTasksInBoard() {
    clearTaskBoard();
    for (let i = 0; i < tasks.length; i++) {
        checkTaskStatusAndRender(i);
    }
}

function checkTaskStatusAndRender(i) {
    switch (tasks[i].status) {
        case 0: renderSingleTaskOverview(i, 'columnToDo'); break;
        case 1: renderSingleTaskOverview(i, 'columnProgress'); break;
        case 2: renderSingleTaskOverview(i, 'columnFeedback'); break;
        case 3: renderSingleTaskOverview(i, 'columnDone'); break;
    }
}

function renderSingleTaskOverview(i, id) {
    let toDoArea = document.getElementById(id);
    
    toDoArea.innerHTML += /*html*/ `
        <div class="task" draggable="true" ondragstart="startDragging(${i})">
            <div class="card-category">${tasks[i].taskCategory}</div>
            <h3>${tasks[i].title}</h3>
            <span class="task-description">${tasks[i].description}</span>
            <div id="progressContainer${i}" class="progress-container"></div>
            <div class="assigned-and-prio">
                <div class="assigned-contacts" id="assignedContacts${i}"></div>
                <img src="../assets/icons/Prio baja.svg" alt="prio" />
            </div>
        </div>
    `;
    
    if ('subtask' in tasks[i]) {
        document.getElementById(`progressContainer${i}`).innerHTML = /*html*/ `
            <div class="progress">
                <div class="progress-style"></div>
            </div>
            <span>0/${tasks[i].subtask.length} Done</span>
        `;
    } else {
        document.getElementById(`progressContainer${i}`).remove();
    }

    for (let j = 0; j < tasks[i].assignedTo.length; j++) {
        let assignedContacts = document.getElementById(`assignedContacts${i}`);
        const contact = tasks[i].assignedTo[j];

        assignedContacts.innerHTML += /*html*/ `
            <div id="assignedContactIcon${i}_${j}" class="contact-icon assigned-contact-icon">${contact.initials}</div>
        `;
        
        document.getElementById(`assignedContactIcon${i}_${j}`).style.backgroundColor = contact.backgroundColor;
    }
}

function prepareTasks() {
    addRandomColorToJSON(tasks.flatMap(task => task.assignedTo));
    renderTasksInBoard();
}

function getRandomColor() {
    const colors = ["#FF7A00", "#9327FF", "#6E52FF", "#FC71FF", "#FFBB2B", "#1FD7C1", "#462F8A", "#FF4646", "#00BEE8"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

function addRandomColorToJSON(object) {
    for (let i = 0; i < object.length; i++) {
        object[i].backgroundColor = getRandomColor();
    }
}

function clearTaskBoard() {
    document.getElementById('columnToDo').innerHTML = "";
    document.getElementById('columnProgress').innerHTML = "";
    document.getElementById('columnFeedback').innerHTML = "";
    document.getElementById('columnDone').innerHTML = "";
}
