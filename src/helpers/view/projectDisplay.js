import * as localStorageData from '../common/storage.js';
import projectInput from '../projects/projectInput.js';
import projectController from '../../controllers/projectController.js';
import todolistDisplay from './todolistDisplay.js';
import imageDelete from '../../assets/delete.png';

const displayProject = (() => {
  const disableSelectedProject = () => {
    const projectLists = document.querySelectorAll('.list-group-item');
    projectLists.forEach((element) => {
      element.classList.remove('bg-complete');
    });
    todolistDisplay.disableTodolist();
  };
  const highlightCurrentProject = () => {
    const projectLists = document.querySelectorAll('.list-group-item');
    const currentProject = localStorageData.getDataFromLocalStorage('currentProject');
    if (currentProject !== null) {
      const currentProjectId = currentProject.id;
      projectLists.forEach((element) => {
        const elementId = parseInt(element.id.split('-')[1], 10);
        if (elementId === currentProjectId) {
          element.classList.add('bg-complete');
          todolistDisplay.renderTodo();
        }
      });
    }
  };
  const setCurrentProject = (targetId) => {
    const projects = localStorageData.getDataFromLocalStorage('projectsArray');
    projects.forEach((element) => {
      if (element.id === targetId) {
        localStorageData.setDataIntoLocalStorage('currentProject', element);
      }
    });
  };
  const removeProjectFromProjectList = (targetId) => {
    const targetProject = document.querySelector(`#project-${targetId}`);
    targetProject.parentElement.removeChild(targetProject);
  };
  const createProjectListItem = (element) => {
    const projectList = document.createElement('li');
    projectList.classList.add('list-group-item');
    projectList.setAttribute('id', `project-${element.id}`);
    projectList.addEventListener('click', () => {
      setCurrentProject(element.id);
      disableSelectedProject();
      highlightCurrentProject();
    });
    const projectTitle = document.createElement('p');
    projectTitle.classList.add('d-inline');
    projectTitle.innerHTML = element.name;

    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('float-right', 'btn-delete');

    const deleteImage = document.createElement('img');
    deleteImage.src = imageDelete;
    deleteImage.classList.add('btn-delete-img');
    deleteImage.setAttribute('id', `projectdelete-${element.id}`);
    deleteImage.addEventListener('click', () => {
      const currentProjectId = localStorageData.getDataFromLocalStorage('currentProject').id;
      projectController.deleteProject(element.id);
      removeProjectFromProjectList(element.id);
      if (currentProjectId === element.id) {
        todolistDisplay.disableTodolist();
      }
    });
    deleteIcon.appendChild(deleteImage);
    projectList.appendChild(projectTitle);
    projectList.appendChild(deleteIcon);
    return projectList;
  };
  const renderProject = () => {
    const projectsArray = localStorageData.getDataFromLocalStorage('projectsArray');
    if (projectsArray.length > 0) {
      const projectListContainter = document.querySelector('#project-list');
      projectsArray.forEach((element) => {
        projectListContainter.appendChild(createProjectListItem(element));
      });
      disableSelectedProject();
      highlightCurrentProject();
    } else {
      todolistDisplay.disableTodolist();
    }
  };
  const appendNewProjectListItem = (newProject) => {
    const projectListContainter = document.querySelector('#project-list');
    projectListContainter.appendChild(createProjectListItem(newProject));
    disableSelectedProject();
    highlightCurrentProject();
  };
  const addProject = () => {
    const projectsArray = localStorageData.getDataFromLocalStorage('projectsArray');
    const projectCount = localStorageData.getDataFromLocalStorage('projectCount');
    const projectId = projectInput.createProjectId();
    const projectName = projectInput.getProjectName();
    const newProject = projectController.createProject(projectId, projectName);
    projectsArray.push(newProject);
    localStorageData.setDataIntoLocalStorage('projectsArray', projectsArray);
    localStorageData.setDataIntoLocalStorage('currentProject', newProject);
    localStorageData.setDataIntoLocalStorage('projectCount', projectCount + 1);
    setCurrentProject(projectId);
    appendNewProjectListItem(newProject);
    document.querySelector('#project-form').reset();
  };
  const enableProjectAddBtn = () => {
    const addProjectBtn = document.querySelector('#add-project');
    addProjectBtn.addEventListener('click', () => {
      addProject();
    });
  };
  const initializeProjectOperation = () => {
    enableProjectAddBtn();
    renderProject();
  };
  return {
    initializeProjectOperation,
    renderProject,
  };
})();

export default displayProject;
