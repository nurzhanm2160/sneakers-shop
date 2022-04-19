import React from 'react';
import Card from "../components/Card";


const Home = ({
                  searchValue,
                  setSearchValue,
                  onChangeSeacrhInput,
                  items,
                  onAddToCart,
                  onAddToFavorites,
              }) => {
    return (
        <div className="content p-40">
            <div className="d-flex align-center mb-40 justify-between">
                <h1>{searchValue ? `Поиск по запросу: ${searchValue}` : "Все кроссовки"}</h1>
                <div className="search-block d-flex">
                    <img src="/img/search.svg" alt="Search"/>
                    {searchValue && <img
                        onClick={() => setSearchValue('')}
                        className="clear cu-p"
                        src="/img/btn-remove.svg"
                        alt="Clear"/>}
                    <input value={searchValue} onChange={onChangeSeacrhInput} placeholder="Поиск..." />

                </div>
            </div>

            <div className="d-flex flex-wrap">

                {items.filter(item => item.title.toLowerCase().includes(searchValue))
                    .map((sneakers, index) => {
                        return <Card key={index}
                                     onPlus={(obj) => onAddToCart(obj)}
                                     onFavorite={(obj) => onAddToFavorites(obj)}
                                     {...sneakers}
                        />
                    })}


            </div>

        </div>
    );
};

export default Home;
