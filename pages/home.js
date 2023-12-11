import cardComponent from "../components/content/home-card/home-card.component.js";

export default function template() {
  const homeCards = cardComponent();
  return `
  <div class="container mt-5">
        <!-- Greeting Section -->
        <div class="jumbotron">
            <h1 class="display-4">Hello, User!</h1>
            <p class="lead">Welcome to the Learning Management System (LMS) Dashboard.</p>
        </div>
        ${homeCards}
    </div>
    `;
}
