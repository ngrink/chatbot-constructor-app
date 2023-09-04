import { $axios } from '@utils/axios';


class DialogService {
  static async getDialogs(projectId: string) {
      const res = await $axios.get(`/projects/${projectId}/dialogs`)
      return res.data;
  }
}

export { DialogService };
