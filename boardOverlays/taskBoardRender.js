/**
 * This function renders the dropdown list for assigend users
 */
function renderDropdown() {
    const dropdownContent = document.querySelector(".dropdown-content");
    contacts.forEach((contact, index) => {
      const label = document.createElement("label");
      const nameSpan = document.createElement("span");
      nameSpan.className = "label-initials";
      const initialsSpan = document.createElement("span");
      initialsSpan.className = "initials-dropdown";
      initialsSpan.id = `initials${index}`;
      initialsSpan.textContent = contact.initials;
      const nameTextNode = document.createTextNode(`${contact.name}`);
      nameSpan.appendChild(initialsSpan);
      nameSpan.appendChild(nameTextNode);
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = `contact_${index}`;
      checkbox.value = contact.name;
      label.appendChild(nameSpan);
      label.appendChild(checkbox);
      dropdownContent.appendChild(label);
      document.getElementById(`initials${index}`).style.backgroundColor = `${contact.backgroundColor}`;
    });
  }
  
  /**
 * This function toggles the dropdown for the assigned users
 */
function toggleDropdown() {
    const dropdown = document.getElementById("contactDropdown");
    dropdown.classList.toggle("open");
    if (!dropdown.classList.contains("open")) {
      updateSelectedContacts();
    }
  }

/**
 * This function renders the selected names
 * @param {JSON} selectedContacts - JSON with selected contacts
 */
function renderSelectedNames(selectedContacts){
    let limit = 3;
    if(selectedContacts.length > 0){
      if(selectedContacts.length <= limit){
      for (let j = 0; j < selectedContacts.length; j++) {
        let selectedContactsArea = document.getElementById(`selectedContacts`);
        const contact = selectedContacts[j];
        selectedContactsArea.innerHTML += /*html*/ `
            <div id="selectedContactIcon${j}" class="contact-icon assigned-contact-icon">${selectedContacts[j].initials}</div>
        `;
      document.getElementById(`selectedContactIcon${j}`).style.backgroundColor = contact.backgroundColor;
        }
      } else {
      for(let j = 0; j < limit; j++){
          let selectedContactsArea = document.getElementById(`selectedContacts`);
          const contact = selectedContacts[j];
          selectedContactsArea.innerHTML += /*html*/ `
               <div id="selectedContactIcon${j}" class="contact-icon assigned-contact-icon">${selectedContacts[j].initials}</div>
          `;
          document.getElementById(`selectedContactIcon${j}`).style.backgroundColor = contact.backgroundColor;
      }
      renderSelectedNamesGreaterThanLimitOverview(selectedContacts, limit);
    }
  }
  }
  
/**
 * This function renders subtasks
 */
function renderSubtasks() {
    let listArea = document.getElementById("subtaskList");
    listArea.innerHTML = "";
    for (i = 0; i < subtask.length; i++) {
      listArea.innerHTML += /*html*/ `
            <li id="subtaskListItem${i}" class="subtaskListItems flexContainer">
              <div class="subtaskListItemsContainers flexContainer"><span class="sub-task-text-list" id="subTaskTextListItem${i}">${subtask[i].task}</span></div>
                
                <span id="singleSubTaskButtons${i}" class="singleSubtaskButtons flexContainer">
                    <img id="editSubtaskIcon" class="hidden" onclick="editSubtaskItem(${i})" src="../database/images/edit.svg" alt="icon">
                    <img id="binSubtaskIcon" class="hidden" onclick="deleteSubtaskItem(${i})" src="../database/images/delete.svg" alt="icon">
                <span>
            </li>
        `;
    }
  }

  /**
 * This function renders subtasks in edit view
 * @param {number} x - index of task for subtask
 */
function editAreaRenderSubtasks(x) {
    let listArea = document.getElementById("editSubtaskList");
    listArea.innerHTML = "";
    for (i = 0; i < tasks[x].subtask.length; i++) {
      listArea.innerHTML += /*html*/ `
          <li id="editSubtaskListItem${i}" class="subtaskListItems flexContainer">
              <span class="sub-task-text-list" id="editSubTaskTextListItem${i}">${tasks[x].subtask[i].task}</span>
              <span id="editSingleSubTaskButtons${i}" class="singleSubtaskButtons flexContainer">
                    <img id="editSubtaskIcon" class="hidden" onclick="editAreaEditSubtaskItem(${x},${i})" src="../database/images/edit.svg" alt="icon">
                    <img id="binSubtaskIcon" class="hidden" onclick="editAreaDeleteSubtaskItem(${x},${i})" src="../database/images/delete.svg" alt="icon">
                <span>
          </li>
      `;
    }
  }