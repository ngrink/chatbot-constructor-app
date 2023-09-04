import React, { FC } from "react";

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import styles from "./ChatbotCard.module.scss";


interface IChatbotCardProps {
    name: string,
    tags: string[],
    usersCount: number | string,
    messagesCount: number | string,
    channels: Array<IChannel>
}

interface IChannel {
    type: string,
    status: string;
}



const ChatbotCard: FC<IChatbotCardProps> = ({name, tags, usersCount, messagesCount, channels }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const isContextMenuOpen = Boolean(anchorEl);

    const openContextMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setAnchorEl(event.currentTarget);
    };

    const closeContextMenu = (event: any) => {
      event.preventDefault();
      setAnchorEl(null);
    };

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <div className={styles.row}>
                    <div className={styles.name}>
                        {name}
                    </div>
                    <button className={styles.btnContextmenu} onClick={openContextMenu}>
                        <FontAwesomeIcon icon={faEllipsisVertical} />
                    </button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={isContextMenuOpen}
                        onClose={closeContextMenu}
                        MenuListProps={{'aria-labelledby': 'basic-button'}}
                        anchorOrigin={{vertical: 'top', horizontal: 'left'}}
                        transformOrigin={{vertical: 'top', horizontal: 'left'}}
                    >
                        <MenuItem onClick={() => {}}>Остановить чат-бота</MenuItem>
                        <Divider />
                        <MenuItem onClick={() => {}} style={{color: "red"}}>Удалить чат-бота</MenuItem>
                    </Menu>
                </div>
                <ul className={styles.tags}>
                    {tags.map(tag => (
                        <li key={tag}>{tag}</li>
                    ))}
                </ul>
            </div>
            <div className={styles.footer}>
                <ul className={styles.channels}>
                    {channels.map(({type, status}) => (
                        <li key={type} className={`${styles.channelItem} ${styles[status]}`}>
                            <img className={styles.channelImage} src={`/assets/img/icons/${type}.png`} alt="" />
                            <div className={`${styles.channelStatus} ${styles[status]}`}></div>
                        </li>
                    ))}
                </ul>
                <ul className={styles.statistics}>
                    <li className={styles.statisticsItem}>
                        <div className={styles.statisticsData}>
                            {usersCount}
                        </div>
                        <div className={styles.statisticsTitle}>
                            Пользователей
                        </div>
                    </li>
                    <li className={styles.statisticsItem}>
                        <div className={styles.statisticsData}>
                            {messagesCount}
                        </div>
                        <div className={styles.statisticsTitle}>
                            Сообщений
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export { ChatbotCard };
