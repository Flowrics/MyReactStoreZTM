import { useNavigate } from 'react-router-dom';
import './category.style.scss';

const Category = ({category}) => {

  const {title, imageUrl, routeName} = category;
  const navigate = useNavigate();
  const navigationHandler = () => navigate(routeName);

  return(
    <div className="category-cnt" onClick={navigationHandler}>
      <div className="background-image" style={{
          backgroundImage: `url(${imageUrl})`
      }}></div>
      <div className="category-info">
        <h1>{title}</h1>
        <p>Shop Now!</p>
      </div>
    </div>
  )
  
}

export default Category;