import React from 'react';
import { useDispatch } from 'react-redux';

import arrowTop from '../assets/img/icons/sort-arrow-top.svg';
import { setSort } from '../redux/slices/filter/slice';
import { Sort, SortPropertyEnum } from '../redux/slices/filter/types';

type sortListItem = {
  name: string;
  sortProperty: SortPropertyEnum;
};

type PopupClick = MouseEvent & {
  path: Node[];
};

export const sortList: sortListItem[] = [
  { name: 'popularity(DESC)', sortProperty: SortPropertyEnum.RATING_DESC },
  { name: 'popularity(ASC)', sortProperty: SortPropertyEnum.RATING_ASC },

  { name: 'price (DESC)', sortProperty: SortPropertyEnum.PRICE_DESC },
  { name: 'price (ASC)', sortProperty: SortPropertyEnum.PRICE_ASC },

  { name: 'alphabetical(DESC)', sortProperty: SortPropertyEnum.TITLE_DESC },
  { name: 'alphabetical(ASC)', sortProperty: SortPropertyEnum.TITLE_ASC },
];

type SortPopupProps = {
  value: Sort;
};

const SortPopup: React.FC<SortPopupProps> = React.memo(({ value }) => {
  const dispatch = useDispatch();

  const sortRef = React.useRef<HTMLDivElement>(null);

  const [open, setOpen] = React.useState(false);

  const onClickListItem = (obj: sortListItem) => {
    dispatch(setSort(obj));
    setOpen(false);
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const _event = event as PopupClick;
      if (sortRef.current && !_event.path.includes(sortRef.current)) {
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

        <span onClick={() => setOpen(!open)}>{value.name}</span>
      </div>
      {open && (
        <div className='sort__popup'>
          <ul>
            {sortList.map((obj, index) => (
              <li
                key={obj.name}
                onClick={() => onClickListItem(obj)}
                className={
                  value.sortProperty === obj.sortProperty ? 'active' : ''
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
});

export default SortPopup;
