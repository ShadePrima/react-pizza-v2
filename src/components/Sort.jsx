import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSort } from '../redux/slices/filterSlice';

import arrowTop from '../assets/img/icons/sort-arrow-top.svg';

export const sortList = [
  { name: 'popularity(DESC)', sortProperty: 'rating' },
  { name: 'popularity(ASC)', sortProperty: '-rating' },

  { name: 'price (DESC)', sortProperty: 'price' },
  { name: 'price (ASC)', sortProperty: '-price' },

  { name: 'alphabetical(DESC)', sortProperty: 'title' },
  { name: 'alphabetical(ASC)', sortProperty: '-title' },
];

function Sort() {
  const dispatch = useDispatch();
  const sort = useSelector((state) => state.filter.sort);

  const sortRef = React.useRef();

  const [open, setOpen] = React.useState(false);

  // const sortName = list[value].name;

  const onClickListItem = (obj) => {
    dispatch(setSort(obj));
    setOpen(false);
  };

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.path.includes(sortRef.current)) {
        setOpen(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div ref={sortRef} className='sort'>
      <div className='sort__label'>
        <img src={arrowTop} alt='arrow-top' />

        <b>Sort by:</b>

        <span onClick={() => setOpen(!open)}>{sort.name}</span>
      </div>
      {open && (
        <div className='sort__popup'>
          <ul>
            {sortList.map((obj, index) => (
              <li
                key={obj.name}
                onClick={() => onClickListItem(obj)}
                className={
                  sortList.sortProperty === obj.sortProperty ? 'active' : ''
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
