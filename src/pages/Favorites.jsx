import React, {useContext} from 'react';
import Card from "../components/Card";
import {AppContext} from "../App";

const Favorites = ({ onAddToFavorites}) => {
    const {favorites} = useContext(AppContext)
    return (
        <div className="content p-40">
            <div className="d-flex align-center mb-40 justify-between">
                <h1>Мои закладки</h1>

            </div>

            <div className="d-flex flex-wrap">
                {
                    favorites.map((sneakers, index) => {
                        return <Card key={index}
                                     favorited={true}
                                     onFavorite={(obj) => onAddToFavorites(obj)}
                                     {...sneakers}
                        />
                    })}

            </div>

        </div>
    );
};

export default Favorites;
