import cartEmptyImg from "../assets/img/empty-cart.png";
import { Link } from "react-router-dom";
import React from "react";

const CartEmpty: React.FC = () => {
  return (
    <>
      <div className="cart cart--empty">
        <h2>
          Корзина пустая <span>😕</span>
        </h2>
        <p>
          Вероятней всего, вы не заказывали ещё кроссовки.
          <br />
          Для того, чтобы заказать кроссовки, перейди на главную
          страницу.
        </p>
        <img src={cartEmptyImg} />
        <Link to="/" className="button button--black">
          <span>Вернуться назад</span>
        </Link>
      </div>
    </>
  );
};

export default CartEmpty;
