import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as Crownlogo } from "../../assets/crown.svg";
import './navigation.styles.scss';
import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { SignOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from '../../Components/cart-icon/cart-icon.components';
import CartDropdown from '../../Components/cart-dropdown/cart-dropdown.component';
import {CartIconContext} from '../../contexts/cart-dropdown.context';

const Navigation = () => {
    const { currentUser, setcurrentUser } = useContext(UserContext);
    const { cartIconClick } = useContext(CartIconContext);

    const signOutHandler = async () => {
        await SignOutUser();
        setcurrentUser(null);
    }

    return(
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to='/'>
                    <Crownlogo className="logo"/>
                </Link>

                <div className="nav-links-container">
                    <Link className="nav-link" to='/shop'>SHOP</Link>
                    {
                        currentUser ? (
                            <span className="nav-link" onClick={signOutHandler}>Sign Out</span>
                        ) : (
                            <Link className="nav-link" to='/auth'>Sign In</Link>
                        )
                    }
                    <CartIcon />
                </div>
                { cartIconClick && <CartDropdown /> }
            </div>
            <Outlet />
        </Fragment>
    )
}

export default Navigation;