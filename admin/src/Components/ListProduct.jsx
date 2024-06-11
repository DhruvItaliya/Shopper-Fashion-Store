import React, { useEffect, useState } from 'react'
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from 'react-toastify';

const ListProduct = () => {
  const connString = import.meta.env.VITE_ConnString;
  const [allProducts, setAllProducts] = useState([]);

  const fetchAllProducts = async () => {
    await fetch(`${connString}/admin/fetchallproducts`,{
      method:"GET",
      // credentials:"omit"
    }).then((response) => response.json())
      .then((data) => { setAllProducts(data.products) })
  }
  useEffect(() => {
    fetchAllProducts();
  }, [])

  const removeProduct = async (id) => {
    await fetch(`${connString}/admin/remove-product/${id}`, {
      method: "DELETE",
      credentials:"omit"
    }).then((response) => response.json()).then((data) => {
      if (data.success) toast.success("Product has been removed!");
      fetchAllProducts();
    })
  }
  return (
    <div className='flex flex-col w-full mt-7 px-5'>
      <div className='flex justify-between items-center'>
        <h1 className='text-4xl mb-4'>All Product List</h1>

        <div className='flex gap-3'>
          {/* Sort  */}
          <select className='rounded-full' name="" id="">
            <option value="">Name(A-Z)</option>
            <option value="">Name(Z-A)</option>
            <option value="">Price(High-Low)</option>
            <option value="">Price(Low-High)</option>
          </select>
          {/* filter  */}
          <select name="" id="">
            <option value=""></option>
          </select>
        </div>
      </div>

      <div className='w-full overflow-y-auto'>
        <div className='hidden sm:flex w-full gap-2'>
          <div className='w-1/6 flex justify-center font-[500]'><p>Products</p></div>
          <div className='w-1/2 flex justify-center font-[500]'><p>Title</p></div>
          <div className='w-1/6 flex justify-center font-[500]'><p>Old Price</p></div>
          <div className='w-1/6 flex justify-center font-[500]'><p>New Price</p></div>
          <div className='w-1/6 flex justify-center font-[500]'><p>Category</p></div>
          <div className='w-1/6 flex justify-center font-[500]'><p>Remove</p></div>
        </div>
        <hr />
        <div className='overflow-y-auto h-[500px]'>
          {allProducts.map((item, index) => {
            return (
              // <div key={index}>
              <div key={index}>
                <div  className='flex flex-col sm:flex-row w-full py-2 justify-center items-center overflow-y-auto'>
                  <div className='w-1/3 sm:w-1/6 flex justify-center items-center'>
                    <img src={item.image} className='w-[90px] sm:w-[60px]' alt="" />
                  </div>
                  <div className='w-1/3 sm:w-1/2 flex justify-center items-center'><p>{item.name}</p></div>
                  <div className='w-1/3 sm:w-1/6 flex justify-center items-center'><p>${item.old_price}</p></div>
                  <div className='w-1/6 sm:w-1/6 flex justify-center items-center'>${item.new_price}</div>
                  <div className='w-1/6 sm:w-1/6 flex justify-center items-center'>{item.category}</div>
                  <div className='w-1/12 sm:w-1/6 flex justify-center items-center'>
                    <AiOutlineDelete className='hover:text-red-500 active:scale-110' size={30} onClick={() => removeProduct(item._id)} />
                  </div>
                </div>
                <hr />
              </div>
              // {/* </div> */ }
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ListProduct