import { createProject, createTodo, projects } from "./createTodo.js";
import "./style.css";
import renderAllTodos from "./all.js";
import renderCompletedTodos from "./completed.js";
import renderTodayTodos from "./today.js";
import renderUpcomingTodos from "./upcoming.js";
import renderDelayedTodos from "./delayed.js";

function saveProjectsToLocalStorage() {
  localStorage.setItem("projects", JSON.stringify(projects));
}
function loadProjectsFromLocalStorage() {
  const data = localStorage.getItem("projects");
  if (data) {
    const parsed = JSON.parse(data);
    projects.length = 0;
    parsed.forEach((p) => projects.push(p));
  }
}
loadProjectsFromLocalStorage();
renderAllTodos();

export const btnCreate = document.querySelector(".btn");

export let editing = null;
export function setEditing(value) {
  editing = value;
}
export let modalOverlay = null;

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
  inputCreatedAt.value = new Date().toISOString().split("T")[0];
  inputCreatedAt.readOnly = true;

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

  inputPrioritySelect.addEventListener("change", () => {
    inputPrioritySelect.classList.remove(
      "priority-low",
      "priority-medium",
      "priority-high"
    );

    const value = inputPrioritySelect.value;
    if (value === "low") {
      inputPrioritySelect.classList.add("priority-low");
    } else if (value === "medium") {
      inputPrioritySelect.classList.add("priority-medium");
    } else if (value === "high") {
      inputPrioritySelect.classList.add("priority-high");
    }
  });

  inputPrioritySelect.appendChild(optionLow);
  inputPrioritySelect.appendChild(optionMedium);
  inputPrioritySelect.appendChild(optionHigh);
  inputPriority.appendChild(inputPrioritySelect);

  const button = document.createElement("button");
  button.classList.add("btn-create");
  button.textContent = editing ? "Update Project" : "Create Project →";
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
  if (editing) {
    inputName.value = editing.project.name;
    inputTitle.value = editing.todo.title;
    inputDescription.value = editing.todo.description;
    inputDueDate.value = editing.todo.dueDate;
    inputPrioritySelect.value = editing.todo.priority;
  }

  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.remove();
      editing = null;
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const projectName = inputName.value;
    const todoTitle = inputTitle.value;
    const todoDescription = inputDescription.value;
    const todoDueDate = inputDueDate.value;
    const todoPriority = inputPrioritySelect.value;

    if (
      !projectName ||
      !todoTitle ||
      !todoDescription ||
      !todoPriority ||
      !todoDueDate
    ) {
      alert("Please fill in all fields");
      return;
    }
    const today = new Date().toISOString().split("T")[0];
    if (todoDueDate < today) {
      alert("Due date cannot be before the created date.");
      return;
    }

    if (editing) {
      editing.project.name = projectName;
      editing.todo.title = todoTitle;
      editing.todo.description = todoDescription;
      editing.todo.dueDate = todoDueDate;
      editing.todo.priority = todoPriority;
      editing.card.querySelector(".card-project").textContent = projectName;
      editing.card.querySelector(".card-todo").textContent = todoTitle;
      editing.card.querySelector(".card-description").textContent =
        todoDescription;
      editing.card.querySelector(
        ".card-due-date"
      ).textContent = `Due Date: ${todoDueDate}`;
      editing.card.querySelector(
        ".card-priority"
      ).textContent = `Priority: ${todoPriority}`;
      const cardPriorityElem = editing.card.querySelector(".card-priority");
      cardPriorityElem.textContent = `Priority: ${todoPriority}`;
      cardPriorityElem.classList.remove(
        "priority-low",
        "priority-medium",
        "priority-high"
      );
      if (todoPriority === "low") {
        cardPriorityElem.classList.add("priority-low");
      } else if (todoPriority === "medium") {
        cardPriorityElem.classList.add("priority-medium");
      } else if (todoPriority === "high") {
        cardPriorityElem.classList.add("priority-high");
      }

      editing = null;
    } else {
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

      const container_right = document.querySelector(".form-right");
      const card = document.createElement("div");
      card.classList.add("card");
      card.dataset.todoId = todo.id;

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
      cardCreatedAt.style.pointerEvents = "none";

      const cardDueDate = document.createElement("p");
      cardDueDate.classList.add("card-due-date");
      cardDueDate.textContent = `Due Date: ${todoDueDate}`;

      const cardPriority = document.createElement("p");
      cardPriority.classList.add("card-priority");
      cardPriority.textContent = `Priority: ${todoPriority}`;
      cardPriority.textContent = `Priority: ${todoPriority}`;
      cardPriority.classList.remove(
        "priority-low",
        "priority-medium",
        "priority-high"
      );
      if (todoPriority === "low") {
        cardPriority.classList.add("priority-low");
      } else if (todoPriority === "medium") {
        cardPriority.classList.add("priority-medium");
      } else if (todoPriority === "high") {
        cardPriority.classList.add("priority-high");
      }

      const cardCompleted = document.createElement("label");
      cardCompleted.classList.add("checkbox-container");
      const input = document.createElement("input");
      input.classList.add("custom-checkbox");
      input.checked = "";
      input.type = "checkbox";
      const span = document.createElement("span");
      span.classList.add("checkmark");
      const span2 = document.createElement("span");
      span2.classList.add("checkmark2");
      span2.textContent = "Completed";
      input.addEventListener("change", () => {
        todo.completed = input.checked;
        if (input.checked) {
          span2.style.color = "#4CAF50";
        } else {
          span2.style.color = "";
        }
        saveProjectsToLocalStorage();
      });
      cardCompleted.appendChild(input);
      cardCompleted.appendChild(span);
      cardCompleted.appendChild(span2);

      const cardButtons = document.createElement("div");
      cardButtons.classList.add("card-buttons");

      const editBtn = document.createElement("button");
      editBtn.classList.add("Btn-edit");
      editBtn.dataset.todoId = todo.id;
      editBtn.textContent = "Edit";
      editBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const todoId = Number(editBtn.dataset.todoId);
        const foundProject = projects.find((p) =>
          p.todos.some((t) => t.id === todoId)
        );
        const foundTodo = foundProject?.todos.find((t) => t.id === todoId);
        if (foundTodo) {
          editing = { project: foundProject, todo: foundTodo, card };
          modalOverlay.remove();
          btnCreate.click();
        }
      });

      const pencilIcon = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
      );
      pencilIcon.setAttribute("class", "svg");
      pencilIcon.setAttribute("viewBox", "0 0 512 512");
      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      path.setAttribute(
        "d",
        "M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
      );
      pencilIcon.appendChild(path);
      editBtn.appendChild(pencilIcon);

      const deleteButton = document.createElement("button");
      deleteButton.setAttribute("type", "button");
      deleteButton.classList.add("button");
      deleteButton.dataset.todoId = todo.id;

      const buttonText = document.createElement("span");
      buttonText.classList.add("button__text");
      buttonText.textContent = "Delete";

      const buttonIcon = document.createElement("span");
      buttonIcon.classList.add("button__icon");

      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      svg.setAttribute("width", "512");
      svg.setAttribute("height", "512");
      svg.setAttribute("viewBox", "0 0 512 512");
      svg.classList.add("svg");

      const path1 = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      path1.setAttribute(
        "style",
        "fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      );
      path1.setAttribute(
        "d",
        "M112,112l20,320c.95,18.49,14.4,32,32,32H348c17.67,0,30.87-13.51,32-32l20-320"
      );
      svg.appendChild(path1);

      const line1 = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      line1.setAttribute("x1", "80");
      line1.setAttribute("y1", "112");
      line1.setAttribute("x2", "432");
      line1.setAttribute("y2", "112");
      line1.setAttribute(
        "style",
        "stroke:#fff;stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px"
      );
      svg.appendChild(line1);
      const path2 = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      path2.setAttribute(
        "style",
        "fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      );
      path2.setAttribute(
        "d",
        "M192,112V72h0a23.93,23.93,0,0,1,24-24h80a23.93,23.93,0,0,1,24,24h0v40"
      );
      svg.appendChild(path2);
      const line2 = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      line2.setAttribute("x1", "256");
      line2.setAttribute("y1", "176");
      line2.setAttribute("x2", "256");
      line2.setAttribute("y2", "400");
      line2.setAttribute(
        "style",
        "fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      );
      svg.appendChild(line2);
      const line3 = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      line3.setAttribute("x1", "184");
      line3.setAttribute("y1", "176");
      line3.setAttribute("x2", "192");
      line3.setAttribute("y2", "400");
      line3.setAttribute(
        "style",
        "fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      );
      svg.appendChild(line3);
      const line4 = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      line4.setAttribute("x1", "328");
      line4.setAttribute("y1", "176");
      line4.setAttribute("x2", "320");
      line4.setAttribute("y2", "400");
      line4.setAttribute(
        "style",
        "fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      );
      deleteButton.addEventListener("click", (e) => {
        e.preventDefault();
        const todoId = Number(deleteButton.dataset.todoId);

        projects.forEach((project) => {
          project.todos = project.todos.filter((t) => t.id !== todoId);
        });

        card.remove();
        saveProjectsToLocalStorage();
      });
      svg.appendChild(line4);
      buttonIcon.appendChild(svg);
      deleteButton.appendChild(buttonText);
      deleteButton.appendChild(buttonIcon);

      card.appendChild(cardProject);
      card.appendChild(cardTodo);
      card.appendChild(cardDescription);
      card.appendChild(cardCreatedAt);
      card.appendChild(cardDueDate);
      card.appendChild(cardPriority);
      card.appendChild(cardCompleted);
      cardButtons.appendChild(editBtn);
      cardButtons.appendChild(deleteButton);
      card.appendChild(cardButtons);
      container_right.appendChild(card);
    }

    form.reset();
    inputCreatedAt.value = new Date().toISOString().split("T")[0];
    modalOverlay.remove();
    saveProjectsToLocalStorage();
  });
});

const allBtn = document.querySelector(".left button:nth-child(1)");
const completedBtn = document.querySelector(".left button:last-child");
const todayBtn = document.querySelector(".left button:nth-child(2)");
const upcomingBtn = document.querySelector(".left button:nth-child(3)");
const delayedBtn = document.querySelector(".left button:nth-child(4)");

todayBtn.addEventListener("click", renderTodayTodos);
upcomingBtn.addEventListener("click", renderUpcomingTodos);
delayedBtn.addEventListener("click", renderDelayedTodos);
allBtn.addEventListener("click", renderAllTodos);
completedBtn.addEventListener("click", renderCompletedTodos);
