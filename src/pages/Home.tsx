import { useCallback, useRef, useEffect } from "react";
import React from "react";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { setCategoryId, setCurrentPage, setFilters } from "../redux/filter/slice";
import { sneakerDataSelector } from "../redux/sneaker/selector";
import { Pagination } from "../components/Pagination";
import Categories from "../components/Categories";
import Sort, { sortList } from "../components/Sort";
import SneakerBlock from "../components/SneakerBlock";
import Skeleton from "../components/SneakerBlock/Skeleton";
import { useAppDispatch } from "../redux/store";
import { filterSelector } from "../redux/filter/selector";
import { fetchSneakers } from "../redux/sneaker/asyncActions";
import { FetchSneakersArg } from "../redux/sneaker/types";

const Home: React.FC = () => {
  const { items, status } = useSelector(sneakerDataSelector);
  const { categoryId, sort, currentPage, searchValue } = useSelector(filterSelector);
  const sortType = sort.sortProperty;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  //Отключение перерисовки компонента
  const onChangeCategory = useCallback((i: number) => {
    dispatch(setCategoryId(i));
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };
  //Запрос на сервер
  const getSneakers = async () => {
    const order = sortType.includes("-") ? "asc" : "desc";
    const sortBy = sortType.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      fetchSneakers({
        order,
        sortBy,
        category,
        search,
        currentPage,
      })
    );
    window.scrollTo(0, 0);
  };
  // Если изменили параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, currentPage, sort.sortProperty]);
  ////

  /// Если был первый рендер, то проверяем URL-параметры и сохраняем в redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as FetchSneakersArg;
      const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);

      dispatch(
        setFilters({
          searchValue: params.search,
          categoryId: Number(params.category),
          currentPage: params.currentPage,
          sort: sort || sortList[0],
        })
      );
      isSearch.current = true;
    }
  }, []);
  //////
  // Если был первый рендер, то запрашиваем кроссовки
  useEffect(() => {
    getSneakers();

    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);
  ///////

  const sneakers = items.map((item: any) => <SneakerBlock {...item} key={item.id} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories value={categoryId} onChangeCategory={onChangeCategory} />
          <Sort value={sort} />
        </div>
        <h2 className="content__title">Все Кроссовки</h2>
        {status === "error" ? (
          <div className="content__error-info">
            <h2>
              Произошла ошибка <span>😕</span>
            </h2>
            <p>К сожалению, не удалось получить кроссовки. Попробуйте повторить попытку</p>
          </div>
        ) : (
          <div className="content__items">{status === "loading" ? skeletons : sneakers}</div>
        )}

        <Pagination currentPage={currentPage} onChangePage={onChangePage} />
      </div>
    </>
  );
};

export default Home;
