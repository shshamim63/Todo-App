import * as localStorageData from '../common/storage.js'
import projectinput from './projectInput.js'
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
      const currentSelectedProject = projectinput.createProjectId();
      const defaultProject = projectController.create(currentSelectedProject, 'Default'); 
      projectsArray.push(defaultProject);
      localStorageData.setDataIntoLocalStorage('projectsArray', projectsArray);
      localStorageData.setDataIntoLocalStorage('currentProject', defaultProject);
      localStorageData.setDataIntoLocalStorage('projectCount', projectCount+1);
    }
  };
  return {
    createProjectsArray,
    setDefaultProject,
    currentSelectedProject
  }
})();

export default projectHelper;