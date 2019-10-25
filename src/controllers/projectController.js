import * as localStorageData from '../helpers/common/storage.js';
import Project from '../model/project.js'
const projectController = (() => {
  const createProject = (id,name) => {
    const newProject = Project(id,name);
    return newProject;
  };
  const deleteProject = (id) => {
    const projectLists = localStorageData.getDataFromLocalStorage('projectsArray');
    const numberOfProjects = localStorageData.getDataFromLocalStorage('projectCount');
    let index = projectLists.findIndex(x => x.id === id);
    if (index > -1) {
      projectLists.splice(index,1);
      localStorageData.setDataIntoLocalStorage('projectsArray', projectLists);
      localStorageData.setDataIntoLocalStorage('projectCount', numberOfProjects-1); 
      const currentProjectId = localStorageData.getDataFromLocalStorage('currentProject').id;
      if (currentProjectId === id) {
        localStorageData.setDataIntoLocalStorage('currentProject', null);
      }
    }
  };
  return {
    createProject,
    deleteProject
  };
})();

export default projectController;