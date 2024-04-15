import { useState } from "react";
import { createAuthUserWithEmailAndPassword, creatUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../Form-input/form-input.component";
import Button from "../Button/Button.component";

const definfoField = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const SignUpForm = () => {
    const [infoField, setinfoField] = useState(definfoField);
    const { displayName, email, password, confirmPassword } = infoField;

    const resetFormFields = () => {
        setinfoField(definfoField);
    };

    const handleChange = (event) => {
        const {name, value} = event.target;

        setinfoField({...infoField, [name]: value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if(password !== confirmPassword){
            return alert("passwords match karo!");
        }

        try{
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            await creatUserDocumentFromAuth(user, {displayName});
            resetFormFields();
        }
        catch(error){
            if (error.code === "auth/email-already-in-use"){
                alert("Email is already in use!")
            }
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <h2>Dont have an account?</h2>
            <span>Sign Up using Email and Password</span>
            <FormInput label="Display Name" type="text" required onChange={handleChange} name="displayName" value={displayName} />
            <FormInput label="E-mail" type="email" required onChange={handleChange} name="email" value={email} />
            <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />
            <FormInput label="Confirm Password" type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword} />
            <Button type="Submit" buttonStyleType="">Sign Up</Button>
        </form>
    )
}

export default SignUpForm;