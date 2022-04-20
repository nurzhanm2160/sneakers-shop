import React, {useContext, useState} from 'react';
import styles from './Card.module.scss'
import ContentLoader from "react-content-loader";
import {AppContext} from "../../App";

const Card = ({
                  id,
                  title,
                  price,
                  imageUrl,
                  onPlus,
                  onFavorite,
                  favorited = false,
                  loading = false
}) => {
    const { itemIsAdded } = useContext(AppContext)
    const [isFavorite, setIsFavorite] = useState(favorited);


    console.log(title, itemIsAdded(id))

    const addToCart = () => {
        onPlus({ id, title, price, imageUrl})

    }

    const addToFavorite = () => {
        onFavorite({ id, title, price, imageUrl })
        setIsFavorite(!isFavorite);
    }

    return (
        <div className={styles.card}>
        {loading ?
                <ContentLoader
                    speed={2}
                    width={155}
                    height={250}
                    viewBox="0 0 155 265"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb">
                    <rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
                    <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
                    <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
                    <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
                    <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
                </ContentLoader>
                :

                    <>
                        <div className={styles.favorite}>
                            <img onClick={addToFavorite} src={isFavorite ? "/img/liked.svg" : "/img/unliked.svg"} alt="unliked"/>
                        </div>
                        <img width="100%" height={135} src={imageUrl} alt={"Sneakers"}/>
                        <h5>{title}</h5>
                        <div className="d-flex justify-between align-center">
                            <div className="d-flex flex-column">
                                <span>Цена:</span>
                                <b>{price} руб.</b>
                            </div>
                            <img onClick={addToCart} className={styles.plus} alt={itemIsAdded(id) ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} src={itemIsAdded(id) ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} />
                        </div>
                    </>

        }
        </div>

    );
};

export default Card;
