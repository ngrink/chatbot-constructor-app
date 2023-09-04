import { FC, MouseEvent, MouseEventHandler, useState } from "react";

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, OutlinedInput, TextField, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


interface ConnectChannelDialogProps {
    isOpen: boolean,
    onClose: MouseEventHandler,
    onAction: Function
}


const ConnectChannelDialog: FC<ConnectChannelDialogProps> = ({isOpen, onClose, onAction}) => {
    const [token, setToken] = useState("");

    // const clearFields = () => {
    //     setToken("");
    // }

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            maxWidth="md"
            fullWidth
        >
            <DialogTitle>
                Добавить канал
            </DialogTitle>

            <DialogContent>
                <Typography variant="subtitle1" sx={{fontWeight: "bold"}}>
                    Токен
                </Typography>
                <TextField
                    margin="dense"
                    type="text"
                    variant="outlined"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    fullWidth
                    autoFocus
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Отмена</Button>
                <Button onClick={() => onAction({token})} variant="contained">Добавить</Button>
            </DialogActions>

        </Dialog>
     );
}

export { ConnectChannelDialog };
