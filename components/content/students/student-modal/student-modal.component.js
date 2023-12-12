import studentModalTemplate from "./student-modal.template.js";
import hardcodedStudentsData from "../../../../data/studentsData.js";
import studentCardTemplate from "../student-card/student-card.template.js";
import controller from "../../../../utils/controller.js";
import {
  displayErrorMessage,
  showModal,
  hideModal,
} from "../../../../utils/ui.js";
import { isValidGrade, isValidName } from "../../../../utils/validation.js";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "../../../../utils/storage.js";

let currentStudentId = null;
let studentsData =
  loadFromLocalStorage("studentsData") || hardcodedStudentsData;

function openStudentModal(studentId, studentsData) {
  const modalId = "studentModal";
  const existingModal = document.getElementById(modalId);

  if (existingModal) {
    existingModal.remove();
  }

  currentStudentId = studentId;
  const studentToEdit = controller.getElementById(
    parseInt(studentId, 10),
    studentsData
  );

  const studentModalHTML = studentModalTemplate(studentToEdit);

  const studentsContainer = document.getElementById("studentsContainer");
  if (studentsContainer) {
    studentsContainer.insertAdjacentHTML("beforeend", studentModalHTML);
  }

  showModal(modalId);
}

function parseGradeInput(inputValue) {
  const parsedGrade = Number(inputValue);

  if (!isNaN(parsedGrade)) {
    return parsedGrade;
  }
}

function updateStudentData(isEditing, studentsData) {
  const inputs = ["Name", "Class", "Description"];
  const errorMessageElement = document.getElementById("errorMessage");
  errorMessageElement.textContent = "";

  const studentData = {};
  let isValid = true;

  inputs.forEach((input) => {
    const inputValue = controller.getElementValueById(
      `${isEditing ? "edit" : "add"}Student${input}`
    );

    if (input.trim() === "Name" && !isValidName(inputValue)) {
      isValid = false;
      displayErrorMessage("Name must contain only alphabetic characters.");
    }

    if (input.trim() === "Grade") {
      const parsedGrade = parseFloat(inputValue);
      if (isNaN(parsedGrade) || !isValidGrade(inputValue)) {
        isValid = false;
        displayErrorMessage("Grade must be a valid number.");
      } else {
        studentData[input.toLowerCase()] = parsedGrade;
      }
    } else {
      studentData[input.toLowerCase()] = inputValue;
    }
  });
  const classValue = controller.getElementValueById(
    `${isEditing ? "edit" : "add"}StudentClass`
  );
  if (classValue.trim() === "") {
    isValid = false;
    displayErrorMessage("Please select a class.");
  }

  if (!isValid) {
    return;
  }

  if (isEditing) {
    const studentId = parseInt(
      controller.getElementValueById("editStudentId"),
      10
    );
    const existingStudent = controller.getElementById(studentId, studentsData);

    if (!existingStudent) {
      displayErrorMessage("Student not found");
      return;
    }

    Object.assign(existingStudent, studentData);

    existingStudent.subjects.forEach((subject, index) => {
      const gradeInputValue = controller.getElementValueById(
        `editSubject${index}`
      );
      subject.grade = parseGradeInput(gradeInputValue);
    });
  } else {
    const subjects = [];
    const subjectCount = 3;

    for (let i = 0; i < subjectCount; i++) {
      const subjectNameElement = document.getElementById(`nameSubject${i}`);

      if (!subjectNameElement) {
        displayErrorMessage(`Subject name element not found for index ${i}`);
        continue;
      }

      const subjectName = subjectNameElement.innerText;
      const gradeInputValue = controller.getElementValueById(`addSubject${i}`);
      const parsedGrade = parseGradeInput(gradeInputValue);

      if (subjectName && parsedGrade !== undefined) {
        subjects.push({ name: subjectName, grade: parsedGrade });
      } else {
        subjects.push({ name: subjectName, grade: 0 });
      }
    }

    const newStudent = {
      id: studentsData.length + 1,
      ...studentData,
      subjects,
    };
    studentsData.push(newStudent);
    saveToLocalStorage("studentsData", studentsData);
  }

  controller.render("studentCardsContainer", studentsData, studentCardTemplate);
  hideModal("studentModal");
}

function handleSaveButtonClick(studentsData) {
  if (currentStudentId) {
    updateStudentData(true, studentsData);
    saveToLocalStorage("studentsData", studentsData);
  } else {
    updateStudentData(false, studentsData);
    saveToLocalStorage("studentsData", studentsData);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("click", function (event) {
    const targetId = event.target.id;

    if (
      targetId === "saveEditButtonStudent" ||
      targetId === "saveAddButtonStudent"
    ) {
      handleSaveButtonClick(studentsData);
    }
  });
});

export default {
  openStudentModal,
};
