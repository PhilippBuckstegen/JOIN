/**
 * Initializes the jQuery UI Datepicker and sets today's date in the input field.
 */
$(function () {
  $("#datepicker").datepicker({
    dateFormat: "dd.mm.yy",
    minDate: 0,
    onSelect: function (dateText) {
      console.log("Ausgewähltes Datum: " + dateText);
    },
  });

  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  const todayStr = `${day}.${month}.${year}`;

  $("#datepicker").val(todayStr);
})


/**
 * Restricts the date so you can't pick dates in the past.
 * @param {string} inputID - The ID of the input field that will be checked.
 *//*
function setMinDate(inputID) {
    const minDate = getCurrentDateAsString();
    document.getElementById(inputID).setAttribute("min", minDate);
  } */
  
  /**
   * Gets the current date.
   * @returns {string} current date as 'YYYY-MM-DD'.
   *//*
  function getCurrentDateAsString() {
    const dateToday = new Date();
    const month = (dateToday.getMonth() + 1).toString().padStart(2, "0");
    const day = dateToday.getDate().toString().padStart(2, "0");
    const year = dateToday.getFullYear();
  
    return `${year}-${month}-${day}`;
  } */
  
  
