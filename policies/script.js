/**
* This function loads functions for firstCall
*/ 
function privacyInitialCall(){
    getCurrentUserFromLocalStorage();
    setTimeout(renderInitialsInHeader, 100);
}