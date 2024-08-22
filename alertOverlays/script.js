function showMessage(elementId, message, elementClass) {
    let alertOverlay = document.getElementById(elementId);
    alertOverlay.innerText = message;
    alertOverlay.classList.add(elementClass);

    setTimeout(() => {
        alertOverlay.classList.remove(elementClass);
    }, 1500);
}

