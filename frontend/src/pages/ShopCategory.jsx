import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Item from '../components/Item/Item';
import dropdown_icon from '../assets/dropdown_icon.png';

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext)
  return (
    <div className='flex flex-col items-center justify-center gap-2.5 px-5 md:px-44 my-3 mb-8'>
      <img src={props.banner} alt="" />
      <div className='my-5 w-full flex justify-between items-center'>
        <p className='text-gray-600'>
          <span className='text-black font-[600]'>Showing 1-12 </span> out of 36 products
        </p>
        <div className='flex items-center border border-black rounded-full cursor-pointer p-2 gap-1'>
          <p>Short by</p> <img className='' src={dropdown_icon} alt="" />
        </div>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-7'>
        {all_product.map((item, i) => {
          if (item.category === props.category) {
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
          }
          else {
            return null;
          }
        })}
      </div>
      <div className='flex justify-center items-center bg-[#ededed] text-[#787878] text-[18px] px-5 py-2 mt-6 font-[500] rounded-full '>
        Explore More
      </div>
    </div>
  )
}

export default ShopCategory