import { createContext } from "react";
import { injectStores } from '@mobx-devtools/tools';

import { AuthStore } from "./auth.store";
import { ChatbotStore } from "./chatbot.store";
import { ConfigStore } from "./config.store";
import { FaqStore } from "./config/faq.store";
import { ChannelStore } from "./channel.store";
import { DialogsStore } from "./dialog.store";


const Store = {
    AuthStore: new AuthStore(),
    ChatbotStore: new ChatbotStore(),
    ConfigStore: new ConfigStore(),
    FaqStore: new FaqStore(),
    ChannelStore: new ChannelStore(),
    DialogsStore: new DialogsStore(),
}

const Context = createContext(Store);
injectStores(Store);

export { Store, Context };
