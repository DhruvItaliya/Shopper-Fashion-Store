import React from 'react'
import Sidebar from '../Components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import AddProduct from '../Components/AddProduct';
import ListProduct from '../Components/ListProduct';
const Admin = () => {
  return (
    <div className='flex flex-col md:flex-row'>
      <Sidebar />
      <Routes>
        <Route path='/add product' element={<AddProduct />} />
        <Route path='/listproduct' element={<ListProduct />} />
      </Routes>
    </div>
  )
}

export default Admin