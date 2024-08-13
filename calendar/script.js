/**
 * Sets the minimum selectable date for the date input field to today's date.
 * @param {string} inputId - The ID of the date input field.
 * @returns {void}
 */
const setMinDateToToday = (inputId) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const todayDate = `${year}-${month}-${day}`;

  const dateInput = document.getElementById(inputId);
    if (dateInput) {
        dateInput.setAttribute('min', todayDate);
    }  
};

setMinDateToToday('boardDate');
