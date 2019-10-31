import * as localStorage from '../common/storage.js';
import todoController from '../../controllers/todoController.js';
import todoInput from '../todos/todoInput.js';
import editimage from '../../assets/edit.png';
import deleteimage from '../../assets/delete.png';

const todolistDisplay = (() => {
  const changeCurrentRowView = (targetId, currentStatus) => {
    const todoRows = document.querySelector(`#todolistrow-${targetId}`);
    if (currentStatus === true) {
      todoRows.classList.remove('bg-primary');
      todoRows.classList.add('bg-success');
    } else {
      todoRows.classList.remove('bg-success');
      todoRows.classList.add('bg-primary');
    }
  };
  const createTableRow = (todo) => {
    const tableRow = document.createElement('tr');
    tableRow.setAttribute('id', `todolistrow-${todo.id}`);
    if (todo.status) {
      tableRow.classList.add('bg-success');
    } else {
      tableRow.classList.add('bg-primary');
    }
    return tableRow;
  };
  const createCheckbox = (todo) => {
    const statusCheckboxContainer = document.createElement('td');
    const statusCheckbox = document.createElement('input');
    statusCheckbox.setAttribute('type', 'checkbox');
    if (todo.status) {
      statusCheckbox.checked = true;
      statusCheckbox.setAttribute('value', todo.status);
    } else {
      statusCheckbox.checked = false;
      statusCheckbox.setAttribute('value', todo.status);
    }
    statusCheckbox.addEventListener('change', () => {
      todo.status = !todo.status;
      changeCurrentRowView(todo.id, todo.status);
      todoController.updateTodo(todo);
    });
    statusCheckboxContainer.appendChild(statusCheckbox);
    return statusCheckboxContainer;
  };
  const createTodoTitleContainer = (todo) => {
    const todoTitleContainer = document.createElement('th');
    todoTitleContainer.setAttribute('scope', 'row');
    todoTitleContainer.innerText = todo.title;
    return todoTitleContainer;
  };
  const createTodoDescriptionContainer = (todo) => {
    const todoDescriptionContainer = document.createElement('td');
    todoDescriptionContainer.innerText = todo.description;
    return todoDescriptionContainer;
  };
  const createTodoDate = (todo) => {
    const todoDateContainer = document.createElement('td');
    todoDateContainer.innerText = todo.date;
    return todoDateContainer;
  };
  const createTodoPriority = (todo) => {
    const todoPriorityContainer = document.createElement('td');
    todoPriorityContainer.innerText = todo.priority;
    return todoPriorityContainer;
  };
  const removeFromTodoList = (id) => {
    const todoList = document.querySelector(`#todolistrow-${id}`);
    todoList.parentNode.removeChild(todoList);
  };
  const createDeleteImage = (targetID) => {
    const editImageContainer = document.createElement('img');
    editImageContainer.setAttribute('src', deleteimage);
    editImageContainer.setAttribute('alt', 'delete image');
    editImageContainer.classList.add('todo-delete-img');
    editImageContainer.addEventListener('click', () => {
      todoController.deleteTodo(targetID);
      removeFromTodoList(targetID);
    });
    return editImageContainer;
  };
  const updateCurrentRowValue = (target) => {
    const todoRows = document.querySelector(`#todolistrow-${target.id}`).childNodes;
    todoRows[1].innerText = target.title;
    todoRows[2].innerText = target.description;
    todoRows[3].innerText = target.time;
    todoRows[4].innerText = target.priority;
  };
  const enableEditButton = (target) => {
    const editButton = document.querySelector('#edit-todo');
    editButton.addEventListener('click', () => {
      const {
        title, description, date, priority,
      } = todoInput.getEditData();
      target.title = title;
      target.description = description;
      target.time = date;
      target.priority = priority;
      todoController.updateTodo(target);
      updateCurrentRowValue(target);
    });
  };
  const createEditImage = (target) => {
    const editImageContainer = document.createElement('img');
    editImageContainer.setAttribute('src', editimage);
    editImageContainer.setAttribute('alt', 'edit image');
    editImageContainer.classList.add('todo-edit-img');
    editImageContainer.setAttribute('data-toggle', 'modal');
    editImageContainer.setAttribute('data-target', '#exampleModal3');
    editImageContainer.addEventListener('click', () => {
      todoInput.loadtodoeditform(target);
      enableEditButton(target);
    });
    return editImageContainer;
  };
  const creteTodoAction = (todo) => {
    const todoActionContainer = document.createElement('td');
    const deleteImage = createDeleteImage(todo.id);
    const editImage = createEditImage(todo);
    todoActionContainer.appendChild(deleteImage);
    todoActionContainer.appendChild(editImage);
    return todoActionContainer;
  };
  const createTodoListItem = (todo) => {
    const tableRow = createTableRow(todo);
    const checkboxElement = createCheckbox(todo);
    const todoTitle = createTodoTitleContainer(todo);
    const todoDescription = createTodoDescriptionContainer(todo);
    const todoDate = createTodoDate(todo);
    const todoPriority = createTodoPriority(todo);
    const todoAction = creteTodoAction(todo);
    tableRow.appendChild(checkboxElement);
    tableRow.appendChild(todoTitle);
    tableRow.appendChild(todoDescription);
    tableRow.appendChild(todoDate);
    tableRow.appendChild(todoPriority);
    tableRow.appendChild(todoAction);
    return tableRow;
  };
  const appendTodoList = (newTodo) => {
    const newRow = createTodoListItem(newTodo);
    document.querySelector('#todo-container').appendChild(newRow);
  };
  const disableTodolist = () => {
    const emptyDialogue = document.querySelector('#emptyselector');
    emptyDialogue.classList.remove('d-none');
    const todolistsection = document.querySelector('#todolistsection');
    todolistsection.classList.add('d-none');
  };
  const renderTodo = () => {
    const emptyDialogue = document.querySelector('#emptyselector');
    emptyDialogue.classList.add('d-none');
    const todolistsection = document.querySelector('#todolistsection');
    todolistsection.classList.remove('d-none');
    const projectHeader = document.querySelector('#project-name-enable');
    const currentProject = localStorage.getDataFromLocalStorage('currentProject');
    projectHeader.innerHTML = currentProject.name;
    const currentTodolist = currentProject.todolist;
    document.querySelector('#todo-container').innerHTML = '';
    if (currentTodolist.length > 0) {
      const todoListContainer = document.querySelector('#todo-container');
      currentTodolist.forEach((element) => {
        todoListContainer.appendChild(createTodoListItem(element));
      });
    }
  };
  return {
    renderTodo,
    disableTodolist,
    appendTodoList,
  };
})();
export default todolistDisplay;
