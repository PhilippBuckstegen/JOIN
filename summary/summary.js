
async function initSummary() {
    await getTasksFromDatabase();
    renderSummary();
    renderGreeting();
}


let timeOfDay

function renderTimeOfDay() {
    let date = new Date;
    let hours = date.getHours();
    if (hours >= 7 && hours <= 13) {
      timeOfDay = 'Good morning';
    } else if (hours >= 13 && hours <= 18) {
      timeOfDay = 'Good afternoon';
    } else if (hours >= 18 && hours <= 22) {
      timeOfDay = 'Good evening';
    }
    else if (hours >= 22 && hours <= 24 || hours >= 0 && hours <= 7) {
      timeOfDay = 'Good night';
    }
}

async function renderGreeting() {    
    renderTimeOfDay();

    let greetings = document.getElementById('summaryGreeting');    
    greetings.innerHTML = /*html*/`
        <p id="greeting" class="p-greeting">${timeOfDay}</p>    
    `
}

function getNumberOfTasksByStatus0() {
    let filteredStatus0 = tasks.filter(task => task.status === 0);
    filteredStatus0 = filteredStatus0.length;
    return filteredStatus0;
}

function getNumberOfTasksByStatus3() {
    let filteredStatus3 = tasks.filter(task => task.status === 3);
    filteredStatus3 = filteredStatus3.length;
    return filteredStatus3;
}

function getNumberOfTasksByStatus1() {
    let filteredStatus1 = tasks.filter(task => task.status === 1);
    filteredStatus1 = filteredStatus1.length;
    return filteredStatus1;
}

function getNumberOfTasksByStatus2() {
    let filteredStatus2 = tasks.filter(task => task.status === 2);
    filteredStatus2 = filteredStatus2.length;
    return filteredStatus2;
}

function getNumberOfUrgentTasks() {
    let urgentTasks = tasks.filter(task => task.priority === 3);
    urgentTasks = urgentTasks.length;
    return urgentTasks;
}

function getNextDueDate() {
    let currentDate = new Date(); // Aktuelles Datum
    let upcomingTasks = tasks.filter(task => new Date(task.dueDate) > currentDate);
    upcomingTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    return upcomingTasks.length > 0 ? upcomingTasks[0].dueDate : null;
}

// Die nächste Deadline ermitteln
const nextDueDate = getNextDueDate();

function renderSummary() {
    document.getElementById('tasksInBoard').innerHTML = tasks.length;
    document.getElementById('sumCountTodo').innerHTML = getNumberOfTasksByStatus0();
    document.getElementById('sumCountDone').innerHTML = getNumberOfTasksByStatus3();
    document.getElementById('tasksInProgress').innerHTML = getNumberOfTasksByStatus1();
    document.getElementById('tasksFeedback').innerHTML = getNumberOfTasksByStatus2();
    document.getElementById('sumCountUrgent').innerHTML = getNumberOfUrgentTasks();
    document.getElementById('deadlineDate').innerHTML = getNextDueDate();
}