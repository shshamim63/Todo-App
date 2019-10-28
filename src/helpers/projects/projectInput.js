const projectInput = (() => {
  const createProjectId = () => {
    const projectId = Math.round(Math.random() * 999999999999999999999, 0);
    return projectId;
  };
  const getProjectName = () => {
    const name = document.querySelector('#project-name').value;
    return name;
  };
  return {
    createProjectId,
    getProjectName,
  };
})();
export default projectInput;
