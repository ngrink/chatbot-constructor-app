import { $axios } from '@utils/axios';

class ConfigService {
    static async publishConfig(projectId: string) {
        $axios.post(`/projects/${projectId}/config/publish`);
    }
}


export { ConfigService };
