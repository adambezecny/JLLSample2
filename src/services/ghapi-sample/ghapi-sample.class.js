const logger = require('../../logger');
const ghApiUrlBase = 'https://api.github.com';
const axios = require('axios');

/* eslint-disable no-unused-vars */
class Service {
  constructor (options) {
    this.options = options || {};
  }

  static compareFn (item1, item2) {
    if (item1.projects.length < item2.projects.length) {
      return -1;
    }
    if (item1.projects.length > item2.projects.length) {
      return 1;
    }
    // a must be equal to b
    return 0;
  }

  async find (params) {
    throw new Error('please provide github organisation name!');
  }

  async get (id, params) {
    logger.debug(`A new message with ID: ${id}!`);

    const org = id;
    const sortOrder = (params.query.sortOrder && (params.query.sortOrder === 'asc' || params.query.sortOrder === 'desc'))
      ? params.query.sortOrder
      : 'asc';

    const projectMap = new Map();

    const url = `${ghApiUrlBase}/orgs/${org}/repos`;
    const result = await axios.get(url);

    const ungroupedProjects = [];
    result.data.forEach(item => {
      ungroupedProjects.push({
        projectName: item.name,
        projectLang: item.language
      });
    });

    ungroupedProjects.forEach(project => {
      let langProjects = projectMap.get(project.projectLang);

      if (!langProjects) {
        langProjects = [];
        projectMap.set(project.projectLang, langProjects);
      }
      langProjects.push(project.projectName);
    });

    const apiResult = [];
    for (const [key, value] of projectMap.entries()) {
      apiResult.push({
        lang: key,
        projects: value
      });
    }    

    return apiResult;
  }

  async create (data, params) {
    throw new Error('operation not supported!');
  }

  async update (id, data, params) {
    throw new Error('operation not supported!');
  }

  async patch (id, data, params) {
    throw new Error('operation not supported!');
  }

  async remove (id, params) {
    throw new Error('operation not supported!');
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
