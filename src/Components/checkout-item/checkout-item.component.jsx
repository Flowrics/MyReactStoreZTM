import './checkout-item.styles.scss';
import {useContext} from 'react';
import {CartIconContext} from '../../contexts/cart-dropdown.context';

const CheckoutItem = ({cartItem}) => {
    const {name, imageUrl ,quantity, price} = cartItem;

    const { addItemToCart, removeCartItem, removeItem } = useContext(CartIconContext);

    return(
        <div className="checkout-item-cnt">
            <div className="image-container">
                <img src={imageUrl} alt={name} />
            </div>
            <span className="desc">{name}</span>
            <div className="quantity-cnt">
                <span className="arrow" onClick={() => removeCartItem(cartItem)}>&lt;</span>
                <span className="quantity">{quantity}</span>
                <span className="arrow" onClick={() => addItemToCart(cartItem)}>&gt;</span>
            </div>
            <span className="price">{price}</span>
            <span className="remove-button" onClick={() => removeItem(cartItem)}>&#10005;</span>
        </div>
    )
}

export default CheckoutItem;