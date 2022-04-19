import React, {useState} from 'react';
import styles from './Card.module.scss'

const Card = ({title, price, imageUrl, onPlus}) => {
    const [isAdded, setIsAdded] = useState(false);

    const addToCart = () => {
        onPlus({title, price, imageUrl})
        setIsAdded(!isAdded)
    }

    return (
        <div className={styles.card}>
            <div className={styles.favorite}>
                <img src="/img/unliked.svg" alt="unliked"/>
            </div>
            <img width={133} height={112} src={imageUrl} />
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>Цена:</span>
                    <b>{price} руб.</b>
                </div>
                    <img onClick={addToCart} className={styles.plus} src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} />
            </div>
        </div>
    );
};

export default Card;
