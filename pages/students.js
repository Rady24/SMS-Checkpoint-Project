import studentCardComponent from "../components/content/students/student-card/student-card.component.js";
import hardcodedStudentsData from "../data/studentsData.js";
import { loadFromLocalStorage } from "../utils/storage.js";

export default function studentsPageTemplate() {
  let studentsData =
    loadFromLocalStorage("studentsData") || hardcodedStudentsData;
  const studentCards = studentsData
    .map((student) => studentCardComponent(student))
    .join("");

  return `
    <div class="container-md" id="studentsContainer">
    <h1 class="text-center m-4">Students</h1> 
      <div class="row" id="studentCardsContainer">${studentCards}</div>
      <button class="btn btn-primary mt-3" id="addStudent">Add</button>
    </div>
  `;
}
