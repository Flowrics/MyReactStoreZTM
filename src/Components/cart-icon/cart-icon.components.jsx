import { useContext } from "react";
import "./cart-icon.styles.scss";
import { ReactComponent as ShoppingBag } from "../../assets/shopping-bag.svg";
import {CartIconContext} from '../../contexts/cart-dropdown.context';

const CartIcon = () => {

    const { cartItems, cartIconClick, setCartIconClick } = useContext(CartIconContext);
    const toggleCartIcon = () => setCartIconClick(!cartIconClick);

    let cartCount = 0;
    cartItems.forEach((value, index) => {
        cartCount += value.quantity;
    })

    return(
        <div className="cart-icon-container">
            <ShoppingBag className="shopping-icon" onClick={toggleCartIcon}/>
            <span className="item-count">{cartCount}</span>
        </div>
    )
}

export default CartIcon;