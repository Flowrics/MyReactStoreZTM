import { useState, createContext, useReducer } from "react";

const addcartItem = (productToAdd, cartItems) => {

    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );

    if(existingCartItem) {
        return cartItems.map((cartItem) => {
        return cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem;
        });
    }

    return [...cartItems, {...productToAdd, quantity: 1}];
}

const removeCartProduct = (itemToRemove, cartItems) => {
    if(itemToRemove.quantity === 1){
        return cartItems.filter((cartItem) => cartItem.id !== itemToRemove.id);
    }

    return cartItems.map((cartItem) => {
        return cartItem.id === itemToRemove.id ? {...cartItem, quantity: cartItem.quantity - 1} : cartItem;
    });
}

const removeProduct = (itemToRemove, cartItems) => {

    return cartItems.filter((cartItem) => cartItem.id !== itemToRemove.id);
}

export const CartIconContext = createContext({
    cartIconClick: null,
    setCartIconClick: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeCartItem: () => {},
    removeItem: () => {},
});

const INITIAL_STATE = {
    cartIconClick: null,
    cartItems: [],
}

const cartReducer = (state, action) => {
    const {type, payload} = action;

    switch(type){
        case 'set_New_Cart_Item':
            return{
                ...state,
                cartitems: payload,
            }
        default:
            throw new Error(`Unhandled type ${type} in cartReducer`);
    }
}

export const CartIconProvider = ({children}) => {
    const [{cartItems}, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const setcartItem = (newcart) => {
        dispatch({type: 'set_New_Cart_Item', payload: newcart});
    }

    const addItemToCart = (productToAdd) => {
        setcartItem(() => addcartItem(productToAdd, cartItems));
    }

    const removeCartItem = (itemToRemove) => {
        setcartItem(() => removeCartProduct(itemToRemove, cartItems));
    }

    const removeItem = (itemToRemove) => {
        setcartItem(() => removeProduct(itemToRemove, cartItems));
    }
    const value = {cartIconClick, setCartIconClick, addItemToCart, cartItems, removeCartItem, removeItem};

    return <CartIconContext.Provider value={value}>{children}</CartIconContext.Provider>
}