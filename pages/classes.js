import classesCardTemplate from "../components/content/classes/classes-card/classes-card.template.js";
import classesData from "../data/classesData.js";

export default function template() {
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
