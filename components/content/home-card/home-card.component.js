import cardTemplate from "./home-card.template.js";
import students from "../../../data/studentsData.js";
import classes from "../../../data/classesData.js";
import teachers from "../../../data/teachersData.js";
import { loadFromLocalStorage } from "../../../utils/storage.js";

export default function cardComponent() {
  let teachersData = loadFromLocalStorage("teachersData") || teachers;

  let classesData = loadFromLocalStorage("classesData") || classes;

  let studentsData = loadFromLocalStorage("studentsData") || students;

  const classesQuantity = classesData.length;
  const studentsQuantity = studentsData.length;
  const teachersQuantity = teachersData.length;

  const classesCard = cardTemplate(
    "Classes",
    "Classes",
    classesQuantity,
    "bi-book"
  );

  const studentsCard = cardTemplate(
    "Students",
    "Students",
    studentsQuantity,
    "bi-person"
  );
  const teachersCard = cardTemplate(
    "Teachers",
    "Teachers",
    teachersQuantity,
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
