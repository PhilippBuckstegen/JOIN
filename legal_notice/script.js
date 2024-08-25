/**
* This function loads functions for firstCall
*/ 
function legalNoticeInitialCall(){
    getCurrentUserFromLocalStorage();
    setTimeout(renderInitialsInHeader, 100);
}