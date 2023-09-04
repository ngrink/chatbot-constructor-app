import { FC, useState } from "react";
import { observer } from "mobx-react-lite";
import useAsync from "react-hook-use-async";

import { useStore } from "@hooks/useStore";
import { ChannelService } from "@services/channel.service";
import { IChatbotChannels } from "@ts/channel.types";
import { channels } from "@utils/constants/channels";

import { ConnectChannelDialog } from "./components/ConnectChannelDialog";
import { ChannelContentMenu } from "./components/ChannelContextMenu";
import styles from "./ChatbotChannelsScreen.module.scss";
import screen from "../Screen.module.scss";



const ChatbotChannelsScreen: FC = observer(() => {
    const { ChatbotStore, ChannelStore } = useStore();
    const projectId = ChatbotStore.chatbot?.id as string;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [channelType, setChannelType] = useState("");

    const connectedChannels = useAsync(async () => {
        let channels = await ChannelService.getChannels(projectId)
        if (!channels) {
            return []
        }
        let mappedChannels: IChatbotChannels  = {}
        channels.forEach(item => mappedChannels[item.id] = item)
        ChannelStore.addChannels(projectId, mappedChannels);
        return channels;
    })

    const openModal = (type: string) => {
        setIsModalOpen(true);
        setChannelType(type);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const addChannel = async (auth: object) => {
        const channel = await ChannelService.addChannel(projectId, channelType, auth)
        ChannelStore.addChannel(projectId, channel.id, channel);
        setIsModalOpen(false);
    }

    return (
        <div className={screen.screen}>
            <h1 className={screen.title}>
                Каналы
            </h1>
            <h2 className={styles.subtitle}>
                Подключенные каналы
            </h2>
            <ul className={styles.channels}>
                {connectedChannels.result && Object.values(ChannelStore.channels[projectId]).map((channel: any) => (
                    <li className={styles.channelsItem} key={channel.id}>
                        <img
                            className={styles.channelsIcon}
                            src={`/assets/img/icons/${channel.type}.png`}
                            alt={`${channel.type}`}
                        />
                        {/* <span className={styles.channelsTitle}>
                            TITLE
                        </span> */}
                        <span className={styles.channelsToken}>
                            {channel.auth.token.slice(0, 4)}
                            {" ... "}
                            {channel.auth.token.slice(-4)}
                        </span>
                        <div className={styles.channelsMenu}>
                            <ChannelContentMenu channel={channel} />
                        </div>
                    </li>
                ))}
            </ul>

            <h2 className={styles.subtitle}>
                Подключить каналы
            </h2>
            <ul className={styles.channels}>
                {channels.map(channel => (
                    <li className={`${styles.channelsItem} ${channel.hide && styles.channelsItemHide}`} key={channel.type} onClick={() => openModal(channel.type)}>
                        <img
                            className={styles.channelsIcon}
                            src={`/assets/img/icons/${channel.type}.png`}
                            alt={`${channel.type}`}
                        />
                        <span className={styles.channelsTitle}>
                            {channel.title}
                        </span>
                    </li>
                ))}
            </ul>

            <ConnectChannelDialog
                isOpen={isModalOpen}
                onClose={closeModal}
                onAction={addChannel}
            />
        </div>
    );
})

export { ChatbotChannelsScreen };
