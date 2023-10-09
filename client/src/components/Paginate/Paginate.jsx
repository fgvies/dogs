import React, { useEffect } from "react";
import style from "./Paginate.module.css";
import { useDispatch, useSelector } from "react-redux";
import { CurrentPage } from "../../redux/actions";

const Paginate = ({ totalDogs, dogsPerPage, onPageChange }) => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.currentPage);
  const totalPages = Math.ceil(totalDogs / dogsPerPage);

  useEffect(() => {
    if (totalPages > 0 && currentPage >= totalPages) {
      dispatch(CurrentPage(totalPages - 1));
    }
  }, [totalPages, currentPage, dispatch]);

  useEffect(() => {
    if (currentPage < 0) {
      dispatch(CurrentPage(0));
    }
  }, [currentPage, dispatch]);

  useEffect(() => {
    dispatch(CurrentPage(0));
  }, [dispatch]);

  const handleFirstPage = () => {
    onPageChange(0);
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      onPageChange(currentPage + 1);
    }
  };

  const handleLastPage = () => {
    onPageChange(totalPages - 1);
  };

  return (
    <div className={style.containerPaginate}>
      <button onClick={handleFirstPage} className={style.pageControl}>
        {"◄◄"}
      </button>
      <button onClick={handlePrevPage} className={style.pageControl}>
        {"◄"}
      </button>
      <p className={style.pageControlNumber}>
        {currentPage + 1} - {totalPages || 0}
      </p>
      <button onClick={handleNextPage} className={style.pageControl}>
        {"►"}
      </button>
      <button onClick={handleLastPage} className={style.pageControl}>
        {"►►"}
      </button>
    </div>
  );
};

export default Paginate;