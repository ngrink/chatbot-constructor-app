import { makeAutoObservable } from "mobx";
import { makePersistable } from 'mobx-persist-store';

import { IFaqs, IFaq } from '@ts/config/faq.types';


class FaqStore {
    faqs: IFaqs = {};

    constructor() {
        makeAutoObservable(this, {}, {autoBind: true});
        makePersistable(this, {
            name: 'FaqStore',
            properties: [
                'faqs'
            ],
            storage: window.localStorage
        })
    }

    setFaqs = (faqs: IFaqs) => {
        this.faqs = faqs;
    }

    createFaq = (faqId: string, faq: IFaq) => {
        this.faqs[faqId] = faq;
    }

    updateFaq = (faqId: string, faq: IFaq) => {
        this.faqs[faqId] = faq;
    }

    deleteFaq = (faqId: string) => {
        delete this.faqs[faqId];
    }
}

export { FaqStore };
