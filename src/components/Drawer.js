import React from 'react';

const Drawer = ({onClose, onDelete, items = []}) => {
    return (
        <div className="overlay">
            <div className="drawer">
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
                                    <b>21 498 руб.</b>
                                </li>
                                <li>
                                    <span>Налог 5%:</span>
                                    <div></div>
                                    <b>1074 руб.</b>
                                </li>
                            </ul>
                            <button className="greenButton">
                                Оформить заказ
                                <img src="/img/arrow.svg" alt="arrow" />
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="cartEmpty d-flex align-center justify-center flex-column flex">
                        <img className="mb-20" width="120px" height="120px" src="/img/empty-cart.jpg" alt="EmptyCart"/>
                        <h2>Корзина пустая</h2>
                        <p className="opacity-6">Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
                        <button onClick={onClose} className="greenButton">
                            <img src="/img/arrow.svg" alt="Arrow"/>
                            Вернуться наазд
                        </button>
                    </div>
                )}





            </div>
        </div>
    );
};

export default Drawer;
