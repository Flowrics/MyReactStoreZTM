import {useContext} from 'react';
import {CartIconContext} from '../../contexts/cart-dropdown.context';
import Button from '../Button/Button.component';
import './productcard.styles.scss';

const ProductCard = ({product}) => {

    const { addItemToCart } = useContext(CartIconContext);

    const addProductToCart = () => addItemToCart(product);

    const {name, imageUrl, price} = product;

    return(
        <div className="product-card-container">
            <img src={imageUrl} alt={`${name}`}/>
            <Button buttonStyleType="inverted" onClick={addProductToCart}>Add to cart</Button>

            <div className="footer">
                <span className="name">{name}</span>
                <span className="price">{price}</span>
            </div>
        </div>
    )
}

export default ProductCard;