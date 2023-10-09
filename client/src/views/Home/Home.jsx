import { useEffect, useState } from "react";
import { CurrentPage, getAllDogs } from "../../redux/actions";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useDispatch, useSelector } from "react-redux";
import Filters from "../../components/Filters/Filters";
import Paginate from "../../components/Paginate/Paginate";
import style from "./Home.module.css";
import Orders from "../../components/Orders/Orders";

const Home = () => {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const currentPage = useSelector((state) => state.currentPage);

  useEffect(() => {
    if (allDogs.length === 0) {
      dispatch(getAllDogs());
    } else {
      dispatch(CurrentPage(currentPage));
    }
  }, [dispatch]);

  const handlePageChange = (page) => {
    dispatch(CurrentPage(page));
  };

  // useEffect(() => {
  //   // Actualiza la lista de perros a mostrar cada vez que cambia la página
  //   setFilteredDogs(allDogs);
  // }, [allDogs, currentPage]);

  const dogsPerPage = 8;
  const startIndex = currentPage * dogsPerPage;
  const endIndex = startIndex + dogsPerPage;
  const paginateDogs = allDogs.slice(startIndex, endIndex);

  return (
    <div className={style.containerHome}>
      <div className={style.selectors}>
        <Orders />
        <Filters />
      </div>
      <CardsContainer dogs={paginateDogs} />
      <Paginate
        totalDogs={allDogs.length}
        dogsPerPage={dogsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Home;
