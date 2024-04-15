import { useParams } from "react-router-dom";
import { useContext, useState, useEffect, Fragment } from "react";
import { CategoriesContext } from "../../contexts/categories.context";
import ProductCard from "../../Components/product-card/productcard.component";
import "./category.styles.scss";

const Category = () => {
    const {category} = useParams();
    const {categoriesMap} = useContext(CategoriesContext);
    const [products, setproducts] = useState(categoriesMap[category])

    useEffect(() => {
        setproducts(categoriesMap[category])
    }, [category, categoriesMap])

    return(
        <Fragment>
            <h2 className="category-title">{category}</h2>
            <div className="category-container">
                
                {
                    products && products.map((product) => <ProductCard key={product.id} product={product}/>)
                }
            </div>
        </Fragment>
    )
}

export default Category;