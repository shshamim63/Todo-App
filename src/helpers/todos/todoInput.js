// import * as dateFns from 'date-fns';
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
  const loadform = (todo) => {
    const title = document.querySelector('#edit-todo-title');
    title.value = todo.title;
    const description = document.querySelector('#edit-todo-description');
    description.value = todo.description;
    const date = document.querySelector('#edit-todo-date');
    // date.value = dateFns.format(new Date(target.time), 'YYYY-MM-DD');
  };
  const loadtodoeditform = (target) => {
    const currentProjectTodos = localStorage.getDataFromLocalStorage('currentProject').todolist;
    let loadElement;
    currentProjectTodos.forEach((element) => {
      if (element.id === target.id) {
        loadElement = element;
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
