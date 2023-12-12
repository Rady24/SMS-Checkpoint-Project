function handleDeleteButtonClick(id, data) {
  const indexToDelete = data.findIndex((item) => item.id === +id);
  if (indexToDelete !== -1) {
    data.splice(indexToDelete, 1);
  }
}

function render(containerId, data, template) {
  const container = document.getElementById(`${containerId}`);

  if (container) {
    container.innerHTML = data.map(template).join("");
  }
}

function getElementValueById(elementId) {
  const element = document.getElementById(elementId);
  return element ? element.value.trim() : "";
}
function getElementById(id, data) {
  return data.find((item) => item.id === id);
}

export default {
  handleDeleteButtonClick,
  render,
  getElementValueById,
  getElementById,
};
