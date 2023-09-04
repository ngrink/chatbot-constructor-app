import { $axios } from '@utils/axios';


class ChatbotService {
    static async getAllChatbots() {
        const {data} = await $axios.get('/projects/');
        console.log(data);
        return data;
    }

    static async getChatbot(id: string) {
        const {data} = await $axios.get(`/projects/${id}`);
        return data;
    }

    static async createChatbot(name: string, tags: string[]) {
        const {data} = await $axios.post('/projects/', {name, tags});
        return data;
    }
}

export { ChatbotService };
