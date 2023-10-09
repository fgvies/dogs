import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./Filters.module.css";
import {
  filterByCreate,
  filterByTemperaments,
  getTemperamentsDogs,
} from "../../redux/actions";

const Filters = () => {
  const dispatch = useDispatch();
  const allTemperaments = useSelector((state) => state.allTemperaments);
  const [selectedTemperament, setSelectedTemperament] = useState("All");
  const [selectedCreated, setSelectedCreated] = useState("All");

  useEffect(() => {
    dispatch(getTemperamentsDogs());
  }, [dispatch]);
  

  const handleFilterChange = (event) => {
    const filterValue = event.target.value;
    setSelectedTemperament(filterValue);
    dispatch(filterByTemperaments(filterValue));
  };

  const handleCreateChange = (event) => {
    const createValue = event.target.value;
    setSelectedCreated(createValue);
    dispatch(filterByCreate(createValue));
  };

  return (
    <div className={style.containerFilter}>
      <label className={style.labelSelector}>
        <select
          value={selectedTemperament}
          onChange={handleFilterChange}
          className={style.selector}
        >
          <option value="All">Filter By Temperament</option>
          {allTemperaments.map((temperament) => (
            <option key={temperament.id} value={temperament.name}>
              {temperament.name}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label className={style.labelSelector}>
        <select
          value={selectedCreated}
          onChange={handleCreateChange}
          className={style.selector}
        >
          <option value="All"> Filter By Created </option>
          <option value="true">Data Base</option>
          <option value="false">API</option>
        </select>
      </label>
    </div>
  );
};

export default Filters;
