import { FC } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { Button, Stack } from "@mui/material";
// import LoadingButton from '@mui/lab/';
// import SaveIcon from '@mui/icons-material/Save';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import { useStore } from "@hooks/useStore";
import { IChatbot } from "@ts/chatbot.types";
import { Status } from "@components/Status";
import { Search } from "@components/Search";
import styles from "./ChatbotHeader.module.scss";
import { ConfigService } from "@services/config.service";


interface ChatbotHeaderProps {
    id: string
}

const ChatbotHeader: FC<ChatbotHeaderProps> = observer(({ id }) => {
    const { ChatbotStore, ConfigStore } = useStore();
    const { name, status = "active" } = ChatbotStore.chatbot as IChatbot;
    const configId = ConfigStore.configId as string;

    const publishConfig = async () => {
        await ConfigService.publishConfig(configId);
    }

    return (
        <header className={styles.header}>
            <div className={styles.wrapper}>
                <Link to="/chatbots" className={styles.back}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </Link>
                <div className={styles.name}>{name}</div>
                <div className={styles.status}><Status type={status} /></div>
                {/* <div className={styles.search}><Search /></div> */}
            </div>
            <div className={styles.wrapper}>
                {/* <Stack direction="row" spacing={2}>
                    <LoadingButton
                        loading
                        loadingPosition="start"
                        startIcon={<SaveIcon />}
                        variant="outlined"
                    >
                        Save
                    </LoadingButton>
                </Stack> */}
                {/* <Button variant="contained" size="medium" className="test">Тестировать</Button>
                <Button variant="contained" size="medium" className="save">Сохранить</Button> */}
                <Button
                    onClick={publishConfig}
                    variant="contained"
                    size="medium"
                    className="publish"
                >Опубликовать</Button>
                <div className={styles.separator}></div>
                <div className={styles.notifications}></div>
                <div className={styles.profile}></div>
            </div>
        </header>
    );
})

export { ChatbotHeader };
