import * as localStorageData from '../common/storage.js'
import projectInput from '../projects/projectInput.js'
import projectController from '../../controllers/projectController.js'

const projectHelper = (() => {
  const createProjectsArray = () => {
    if (localStorageData.getDataFromLocalStorage("projectsArray") === null) {
      let projectsArray = [];
      localStorageData.setDataIntoLocalStorage("projectsArray", projectsArray);
      localStorageData.setDataIntoLocalStorage("projectCount", 0);
    }
  };

  const setDefaultProject = () => {
    const projectsArray = localStorageData.getDataFromLocalStorage('projectsArray');
    const projectCount = localStorageData.getDataFromLocalStorage('projectCount');
    if (projectCount === 0) {
      const projectId = projectInput.createProjectId();
      const defaultProject = projectController.create(projectId, 'Default'); 
      projectsArray.push(defaultProject);
      localStorageData.setDataIntoLocalStorage('projectsArray', projectsArray);
      localStorageData.setDataIntoLocalStorage('currentProject', defaultProject);
      localStorageData.setDataIntoLocalStorage('projectCount', projectCount+1);
    }
  };
  return {
    createProjectsArray,
    setDefaultProject
  }
})();

export default projectHelper;