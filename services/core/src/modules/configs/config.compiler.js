export class ConfigCompiler {
    static compile(config) {
        return new Config(config)
            .compileFlows()
            .compileFaq()
            .compileNewsletters()
            .return()
    }
}

class Config {
    constructor(config) {
        this.config = config;
    }

    compileFlows() {
        return this;
    }

    compileFaq() {
        if (!this.config?.database_faq) {
            return this
        }

        let faqs = this.config.database_faq
        let compiledFaqs = {}

        for (let [faqId, { question, synonyms, answers }] of Object.entries(faqs)) {
            question = question.toLowerCase()

            compiledFaqs[question] = {
                type: "question",
                answers: answers.map(x => x.value)
            }

            if (synonyms) {
                for (let synonym of synonyms) {
                    synonym = synonym.value.toLowerCase();
                    compiledFaqs[synonym] = {
                        type: "synonym",
                        for: question
                    }
                }
            }
        }

        this.config.faqs = compiledFaqs;
        return this
    }

    compileNewsletters() {
        return this;
    }

    // ...

    return() {
        return this.config;
    }

}
