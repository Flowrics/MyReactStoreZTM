import { Routes, Route } from 'react-router-dom';
import Home from './Routes/home/home.components';
import Navigation from './Routes/navigation/navigation.component';
import Auth from './Components/auth/auth.component';
import Shop from './Routes/shop/shop.component';
import Checkout from './Routes/checkout/checkout.component';

const App = () => {

    return (
        <Routes>
            <Route path='/' element={<Navigation />}>
                <Route index element={<Home />}/>
                <Route path='shop/*' element={<Shop />}/>
                <Route path='auth' element={<Auth />}/>
                <Route path='checkout' element={<Checkout />}/>
            </Route>
        </Routes>
    );
}

export default App;