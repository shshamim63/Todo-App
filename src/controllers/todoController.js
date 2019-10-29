import * as localStorageData from '../helpers/common/storage.js';
import Todo from '../model/todolist.js';

const todoController = (() => {
  const createTodo = (id, title, description, time, priority, status) => {
    const todo = Todo(id, title, description, time, priority, status);
    return todo;
  };
  const updateTodo = (modified) => {
    const parentProject = localStorageData.getDataFromLocalStorage('currentProject');
    const todoindex = parentProject.todo.findIndex((x) => x.id === modified.id);
    parentProject.todo[todoindex] = modified;
    const projectArray = localStorageData.getDataFromLocalStorage('projectsArray');
    const index = projectArray.findIndex((x) => x.id === parentProject.id);
    projectArray[index] = parentProject;
    localStorageData.setDataIntoLocalStorage('projectsArray', projectArray);
    localStorageData.setDataIntoLocalStorage('currentProject', parentProject);
  };
  const deletetodo = (targetId) => {
    const parentProject = localStorageData.getDataFromLocalStorage('currentProject');
    const oldTodoList = parentProject.todo;
    const todoindex = oldTodoList.findIndex((x) => x.id === targetId);
    if (todoindex > -1) {
      oldTodoList.splice(todoindex, 1);
    }
    parentProject.todo = oldTodoList;
    const projectArray = localStorageData.getDataFromLocalStorage('projectsArray');
    const index = projectArray.findIndex((x) => x.id === parentProject.id);
    projectArray[index] = parentProject;
    localStorageData.setDataIntoLocalStorage('projectsArray', projectArray);
    localStorageData.setDataIntoLocalStorage('currentProject', parentProject);
  };
  return {
    createTodo,
    updateTodo,
    deletetodo,
  };
})();
export default todoController;
