import Category from '../Category/category.component';
import './directory.style.scss';

const categories = [
    {
      id: 1,
      title: "hats",
      imageUrl: "https://i.ibb.co/cvpntL1/hats.png",
      routeName: 'shop/hats'
    },
    {
      id: 2,
      title: "jackets",
      imageUrl: "https://i.ibb.co/px2tCc3/jackets.png",
      routeName: 'shop/jackets'
    },
    {
      id: 3,
      title: "sneakers",
      imageUrl: "https://i.ibb.co/0jqHpnp/sneakers.png",
      routeName: 'shop/sneakers'
    },
    {
      id: 4,
      title: "womens",
      imageUrl: "https://i.ibb.co/GCCdy8t/womens.png",
      routeName: 'shop/womens'
    },
    {
      id: 5,
      title: "mens",
      imageUrl: "https://i.ibb.co/R70vBrQ/men.png",
      routeName: 'shop/mens'
    }
];

const Directory = () => {

    return (
        <div className="categories-cnt">
            {categories.map((item) => {
                return <Category key={item.id} category={item} />
            })}
        </div>
    );
}

export default Directory;