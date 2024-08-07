let tasks = [];

async function getTasksFromDatabase() {
    let data = await loadData("https://devakademie-default-rtdb.europe-west1.firebasedatabase.app/","tasks");
    if (Array.isArray(data)) {
        tasks = data;
    } else if (typeof data === 'object') {
        tasks = Object.values(data);
    } else {
        tasks = [];
    }
}


async function writetasksToDatabase() {
    await postData("https://devakademie-default-rtdb.europe-west1.firebasedatabase.app/", "tasks", tasks);
    // await getContactsFromDatabase();
  }
  

async function addNewTaskToDatabase(){
    // setAllPrevousItemsLastAddedFalse(contacts);
    writeNewTaskToLocalArray();
    // toggleAddContactOverlay()
    // sortContactsByInitials(contacts);
    // addRandomColorToJSON(contacts);
    // await writeContactsToDatabase();
    // await renderContacts();
    // showContactDetails(findLastAddedIndex(contacts));
  }

function writeNewTaskToLocalArray() {
    let addTaskTitle = document.getElementById('newTaskTitle');
    let addTaskDescription = document.getElementById('newTaskDescription');
    let addTaskAssignedTo = document.getElementById('newTaskAssignedTo');
    let addTaskDueDate = document.getElementById('newTaskDueDate');
    let addTaskPriority = document.getElementById('newTaskPriority');
    let addTaskCategory = document.getElementById('newTaskCategory');
    let addTaskSubtask = document.getElementById('newTaskSubtasks');
    let newTask = {
        "title": addTaskTitle.value,
        "description": addTaskDescription.value,
        "dueDate": addTaskDueDate.value,
        "priority": addTaskPriority.value,
        "taskCategory": addTaskCategory.value,
        "assignedTo": [
            {"user": addTaskAssignedTo.value},
            {"user": "Marianne"}
            ],
        "subtask": [
            {"task": addTaskSubtask.value},
            {"task": "abschütteln"}
            ]
    };
    
    tasks.push(newTask);
}