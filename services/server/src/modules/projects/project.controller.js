import { ProjectService } from './project.service';


export class ProjectController {
    static async createProject(req, res, next) {
        try {
            const { accountId } = req.account;
            const { name, tags } = req.body;

            const project = await ProjectService.createProject(accountId, name, tags);
            res.status(200).json(project);
        } catch (e) {
            next(e);
        }
    }

    static async getAccountProjects(req, res, next) {
        try {
            const { accountId } = req.account;

            const projects = await ProjectService.getAccountProjects(accountId);
            res.status(200).json(projects);
        } catch (e) {
            next(e);
        }
    }

    static async getProject(req, res, next) {
        try {
            const { projectId } = req.params;

            const project = await ProjectService.getProject(projectId);
            res.status(200).json(project);
        } catch (e) {
            next(e);
        }
    }

    static async updateProject(req, res, next) {
        try {
            const { projectId } = req.params;
            const { name, tags } = req.body;

            const updatedId = await ProjectService.updateProject(projectId, {name, tags});
            res.status(200).json({updatedId});
        } catch (e) {
            next(e);
        }
    }

    static async deleteProject(req, res, next) {
        try {
            const { projectId } = req.params;

            const deletedId = await ProjectService.deleteProject(projectId);
            res.status(200).json({deletedId});
        } catch (e) {
            next(e);
        }
    }
}
