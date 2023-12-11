import studentsData from "../../../data/studentsData.js";
import studentModalComponent from "./student-modal/student-modal.component.js";
import controller from "../../../utils/controller.js";
import studentCardTemplate from "./student-card/student-card.template.js";

function addEventListenerStudents() {
  const studentsContainer = document.getElementById("studentsContainer");
  if (studentsContainer) {
    studentsContainer.addEventListener("click", function (event) {
      const targetButton = event.target;

      switch (targetButton.id) {
        case "deleteStudent":
          const studentIdToDelete = targetButton.dataset.studentId;
          controller.handleDeleteButtonClick(studentIdToDelete, studentsData);
          controller.render(
            "studentCardsContainer",
            studentsData,
            studentCardTemplate
          );

          break;
        case "editStudent":
          const studentIdToEdit = targetButton.dataset.studentId;
          studentModalComponent.openStudentModal(studentIdToEdit);
          break;
        case "addStudent":
          studentModalComponent.openStudentModal();
          break;
        default:
          break;
      }
    });
  }
}

export default {
  addEventListenerStudents,
};
