import projectHelper from './helpers/projects/projectHelper.js';
import displayProject from './helpers/view/projectDisplay.js';
projectHelper.createProjectsArray();
projectHelper.setDefaultProject();
displayProject.renderProject();