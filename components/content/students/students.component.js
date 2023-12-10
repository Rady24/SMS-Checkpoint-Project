import studentsData from "../../../data/studentsData.js";
import studentModalComponent from "./student-modal/student-modal.component.js";

function handleDeleteButtonClick(studentId) {
  const indexToDelete = studentsData.findIndex(
    (student) => student.id === parseInt(studentId, 10)
  );

  if (indexToDelete !== -1) {
    studentsData.splice(indexToDelete, 1);
    studentModalComponent.renderStudents();
  }
}

function handleEditButtonClick(studentId) {
  studentModalComponent.openStudentModal(studentId);
  studentModalComponent.renderStudents();
}

function addEventListenerStudents() {
  const studentsContainer = document.getElementById("studentsContainer");
  if (studentsContainer) {
    studentsContainer.addEventListener("click", function (event) {
      const targetButton = event.target;

      switch (targetButton.id) {
        case "deleteStudent":
          const studentIdToDelete = targetButton.dataset.studentId;
          handleDeleteButtonClick(studentIdToDelete);
          break;
        case "editStudent":
          const studentIdToEdit = targetButton.dataset.studentId;
          handleEditButtonClick(studentIdToEdit);
          break;
        case "addStudent":
          handleEditButtonClick();
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
