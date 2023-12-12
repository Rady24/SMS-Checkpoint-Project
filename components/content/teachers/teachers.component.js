import controller from "../../../utils/controller.js";
import hardcodedTeachersData from "../../../data/teachersData.js";
import teacherCardTemplate from "./teacher-card/teacher-card.template.js";
import teachersModalComponent from "./teachers-modal/teachers-modal.component.js";
import { loadFromLocalStorage } from "../../../utils/storage.js";

let teachersData =
  loadFromLocalStorage("teachersData") || hardcodedTeachersData;

function addEventListenerTeachers() {
  const teachersContainer = document.getElementById("teachersContainer");
  if (teachersContainer) {
    teachersContainer.addEventListener("click", function (event) {
      const targetButton = event.target;

      switch (targetButton.id) {
        case "deleteTeacher":
          const teacherIdToDelete = targetButton.dataset.teacherId;
          controller.handleDeleteButtonClick(teacherIdToDelete, teachersData);
          controller.render(
            "teacherCardsContainer",
            teachersData,
            teacherCardTemplate
          );
          saveToLocalStorage("teachersData", teachersData);

          break;
        case "editTeacher":
          const teacherIdToEdit = targetButton.dataset.teacherId;
          teachersModalComponent.openTeacherModal(
            teacherIdToEdit,
            teachersData
          );

          break;
        case "addTeacher":
          teachersModalComponent.openTeacherModal(undefined, teachersData);
          break;
        default:
          break;
      }
    });
  }
}
export default {
  addEventListenerTeachers,
};
