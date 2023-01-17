import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchContext } from '../App';
import qs from 'qs';

import Categories from '../components/Categories';
import Pagination from '../components/Pagination/Pagination';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort, { sortList } from '../components/Sort';

import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';
import { useNavigate } from 'react-router-dom';
import { setItems } from '../redux/slices/pizzaSlice';

const Home = () => {
  // put string in addres string
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const items = useSelector((state) => state.pizza.items);
  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filter
  );

  const { searchValue } = React.useContext(SearchContext);
  // const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  // const [currentPage, setCurrentPage] = React.useState(1);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const pizzas = items
    // .filter((obj) => {
    //   if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // })
    .map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  const skeletons = [...new Array(4)].map((_, index) => (
    <Skeleton key={index} />
  ));

  const fetchPizzas = async () => {
    setIsLoading(true);

    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.sortProperty.replace('-', '');
    const category = categoryId > 0 ? `&category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    // fetch(
    //   `https://62cc78498042b16aa7cff6cc.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`
    // )
    //   .then((res) => res.json())
    //   .then((arr) => {
    //     setItems(arr);
    //     setIsLoading(false);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // axios library

    // await axios
    //   .get(
    //     `https://-62cc78498042b16aa7cff6cc.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`
    //   )
    //   .then((res) => {
    //     setItems(res.data);
    //     setIsLoading(false);
    //     console.log(666);
    //   })
    //   .catch((err) => {
    //     console.log(err, 'exios error');
    //     setIsLoading(false);
    //   });

    try {
      const { data } = await axios.get(
        `https://62cc78498042b16aa7cff6cc.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`
      );

      dispatch(setItems(data));
      window.scrollTo(0, 0);
    } catch (error) {
      alert('Error while getting pizzas');
      console.log('Error while getting pizzas', error);
    } finally {
      setIsLoading(false);
    }
  };

  //if first render in not to be  then don't put params
  //if first render is to be then we change params and put them in adress string

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  //if to be first render then we chack papams and seved in redux
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortList.find(
        (obj) => obj.sortProperty === params.sortProperty
      );

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );

      isSearch.current = true;
    }
  }, []);

  //if to be first render then we fetch pizzas

  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className='content__title'>All pizzas</h2>
      <div className='content__items'>{isLoading ? skeletons : pizzas}</div>

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
