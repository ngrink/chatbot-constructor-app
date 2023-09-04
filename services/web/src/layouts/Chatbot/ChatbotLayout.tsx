import { FC, useEffect } from "react";
import { useParams, Outlet } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { useStore } from "@hooks/useStore";
import { ChatbotService } from "@services/chatbot.service";
import { ChatbotNav } from "@containers/Chatbot/Nav";
import { ChatbotHeader } from "@containers/Chatbot/Header";
import styles from "./ChatbotLayout.module.scss";


const ChatbotLayout: FC = observer(() => {
    const { id } = useParams() as {id: string};
    const { ChatbotStore, ConfigStore } = useStore();

    useEffect(() => {
        ChatbotService.getChatbot(id)
            .then(chatbot => {
                ChatbotStore.setChatbot(chatbot);
                ConfigStore.setConfigId(chatbot.configId);
            })
    }, [id, ChatbotStore, ConfigStore])


    if (!ChatbotStore.chatbot) {
        return null;
    }

    return (
        <div className={styles.layout}>
            <ChatbotNav id={id} />
            <div className={styles.wrapper}>
                <ChatbotHeader id={id} />
                <div className={styles.screenwrapper}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
})

export { ChatbotLayout };
