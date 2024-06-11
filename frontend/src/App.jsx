import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './pages/Shop';
import Product from './pages/Product';
import ShopCategory from './pages/ShopCategory';
import Cart from './pages/Cart';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Footer from './components/Footer/Footer';
import men_banner from './assets/banner_mens.png'
import women_banner from './assets/banner_women.png'
import kid_banner from './assets/banner_kids.png'
import 'react-toastify/dist/ReactToastify.css';
import CheckoutSuccess from './components/CheckoutSuccess';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/mens' element={<ShopCategory banner={men_banner} category='men' />} />
          <Route path='/womens' element={<ShopCategory banner={women_banner} category='women' />} />
          <Route path='/kids' element={<ShopCategory banner={kid_banner} category='kid' />} />
          <Route path='/product' element={<Product />} >
            <Route path=':productId' element={<Product />} />
          </Route>
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout-success/:id' element={<CheckoutSuccess />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
