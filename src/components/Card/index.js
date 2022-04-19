import React, {useState} from 'react';
import styles from './Card.module.scss'

const Card = ({ id, title, price, imageUrl, onPlus, onFavorite, favorited = false}) => {
    const [isAdded, setIsAdded] = useState(false);
    const [isFavorite, setIsFavorite] = useState(favorited);

    const addToCart = () => {
        onPlus({ id, title, price, imageUrl})
        setIsAdded(!isAdded)
    }

    const addToFavorite = () => {
        onFavorite({ id, title, price, imageUrl })
        setIsFavorite(!isFavorite);
    }

    return (
        <div className={styles.card}>
            <div className={styles.favorite}>
                <img onClick={addToFavorite} src={isFavorite ? "/img/liked.svg" : "/img/unliked.svg"} alt="unliked"/>
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
