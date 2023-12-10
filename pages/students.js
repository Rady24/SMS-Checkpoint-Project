import studentCardComponent from "../components/content/students/student-card/student-card.component.js";
import studentsData from "../data/studentsData.js";

export default function studentsPageTemplate() {
  const studentCards = studentsData
    .map((student) => studentCardComponent(student))
    .join("");

  return `
    <div class="container-md" id="studentsContainer">
      <div class="row" id="studentCardsContainer">${studentCards}</div>
      <button class="btn btn-primary mt-3" id="addStudent">Add</button>
    </div>
  `;
}
