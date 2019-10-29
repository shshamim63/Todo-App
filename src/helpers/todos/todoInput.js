import * as localStorage from '../common/storage.js';

const todoInput = (() => {
  const getTodoInfo = () => {
    const id = Math.round(Math.random() * 999999999999999999999, 0);
    const title = document.querySelector('#todo-title').value;
    const description = document.querySelector('#todo-description').value;
    const date = new Date(document.querySelector('#todo-date').value).toDateString();
    const priority = document.querySelector('#todo-priority').value;
    return {
      id,
      title,
      description,
      date,
      priority,
    };
  };
  const loadform = (target) => {
    const title = document.querySelector('#edit-todo-title');
    title.value = target.title;
    const description = document.querySelector('#edit-todo-description');
    description.value = target.description;
    const date = document.querySelector('#edit-todo-date');
    /* need to load the date */
  };
  const loadtodoeditform = (target) => {
    const currentProjectTodos = localStorage.getDataFromLocalStorage('currentProject').todolist;
    currentProjectTodos.forEach((element) => {
      if (element.id === target) {
        const loadElement = element;
      }
    });
    loadform(loadElement);
  };
  return {
    getTodoInfo,
    loadtodoeditform,
  };
})();
export default todoInput;
