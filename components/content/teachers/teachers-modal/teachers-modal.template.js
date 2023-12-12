export default function teacherModalTemplate(teacher) {
  const isEditing = !!teacher;

  return `
        <div class="modal fade" id="teacherModal" tabindex="-1" aria-labelledby="teacherModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="teacherModalLabel">${
                  isEditing ? "Edit" : "Add"
                } Teacher</h5>
                <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form id="${isEditing ? "edit" : "add"}TeacherForm">
                  <div class="mb-3">
                    <label for="${
                      isEditing ? "edit" : "add"
                    }teacherName" class="form-label">Teacher's Name:</label>
                    <input type="text" id="${
                      isEditing ? "edit" : "add"
                    }teacherName" class="form-control" ${
    isEditing ? `value="${teacher.teacherName}"` : ""
  } required>
                  </div>
                  <div class="mb-3">
                    <label for="${
                      isEditing ? "edit" : "add"
                    }teacherClass" class="form-label">Class:</label>
                    <input type="text" id="${
                      isEditing ? "edit" : "add"
                    }teacherClass" class="form-control" ${
    isEditing ? `value="${teacher.teacherClass}"` : ""
  } required>
                  </div>
                  <div class="mb-3">
                    <label for="${
                      isEditing ? "edit" : "add"
                    }teacherDescription" class="form-label">Description:</label>
                    <textarea id="${
                      isEditing ? "edit" : "add"
                    }teacherDescription" class="form-control">${
    isEditing ? teacher.teacherDescription : ""
  }</textarea>
                  </div>
                  ${
                    isEditing
                      ? `<input type="hidden" id="editTeacherId" value="${teacher.id}">`
                      : ""
                  }
                </form>
                <div id="errorMessage" class="error-message"></div>

              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" id="${
                  isEditing ? "saveEditTeacher" : "saveAddTeacher"
                }Button">${isEditing ? "Save changes" : "Add Teacher"}</button>
              </div>
            </div>
          </div>
        </div>
      `;
}
