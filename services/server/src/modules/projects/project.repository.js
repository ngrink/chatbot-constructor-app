import { sequelize } from "#utils/lib/sequelize";
import { ProjectError } from "./project.exceptions";
import { ProjectModel } from "./project.model";


export class ProjectRepository {
  static async createProject({accountId, name, tags}) {
    const project = await ProjectModel.create({
      accountId,
      name,
      tags
    })

    return project
  }

  static async getProjects(filter) {
    const projects = await ProjectModel.findAll({
      where: filter
    })

    return projects
  }

  static async getAccountProjects(accountId) {
    const projects = await ProjectModel.findAll({
      where: { accountId }
    })

    return projects
  }

  static async getProject(projectId) {
    const project = await ProjectModel.findByPk(projectId)

    return project
  }

  static async getProjectByFilter(filter) {
    const project = await ProjectModel.findOne({
      where: filter
    })

    return project
  }

  // static async updateProjects(filter, data) {
  //   const updatedIds = (await ProjectModel.findAll({
  //     where: filter,
  //     attributes: ["id"]
  //   })).map(item => item.id)

  //   await ProjectModel.update(data, {
  //     where: filter
  //   });

  //   return updatedIds;
  // }

  static async updateProject(projectId, data) {
    const [isUpdated] = await ProjectModel.update(data, {
      where: { id: projectId }
    });
    if (!isUpdated) {
      throw ProjectError.ProjectNotFound()
    }

    return projectId;
  }

  static async deleteProject(projectId) {
    const isDeleted = await ProjectModel.destroy({
      where: { id: projectId },
    });
    if (!isDeleted) {
      throw ProjectError.ProjectNotFound()
    }

    return projectId;
  }
}
