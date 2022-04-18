import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";

const sneakers = [
    {
        title: 'Мужские кроссовки Nike Blazer Mid Suede',
        price: 12999,
        imageUrl: '/img/sneakers/2.jpg'
    },
    {
        title: 'Мужские кроссовки Nike Air Max 270',
        price: 15600,
        imageUrl: '/img/sneakers/3.jpg'
    },
    {
        title: 'Мужские кроссовки Puma X Aka Boku Future Rider',
        price: 8999,
        imageUrl: '/img/sneakers/4.jpg'
    },
    {
        title: 'Мужские кроссовки Nike ',
        price: 18999,
        imageUrl: '/img/sneakers/5.jpg'
    },
]

function App() {
  return (
    <div className="wrapper clear">


        <Drawer />


      <Header />

      <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1 className="">Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" />
            <input placeholder="Поиск..." />
          </div>
        </div>

        <div className="d-flex">

            {sneakers.map(sneakers => {
                return <Card title={sneakers.title} price={sneakers.price} imageUrl={sneakers.imageUrl} />
            })}


        </div>


      </div>
    </div>
  );
}

export default App;
