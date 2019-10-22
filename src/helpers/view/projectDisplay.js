import * as localStorageData from '../common/storage.js';

const displayProject = (() => {
  const renderProjectListItem = element => {
    // <li class="list-group-item bg-complete"> 
    //           <p class="d-inline">Project 1</p>
    //           <i class="float-right btn-delete"><img src="./assets/delete.png" alt="" class="btn-delete-img"></i>
    //         </li>
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
    deleteImage.src = "../../assets/images/delete.png";
    deleteImage.classList.add('btn-delete-img');
    deleteIcon.appendChild(deleteImage);
    projectList.appendChild(projectTitle);
    projectList.appendChild(deleteIcon);
    return projectList;
  };
  const renderProject= () => {
    const projectsArray = localStorageData.getDataFromLocalStorage('projectsArray');
    if (projectsArray.length > 0){
      const projectListContainter = document.querySelector('#project-list')
      projectsArray.forEach(element => {
        projectListContainter.appendChild(renderProjectListItem(element));
      });
    }
  };
  return {
    renderProject
  };
})();

export default displayProject;