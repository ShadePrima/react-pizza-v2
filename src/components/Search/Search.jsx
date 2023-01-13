import React from 'react';
import { SearchContext } from '../../App';

import styles from './Search.module.scss';
import headerSearchIcon from '../../assets/img/icons/header-search.svg';
import headerCloseIcon from '../../assets/img/icons/header-close.svg';
import debounce from 'lodash.debounce';

const Search = () => {
  const [value, setValue] = React.useState('');
  const { setSearchValue } = React.useContext(SearchContext);

  const inputRef = React.useRef(null);

  // const testDebouns = React.useCallback(
  //   debounce(() => {
  //     setSearchValue(event.target.value);
  //   }, 1500),
  //   []
  // );

  const onClickClear = () => {
    setValue('');
    setSearchValue('');
    //make the field focus after typing
    inputRef.current.focus();
  };

  const updateSearchValue = React.useCallback(
    debounce((str) => {
      console.log(str);
      setSearchValue(str);
    }, 500),
    []
  );

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <img className={styles.icon} src={headerSearchIcon} alt='SearchIcone' />

      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder='Search ... '
      />

      {value && (
        <img
          onClick={() => onClickClear()}
          className={styles.closeIcon}
          src={headerCloseIcon}
          alt='Close'
        />
      )}
    </div>
  );
};

export default Search;
