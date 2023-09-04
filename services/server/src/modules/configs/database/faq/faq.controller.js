import { FaqService } from './faq.service';


export class FaqController {
    static async getAllFaqs(req, res, next) {
        try {
            const { projectId } = req.params;

            const faqs = await FaqService.getAllFaqs(projectId);
            res.status(200).json(faqs);
        } catch (e) {
            next(e);
        }
    }

    static async addFaq(req, res, next) {
        try {
            const { projectId, faqId } = req.params;
            const { question, synonyms, answers } = req.body;

            await FaqService.addFaq(projectId, faqId, {question, synonyms, answers});
            res.status(200).json("OK");
        } catch (e) {
            next(e);
        }
    }

    static async updateFaq(req, res, next) {
        try {
            const { projectId, faqId } = req.params;
            const { question, synonyms, answers } = req.body;


            await FaqService.updateFaq(projectId, faqId, {question, synonyms, answers});
            res.status(200).json("OK");
        } catch (e) {
            next(e);
        }
    }

    static async deleteFaq(req, res, next) {
        try {
            const { projectId, faqId } = req.params;

            await FaqService.deleteFaq(projectId, faqId);
            res.status(200).json("OK");
        } catch (e) {
            next(e);
        }
    }
}
