import React, { CSSProperties, FC, MouseEventHandler } from "react";
import classes from "./Button.module.css";

interface ButtonProps {
    type: "main" | "ghost",
    children: React.ReactNode
    onClick?: MouseEventHandler<HTMLButtonElement>,
    style?: CSSProperties
    fluid?: boolean,
}

const Button: FC<ButtonProps> = ({ type, children, onClick, style, fluid }) => {
    return (
        <button
            className={`${classes.btn} ${classes[type]} ${fluid && classes.fluid}`}
            onClick={onClick}
            style={style}
        >
            {children}
        </button>
    );
}

export { Button };
