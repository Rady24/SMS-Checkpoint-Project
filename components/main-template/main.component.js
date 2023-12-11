import mainTemplate from "./main.template.js";
import content from "../content/content.component.js";
import studentsComponent from "../content/students/students.component.js";
import classesComponent from "../content/classes/classes.component.js";

function init() {
  const mainContainer = document.querySelector(".root");
  mainContainer.innerHTML = mainTemplate();
}

function addHeader(content) {
  getHeader().innerHTML = content;
}
function addFooter(content) {
  getFooter().innerHTML = content;
}

function addEventListener() {
  getHeader().addEventListener("click", function (event) {
    switch (event.target.id) {
      case "profile":
      case "logo":
      case "home":
        content.homePage();
        break;
      case "classes":
        content.classesPage();
        classesComponent.addEventListenerClasses();
        break;
      case "teachers":
        content.teachersPage();
        break;
      case "students":
        content.studentsPage();
        studentsComponent.addEventListenerStudents();
        break;
      default:
        break;
    }
  });
}

function getHeader() {
  return document.querySelector(".header");
}
function getFooter() {
  return document.querySelector(".footer");
}

export default {
  init,
  addHeader,
  addFooter,
  addEventListener,
};
