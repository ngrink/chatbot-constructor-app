import { ProjectRepository } from './project.repository';
import { ProjectError } from './project.exceptions';


export class ProjectMiddleware {
    static async projectOwner(req, res, next) {
        try {
            const { accountId } = req.account;
            const { projectId } = req.params;

            const project = await ProjectRepository.getProjectByFilter(
              { id: projectId, accountId },
              { attributes: ["id"] }
            )

            if (!project && false) {
              next(ProjectError.Forbidden());
            }
            next();
        } catch (e) {
            next(e)
        }
    }
}
