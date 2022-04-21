import React, {useContext, useEffect, useState} from 'react';
import Card from "../components/Card";
import {AppContext} from "../App";
import axios from "axios";

const Orders = () => {
    const { onAddToCart, onAddToFavorites } = useContext(AppContext)
    const [orders, setOrders] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect( () => {

        (async () => {
            try {
                const {data} = await axios.get('http://625e17e46c48e8761ba4f15d.mockapi.io/orders')
                setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []))
                setIsLoading(false)
            } catch (error) {
                alert('Ошибка при запросе заказов')
                console.log(error)
            }

        })()

    }, [])

    return (
        <div className="content p-40">
            <div className="d-flex align-center mb-40 justify-between">
                <h1>Мои Заказы</h1>

            </div>

            <div className="d-flex flex-wrap">
                {
                    (isLoading ? [Array(8)] : orders).map((item, index) => {
                        return <Card key={index}

                                     loading={isLoading}
                                     {...item}
                        />
                    })}

            </div>

        </div>
    );
};

export default Orders;
