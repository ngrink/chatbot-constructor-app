import { FC } from "react";
import styles from "./Status.module.scss";


interface StatusProps {
    type: "active" | "warning" | "error" | "disabled",
    w?: number,
    h?: number,
}

const Status: FC<StatusProps> = ({ type, w = 8, h = 8 }) => {
    return (
        <div
            className={`${styles.status} ${styles[type]}`}
            style={{width: w, height: h}}>
        </div>
    );
}

export { Status };
