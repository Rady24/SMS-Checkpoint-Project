import controller from "../../../utils/controller.js";
import hardcodedClassesData from "../../../data/classesData.js";
import classesCardTemplate from "./classes-card/classes-card.template.js";
import classesModalComponent from "./classes-modal/classes-modal.component.js";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "../../../utils/storage.js";

let classesData = loadFromLocalStorage("classesData") || hardcodedClassesData;

function addEventListenerClasses() {
  const classesContainer = document.getElementById("classesContainer");
  if (classesContainer) {
    classesContainer.addEventListener("click", function (event) {
      const targetButton = event.target;

      switch (targetButton.id) {
        case "deleteClass":
          const classIdToDelete = targetButton.dataset.classId;
          controller.handleDeleteButtonClick(classIdToDelete, classesData);
          controller.render(
            "classCardsContainer",
            classesData,
            classesCardTemplate
          );
          saveToLocalStorage("classesData", classesData);

          break;
        case "editClass":
          const classIdToEdit = targetButton.dataset.classId;
          classesModalComponent.openClassModal(classIdToEdit, classesData);

          break;
        case "addClass":
          classesModalComponent.openClassModal(undefined, classesData);
          break;
        default:
          break;
      }
    });
  }
}
export default {
  addEventListenerClasses,
};
