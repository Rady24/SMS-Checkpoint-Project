import controller from "../../../utils/controller.js";
import classesData from "../../../data/classesData.js";
import classesCardTemplate from "./classes-card/classes-card.template.js";
import classesModalComponent from "./classes-modal/classes-modal.component.js";

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

          break;
        case "editClass":
          const classIdToEdit = targetButton.dataset.classId;
          classesModalComponent.openClassModal(classIdToEdit);

          break;
        case "addClass":
          classesModalComponent.openClassModal();
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
