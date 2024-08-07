"use strict";

const urgentBtn = document.getElementById("urgentBtn");
const urgentImg = document.getElementById("urgentImg");
const mediumBtn = document.getElementById("mediumBtn");
const mediumImg = document.getElementById("mediumImg");
const lowBtn = document.getElementById("lowBtn");
const lowImg = document.getElementById("lowImg");

function urgentBtnToggle() {
  if (urgentBtn.classList.contains("whiteButtons")) {
    urgentBtn.classList.remove("whiteButtons");
    urgentBtn.style.backgroundColor = "#FF3D00";
    urgentBtn.style.color = "#fff";
    urgentImg.src = "../database/images/prio_alta_white.svg";
  } else {
    urgentBtn.classList.add("whiteButtons");
    urgentImg.src = "../database/images/prio_alta.svg";
  }

  if (!urgentBtn.classList.contains("whiteButtons")) {
    mediumBtn.classList.add("whiteButtons");
    mediumImg.src = "../database/images/prio_media.svg";
  }

  if (!lowBtn.classList.contains("whiteButtons")) {
    lowBtn.classList.add("whiteButtons");
    lowImg.src = "../database/images/prio_baja.svg";
  }

  const urgentSelected = !urgentBtn.classList.contains("whiteButtons")
    ? true
    : false;

  return urgentSelected;
}

function mediumBtnToggle() {
  if (mediumBtn.classList.contains("whiteButtons")) {
    mediumBtn.classList.remove("whiteButtons");
    mediumBtn.style.backgroundColor = "#FFA800";
    mediumBtn.style.color = "#fff";
    mediumImg.src = "../database/images/prio_media_white.svg";
  } else {
    mediumBtn.classList.add("whiteButtons");
    mediumImg.src = "../database/images/prio_media.svg";
  }

  if (!urgentBtn.classList.contains("whiteButtons")) {
    urgentBtn.classList.add("whiteButtons");
    urgentImg.src = "../database/images/prio_alta.svg";
  }

  if (!lowBtn.classList.contains("whiteButtons")) {
    lowBtn.classList.add("whiteButtons");
    lowImg.src = "../database/images/prio_baja.svg";
  }

  const mediumSelected = !mediumBtn.classList.contains("whiteButtons")
    ? true
    : false;

  return mediumSelected;
}

function lowBtnToggle() {
  if (lowBtn.classList.contains("whiteButtons")) {
    lowBtn.classList.remove("whiteButtons");
    lowBtn.style.backgroundColor = "#7AE229";
    lowBtn.style.color = "#fff";
    lowImg.src = "../database/images/prio_baja_white.svg";
  } else {
    lowBtn.classList.add("whiteButtons");
    lowImg.src = "../database/images/prio_baja.svg";
  }

  if (!urgentBtn.classList.contains("whiteButtons")) {
    urgentBtn.classList.add("whiteButtons");
    urgentImg.src = "../database/images/prio_alta.svg";
  }

  if (!mediumBtn.classList.contains("whiteButtons")) {
    mediumBtn.classList.add("whiteButtons");
    mediumImg.src = "../database/images/prio_media.svg";
  }

  const lowSelected = !lowBtn.classList.contains("whiteButtons") ? true : false;

  return lowSelected;
}

urgentBtn.addEventListener("click", urgentBtnToggle);

mediumBtn.addEventListener("click", mediumBtnToggle);

lowBtn.addEventListener("click", lowBtnToggle);

mediumBtn.click();
