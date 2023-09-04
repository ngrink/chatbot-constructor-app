import { FC, useState } from "react";
import styles from "./Search.module.scss";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';


interface SearchProps {}

const Search: FC<SearchProps> = () => {
    const [search, setSearch] = useState('');

    return (
        <div className={styles.search}>
            <i className={styles.searchIcon}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </i>
            <input
                className={styles.searchField}
                type="text"
                name="search"
                placeholder="Поиск"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>
    );
}

export { Search };
