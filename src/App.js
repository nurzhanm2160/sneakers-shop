import Header from "./components/Header";
import Drawer from "./components/Drawer";
import {useEffect, useState} from "react";
import axios from "axios";
import Home from "./pages/Home";
import {Route, Routes} from "react-router-dom";
import Favorites from "./pages/Favorites";


function App() {
  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [searchValue, setSearchValue] = useState('');
  const [cartOpened, setCartOpened] = useState(false)
  const [favorites, setFavorites] = useState([]);

  const onAddToFavorites = async (obj) => {
    try {
      if(favorites.find((favObj) => favObj.id === obj.id)){
        axios.delete(`http://625e17e46c48e8761ba4f15d.mockapi.io/favorites/${obj.id}`)
        setFavorites(prev => prev.filter(item => item.id !== obj.id));
      } else {
        const { data } = await axios.post('http://625e17e46c48e8761ba4f15d.mockapi.io/favorites', obj)
        setFavorites(prev => [...prev, data])
      }
    } catch (error) {
      alert('не удалось добавить в фавориты')
    }

  }

  const onAddToCart = (obj) => {
    axios.post('https://625e17e46c48e8761ba4f15d.mockapi.io/cart', obj)
    setCartItems(prev => [...prev, obj])
  }

  const onChangeSeacrhInput = (event) => {
    const value = event.target.value;
    setSearchValue(value)
  }

  const deleteItemFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    axios.delete(`https://625e17e46c48e8761ba4f15d.mockapi.io/cart/${id}`)
  }



  useEffect(() =>  {
      axios.get('https://625e17e46c48e8761ba4f15d.mockapi.io/items').then(res => setItems(res.data))
      axios.get('https://625e17e46c48e8761ba4f15d.mockapi.io/cart').then(res => setCartItems(res.data))
      axios.get('https://625e17e46c48e8761ba4f15d.mockapi.io/favorites').then(res => setFavorites(res.data))
  }, [])



  return (
    <div className="wrapper clear">


        {cartOpened && <Drawer items={cartItems} onDelete={deleteItemFromCart} onClose={() => setCartOpened(false)} />}


      <Header onClickCart={() => setCartOpened(true)}  />

      <Routes>
        <Route exact path={"/"}  element={
          <Home
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSeacrhInput={onChangeSeacrhInput}
              items={items}
              onAddToCart={onAddToCart}
              onAddToFavorites={onAddToFavorites}
          />
        } />
        <Route exact
               path={"/favorites"}
               element={<Favorites
                   favorites={favorites}
                   onAddToFavorites={onAddToFavorites}
               />}/>
      </Routes>


    </div>
  );
}

export default App;
