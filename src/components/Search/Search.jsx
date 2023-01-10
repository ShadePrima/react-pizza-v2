import React from 'react';
import styles from './Search.module.scss';

import headerSearchIcon from '../../assets/img/icons/header-search.svg';
import headerCloseIcon from '../../assets/img/icons/header-close.svg';

const Search = ({ searchValue, setSearchValue }) => {
  return (
    <div className={styles.root}>
      <img className={styles.icon} src={headerSearchIcon} alt='SearchIcone' />

      <input
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        className={styles.input}
        placeholder='Search ... '
      />
      {searchValue && (
        <img
          onClick={() => setSearchValue('')}
          className={styles.closeIcon}
          src={headerCloseIcon}
          alt='Close'
        />
      )}
    </div>
  );
};

export default Search;
