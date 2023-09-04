import { $axios } from '@utils/axios';


class UserService {
    static async getUsers(projectId: string) {
        const res = await $axios.get(`/projects/${projectId}/users`)
        return res.data;
    }
}

export { UserService };
