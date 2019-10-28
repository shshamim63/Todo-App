const todolistDisplay = (() => {
  const changeCurrentRowView = (targetId) => {
    const todoRows = document.querySelectorAll('tr');
    todoRows.forEach((element) => {
      elementId = parseInt(element.id.split('-')[1], 10);
      if (elementId === targerId) {
        todoRows.classList.remove('bg-primary');
        todoRows.classList.add('bg-success');
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
    statusCheckbox.setAttribute("type", "checkbox");
    if (todo.status) {
      statusCheckbox.setAttribute("checked", true);
      statusCheckbox.setAttribute("value", todo.status);
    } else {
      statusCheckbox.setAttribute("checked", false);
      statusCheckbox.setAttribute("value", todo.status);
    }
    statusCheckbox.addEventListener('change', () => {
      changeCurrentRowView(todo.id);
      todo.status = !todo.status;
      updateTodo(todo);
    });
  };
  const eachTodoListRender = (todo) => {
    // <tr class="bg-success">
    //   <td><input type="checkbox" aria-label="Checkbox for following text input"></td>
    //   <th scope="row">Create a task</th>
    //   <td>To complete the task</td>
    //   <td>12-11-2019</td>
    //   <td>Normal</td>
    //   <td>
    //     <img src="./assets/images/delete.png" alt="" class="todo-delete-img">
    //     <img src="./assets/images/edit.png" alt="" class="todo-edit-img" data-toggle="modal" data-target="#exampleModal3">
    //   </td>
    // </tr>
    const tableRow = createTableRow(todo);
    const checkboxElement = createCheckbox(todo);
  };
})();