export default function teacherCardTemplate(teacher) {
  return `
      <div class="col-md-4 mb-3">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">${teacher.teacherName}</h5>
            <p class="card-text">Class: ${teacher.teacherClass}</p>
            <p class="card-text">Description: ${teacher.teacherDescription}</p>
            <button class="btn btn-danger btn-sm float-right" data-teacher-id="${teacher.id}" id="deleteTeacher">
            Delete
          </button>
          <button id="editTeacher" class="btn btn-secondary btn-sm float-right mr-2" data-teacher-id="${teacher.id}">
            Edit
          </button>
          </div>
        </div>
      </div>
    `;
}
