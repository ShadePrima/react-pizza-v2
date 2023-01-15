import React from "react";
import { Link } from "react-router-dom";
import cartEmptyImg from "../assets/img/empty-cart.png";

const CartEmpty = () => {
  return (
    <>
      <div className="cart cart--empty">
        <h2>Сart is empty 😕</h2>
        <p>
          You probably haven’t ordered any more pizza.
          <br />
          To order a pizza, go to the main page..
        </p>
        <img src={cartEmptyImg} alt="Empty cart" />
        <Link to="/" className="button button--black">
          <span>Сome back</span>
        </Link>
      </div>
    </>
  );
};

export default CartEmpty;
