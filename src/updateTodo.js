import { projects } from "./createTodo";

function updateTodo(projectName, todoTitle, updates) {
  const project = projects.find((p) => p.name === projectName);
  if (!project) {
    console.error("Project not found");
    return;
  }

  const todo = project.todos.find((t) => t.title === todoTitle);
  if (!todo) {
    console.error("Todo not found");
    return;
  }

  // Update allowed fields
  if (updates.title !== undefined) todo.title = updates.title;
  if (updates.description !== undefined) todo.description = updates.description;
  if (updates.priority !== undefined) todo.priority = updates.priority;
  if (updates.dueDate !== undefined) todo.dueDate = updates.dueDate;
  if (updates.completed !== undefined) todo.completed = updates.completed;

  console.log("Todo updated:", todo);
}
