import classesCardTemplate from "../components/content/classes/classes-card/classes-card.template.js";
import hardcodedClassesData from "../data/classesData.js";
import { loadFromLocalStorage } from "../utils/storage.js";

export default function template() {
  let classesData = loadFromLocalStorage("classesData") || hardcodedClassesData;
  const classCards = classesData
    .map((classData) => classesCardTemplate(classData))
    .join("");

  return `
    <div class="container-md" id="classesContainer">
    <h1 class="text-center m-4">Classes</h1>
      <div class="row" id="classCardsContainer">
        ${classCards}
      </div>
      <button class="btn btn-primary mt-3" id="addClass">Add</button>
    </div>
  `;
}
