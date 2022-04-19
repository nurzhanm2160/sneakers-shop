import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import {useEffect, useState} from "react";


function App() {
  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [cartOpened, setCartOpened] = useState(false)

  const onAddToCart = (obj) => {
    setCartItems(prev => [...prev, obj])
    console.log(cartItems)
  }


    useEffect(() =>  {
      fetch('https://625e17e46c48e8761ba4f15d.mockapi.io/items').then(res => {
          return res.json()
      })
      .then(json => setItems(json))
  }, [])

  return (
    <div className="wrapper clear">


        {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} />}


      <Header onClickCart={() => setCartOpened(true)}  />

      <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1 className="">Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" />
            <input placeholder="Поиск..." />
          </div>
        </div>

        <div className="d-flex flex-wrap">

            {items.map(sneakers => {
                return <Card title={sneakers.title} price={sneakers.price} imageUrl={sneakers.imageUrl} onPlus={(obj) => onAddToCart(obj)} />
            })}


        </div>

      </div>
    </div>
  );
}

export default App;
