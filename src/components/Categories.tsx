import React from 'react';

type CategoriesProps = {
  value: number;
  onChangeCategory: (index: number) => void;
};

const categories = ['All', ' Meat', 'Vegetarian', 'Grill', 'Sharp', 'Closed'];

const Categories: React.FC<CategoriesProps> = ({ value, onChangeCategory }) => {
  return (
    <div className='categories'>
      <ul>
        {categories.map((categoryName, index) => (
          <li
            key={index}
            onClick={() => onChangeCategory(index)}
            className={value === index ? 'active' : ''}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
