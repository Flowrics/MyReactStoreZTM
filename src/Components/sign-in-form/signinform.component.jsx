import { useState } from "react";
import { signInWithGooglePopup, signInUserWithEmailAndPassword, creatUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../Form-input/form-input.component";
import Button from "../Button/Button.component";

const definfoField = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [infoField, setinfoField] = useState(definfoField);
    const { email, password } = infoField;

    const resetFormFields = () => {
        setinfoField(definfoField);
    }

    const loggoogleuser = async () => {
        try{
            const response = await signInWithGooglePopup();
            await creatUserDocumentFromAuth(response.user);
        }
        catch(error){
            console.error(error.code);
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;

        setinfoField({...infoField, [name]: value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
            await signInUserWithEmailAndPassword(email, password);
            resetFormFields();
        }
        catch(error){
            switch (error.code){
                case "auth/invalid-credential":
                    alert("User credentials don't match");
                    break;

                default:
                    break;
            }
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <h2>Already have an account?</h2>
            <span>Sign In with email and password</span>
            <FormInput label="E-mail" type="email" required onChange={handleChange} name="email" value={email} />
            <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />
            <div className="button-wrapper">
                <Button buttonStyleType="" type="submit">Sign In</Button>
                <Button buttonStyleType="googleSignIn" type="button" onClick={loggoogleuser}>Sign in with google</Button>
            </div>
        </form>
    )
}

export default SignInForm;