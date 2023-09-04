import { ConfigModel } from "#configs";


export class FaqRepository {
  static async createFaq(projectId, faqId, {question, synonyms, answers}) {
    const config = await ConfigModel.findOne({
      where: { projectId },
      attributes: ['id', 'database_faq']
    });

    config.database_faq = {
      ...config.database_faq,
      [faqId]: {
        question,
        synonyms,
        answers
      }
    }

    config.save()
    return
  }

  static async getAllFaq(projectId) {
    const config = await ConfigModel.findOne({
      where: { projectId },
      attributes: ["database_faq"]
    })

    return config.database_faq
  }

  static async updateFaq(projectId, faqId, {question, synonyms, answers}) {
    const config = await ConfigModel.findOne({
      where: { projectId },
      attributes: ["id", "database_faq"]
    })

    config.database_faq = {
      ...config.database_faq,
      [faqId]: {
        question,
        synonyms,
        answers
      }
    }

    config.save()
    return
  }

  static async deleteFaq(projectId, faqId) {
    const config = await ConfigModel.findOne({
      where: { projectId },
      attributes: ["id", "database_faq"]
    })

    delete config.database_faq[faqId]
    config.database_faq = {...config.database_faq}
    config.changed("database_faq", true);
    config.save()

    return
  }
}
