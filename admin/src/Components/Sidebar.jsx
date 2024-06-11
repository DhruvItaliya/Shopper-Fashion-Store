import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import add_product_icon from '../assets/Product_Cart.svg';
import list_product_icon from '../assets/Product_list_icon.svg';
const Sidebar = () => {
    const [menu,setMenu] = useState(null)
  return (
    <div className='flex md:flex-col justify-center md:justify-start py-[30px] gap-5 w-full md:max-w-[250px] bg-white md:h-screen'>
        <Link to={'/addproduct'} onClick={()=>setMenu('add')}>
            <div className={`flex items-center justify-center md:mx-5 p-2 rounded-md ${menu==='add'?'bg-[rgb(225,102,131)]':'bg-[#F5F2F2]'} gap-5 cursor-pointer`}>
                <img src={add_product_icon} alt="" />
                <p>Add Product</p>
            </div>
        </Link>
        <Link to={'/listproduct'} onClick={()=>setMenu('list')}>
            <div className={`flex items-center justify-center md:mx-5 p-2 rounded-md ${menu==='list'?'bg-[rgb(225,102,131)]':'bg-[#F5F2F2]'} gap-5 cursor-pointer`}>
                <img src={list_product_icon} alt="" />
                <p>List Product</p>
            </div>
        </Link>
    </div>
  )
}

export default Sidebar