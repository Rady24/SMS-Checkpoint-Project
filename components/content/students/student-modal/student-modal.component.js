import studentModalTemplate from "./student-modal.template.js";
import studentsData from "../../../../data/studentsData.js";
import studentCardTemplate from "../student-card/student-card.template.js";
import * as validate from "../../../../utils/validation.js";

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
function isValidInput(input, value) {
  switch (input) {
    case "Name":
      return validate.isValidName(value);
    case "Grade":
      return validate.isValidGrade(value);
    case "Class":
      return validate.isNonEmptyString(value);
    default:
      return true;
  }
}
function getInputElementValue(input, isEditing) {
  return getElementValueById(`${isEditing ? "edit" : "add"}Student${input}`);
}

function validateAndUpdateDataField(input, value, data, isValid) {
  if (!isValidInput(input, value)) {
    isValid = false;
    displayErrorMessage(`Invalid ${input.toLowerCase()}.`);
  }

  if (input.trim() === "Grade" && isValid) {
    const parsedGrade = parseFloat(value);
    data[input.toLowerCase()] = parsedGrade;
  } else {
    data[input.toLowerCase()] = value;
  }

  return isValid;
}

function updateSubjects(isEditing) {
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

  return subjects;
}

function updateStudent(isEditing, studentId, studentData) {
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
}

function addNewStudent(studentData) {
  const subjects = updateSubjects(false);

  const newStudent = {
    id: studentsData.length + 1,
    ...studentData,
    subjects,
  };

  studentsData.push(newStudent);
}

function updateStudentData(isEditing) {
  const inputs = ["Name", "Class", "Description"];
  const errorMessageElement = document.getElementById("errorMessage");
  errorMessageElement.textContent = "";

  const studentData = {};
  let isValid = true;

  inputs.forEach((input) => {
    const inputValue = getInputElementValue(input, isEditing);
    isValid = validateAndUpdateDataField(
      input,
      inputValue,
      studentData,
      isValid
    );
  });

  const classValue = getInputElementValue("Class", isEditing);
  isValid = validateAndUpdateDataField(
    "Class",
    classValue,
    studentData,
    isValid
  );

  if (!isValid) {
    displayErrorMessage(
      "Please fill in all required fields with valid values."
    );
    return;
  }

  if (isEditing) {
    const studentId = parseInt(getElementValueById("editStudentId"), 10);
    updateStudent(isEditing, studentId, studentData);
  } else {
    addNewStudent(studentData);
  }

  renderStudents();
  hideModal("studentModal");
}

function displayErrorMessage(message) {
  const errorMessageElement = document.getElementById("errorMessage");
  errorMessageElement.textContent = message;
  errorMessageElement.classList.add("text-danger");
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
