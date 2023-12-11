export default function cardTemplate(title, description, count, iconClass) {
  return `
    <div class="col-md-4">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">Number of ${description}: <strong>${count}</strong></p>
                <i class="bi ${iconClass} icon"></i>
            </div>
        </div>
    </div>
    `;
}
