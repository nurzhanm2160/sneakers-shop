import {useContext} from "react";
import {AppContext} from "../App";

export const useCart = () => {
    const {cartItems} = useContext(AppContext)
    const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);

    return { cartItems, totalPrice }
}
