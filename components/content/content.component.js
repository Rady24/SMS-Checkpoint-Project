import homePageTemplate from "../../pages/home.js";
import classesPageTemplate from "../../pages/classes.js";
import studentsPageTemplate from "../../pages/students.js";
import teachersPageTemplate from "../../pages/teachers.js";

function homePage() {
  render(homePageTemplate());
}
function classesPage() {
  render(classesPageTemplate());
}
function teachersPage() {
  render(teachersPageTemplate());
}
function studentsPage() {
  render(studentsPageTemplate());
}

function render(content) {
  document.querySelector(".content").innerHTML = content;
}

export default {
  homePage,
  classesPage,
  teachersPage,
  studentsPage,
};
