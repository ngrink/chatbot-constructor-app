import { $axios } from "../../utils/axios";


export class ConfigAPI {
    static async getAllConfigs() {
        try {
            const res = await $axios.get('/configs');
            return res.data;
        } catch (e) {
            console.log(e);
        }
    }

    static async getConfigByProjectId(projectId) {
        try {
            const res = await $axios.get(`/chatbots/${projectId}/config`);
            return res.data;
        } catch (e) {
            console.log(e);
        }
    }
}
