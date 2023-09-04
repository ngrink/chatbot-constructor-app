import { ConfigService } from "#configs";
import { UserRepository } from "#users";
import { DialogRepository } from "#dialogs";
import { ChannelRepository } from "#channels";

import { ProjectRepository } from "./project.repository";
import { ProjectError } from "./project.exceptions";


export class ProjectService {
  static async createProject(accountId, name, tags) {
    const project = await ProjectRepository.createProject({accountId, name, tags});
    const config = await ConfigService.createConfig(accountId, project.id);

    project.configId = config.id;
    project.save();

    return project
  }

  static async getAccountProjects(accountId) {
    const data = await ProjectRepository.getAccountProjects(accountId);
    const usersCount = await UserRepository.countUsers();
    const messagesCount = await DialogRepository.countMessages();
    const connectedChannels = await ChannelRepository.getConnectedChannels();

    const projects = data.map(x => ({
      ...x.dataValues,
      usersCount: usersCount[x.id],
      messagesCount: messagesCount[x.id],
      connectedChannels: connectedChannels[x.id],
    }))

    return projects
  }

  static async getProject(projectId) {
    const project = await ProjectRepository.getProject(projectId);
    if (!project) {
        throw ProjectError.ProjectNotFound();
    }

    return project
  }

  static async updateProject(projectId, {name, tags}) {
    const updatedId = await ProjectRepository.updateProject(projectId, {name, tags});
    if (!updatedId) {
        throw ProjectError.ProjectNotFound();
    }

    return updatedId
  }

  static async deleteProject(projectId) {
    const deletedId = await ProjectRepository.deleteProject(projectId);
    if (!deletedId) {
        throw ProjectError.ProjectNotFound();
    }

    return deletedId;
  }
}
