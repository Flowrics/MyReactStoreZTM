import SignUpForm from "../sign-up-form/signupform.component";
import SignInForm from "../sign-in-form/signinform.component";
import './auth.styles.scss';

const Auth = () => {

    return(
        <div className="forms-wrapper">
            <SignInForm />
            <SignUpForm />
        </div>
    )
}

export default Auth;