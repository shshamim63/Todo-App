import * as localStorageData from '../common/storage'
import projectinput from './projectInput'
import projectController from '../../controllers/projectController'

const projectHelper = (() => {
  const currentSelectedProject;

  const createProjectsArray = () => {
      if (localStorageData.getDataFromLocalStorage("projectsArray") === null) {
        let projectsArray = [];
        localStorageData.setDataIntoLocalStorage("projectsArray", projectsArray);
      }
  };

  const setDefaultProject = () => {
    const defaultProject = projectController.create(projectinput.createProjectId(),projectinput.getProjectName());
    const projectsArray = localStorageData.getDataFromLocalStorage('projectsArray');
    projectsArray.push(defaultProject);
    localStorageData.removeDataFromLocalStorage('projectsArray');
    localStorageData.setDataIntoLocalStorage('projectsArray', projectsArray); 
  };
})();

export default projectHelper;