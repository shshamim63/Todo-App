const todoInput = (() => {
  const getTodoInfo = () => {
    const todoId = Math.round(Math.random() * 999999999999999999999, 0);
    const title = document.querySelector('#todo-title').value;
    const description = document.querySelector('#todo-description').value;
    const date = new Date(document.querySelector('#todo-date').value).toDateString();
    const priority = document.querySelector('#todo-priority').value;
    return {
      todoId,
      title,
      description,
      date,
      priority,
    };
  };
  return {
    getTodoInfo,
  };
})();
export default todoInput;
