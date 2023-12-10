import cardTemplate from "./home-card.template.js";
import students from "../../../data/studentsData.js";

export default function cardComponent() {
  const classesCard = cardTemplate("Classes", "Classes", 10, "bi-book");

  const studentsQuantity = students.length;
  const studentsCard = cardTemplate(
    "Students",
    "Students",
    studentsQuantity,
    "bi-person"
  );
  const teachersCard = cardTemplate(
    "Teachers",
    "Teachers",
    5,
    "bi-person-check"
  );

  return `
    <div class="row">
        ${classesCard}
        ${studentsCard}
        ${teachersCard}
    </div>
  `;
}
