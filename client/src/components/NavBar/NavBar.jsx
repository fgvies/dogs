import style from "./NavBar.module.css";
import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { resetDogs } from "../../redux/actions";
import { useDispatch } from "react-redux";

const NavBar = () => {
  const dispatch = useDispatch();

  const handleBackToHome = () => {
    dispatch(resetDogs());
  };
  return (
    <div className={style.HeaderContainer}>
      <div className={style.NavBarContainer}>
        <Link to="/home" onClick={handleBackToHome}>
          {" "}
          BACK TO HOME
        </Link>

        <Link to="/create">CREATE YOUR PET</Link>
      </div>
      <SearchBar />
    </div>
  );
};

export default NavBar;
