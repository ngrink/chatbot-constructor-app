import { DialogService } from './dialog.service';


export class DialogController {
  static async getProjectDialogs(req, res, next) {
    try {
      const { projectId } = req.params;

      const dialogs = await DialogService.getProjectDialogs(projectId)
      res.status(200).json(dialogs);
    } catch (e) {
      next(e)
    }
  }
}
