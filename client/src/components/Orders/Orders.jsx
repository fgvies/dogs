import React from "react";
import { useDispatch } from "react-redux";
import { orderByName, orderByWeight } from "../../redux/actions";
import style from "./Orders.module.css";

const Orders = () => {
  const dispatch = useDispatch();

  const handleOrderByName = (order) => {
    dispatch(orderByName(order));
  };

  const handleOrderByWeight = (order) => {
    dispatch(orderByWeight(order));
  };

  return (
    <div className={style.containerOrder}>
      <label className={style.labelSelector}>
        Order By Name:
        <div className={style.orderName}>
          <button
            onClick={() => handleOrderByName("asc")}
            className={style.controlOrder}
          >
            A - Z
          </button>
          <button
            onClick={() => handleOrderByName("desc")}
            className={style.controlOrder}
          >
            Z - A
          </button>
        </div>
      </label>
      <br />
      <label className={style.labelSelector}>
        Order By Weight:
        <div className={style.orderWeight}>
          <button
            onClick={() => handleOrderByWeight("asc")}
            className={style.controlOrder}
          >
            MIN - MAX
          </button>
          <button
            onClick={() => handleOrderByWeight("desc")}
            className={style.controlOrder}
          >
            MAX - MIN
          </button>
        </div>
      </label>
    </div>
  );
};

export default Orders;
