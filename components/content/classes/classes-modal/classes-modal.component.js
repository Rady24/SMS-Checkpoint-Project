import classesData from "../../../../data/classesData.js";
import controller from "../../../../utils/controller.js";
import classesCardTemplate from "../classes-card/classes-card.template.js";
import classModalTemplate from "./classes-modal.template.js";
import { isNonEmptyString } from "../../../../utils/validation.js";
import {
  displayErrorMessage,
  showModal,
  hideModal,
} from "../../../../utils/ui.js";

let currentClassId = null;

function updateClassData(isEditing) {
  const inputs = ["className", "teacherName", "description"];
  const errorMessageElement = document.getElementById("errorMessage");
  errorMessageElement.textContent = "";

  const classData = {};
  let isValid = true;

  inputs.forEach((input) => {
    const inputValue = controller.getElementValueById(
      `${isEditing ? "edit" : "add"}${input}`
    );
    if (isNonEmptyString(inputValue)) {
      classData[input] = inputValue;
    } else {
      isValid = false;
    }
  });
  if (!isValid) {
    displayErrorMessage("input should not be empty");
    return;
  }

  if (isEditing) {
    const classId = parseInt(controller.getElementValueById("editClassId"), 10);
    const existingClass = getClassById(classId);

    Object.assign(existingClass, classData);
  } else {
    const newClass = {
      id: classesData.length + 1,
      ...classData,
    };
    classesData.push(newClass);
  }

  controller.render("classCardsContainer", classesData, classesCardTemplate);
  hideModal("classModal");
}

function handleSaveButtonClick() {
  if (currentClassId) {
    updateClassData(true);
  } else {
    updateClassData(false);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("click", function (event) {
    const targetId = event.target.id;

    if (
      targetId === "saveEditButtonClass" ||
      targetId === "saveAddButtonClass"
    ) {
      handleSaveButtonClick();
    }
  });
});

function openClassModal(classId) {
  const modalId = "classModal";
  const existingModal = document.getElementById(modalId);

  if (existingModal) {
    existingModal.remove();
  }

  currentClassId = classId;
  const classToEdit = controller.getElementById(
    parseInt(classId, 10),
    classesData
  );

  const classModalHTML = classModalTemplate(classToEdit);

  const classContainer = document.getElementById("classesContainer");
  if (classContainer) {
    classContainer.insertAdjacentHTML("beforeend", classModalHTML);
  }

  showModal(modalId);
}

export default {
  openClassModal,
};
