
async function initSummary() {
    await getTasksFromDatabase();
    getCurrentUserFromLocalStorage(); //Heiko zugefügt
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
    let greetings = document.getElementById('summaryGreeting');
    let mobileGreeting = document.getElementById('mobileGreeting');
    
    renderTimeOfDay();
    mobileGreeting.innerHTML = '';
    greetings.innerHTML = '';
    renderGreetingUser();
}


function renderGreetingUser() {    
    let greetings = document.getElementById('summaryGreeting');
    let mobileGreeting = document.getElementById('mobileGreeting');
    mobileGreeting.innerHTML = /*html*/`
        <p class="mobile-overlay-greeting">${timeOfDay},</p>
        <!-- <p class="mobile-greeting-user">User Beispiel</p> -->
        <p class="mobile-greeting-user">${loggedInUser[0].name}</p>
    `   
    greetings.innerHTML = /*html*/`
        <p id="greeting" class="p-greeting">${timeOfDay},</p>
        <!-- <p class="greeting-user">User Beispiel</p> -->
        <p class="greeting-user">${loggedInUser[0].name}</p>
    `
}

function loggedInAsGuest() {
    return loggedInUser.length === 0;
}

function getNumberOfTasksByStatus(status) {
    let filteredStatus = tasks.filter(task => task.status === status);
    return filteredStatus.length;
}

function getNumberOfUrgentTasks() {
    let urgentTasks = tasks.filter(task => task.priority === 3);
    urgentTasks = urgentTasks.length;
    return urgentTasks;
}

function getNextDueDate() {
    let currentDate = new Date();
    let upcomingTasks = tasks.filter(task => new Date(task.dueDate) > currentDate);
    upcomingTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    return upcomingTasks.length > 0 ? upcomingTasks[0].dueDate : null;
}

function renderSummary() {
    document.getElementById('tasksInBoard').innerHTML = tasks.length;
    document.getElementById('sumCountTodo').innerHTML = getNumberOfTasksByStatus(0);
    document.getElementById('sumCountDone').innerHTML = getNumberOfTasksByStatus(3);
    document.getElementById('tasksInProgress').innerHTML = getNumberOfTasksByStatus(1);
    document.getElementById('tasksFeedback').innerHTML = getNumberOfTasksByStatus(2);
    document.getElementById('sumCountUrgent').innerHTML = getNumberOfUrgentTasks();
    document.getElementById('deadlineDate').innerHTML = getNextDueDate();
}