import * as random from "../../utils/functions/random";


export class ConfigResolver {
    static resolveResponse(context, config, state) {
        const text = context.text.toLowerCase();
        let answer;

        if (answer = ConfigResolver._resolveFaqs(text, config)) {
            return answer;
        }

        // return ":CALLBACK";
        return "Я вас не понимаю";
    }

    static _resolveFaqs(question, config) {
        let faq = config.faqs[question];

        if (!faq) {
            return null;
        }

        if (faq.type == "synonym") {
            faq = config.faqs[faq.for];
        }

        return random.choice(faq.answers)
    }

    // static async resolveFlows(context, config) {}
    // ...
}
