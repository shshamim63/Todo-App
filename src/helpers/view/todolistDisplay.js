import * as localStorage from '../common/storage.js';
import todoController from '../../controllers/todoController.js';

const todolistDisplay = (() => {
  const changeCurrentRowView = (targetId, currentStatus) => {
    const todoRows = document.querySelector(`todolistrow-${targetId}`);
    if (currentStatus === true) {
      todoRows.classList.remove('bg-primary');
      todoRows.classList.add('bg-success');
    } else {
      todoRows.classList.remove('bg-primary');
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
  };
  const createCheckbox = (todo) => {
    const statusCheckboxContainer = document.createElement('td');
    const statusCheckbox = document.createElement('input');
    statusCheckbox.setAttribute('type', 'checkbox');
    if (todo.status) {
      statusCheckbox.setAttribute('checked', true);
      statusCheckbox.setAttribute('value', todo.status);
    } else {
      statusCheckbox.setAttribute('checked', false);
      statusCheckbox.setAttribute('value', todo.status);
    }
    statusCheckbox.addEventListener('change', () => {
      todo.status = !todo.status;
      changeCurrentRowView(todo.id, todo.status);
      todoController.updateTodo(todo);
    });
    return statusCheckboxContainer.appendChild(statusCheckbox);
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
  const createDeleteImage = (targetID) => {
    const editImageContainer = document.createElement('img');
    editImageContainer.setAttribute('src', './assets/images/edit.png');
    editImageContainer.setAttribute('alt', 'edit image');
    editImageContainer.classList.add('todo-edit-img');
    editImageContainer.setAttribute('data-toggle', 'modal');
    editImageContainer.setAttribute('data-target', '#exampleModal3');
    editImageContainer.addEventListener('click', () => {
      // deleteTodo(targetID);
      // removeFromTodoList(targetID);
    });
  };
  const createEditImage = (target) => {
    const editImageContainer = document.createElement('img');
    editImageContainer.setAttribute('src', './assets/images/edit.png');
    editImageContainer.setAttribute('alt', 'edit image');
    editImageContainer.classList.add('todo-edit-img');
    editImageContainer.setAttribute('data-toggle', 'modal');
    editImageContainer.setAttribute('data-target', '#exampleModal3');
    // loadEditModal(target);
  };
  const creteTodoAction = (todo) => {
    const todoActionContainer = document.createElement('td');
    const deleteImage = createDeleteImage(todo.id);
    const editImage = createEditImage(todo);
    todoActionContainer.appendChild(deleteImage);
    todoActionContainer.appendChild(editImage);
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
  const renderTodo = () => {
    const currentTodolist = localStorage.getDataFromLocalStorage('currentProject').todolist;
    if (currentTodolist.length > 0) {
      const todoListContainer = document.querySelector('#todo-container');
      currentTodolist.forEach((element) => {
        todoListContainer.appendChild(createTodoListItem(element));
      });
    }
  };
})();
export default todolistDisplay;
