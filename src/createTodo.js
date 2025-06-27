import { format, parseISO } from "date-fns";
const projects = [];

function createProject(name) {
  return { name, todos: [] };
}

function createTodo(title, description, priority, dueDate, completed) {
  const parsedDate = parseISO(dueDate);
  const formattedDueDate = format(parsedDate, "yyyy-MM-dd");
  return {
    title,
    description,
    priority,
    dueDate: formattedDueDate,
    createdAt: format(new Date(), "yyyy-MM-dd"),
    completed: false,
  };
}

export { projects, createProject, createTodo };
