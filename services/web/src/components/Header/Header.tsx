import React, { FC, Fragment, useState} from "react";
import { observer } from "mobx-react-lite";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useStore } from "@hooks/useStore";
import { ChatbotService } from "@services/chatbot.service";
import { Logo } from "@components/Logo";
import { UserAvatar } from "@containers/User/Avatar";
import { HeaderNav } from "./Nav";
import classes from "./Header.module.css";




interface HeaderProps {
    type: "main" | "minimal"
}


const Header: FC<HeaderProps> = observer(({ type }) => {
    const { ChatbotStore } = useStore();
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [tags, setTags] = useState([]);

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleCreate = async () => {
        const chatbot = await ChatbotService.createChatbot(name, tags);
        ChatbotStore.addAccountChatbot(chatbot);
        setOpen(false)
    }

    return (
        <header className={`${classes.header} ${type === "minimal" && classes.header_minimal}`}>
            <div className={classes.header__logo}>
                <Logo />
            </div>
            { type === "main" &&
                <Fragment>
                    <HeaderNav />
                    <div className={classes.rightside}>
                        <Button variant="contained" onClick={handleOpen}>Создать чат-бота</Button>
                        <Dialog open={open} onClose={handleClose}>
                            <DialogTitle>Создать чат-бота</DialogTitle>
                            <DialogContent>
                                <TextField
                                    id="name"
                                    type="text"
                                    label="Название бота"
                                    margin="dense"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    autoFocus
                                    fullWidth
                                />
                                <DialogContentText style={{marginTop: '12px'}}>
                                    В дальнейшем, созданному боту нужно будет настроить <b>конфиг</b> и&nbsp;подключить <b>каналы</b>
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Отмена</Button>
                                <Button onClick={handleCreate}>Создать</Button>
                            </DialogActions>
                        </Dialog>
                        {/* <div className={classes.btngroup}>
                            <UserAvatar />
                        </div> */}
                    </div>
                </Fragment>
            }
        </header>
    );
})

export { Header };
