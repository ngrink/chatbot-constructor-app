import { omit } from "lodash-es";

import { ConfigModel } from "../../config.model";
import { ConfigError } from "../../config.exceptions";
import { FaqError } from "./faq.exceptions";
import { FaqRepository } from "./faq.repository";


export class FaqService {
    static async getAllFaqs(projectId) {
      const faqs = FaqRepository.getAllFaq(projectId);
      if (!faqs) {
          ConfigError.ConfigNotFound();
      }

      return faqs;
    }

    static async addFaq(projectId, faqId, {question, synonyms, answers}) {
      await FaqRepository.createFaq(projectId, faqId, {question, synonyms, answers})
    }

    static async updateFaq(projectId, faqId, {question, synonyms, answers} ) {
        await FaqRepository.updateFaq(projectId, faqId, {question, synonyms, answers})
    }

    static async deleteFaq(projectId, faqId) {
        await FaqRepository.deleteFaq(projectId, faqId)
    }
}
