import { FC } from "react";
import logo from "@assets/svg/logo.svg";
import classes from "./Logo.module.css";

interface LogoProps {}

const Logo: FC<LogoProps> = () => {
    return (
        <div className={classes.logo}>
            <div className={classes.wrapper}>
                <img className={classes.img} src={logo} alt="Gigabot logo"/>
            </div>
            <div className={classes.name}>Gigabot</div>
        </div>
    );
}

export { Logo };
