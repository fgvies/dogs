import Card from "../Card/Card";
import style from "./CardsContainer.module.css";

const CardsContainer = ({ dogs }) => {


  return (
    <div className={style.containerAll}>
      {dogs.map((dog) => {
        return (
          <Card
            key={dog.id}
            id={dog.id}
            name={dog.name}
            life_span={dog.life_span}
            weight={dog.weight}
            height={dog.height}
            image={dog.image}
            temperaments={dog.temperaments}
          />
        );
      })}
    </div>
  );
};

export default CardsContainer;
