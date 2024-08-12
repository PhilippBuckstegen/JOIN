// function renderTasksToBoard() {

    // rendern der AddTasks in ToDo
    
// }

/* --------------------------------------------------------------
-------------------------------------------------------------- */

// let tasks = [{
//     'id': 0,
//     'title': 'Putzen',
//     'category': 'toDo'
// }, {
//     'id': 1,
//     'title': 'Kochen',
//     'category': 'toDo'
// }, {
//     'id': 2,
//     'title': 'Einkaufen',
//     'category': 'inProgress'
// }];

let currentDraggedElement;

function updateHTML() {
    let toDo = tasks.filter(t => t['category'] === 'toDo');

    document.getElementById('columnToDo').innerHTML = '';

    for (let index = 0; index < toDo.length; index++) {
        const element = toDo[index];
        document.getElementById('columnToDo').innerHTML += generateTaskHTML(element);
    }

    let inProgress = tasks.filter(t => t['category'] === 'inProgress');

    document.getElementById('columnProgress').innerHTML = '';

    for (let index = 0; index < inProgress.length; index++) {
        const element = inProgress[index];
        document.getElementById('columnProgress').innerHTML += generateTaskHTML(element);
    }
}

function startDragging(id) {
    currentDraggedElement = id;
}

function generateTaskHTML(element) {
    return /*html*/`
        <div ondragstart="startDragging(${element['id']})" draggable="true" class="task">
            <div class="card-category">Design</div>
            <h3>Webdesign</h3>
            <span class="task-description">dfgdg dfgdfg, fdgdfggf, dsgf fdgdfg</span>
            <div class="progress-container">
                <div class="progress">
                    <div class="progress-style"></div>
                </div>
                <span>0/2 Done</span>
            </div>
            <div class="assigned-and-prio">
                <div class="assigned-contacts">
                    <div class="contact-icon assigned-contact-icon">AB</div>
                    <div class="contact-icon assigned-contact-icon">CD</div>
                    <div class="contact-icon assigned-contact-icon">EF</div>
                </div>
                <img src="../assets/icons/Prio baja.svg" alt="prio" />
            </div>
        </div>
    `;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(category) {
    tasks[currentDraggedElement]['category'] = category;
    updateHTML();
}

function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}

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
        <div class="task">
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
