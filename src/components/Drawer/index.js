import React, {useContext, useState} from 'react';
import Info from "../Info";
import {AppContext} from "../../App";
import axios from "axios";
import {useCart} from "../../hooks/useCart";
import styles from './Drawer.module.scss'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const Drawer = ({onClose, onDelete, items = [], opened}) => {
    const { setCartItems } = useContext(AppContext);
    const [orderId, setOrderId] = useState(null)
    const [isOrderCompleted,setIsOrderCompleted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const { totalPrice, cartItems } = useCart()

    const OrderHandler = async () => {
        try {
            setIsLoading(true)
            const {data} = await axios.post('http://625e17e46c48e8761ba4f15d.mockapi.io/orders', {
                items: cartItems,
            })
            setOrderId(data.id)
            setIsOrderCompleted(true);
            setCartItems([])

            for (let i = 0; i < cartItems.length; i++){
                const item = cartItems[i]
                await axios.delete(`http://625e17e46c48e8761ba4f15d.mockapi.io/cart/${item.id}`)
                await delay(1000)
            }
        } catch (error) {
            alert('Не удалось создать заказ :(')
        }
        setIsLoading(false)
    }

    return (
        <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
            <div className={styles.drawer}>
                <h2 className="mb-30 d-flex justify-between">
                    Корзина
                    <img onClick={onClose} className="cu-p" src="/img/btn-remove.svg" alt="remove"/>
                </h2>

                {items.length > 0 ? (
                    <>
                        <div className="items">

                            {items.map((item, index)=> {
                                return <div key={index} className="cartItem d-flex align-center mb-20">

                                    <div style={{ backgroundImage: `url(${item.imageUrl})`}} className="cartItemImg">

                                    </div>
                                    <div className="mr-20 flex">
                                        <p className="mb-5">{item.title}</p>
                                        <b>{item.price} руб.</b>
                                    </div>
                                    <img onClick={() => onDelete(item.id)} className="removeBtn" src="/img/btn-remove.svg" alt="remove"/>
                                </div>

                            })}

                        </div>
                        <div className="cartTotalBlock">
                            <ul>
                                <li>
                                    <span>Итого:</span>
                                    <div></div>
                                    <b>{totalPrice} руб.</b>
                                </li>
                                <li>
                                    <span>Налог 5%:</span>
                                    <div></div>
                                    <b>{totalPrice / 100 * 5} руб.</b>
                                </li>
                            </ul>
                            <button disabled={isLoading} onClick={OrderHandler} className="greenButton">
                                Оформить заказ
                                <img src="/img/arrow.svg" alt="arrow" />
                            </button>
                        </div>
                    </>
                ) : (
                    <Info
                        title={ isOrderCompleted ?  "Заказ оформлен!" : "Корзина пустая"}
                        image={isOrderCompleted ? "/img/complete-order.jpg" : "/img/empty-cart.jpg"}
                        description={isOrderCompleted ? `Ваш заказ #${orderId} скоро будет передан курьерсокй доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."} />
                )}





            </div>
        </div>
    );
};

export default Drawer;
