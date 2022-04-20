import React, {useContext} from 'react';
import Card from "../components/Card";
import {AppContext} from "../App";


const Home = ({
                  searchValue,
                  setSearchValue,
                  onChangeSearchInput,
                  onAddToCart,
                  onAddToFavorites,
                  isLoading
              }) => {

    const {items} = useContext(AppContext)

    const renderItems = () => {
        const filteredItems = items.filter(item => item.title.toLowerCase().includes(searchValue))
        return (isLoading ? [...Array(8)] : filteredItems)
            .map((item, index) => {
                return <Card key={index}
                             onPlus={(obj) => onAddToCart(obj)}
                             onFavorite={(obj) => onAddToFavorites(obj)}

                             loading={isLoading}
                             {...item}
                />
            })
    }

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
                    <input value={searchValue} onChange={onChangeSearchInput} placeholder="Поиск..." />

                </div>
            </div>

            <div className="d-flex flex-wrap">

                {renderItems()}

            </div>

        </div>
    );
};

export default Home;
