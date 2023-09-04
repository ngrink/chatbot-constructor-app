import { UserService } from './user.service';


export class UserController {
  static async getProjectUsers(req, res, next) {
    try {
      const { projectId } = req.params;

      const users = await UserService.getProjectUsers(projectId)
      res.status(200).json(users);
    } catch (e) {
      next(e)
    }
  }
}
