import { format, parseISO } from "date-fns";
const projects = [];
let projectId = 1;
let todoId = 1;
function createProject(name) {
  return { id: projectId++, name, todos: [] };
}

function createTodo(title, description, priority, dueDate, completed) {
  const parsedDate = parseISO(dueDate);
  const formattedDueDate = format(parsedDate, "yyyy-MM-dd");
  return {
    id: todoId++,
    title,
    description,
    priority,
    dueDate: formattedDueDate,
    createdAt: format(new Date(), "yyyy-MM-dd"),
    completed: false,
  };
}

export { projects, createProject, createTodo };
