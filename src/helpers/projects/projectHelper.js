import * as localStorageData from '../common/storage.js'
import projectinput from './projectInput.js'
import projectController from '../../controllers/projectController.js'

const projectHelper = (() => {
  const currentSelectedProject= 0;

  const createProjectsArray = () => {
      if (localStorageData.getDataFromLocalStorage("projectsArray") === null) {
        let projectsArray = [];
        localStorageData.setDataIntoLocalStorage("projectsArray", projectsArray);
      }
  };

  const setDefaultProject = () => {
    currentSelectedProject = projectinput.createProjectId();
    const defaultProject = projectController.create(currentSelectedProject, 'Default'); 
    const projectsArray = localStorageData.getDataFromLocalStorage('projectsArray');
    projectsArray.push(defaultProject);
    localStorageData.removeDataFromLocalStorage('projectsArray');
    localStorageData.setDataIntoLocalStorage('projectsArray', projectsArray);
  };
  return {
    createProjectsArray,
    setDefaultProject,
    currentSelectedProject
  }
})();

export default projectHelper;