import { createProject, createTodo, projects } from "./createTodo.js";
import "./style.css";
const btnCreate = document.querySelector(".btn");
const right = document.querySelector(".form-right");
btnCreate.addEventListener("click", () => {
  const modalOverlay = document.createElement("div");
  modalOverlay.classList.add("modal-overlay");
  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");
  const form = document.createElement("form");
  form.classList.add("form");
  const title = document.createElement("div");
  title.classList.add("title");
  title.textContent = "Welcome, ";
  const br = document.createElement("br");
  title.appendChild(br);
  const span = document.createElement("span");
  span.textContent = "Let's create your first project";
  title.appendChild(span);
  const inputName = document.createElement("input");
  inputName.placeholder = "Todo Project Name";
  inputName.name = "name";
  inputName.classList.add("input");
  const inputTitle = document.createElement("input");
  inputTitle.placeholder = "Todo Title";
  inputTitle.name = "title";
  inputTitle.classList.add("input");
  const inputDescription = document.createElement("input");
  inputDescription.placeholder = "Todo Description";
  inputDescription.name = "description";
  inputDescription.classList.add("input");

  const inputDueDate = document.createElement("input");
  inputDueDate.placeholder = "Todo Due Date";
  inputDueDate.name = "dueDate";
  inputDueDate.classList.add("input");
  inputDueDate.type = "date";

  const inputCreatedAt = document.createElement("input");
  inputCreatedAt.placeholder = "Created At";
  inputCreatedAt.name = "createdAt";
  inputCreatedAt.classList.add("input");
  inputCreatedAt.value = new Date().toISOString().split("T")[0]; // Set to today's date

  const inputPriority = document.createElement("label");
  inputPriority.classList.add("label");
  inputPriority.textContent = "Priority";
  const inputPrioritySelect = document.createElement("select");
  inputPrioritySelect.classList.add("input-select");
  const optionLow = document.createElement("option");
  optionLow.classList.add("option-low");
  optionLow.value = "low";
  optionLow.textContent = "Low";

  const optionMedium = document.createElement("option");
  optionMedium.classList.add("option-medium");
  optionMedium.value = "medium";
  optionMedium.textContent = "Medium";

  const optionHigh = document.createElement("option");
  optionHigh.classList.add("option-high");
  optionHigh.value = "high";
  optionHigh.textContent = "High";

  inputPrioritySelect.appendChild(optionLow);
  inputPrioritySelect.appendChild(optionMedium);
  inputPrioritySelect.appendChild(optionHigh);
  inputPriority.appendChild(inputPrioritySelect);

  const button = document.createElement("button");
  button.classList.add("btn-create");
  button.textContent = "Create Project →";
  form.appendChild(title);
  form.appendChild(inputName);
  form.appendChild(inputTitle);
  form.appendChild(inputDescription);
  form.appendChild(inputDueDate);
  form.appendChild(inputCreatedAt);
  form.appendChild(inputPriority);
  form.appendChild(button);
  modalContent.appendChild(form);
  modalOverlay.appendChild(modalContent);
  document.body.appendChild(modalOverlay);
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.remove();
    }
  });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const projectName = inputName.value;
    const todoTitle = inputTitle.value;
    const todoDescription = inputDescription.value;
    const todoDueDate = inputDueDate.value;
    const todoPriority = inputPrioritySelect.value;

    if (!projectName || !todoTitle || !todoDescription || !todoPriority) {
      alert("Please fill in all fields");
      return;
    }

    const project = createProject(projectName);
    const todo = createTodo(
      todoTitle,
      todoDescription,
      todoPriority,
      todoDueDate,
      false
    );
    project.todos.push(todo);
    projects.push(project);

    console.log("Project created:", project);
    console.log("Todo created:", todo);

    const container_right = document.querySelector(".form-right");
    const card = document.createElement("div");
    card.classList.add("card");

    const cardProject = document.createElement("h2");
    cardProject.classList.add("card-project");
    cardProject.textContent = projectName;

    const cardTodo = document.createElement("h3");
    cardTodo.classList.add("card-todo");
    cardTodo.textContent = todoTitle;

    const cardDescription = document.createElement("p");
    cardDescription.classList.add("card-description");
    cardDescription.textContent = todoDescription;

    const cardCreatedAt = document.createElement("p");
    cardCreatedAt.classList.add("card-created-at");
    cardCreatedAt.textContent = `Created At: ${inputCreatedAt.value}`;

    const cardDueDate = document.createElement("p");
    cardDueDate.classList.add("card-due-date");
    cardDueDate.textContent = `Due Date: ${todoDueDate}`;

    const cardPriority = document.createElement("p");
    cardPriority.classList.add("card-priority");
    cardPriority.textContent = `Priority: ${todoPriority}`;

    const editBtn = document.createElement("button");
    editBtn.classList.add("Btn-edit");
    editBtn.textContent = "Edit";
    const pencilIcon = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    pencilIcon.setAttribute("class", "svg");
    pencilIcon.setAttribute("viewBox", "0 0 512 512");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
      "d",
      "M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
    );

    pencilIcon.appendChild(path);
    editBtn.appendChild(pencilIcon);

    card.appendChild(cardProject);
    card.appendChild(cardTodo);
    card.appendChild(cardDescription);
    card.appendChild(cardCreatedAt);
    card.appendChild(cardDueDate);
    card.appendChild(cardPriority);
    card.appendChild(editBtn);
    container_right.appendChild(card);

    form.reset();
    inputCreatedAt.value = new Date().toISOString().split("T")[0];
    modalOverlay.remove();
  });
});
