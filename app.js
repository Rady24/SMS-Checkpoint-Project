import mainTemplate from "./components/main-template/main.component.js";
import header from "./components/header/header.component.js";
import content from "./components/content/content.component.js";
import footer from "./components/footer/footer.component.js";

const app = {};

app.init = () => {
  mainTemplate.init();
  mainTemplate.addHeader(header.render());
  mainTemplate.addEventListener();
  content.homePage();
  mainTemplate.addFooter(footer.render());
};

app.init();
