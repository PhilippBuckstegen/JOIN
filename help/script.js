/**
* This function loads functions for firstCall
*/ 
function helpInitialCall(){
    getCurrentUserFromLocalStorage();
    setTimeout(renderInitialsInHeader, 100);
}