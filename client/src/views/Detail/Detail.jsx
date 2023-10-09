import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetailDogs, resetDetail } from "../../redux/actions";
import style from "./Detail.module.css";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const dog = useSelector((state) => state.selectedDog);

  useEffect(() => {
    dispatch(getDetailDogs(id));
    return () => {
      dispatch(resetDetail());
    };
  }, [dispatch, id]);

  const temperaments = dog
    ? dog.temperaments
        .map((temperament) => temperament.name || temperament)
        .join(", ")
    : "";

  return (
    <div className={style.container}>
      {!dog ? (
        <h3 className={style.Loading}>LOADING...</h3>
      ) : (
        <div className={style.detailContainer}>
          <img
            src={dog.image}
            alt="Imagen no encontrada"
            className={style.detailImage}
          />
          <h2 className={style.detailName}>{dog.name}</h2>
          <h5 className={style.detailInfo}>Height: {dog.height} cm</h5>
          <h5 className={style.detailInfo}>Weight: {dog.weight} kg</h5>
          <h5 className={style.detailInfo}>LifeSpan: {dog.life_span}</h5>
          <h5 className={style.temperamentsTitle}>TEMPERAMENTS</h5>
          <h5 className={style.temperamentsContent}>{temperaments}</h5>
          <Link to="/home" className={style.linkClose}>
            <button className={style.buttonClose}>BACK TO HOME</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Detail;

