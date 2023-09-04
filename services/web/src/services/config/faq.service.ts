import { $axios } from '@utils/axios';
import { IFaq } from '@ts/config/faq.types';


class FaqService {
    static async getAllFaqs(projectId: string) {
        const res = await $axios.get(`/projects/${projectId}/config/database/faq`);

        return res.data;
    }

    static async addFaq(projectId: string, faqId: string, data: IFaq) {
        await $axios.post(`/projects/${projectId}/config/database/faq/${faqId}`, data);
        return;
    }

    static async updateFaq(projectId: string, faqId: string, data: IFaq) {
        await $axios.patch(`/projects/${projectId}/config/database/faq/${faqId}`, data);
        return;
    }

    static async deleteFaq(projectId: string, faqId: string) {
        await $axios.delete(`/projects/${projectId}/config/database/faq/${faqId}`,);
        return
    }
}

export { FaqService };
