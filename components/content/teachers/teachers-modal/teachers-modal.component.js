import hardcodedStudentsData from "../../../../data/teachersData.js";
import controller from "../../../../utils/controller.js";
import teacherCardTemplate from "../teacher-card/teacher-card.template.js";
import teacherModalTemplate from "./teachers-modal.template.js";
import { isNonEmptyString } from "../../../../utils/validation.js";
import {
  displayErrorMessage,
  showModal,
  hideModal,
} from "../../../../utils/ui.js";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "../../../../utils/storage.js";

let currentTeacherId = null;
let teachersData =
  loadFromLocalStorage("teachersData") || hardcodedStudentsData;

function updateTeacherData(isEditing, teachersData) {
  const inputs = ["teacherName", "teacherClass", "teacherDescription"];
  const errorMessageElement = document.getElementById("errorMessage");
  errorMessageElement.textContent = "";

  const teacherData = {};
  let isValid = true;

  inputs.forEach((input) => {
    const inputValue = controller.getElementValueById(
      `${isEditing ? "edit" : "add"}${input}`
    );
    if (isNonEmptyString(inputValue)) {
      teacherData[input] = inputValue;
    } else {
      isValid = false;
      displayErrorMessage("All fields are required", errorMessageElement);
    }
  });

  if (!isValid) {
    return;
  }

  if (isEditing) {
    const teacherId = parseInt(
      controller.getElementValueById("editTeacherId"),
      10
    );
    const existingTeacher = controller.getElementById(teacherId, teachersData);
    Object.assign(existingTeacher, teacherData);
  } else {
    const newTeacher = {
      id: teachersData.length + 1,
      ...teacherData,
    };
    teachersData.push(newTeacher);
    saveToLocalStorage("teachersData", teachersData);
  }

  controller.render("teacherCardsContainer", teachersData, teacherCardTemplate);
  hideModal("teacherModal");
}

function handleSaveTeacherButtonClick(teachersData) {
  updateTeacherData(!!currentTeacherId, teachersData);
  saveToLocalStorage("teachersData", teachersData);
}

document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("click", function (event) {
    const targetId = event.target.id;
    if (
      targetId === "saveEditTeacherButton" ||
      targetId === "saveAddTeacherButton"
    ) {
      handleSaveTeacherButtonClick(teachersData);
    }
  });
});

function openTeacherModal(teacherId, teachersData) {
  const modalId = "teacherModal";
  const existingModal = document.getElementById(modalId);

  if (existingModal) {
    existingModal.remove();
  }
  currentTeacherId = teacherId;
  const teacherToEdit = teacherId
    ? controller.getElementById(parseInt(teacherId, 10), teachersData)
    : null;

  const teacherModalHTML = teacherModalTemplate(teacherToEdit);
  const teacherContainer = document.getElementById("teachersContainer");
  if (teacherContainer) {
    teacherContainer.insertAdjacentHTML("beforeend", teacherModalHTML);
  }
  showModal(modalId);
}

export default {
  openTeacherModal,
};
