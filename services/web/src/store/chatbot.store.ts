import { makeAutoObservable } from "mobx";
import { makePersistable } from 'mobx-persist-store';

import { IChatbot } from "@ts/chatbot.types";


class ChatbotStore {
    accountChatbots: IChatbot[] = [];
    chatbot: IChatbot | null = null;

    constructor() {
        makeAutoObservable(this, {}, {autoBind: true});
        makePersistable(this, {
            name: 'ChatbotStore',
            properties: [
                'chatbot'
            ],
            storage: window.localStorage
        })
    }

    setAccountChatbots = (chatbots: IChatbot[]) => {
        this.accountChatbots = chatbots;
    }

    addAccountChatbot = (chatbot: IChatbot) => {
        this.accountChatbots.push(chatbot);
    }

    setChatbot = (chatbot: IChatbot) => {
        this.chatbot = chatbot;
    }

    unsetChatbot = () => {
        this.chatbot = null;
    }
}

export { ChatbotStore };
