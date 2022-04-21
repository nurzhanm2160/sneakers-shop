import Header from "./components/Header";
import Drawer from "./components/Drawer";
import {createContext, useEffect, useState} from "react";
import axios from "axios";
import Home from "./pages/Home";
import {Route, Routes} from "react-router-dom";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";


export const AppContext = createContext({})


function App() {
  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [searchValue, setSearchValue] = useState('');
  const [cartOpened, setCartOpened] = useState(false)
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const onAddToFavorites = async (obj) => {
    try {
      if(favorites.find((favObj) => Number(favObj.id) === Number(obj.id))){
        await axios.delete(`http://625e17e46c48e8761ba4f15d.mockapi.io/favorites/${obj.id}`)
        setFavorites(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
      } else {
        const { data } = await axios.post('http://625e17e46c48e8761ba4f15d.mockapi.io/favorites', obj)
        setFavorites(prev => [...prev, data])
      }
    } catch (error) {
      alert('не удалось добавить в фавориты')
    }

  }

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id ))
      if(findItem){
        setCartItems(prev => prev.filter(item => Number(item.parentId) !== Number(obj.id)))
        await axios.delete(`http://625e17e46c48e8761ba4f15d.mockapi.io/cart/${findItem.id}`)
      } else {
        const {data} = await axios.post('http://625e17e46c48e8761ba4f15d.mockapi.io/cart', obj)
        setCartItems(prev => [...prev, data])
      }
    } catch (error) {
      alert('Ошибка при добавлении в корзину')
    }

  }

  const onChangeSearchInput = (event) => {
    const value = event.target.value;
    setSearchValue(value)
  }

  const deleteItemFromCart = async (id) => {
    try {
      setCartItems(prev => prev.filter(item => item.id !== id));
      await axios.delete(`https://625e17e46c48e8761ba4f15d.mockapi.io/cart/${id}`)
    } catch (e) {
      alert('Ошибка при удалении из корзины')
    }
  }

  const itemIsAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id))
  }



  useEffect(() =>  {

    async function fetchData() {
      try {
        const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
          axios.get('http://625e17e46c48e8761ba4f15d.mockapi.io/cart'),
          axios.get('http://625e17e46c48e8761ba4f15d.mockapi.io/favorites'),
          axios.get('http://625e17e46c48e8761ba4f15d.mockapi.io/items'),
        ]);

        setIsLoading(false);
        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert('Ошибка при запросе данных ;(');
        console.error(error);
      }
    }

    fetchData();
  }, [])



  return (
      <AppContext.Provider value={{
        cartItems,
        favorites,
        items,
        itemIsAdded,
        setCartOpened,
        setCartItems,
        onAddToCart,
        onAddToFavorites
      }}>
        <div className="wrapper clear">

          <Drawer
              items={cartItems}
              onDelete={deleteItemFromCart}
              onClose={() => setCartOpened(false)}
              opened={cartOpened}
          />



          <Header onClickCart={() => setCartOpened(true)}  />

          <Routes>
            <Route exact path={"/"}  element={
              <Home
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                  onChangeSearchInput={onChangeSearchInput}
                  onAddToCart={onAddToCart}
                  onAddToFavorites={onAddToFavorites}
                  cartItems={cartItems}
                  isLoading={isLoading}
              />
            } />
            <Route exact
                   path={"/favorites"}
                   element={
                     <Favorites
                       onAddToFavorites={onAddToFavorites}
                   />}/>

            <Route exact
                   path={"/orders"}
                   element={
                     <Orders />}/>
          </Routes>


        </div>
      </AppContext.Provider>
  );
}

export default App;
