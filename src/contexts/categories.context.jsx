import { createContext, useState, useEffect } from "react";
import {getCollectionAndDocuments} from "../utils/firebase/firebase.utils.js";

export const CategoriesContext = createContext({
    categoriesMap: {}
})

export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setcategoriesMap] = useState({});

    useEffect(() => {
        const getCategoryMap = async () => {
            const categoryMap = await getCollectionAndDocuments();
            setcategoriesMap(categoryMap);
        }
        getCategoryMap();
    }, [])

    const value = {categoriesMap};

    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}