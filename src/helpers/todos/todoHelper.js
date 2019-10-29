import todoInput from './todoInput.js';
import todoController from '../../controllers/todoController.js';
import * as localStorageData from '../common/storage.js';

const todoHelper = (() => {
  const enableCreateTodoButton = () => {
    const todoCreateButton = document.querySelector('#add-todo');
    todoCreateButton.addEventListener('click', () => {
      const {
        id, title, description, date, priority,
      } = todoInput.getTodoInfo();
      console.log(date);
      const newTodo = todoController.createTodo(id, title, description, date, priority, false);
      const parentProject = localStorageData.getDataFromLocalStorage('currentProject');
      parentProject.todolist.push(newTodo);
      const projectArray = localStorageData.getDataFromLocalStorage('projectsArray');
      const index = projectArray.findIndex((x) => x.id === parentProject.id);
      projectArray[index] = parentProject;
      localStorageData.setDataIntoLocalStorage('projectsArray', projectArray);
      localStorageData.setDataIntoLocalStorage('currentProject', parentProject);
    });
  };
  return {
    enableCreateTodoButton,
  };
})();
export default todoHelper;
