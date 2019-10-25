import * as localStorageData from '../common/storage.js';
import projectInput from '../projects/projectInput.js'
import projectController from '../../controllers/projectController.js'
const displayProject = (() => {
  const selectProject = (targetId) => {
    const projectList = document.querySelectorAll('li');
    projectList.forEach(element => {
      const elementId = element.id.split('-')[1];
      element.classList.remove('bg-complete');
      if (elementId === targetId.toString()) {
        element.classList.add('bg-complete');
      }
    });
  };
  const renderProjectListItem = element => {
    const projectList = document.createElement('li');
    if(element.id == localStorageData.getDataFromLocalStorage('currentProject').id){
      projectList.classList.add('list-group-item','bg-complete');
    } else {
      projectList.classList.add('list-group-item');
    }
    projectList.setAttribute("id", `project-${element.id}`);

    const projectTitle = document.createElement('p');
    projectTitle.classList.add('d-inline');
    projectTitle.innerHTML = element.name;

    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('float-right', 'btn-delete');

    const deleteImage = document.createElement('img');
    deleteImage.src = "./assets/images/delete.png";
    deleteImage.classList.add('btn-delete-img');
    deleteImage.setAttribute("id", `projectdelete-${element.id}`);
    deleteIcon.appendChild(deleteImage);
    projectList.appendChild(projectTitle);
    projectList.appendChild(deleteIcon);
    return projectList;
  };
  const renderProject = () => {
    const projectsArray = localStorageData.getDataFromLocalStorage('projectsArray');
    if (projectsArray.length > 0){
      const projectListContainter = document.querySelector('#project-list')
      projectsArray.forEach(element => {
        const appendproject = renderProjectListItem(element);
        appendproject.addEventListener('click', () => {
          selectProject(element.id);
        });
        projectListContainter.appendChild(renderProjectListItem(element));
      });
    }
  };
  const addProject = () => {
    const projectsArray = localStorageData.getDataFromLocalStorage('projectsArray');
    const projectCount = localStorageData.getDataFromLocalStorage('projectCount');
    const projectId = projectInput.createProjectId();
    const projectName = projectInput.getProjectName();
    const newProject = projectController.create(projectId, projectName); 
    projectsArray.push(newProject);
    localStorageData.setDataIntoLocalStorage('projectsArray', projectsArray);
    localStorageData.setDataIntoLocalStorage('currentProject', newProject);
    localStorageData.setDataIntoLocalStorage('projectCount', projectCount+1);
  };
  const enableProjectAddBtn = () => {
    const addProjectBtn = document.querySelector('#add-project');
    addProjectBtn.addEventListener('click', () => {
      addProject();
      renderProject();
    });
  };
  const initializeProjectOperation = () =>{
    enableProjectAddBtn();
    renderProject();
  };
  return {
    initializeProjectOperation,
    renderProject
  };
})();

export default displayProject;