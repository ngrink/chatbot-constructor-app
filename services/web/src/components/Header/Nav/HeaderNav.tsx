import { FC } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

import { navigation } from "./HeaderNav.data";
import classes from "./HeaderNav.module.css";


const HeaderNav: FC = () => {
    return (
        <nav className={classes.nav}>
            <ul className={classes.navList}>
                {navigation.map(({url, title, external}) =>
                    <li key={url} className={classes.navItem}>
                        <NavLink
                            to={url}
                            className={({ isActive }) => isActive
                                ? `${classes.navLink} ${classes.navLinkActive}`
                                : `${classes.navLink}`}
                        >
                            {title}
                            {external &&
                                <div className={classes.navIcon}>
                                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                </div>
                            }
                        </NavLink>
                    </li>
                )}
            </ul>
        </nav>
    );
}

export { HeaderNav };
