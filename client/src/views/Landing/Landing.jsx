import React from "react";
import { Link } from "react-router-dom";
import style from "./Landing.module.css";

const Landing = () => {
  return (
    <div className={style.containerLanding}>
      <h1>Woof-Woof!</h1>
      <h5 className={style.description}>
        <b>Bienvenido!</b>
        <br />
        <br />
        Esta es la pagina perfecta si estas buscando un amigo de cuatro patas en
        tu vida!
      </h5>
      <div>
        <Link to="/home" className={style.linkLanding}>
          <button className={style.buttonLanding}>HOME PAGE</button>
        </Link>
        <h5>© 2023 - Facundo Vies</h5>
      </div>
    </div>
  );
};

export default Landing;
