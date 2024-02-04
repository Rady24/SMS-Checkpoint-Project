export default function classesCardTemplate(classesData) {
  return `
      <div class="col-md-4 mb-3">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">${classesData.className}</h5>
            <p class="card-text">Teacher: ${classesData.teacherName}</p>
            <p class="card-text">Description: ${classesData.description}</p>
            <button class="btn btn-danger btn-sm float-right" data-class-id="${classesData.id}" id="deleteClass">
            Delete
          </button>
          <button id="editClass" class="btn btn-secondary btn-sm float-right mr-2" data-class-id="${classesData.id}">
            Edit
          </button>
          </div>
        </div>
      </div>
    `;
}
