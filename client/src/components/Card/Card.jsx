import { Link } from "react-router-dom";
import style from "./Card.module.css";

const Card = (props) => {
  const temperaments = props.temperaments
    ? props.temperaments
        .map((temperament) => temperament.name || temperament)
        .join(", ")
    : "";

  return (
    <Link to={`/detail/${props.id}`}>
      <div className={style.card}>
        <div className={style.cardContenido}>
          <div className={style.cardDog}>{props.name}</div>
          <div className={style.infoDog}>
            <div className={style.cardTemperamentTitle}>TEMPERAMENTS</div>
            <div className={style.cardTemperament}>{temperaments}</div>
            <div className={style.cardWeight}>Weight: {props.weight}</div>
          </div>
        </div>
        <img src={props.image} alt="Dog" className={style.imagenFondo} />
      </div>
    </Link>
  );
};

export default Card;