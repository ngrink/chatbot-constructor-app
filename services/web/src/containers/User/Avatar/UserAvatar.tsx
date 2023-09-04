import { FC } from "react";
import classes from "./UserAvatar.module.css";

interface UserAvatarProps {

}

const UserAvatar: FC<UserAvatarProps> = () => {
    return (
        <div className={classes.wrapper}>
            {/* <img className={classes.avatar} src="" alt="avatar" /> */}
            <div className={classes.avatar}/>
        </div>
    );
}

export { UserAvatar };
