/**
 * This function handles user messages
 * 
 * @param {id} elementId       - id of element
 * @param {string} message     - message to be shown
 * @param {class} elementClass - class to be handled
 */
function showMessage(elementId, message, elementClass) {
    let alertOverlay = document.getElementById(elementId);
    alertOverlay.innerText = message;
    alertOverlay.classList.add(elementClass);
    setTimeout(() => {
        alertOverlay.classList.remove(elementClass);
    }, 2000);
}

