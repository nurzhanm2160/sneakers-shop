import React, {useContext} from 'react';
import {NavLink} from "react-router-dom";
import {useCart} from "../hooks/useCart";

const Header = ({onClickCart}) => {
    const { totalPrice } = useCart()
    return (
        <header className="d-flex justify-between align-center p-40">
            <div className="d-flex align-center">
                <img height="40" width="40" src="/img/logo.png" />
                <NavLink to={"/"}>
                    <div className="headerInfo">
                        <h3 className="text-uppercase">React Sneakers</h3>
                        <p className="opacity-5">Магазин лучших кросовок</p>
                    </div>
                </NavLink>
            </div>
            <ul className="d-flex">
                <li className="mr-30 cu-p" onClick={onClickCart}>
                    <img src={"/img/cart.svg"} />
                    <span>{totalPrice} руб.</span>
                </li>
                <li className="mr-20 cu-p">
                    <NavLink to={"/favorites"}>
                        <img src="/img/heart.svg" alt="Favorite"/>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/orders"}>
                        <img src={"/img/user.svg"} alt={"User"}/>
                    </NavLink>
                </li>
            </ul>
        </header>
    );
};

export default Header;
