import React, { useContext } from 'react'
import Navbar from './Components/Navbar';
import Admin from './Pages/Admin';
import Home from './Pages/Home';
import { AuthContext } from './context/AuthContext';
import Login from './Pages/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddProduct from './Components/AddProduct';
import ListProduct from './Components/ListProduct';

const App = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <div>
        <Navbar />
        {isLoggedIn?<Admin />:<Home/>}
        <Routes>
          <Route path='/' element={isLoggedIn ? <Admin /> : <Home />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>

  )
}

export default App