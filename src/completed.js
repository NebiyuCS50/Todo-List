import { projects } from "./createTodo.js";
export default function renderCompletedTodos() {
  const container_right = document.querySelector(".form-right");
  container_right.textContent = "";
  projects.forEach((project) => {
    project.todos
      .filter((todo) => todo.completed)
      .forEach((todo) => {
        const container_right = document.querySelector(".form-right");
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.todoId = todo.id;

        const cardProject = document.createElement("h2");
        cardProject.classList.add("card-project");
        cardProject.textContent = project.name;

        const cardTodo = document.createElement("h3");
        cardTodo.classList.add("card-todo");
        cardTodo.textContent = todo.title;

        const cardDescription = document.createElement("p");
        cardDescription.classList.add("card-description");
        cardDescription.textContent = todo.description;

        const cardCreatedAt = document.createElement("p");
        cardCreatedAt.classList.add("card-created-at");
        cardCreatedAt.textContent = `Created At: ${todo.createdAt}`;

        const cardDueDate = document.createElement("p");
        cardDueDate.classList.add("card-due-date");
        cardDueDate.textContent = `Due Date: ${todo.dueDate}`;

        const cardPriority = document.createElement("p");
        cardPriority.classList.add("card-priority");
        cardPriority.textContent = `Priority: ${todo.priority}`;
        cardPriority.classList.remove(
          "priority-low",
          "priority-medium",
          "priority-high"
        );
        if (todo.priority === "low") {
          cardPriority.classList.add("priority-low");
        } else if (todo.priority === "medium") {
          cardPriority.classList.add("priority-medium");
        } else if (todo.priority === "high") {
          cardPriority.classList.add("priority-high");
        }

        const cardCompleted = document.createElement("label");
        cardCompleted.classList.add("checkbox-container");
        const input = document.createElement("input");
        input.classList.add("custom-checkbox");
        input.checked = !!todo.completed;
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
        });
        cardCompleted.appendChild(input);
        cardCompleted.appendChild(span);
        cardCompleted.appendChild(span2);

        card.appendChild(cardProject);
        card.appendChild(cardTodo);
        card.appendChild(cardDescription);
        card.appendChild(cardCreatedAt);
        card.appendChild(cardDueDate);
        card.appendChild(cardPriority);
        card.appendChild(cardCompleted);

        container_right.appendChild(card);
      });
  });
}
