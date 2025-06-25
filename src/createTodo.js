const projects = [];

function createProject(name) {
  return { name, todos: [] };
}

function createTodo(title, description, priority, dueDate, completed) {
  return {
    title,
    description,
    priority,
    dueDate,
    completed,
    createdAt: new Date(),
  };
}

export { projects, createProject, createTodo };
