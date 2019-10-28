const todolistDisplay = (() => {
  const changeCurrentRowView = (targetId, currentStatus) => {
    const todoRows = document.querySelectorAll('tr');
    todoRows.forEach((element) => {
      const elementId = parseInt(element.id.split('-')[1], 10);
      if (elementId === targetId) {
        if (currentStatus === true) {
          todoRows.classList.remove('bg-primary');
          todoRows.classList.add('bg-success');
        } else {
          todoRows.classList.remove('bg-primary');
          todoRows.classList.add('bg-primary');
        }
      }
    });
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
      updateTodo(todo);
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
      deleteTodo(targetID);
      removeFromTodoList(targetID);
    });
  };
  const createEditImage = (target) => {
    const editImageContainer = document.createElement('img');
    editImageContainer.setAttribute('src', './assets/images/edit.png');
    editImageContainer.setAttribute('alt', 'edit image');
    editImageContainer.classList.add('todo-edit-img');
    editImageContainer.setAttribute('data-toggle', 'modal');
    editImageContainer.setAttribute('data-target', '#exampleModal3');
    loadEditModal(target);
  };
  const creteTodoAction = (todo) => {
    const todoActionContainer = document.createElement('td');
    const deleteImage = createDeleteImage(todo.id);
    const editImage = createEditImage(todo);
  };
  const renderEachTodoList = (todo) => {
    const tableRow = createTableRow(todo);
    const checkboxElement = createCheckbox(todo);
    const todoTitle = createTodoTitleContainer(todo);
    const todoDescription = createTodoDescriptionContainer(todo);
    const todoDate = createTodoDate(todo);
    const todoPriority = createTodoPriority(todo);
    const todoAction = creteTodoAction(todo);
  };
})();
