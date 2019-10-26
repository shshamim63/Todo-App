const todoInput = (() => {
  const getTodoInfo = () => {
    const todoId = Math.round(Math.random() * 999999999999999999999, 0);
    const title = document.querySelector('#todo-title').value;
    const description = document.querySelector('#todo-description').value;
    const date = document.querySelector('#todo-date').value;
    const description = document.querySelector('#todo-description').value;
    const description = document.querySelector('#todo-description').value;

  };
  return {
    createProjectId,
    getProjectName
  };
})();
export default todoInput;