import { FC, Fragment } from "react";
import { observer } from "mobx-react-lite";
import { Link, NavLink } from "react-router-dom";

import { navigation } from "./ChatbotNav.data";
import styles from "./ChatbotNav.module.scss";


interface ChatbotNavProps {
    id: string
}

const ChatbotNav: FC<ChatbotNavProps> = observer(({ id }) => {
    return (
        <div className={styles.navbar}>
            <div className={styles.logo}>
                <img src="/assets/img/logo/gigabot.svg" alt="Gigabot Logo" />
            </div>
            <ul className={styles.menu}>
                {id && navigation.map(({title, to, icon, sep}) => (
                    <Fragment key={to}>
                        <li className={styles.menuItem} title={title}>
                            <NavLink
                                to={to.replace(":id", id)}
                                className={({isActive}) =>
                                    isActive
                                        ? `${styles.menuLink} ${styles.menuLinkActive}`
                                        : `${styles.menuLink}`
                                }>
                                <img
                                    className={styles.menuImage}
                                    src={`/assets/img/icons/${icon}.svg`} alt={`${icon}`}
                                />
                            </NavLink>
                        </li>
                        {sep && <li className={styles.separator}></li>}
                    </Fragment>
                ))}
            </ul>
            <Link to="/documentation" className={styles.help}>?</Link>
        </div>
    );
})

export { ChatbotNav };
