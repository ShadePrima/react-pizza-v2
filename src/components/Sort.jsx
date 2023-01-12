import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSort } from '../redux/slices/filterSlice';

import arrowTop from '../assets/img/icons/sort-arrow-top.svg';

function Sort() {
  const dispatch = useDispatch();
  const sort = useSelector((state) => state.filter.sort);

  const [open, setOpen] = React.useState(false);
  const list = [
    { name: 'popularity(DESC)', sortProperty: 'rating' },
    { name: 'popularity(ASC)', sortProperty: '-rating' },

    { name: 'price (DESC)', sortProperty: 'price' },
    { name: 'price (ASC)', sortProperty: '-price' },

    { name: 'alphabetical(DESC)', sortProperty: 'title' },
    { name: 'alphabetical(ASC)', sortProperty: '-title' },
  ];
  // const sortName = list[value].name;

  const onClickListItem = (obj) => {
    dispatch(setSort(obj));
    setOpen(false);
  };

  return (
    <div className='sort'>
      <div className='sort__label'>
        <img src={arrowTop} alt='arrow-top' />

        <b>Sort by:</b>
        <span onClick={() => setOpen(!open)}>{sort.name}</span>
      </div>
      {open && (
        <div className='sort__popup'>
          <ul>
            {list.map((obj, index) => (
              <li
                key={obj.name}
                onClick={() => onClickListItem(obj)}
                className={
                  sort.sortProperty === obj.sortProperty ? 'active' : ''
                }
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sort;
