import studentModalTemplate from "./student-modal.template.js";
import studentsData from "../../../../data/studentsData.js";
import studentCardTemplate from "../student-card/student-card.template.js";

let currentStudentId = null;

function getElementValueById(elementId) {
  const element = document.getElementById(elementId);
  return element ? element.value.trim() : "";
}

function getStudentById(studentId) {
  return studentsData.find((student) => student.id === studentId);
}

function renderStudents() {
  const studentsContainer = document.getElementById("studentCardsContainer");

  if (studentsContainer) {
    studentsContainer.innerHTML = studentsData
      .map(studentCardTemplate)
      .join("");
  }
}

function openStudentModal(studentId) {
  const modalId = "studentModal";
  const existingModal = document.getElementById(modalId);

  if (existingModal) {
    existingModal.remove();
  }

  currentStudentId = studentId;
  const studentToEdit = getStudentById(parseInt(studentId, 10));

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

function updateStudentData(isEditing) {
  const inputs = ["Name", "Class", "Description"];
  const errorMessageElement = document.getElementById("errorMessage");
  errorMessageElement.textContent = "";

  const studentData = {};
  let isValid = true;

  const nameRegExp = /^[a-zA-Z\s]+$/;

  const gradeRegExp = /^-?\d*\.?\d+$/;

  inputs.forEach((input) => {
    const inputValue = getElementValueById(
      `${isEditing ? "edit" : "add"}Student${input}`
    );

    if (input.trim() === "Name" && !nameRegExp.test(inputValue)) {
      isValid = false;
      displayErrorMessage("Name must contain only alphabetic characters.");
    }

    if (input.trim() === "Grade") {
      const parsedGrade = parseFloat(inputValue);
      if (isNaN(parsedGrade) || !gradeRegExp.test(inputValue)) {
        isValid = false;
        displayErrorMessage("Grade must be a valid number.");
      } else {
        studentData[input.toLowerCase()] = parsedGrade;
      }
    } else {
      studentData[input.toLowerCase()] = inputValue;
    }
  });
  const classValue = getElementValueById(
    `${isEditing ? "edit" : "add"}StudentClass`
  );
  if (classValue.trim() === "") {
    isValid = false;
    displayErrorMessage("Please select a class.");
  }

  if (!isValid) {
    displayErrorMessage(
      "Please fill in all required fields with valid values."
    );
    return;
  }

  if (isEditing) {
    const studentId = parseInt(getElementValueById("editStudentId"), 10);
    const existingStudent = getStudentById(studentId);

    if (!existingStudent) {
      displayErrorMessage("Student not found");
      return;
    }

    Object.assign(existingStudent, studentData);

    existingStudent.subjects.forEach((subject, index) => {
      const gradeInputValue = getElementValueById(`editSubject${index}`);
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
      const gradeInputValue = getElementValueById(`addSubject${i}`);
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
    displaySuccessMessage("New student added successfully!");
    console.log("New student added:", newStudent);
  }

  renderStudents();
  hideModal("studentModal");
}

function displayErrorMessage(message) {
  const errorMessageElement = document.getElementById("errorMessage");
  errorMessageElement.textContent = message;
  errorMessageElement.classList.add("text-danger");
}

function displaySuccessMessage(message) {
  const errorMessageElement = document.getElementById("errorMessage");
  errorMessageElement.textContent = message;
  errorMessageElement.classList.remove("error");
  errorMessageElement.classList.add("success");
}

function handleSaveButtonClick() {
  if (currentStudentId) {
    updateStudentData(true);
  } else {
    updateStudentData(false);
  }
}

function showModal(modalId) {
  $(`#${modalId}`).modal("show");
}

function hideModal(modalId) {
  $(`#${modalId}`).modal("hide");
}

document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("click", function (event) {
    const targetId = event.target.id;

    if (targetId === "saveEditButton" || targetId === "saveAddButton") {
      handleSaveButtonClick();
    }
  });
});

export default {
  openStudentModal,
  renderStudents,
};
