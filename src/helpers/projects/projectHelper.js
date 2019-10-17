import * as localStorageData from '../common/storage'
import projectForm from ''
import projectComtroller from '../../controllers/projectController'
export const createProjectsArray = () => {
    if (localStorageData.getDataFromLocalStorage("projectsArray") === null) {
      let projectsArray = [];
      localStorageData.setDataIntoLocalStorage("projectsArray", projectsArray);
    }
};

export const setDefaultProject = () => {

  const defaultProject = projectComtroller.create()
};