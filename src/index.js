import './main.css';
import projectHelper from './helpers/projects/projectHelper.js';
import displayProject from './helpers/view/projectDisplay.js';
import todoHelper from './helpers/todos/todoHelper.js';

projectHelper.createProjectsArray();
projectHelper.setDefaultProject();
displayProject.initializeProjectOperation();
todoHelper.enableCreateTodoButton();
