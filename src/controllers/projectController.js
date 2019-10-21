import Project from '../model/project.js'
const projectController = (() => {
  const create = (id,name) => {
    const newProject = Project(id,name);
    return newProject;
  };
  return {
    create
  };
})();

export default projectController;