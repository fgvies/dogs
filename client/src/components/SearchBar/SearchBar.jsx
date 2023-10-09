import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQueryDogs, resetDogs } from "../../redux/actions";
import style from "./SearchBar.module.css";

const SearchBar = () => {
  const dispatch = useDispatch(); 

  const [searchDog, setSearchDog] = useState("");


  const handleInput = (event) => {
    event.preventDefault();
    const query = event.target.value;
    setSearchDog(query);
    dispatch(getQueryDogs(query));
    dispatch(resetDogs());
  };

  return (
    <div className={style.search}>
      <input
        type="text"
        value={searchDog}
        onChange={handleInput}
        placeholder="Find your favorite breed"
        className={style.input}
      />
      
    </div>
  );
};

export default SearchBar;
