import teacherCardTemplate from "../components/content/teachers/teacher-card/teacher-card.template.js";
import hardcodedTeachersData from "../data/teachersData.js";
import { loadFromLocalStorage } from "../utils/storage.js";

export default function template() {
  let teachersData =
    loadFromLocalStorage("teachersData") || hardcodedTeachersData;
  const teacherCards = teachersData
    .map((teacher) => teacherCardTemplate(teacher))
    .join("");
  return `
  <div class="container-md" id="teachersContainer">
  <h1 class="text-center m-4">Teachers</h1>
    <div class="row" id="teacherCardsContainer">
      ${teacherCards}
    </div>
    <button class="btn btn-primary mt-3" id="addTeacher">Add</button>
  </div>
      `;
}
