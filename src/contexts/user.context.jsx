import { createContext, useEffect, useReducer } from "react";
import { OnAuthStateChangedListener, creatUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
    currentUser: null,
    setcurrentUser: () => null
})

const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
}

const INITIAL_STATE = {
    currentUser: null,
  };

const userReducer = (state, action) => {
    const {type, payload} = action

    switch(type){
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return{
                ...state,
                currentUser: payload
            }
        default:
            throw new Error(`Unhandled type ${type} in userReducer`);
    }
}

export const UserProvider = ({children}) => {

    const [{currentUser}, dispatch] = useReducer(userReducer, INITIAL_STATE);
    const setcurrentUser = (user) => dispatch({type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user});

    const value = {currentUser, setcurrentUser};

    useEffect(() => {
        const unsubscribe = OnAuthStateChangedListener((user) => {
            if(user){
                creatUserDocumentFromAuth(user);
            }
            setcurrentUser(user);
        })

        return unsubscribe;
    }, [])

    return <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>;
}