import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/store';
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
} from '../redux/slices/filter/slice';
import { fetchPizzas, SearchPizzaParams } from '../redux/slices/pizza/slece';

const Home: React.FC = () => {
  // put string in addres string
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { items, status } = useSelector((state: any) => state.pizza);

  const { categoryId, sort, currentPage, searchValue } = useSelector(
    (state: any) => state.filter
  );

  const onChangeCategory = React.useCallback((index: number) => {
    dispatch(setCategoryId(index));
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const pizzas = items
    // .filter((obj) => {
    //   if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // })
    .map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);

  const skeletons = [...new Array(4)].map((_, index) => (
    <Skeleton key={index} />
  ));

  const getPizzas = async () => {
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

    // third variant

    //   try {
    //     console.log(555);
    //     dispatch(
    //       fetchPizzas({
    //         order,
    //         sortBy,
    //         category,
    //         search,
    //         currentPage,
    //       })
    //     );
    //     window.scrollTo(0, 0);
    //   } catch (error) {
    //     alert('Error while getting pizzas');
    //     console.log('Error while getting pizzas', error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };

    dispatch(
      fetchPizzas({
        order,
        sortBy,
        category,
        search,
        currentPage,
      })
    );

    window.scrollTo(0, 0);
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
      const params = qs.parse(
        window.location.search.substring(1)
      ) as unknown as SearchPizzaParams;

      const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);

      dispatch(
        setFilters({
          searchValue: params.search,
          categoryId: Number(params.category),
          currentPage: Number(params.currentPage),
          sort: sort || sortList[0],
        })
      );

      isSearch.current = true;
    }
  }, []);

  //if to be first render then we fetch pizzas

  React.useEffect(() => {
    getPizzas();
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sort} />
      </div>
      <h2 className='content__title'>All pizzas</h2>

      {status === 'error' ? (
        <div className='content__error-info'>
          <h2>The error is occurred &#128533;</h2>
          <p>Pizzas don't found</p>
        </div>
      ) : (
        <div className='content__items'>
          {status === 'loading' ? skeletons : pizzas}
        </div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
