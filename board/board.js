function renderTasksToBoard() {

    // rendern der AddTasks in ToDo
    
}

/* --------------------------------------------------------------
-------------------------------------------------------------- */

let tasks = [{
    'id': 0,
    'title': 'Putzen',
    'category': 'toDo'
}, {
    'id': 1,
    'title': 'Kochen',
    'category': 'toDo'
}, {
    'id': 2,
    'title': 'Einkaufen',
    'category': 'inProgress'
}];

let currentDraggedElement;

function updateHTML() {
    let toDo = tasks.filter(t => t['category'] == 'toDo');

    document.getElementById('columnToDo').innerHTML = '';

    for (let index = 0; index < toDo.length; index++) {
        const element = toDo[index];
        document.getElementById('columnToDo').innerHTML += generateTaskHTML(element);
    }

    let inProgress = tasks.filter(t => t['category'] == 'inProgress');

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
                <span class="task-description"
                  >dfgdg dfgdfg, fdgdfggf, dsgf fdgdfg</span
                >
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
        `
//    `<div draggable="true" ondragstart="startDragging(${element['id']})" class="todo">${element['title']}</div>`;
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