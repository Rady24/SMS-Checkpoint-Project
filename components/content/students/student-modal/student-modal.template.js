import studentsData from "../../../../data/studentsData.js";

function addClassChangeListener(isEditing) {
  document.addEventListener("change", function (event) {
    const { id, value } = event.target;

    if (id === "addStudentClass") {
      const subjectGradesContainer = document.getElementById(
        "subjectGradesContainer"
      );

      if (subjectGradesContainer) {
        const classSubjects = getClassSubjects(value, isEditing);
        subjectGradesContainer.innerHTML = generateSubjectInputs(classSubjects);
      }
    }
  });
}

function getClassSubjects(selectedClass, isEditing) {
  const selectedStudent = studentsData.find(
    (student) => student.class === selectedClass
  );
  return (selectedStudent?.subjects || []).map((subject, index) => ({
    name: subject.name,
    id: isEditing ? `editSubject${index}` : `addSubject${index}`,
  }));
}
function generateSubjectInputs(subjects, isEditing) {
  return subjects
    .map(({ name, id }, index) => {
      const inputValue = isEditing ? 0 : "";
      return `
        <div class="mb-3">
          <label id="nameSubject${index}" for="${id}${index}" class="form-label" value="${name}">${name}</label>
          <input type="text" id="${id}" class="form-control" value="${inputValue}">
        </div>`;
    })
    .join("");
}

export default function studentModalTemplate(student) {
  const isEditing = !!student;

  const classes = [...new Set(studentsData.map((student) => student.class))];
  const selectedClass = isEditing ? student.class : "";
  const subjects =
    student && student.subjects && student.subjects.length > 0
      ? student.subjects
      : [];

  addClassChangeListener(isEditing);

  return `
    <div class="modal fade" id="studentModal" tabindex="-1" aria-labelledby="studentModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="studentModalLabel">${
              isEditing ? "Edit" : "Add"
            } Student</h5>
            <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form id="${isEditing ? "edit" : "add"}StudentForm">
              <div class="mb-3">
                <label for="${
                  isEditing ? "edit" : "add"
                }StudentName" class="form-label">Name:</label>
                <input type="text" id="${
                  isEditing ? "edit" : "add"
                }StudentName" class="form-control" ${
    isEditing ? `value="${student.name}"` : ""
  } required>
              </div>
              <div class="mb-3">
                <label for="${
                  isEditing ? "edit" : "add"
                }StudentClass" class="form-label">Class:</label>
                <select id="${
                  isEditing ? "edit" : "add"
                }StudentClass" class="form-control" ${
    isEditing ? "disabled" : ""
  } required>
                  ${
                    isEditing
                      ? classes.map(
                          (cls) =>
                            `<option value="${cls}" ${
                              selectedClass === cls ? "selected" : ""
                            }>${cls}</option>`
                        )
                      : [
                          "<option value='' selected disabled>Choose the class</option>",
                          ...classes.map(
                            (cls) => `<option value="${cls}">${cls}</option>`
                          ),
                        ]
                  }
                </select>
              </div>
              <div class="mb-3">
                <label for="${
                  isEditing ? "edit" : "add"
                }StudentDescription" class="form-label">Description:</label>
                <textarea id="${
                  isEditing ? "edit" : "add"
                }StudentDescription" class="form-control">${
    isEditing ? student.description : ""
  }</textarea>
              </div>
              <div class="mb-3" id="subjectGradesContainer">
                ${subjects
                  .map(
                    (subject, index) => `
                      <div class="mb-3">
                        <label for="${
                          isEditing ? "edit" : "add"
                        }Subject${index}" class="form-label">${
                      subject.name
                    } Grade:</label>
                        <input type="text" id="${
                          isEditing ? "edit" : "add"
                        }Subject${index}" class="form-control" value="${
                      isEditing ? subject.grade : ""
                    }">
                      </div>
                    `
                  )
                  .join("")}
              </div>
              ${
                isEditing
                  ? `<input type="hidden" id="editStudentId" value="${student.id}">`
                  : ""
              }
            </form>
            <div id="errorMessage" class="error-message"></div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" id="${
              isEditing ? "saveEdit" : "saveAdd"
            }ButtonStudent">${
    isEditing ? "Save changes" : "Add Student"
  }</button>
          </div>
        </div>
      </div>
    </div>
  `;
}
