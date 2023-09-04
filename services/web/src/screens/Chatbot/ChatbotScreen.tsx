import { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { routes } from "@utils/constants";
import { useStore } from "@hooks/useStore";
import { ChatbotService } from "@services/chatbot.service";
import { ChatbotCard } from "@containers/Chatbot/Card";
import styles from "./ChatbotScreen.module.scss";


// const channelsMock = [
//     {type: "vk", status: "active"},
//     {type: "telegram", status: "active"},
//     {type: "whatsapp", status: "error"},
//     {type: "viber", status: "disabled"},
// ]

const channelsMock = [
    {type: "vk", status: "notconnected"},
    {type: "telegram", status: "notconnected"},
    {type: "whatsapp", status: "notconnected"},
    {type: "viber", status: "notconnected"},
]

const wrapChannels = (channels: String[] = []) => {
  return channelsMock.map(x => channels.includes(x.type)
    ? {type: x.type, status: "active"}
    : {type: x.type, status: "notconnected"}
  )
}


const ChatbotScreen: FC = observer(() => {
    const { ChatbotStore } = useStore();

    useEffect(() => {
        ChatbotService.getAllChatbots()
            .then(chatbots => ChatbotStore.setAccountChatbots(chatbots))
    }, [ChatbotStore])

    return (
        <div className={styles.screen}>
            <h1 className={styles.title}>Мои чат-боты</h1>
            <div className={styles.chatbots}>
                <ul className={styles.chatbotsList}>
                    {ChatbotStore.accountChatbots.map(({id, name, tags, usersCount, messagesCount, connectedChannels}) => (
                        <li key={id} className={styles.chatbotsItem}>
                            <Link to={`${routes.CHATBOTS}/${id}`} className={styles.chatbotsLink}>
                                <ChatbotCard name={name} tags={tags} usersCount={usersCount || 0} messagesCount={messagesCount || 0} channels={wrapChannels(connectedChannels)}/>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
})

export { ChatbotScreen };
