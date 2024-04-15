import './Button.styles.scss';

const BUTTON_STYLE_TYPE = {
    googleSignIn: 'google-sign-in',
    inverted: 'inverted'
}

const Button = ({ children, buttonStyleType, ...otherProps }) => {

    return(
        <button className={`${BUTTON_STYLE_TYPE[buttonStyleType]} button-container`} {...otherProps}>{children}</button>
    )
}

export default Button;