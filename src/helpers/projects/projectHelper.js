import * as localStorageData from '../common/storage.js';
import projectInput from './projectInput.js';
import projectController from '../../controllers/projectController.js';

const projectHelper = (() => {
  const createProjectsArray = () => {
    if (localStorageData.getDataFromLocalStorage('projectsArray') === null && localStorageData.getDataFromLocalStorage('initialLoad') === null) {
      const projectsArray = [];
      localStorageData.setDataIntoLocalStorage('projectsArray', projectsArray);
      localStorageData.setDataIntoLocalStorage('projectCount', 0);
      localStorageData.setDataIntoLocalStorage('initialLoad', false);
    }
  };

  const setDefaultProject = () => {
    const projectsArray = localStorageData.getDataFromLocalStorage('projectsArray');
    const projectCount = localStorageData.getDataFromLocalStorage('projectCount');
    const defaultloaded = localStorageData.getDataFromLocalStorage('initialLoad');
    if (projectCount === 0 && defaultloaded === false) {
      const projectId = projectInput.createProjectId();
      const defaultProject = projectController.createProject(projectId, 'Default');
      projectsArray.push(defaultProject);
      localStorageData.setDataIntoLocalStorage('projectsArray', projectsArray);
      localStorageData.setDataIntoLocalStorage('currentProject', defaultProject);
      localStorageData.setDataIntoLocalStorage('projectCount', projectCount + 1);
      localStorageData.setDataIntoLocalStorage('initialLoad', true);
    }
  };
  return {
    createProjectsArray,
    setDefaultProject,
  };
})();
export default projectHelper;
