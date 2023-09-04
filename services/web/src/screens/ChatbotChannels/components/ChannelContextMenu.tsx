import { FC, useState } from 'react';
import styled from '@emotion/styled'

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faPause, faPlay, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ChannelService } from '@services/channel.service';
import { useStore } from '@hooks/useStore';
import { IChannel } from '@ts/channel.types';


const ChannelMenuIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    overflow: hidden;

    &:hover {
        background-color: #efefef
    }
`

interface ChannelContentMenuProps {
    channel: IChannel
}


const ChannelContentMenu: FC<ChannelContentMenuProps> = ({channel}) => {
    const { projectId, id: channelId, enabled } = channel;
    const { ChannelStore } = useStore();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isOpen = Boolean(anchorEl);

    const openMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const closeMenu = () => {
      setAnchorEl(null);
    };

    const removeChannel = () => {
        closeMenu();
        setTimeout(() => {
            ChannelService.removeChannel(projectId, channelId);
            ChannelStore.removeChannel(projectId, channelId);
        }, 250);
    }

    const enableChannel = () => {
        closeMenu();
        setTimeout(() => {
            ChannelService.enableChannel(projectId, channelId);
            ChannelStore.enableChannel(projectId, channelId);
        }, 250);

    }

    const disableChannel = () => {
        closeMenu();
        setTimeout(() => {
            ChannelService.disableChannel(projectId, channelId);
            ChannelStore.disableChannel(projectId, channelId);
        }, 250);
    }

  return (
    <>
        <ChannelMenuIcon onClick={openMenu}>
            <FontAwesomeIcon icon={faEllipsisVertical}/>
        </ChannelMenuIcon>
        <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            sx={{ width: 320, maxWidth: '100%' }}
            anchorEl={anchorEl}
            open={isOpen}
            onClose={closeMenu}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
            {enabled &&
                <MenuItem onClick={disableChannel}>
                    <ListItemIcon>
                        <FontAwesomeIcon icon={faPause}/>
                    </ListItemIcon>
                    <ListItemText>
                        Приостановить
                    </ListItemText>
                </MenuItem>
            }

            {!enabled &&
                <MenuItem onClick={enableChannel}>
                    <ListItemIcon>
                        <FontAwesomeIcon icon={faPlay}/>
                    </ListItemIcon>
                    <ListItemText>
                        Запустить
                    </ListItemText>
                </MenuItem>
            }

            <MenuItem onClick={removeChannel}>
                <ListItemIcon sx={{color: 'red'}}>
                    <FontAwesomeIcon icon={faTrash}/>
                </ListItemIcon>
                <ListItemText sx={{color: 'red'}}>
                    Удалить канал
                </ListItemText>
            </MenuItem>
        </Menu>
    </>
  );
}

export { ChannelContentMenu };
