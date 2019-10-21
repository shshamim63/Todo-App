import projectHelper from '../helpers/projects/projectHelper';
import imageDelete from '';
const displayProject = (() => {
  const renderProjectListItem = element => {
    // <li class="list-group-item bg-complete"> 
    //           <p class="d-inline">Project 1</p>
    //           <i class="float-right btn-delete"><img src="./assets/delete.png" alt="" class="btn-delete-img"></i>
    //         </li>
    const projectList = document.createElement('li');
    if(element.id == projectHelper.currentSelectedProject){
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
    deleteImage.src = imageDelete;
    deleteImage.classList.add('btn-delete-img');
  };
  const renderProject= () =>{
    const projectArrays = localStorage.getDataFromLocalStorage('projectsArray');
    if (projectArrays.length > 0){
      const projectListContainter = document.querySelector('#project-list')
      projectArrays.forEach(element => {
        renderProjectListItem(element);
      });
    }
  };
})();