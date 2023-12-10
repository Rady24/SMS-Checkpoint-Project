export default function studentCardTemplate(student) {
  const averageGrade = calculateAverageGrade(student.subjects);

  return `
    <div class="col-md-4 mb-3">
      <div class="card h-100">
        <div class="card-body">
          <h5 class="card-title">${student.name}</h5>
          <p class="card-text">Class: ${student.class}</p>
          <p class="card-text">Description: ${student.description}</p>
          <p class="card-text">Average Grade: ${averageGrade}</p>
          <button class="btn btn-danger btn-sm float-right" data-student-id="${student.id}" id="deleteStudent">
            Delete
          </button>
          <button id="editStudent" class="btn btn-secondary btn-sm float-right mr-2" data-student-id="${student.id}">
            Edit
          </button>
        </div>
      </div>
    </div>
  `;
}

function calculateAverageGrade(subjects) {
  if (subjects) {
    const totalGrades = subjects.reduce(
      (sum, subject) => sum + subject.grade,
      0
    );
    return (totalGrades / subjects.length).toFixed(2);
  }
}
