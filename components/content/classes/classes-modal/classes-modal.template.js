export default function classModalTemplate(pClass) {
  const isEditing = !!pClass;

  return `
      <div class="modal fade" id="classModal" tabindex="-1" aria-labelledby="classModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="classModalLabel">${
                isEditing ? "Edit" : "Add"
              } Class</h5>
              <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form id="${isEditing ? "edit" : "add"}ClassForm">
                <div class="mb-3">
                  <label for="${
                    isEditing ? "edit" : "add"
                  }className" class="form-label">Class Name:</label>
                  <input type="text" id="${
                    isEditing ? "edit" : "add"
                  }className" class="form-control" ${
    isEditing ? `value="${pClass.className}"` : ""
  } required>
                </div>
                <div class="mb-3">
                  <label for="${
                    isEditing ? "edit" : "add"
                  }teacherName" class="form-label">Teacher's Name:</label>
                  <input type="text" id="${
                    isEditing ? "edit" : "add"
                  }teacherName" class="form-control" ${
    isEditing ? `value="${pClass.teacherName}"` : ""
  } required>
                </div>
                <div class="mb-3">
                  <label for="${
                    isEditing ? "edit" : "add"
                  }description" class="form-label">Description:</label>
                  <textarea id="${
                    isEditing ? "edit" : "add"
                  }description" class="form-control">${
    isEditing ? pClass.description : ""
  }</textarea>
                </div>
                ${
                  isEditing
                    ? `<input type="hidden" id="editClassId" value="${pClass.id}">`
                    : ""
                }
              </form>
              <div id="errorMessage" class="error-message"></div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" id="${
                isEditing ? "saveEdit" : "saveAdd"
              }ButtonClass">${isEditing ? "Save changes" : "Add Class"}</button>
            </div>
          </div>
        </div>
      </div>
    `;
}
