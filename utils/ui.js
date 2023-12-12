export function displayErrorMessage(message) {
  const errorMessageElement = document.getElementById("errorMessage");
  errorMessageElement.textContent = message;
  errorMessageElement.classList.add("text-danger");
}

export function showModal(modalId) {
  $(`#${modalId}`).modal("show");
}

export function hideModal(modalId) {
  $(`#${modalId}`).modal("hide");
}
