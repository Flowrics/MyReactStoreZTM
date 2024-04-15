import { useContext } from 'react';
import {CartIconContext} from '../../contexts/cart-dropdown.context'
import CheckoutItem from '../../Components/checkout-item/checkout-item.component';
import './checkout.styles.scss';

const Checkout = () => {
    const { cartItems } = useContext(CartIconContext);

    let totalPrice = 0;

    cartItems.forEach((value, index) => {
        let res = value.quantity * value.price;
        totalPrice += res;
    })

    return(
        <div className="checkout-container">
            <div className="checkout-header">
                <div className="header-block">

                <span className="header-title">Product</span>
                </div>
                <div className="header-block">

                <span className="header-title">Description</span>
                </div>
                <div className="header-block">

                <span className="header-title">Quantity</span>
                </div>
                <div className="header-block">

                <span className="header-title">Price</span>
                </div>
                <div className="header-block">

                <span className="header-title">Remove</span>
                </div>
            </div>
            {cartItems.map((item) => {
                return(
                <CheckoutItem key={item.id} cartItem={item}/>
                )
            })}
            <span className="total">${totalPrice}</span>
        </div>
    )
}

export default Checkout;