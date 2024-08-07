/**
 * Initializes the jQuery UI Datepicker on the input field with the ID 'datepicker'.
 */
$(document).ready(function () {
    $("#datepicker").datepicker(); // Initializes the Datepicker on the input field with ID 'datepicker'
  });
  

/**
 * Initializes the jQuery UI Datepicker and sets today's date in the input field.
 */
$(function () {
  // Initialize the Datepicker
  $("#datepicker").datepicker({
    dateFormat: "dd.mm.yy", // Date format
    minDate: 0, // Prevents selection of past dates
    onSelect: function (dateText) {
      // Optional: Action when a date is selected
      console.log("Selected Date: " + dateText);
    },
  });

  // Set today's date as the value of the input field
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  const todayStr = `${day}.${month}.${year}`;

  $("#datepicker").val(todayStr);
});


/* Alternative for Custom Month and Day Names */

/**
 * Initializes the jQuery UI Datepicker, customizes month and day names, and sets today's date in the input field.
 */
$(function () {
  $("#datepicker").datepicker({
    dateFormat: "dd.mm.yy", // Date format
    minDate: 0, // Prevents selection of past dates
    monthNames: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    dayNames: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    onSelect: function (dateText) {
      // Optional: Action when a date is selected
      console.log("Selected Date: " + dateText);
    },
  });

  // Set today's date as the value of the input field
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  const todayStr = `${day}.${month}.${year}`;

  $("#datepicker").val(todayStr);
});


/* Older Versions */


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
  
  
