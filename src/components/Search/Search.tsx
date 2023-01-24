import React from 'react';
import { useDispatch } from 'react-redux';

import styles from './Search.module.scss';
import headerSearchIcon from '../../assets/img/icons/header-search.svg';
import headerCloseIcon from '../../assets/img/icons/header-close.svg';

import debounce from 'lodash.debounce';
import { setSearchValue } from '../../redux/slices/filter/slice';

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('');

  const inputRef = React.useRef<HTMLInputElement>(null);

  const onClickClear = (event: React.MouseEvent<HTMLImageElement>) => {
    // console.log(event);
    setValue('');
    dispatch(setSearchValue(''));
    //make the field focus after typing
    // if (inputRef.current) {
    //   inputRef.current.focus();
    // }
    inputRef.current?.focus();
  };

  const updateSearchValue = React.useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 500),
    []
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
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
          onClick={onClickClear}
          className={styles.closeIcon}
          src={headerCloseIcon}
          alt='Close'
        />
      )}
    </div>
  );
};

export default Search;
