import React from 'react';
import exclusive_image from '../../assets/exclusive_image.png';

const Offers = () => {
  return (
    <div className='flex flex-col-reverse sm:flex-row px-5 md:px-44 bg-gradient-to-b from-[rgb(225,102,131)] items-center py-10 my-10'>
        <div className='flex flex-1 flex-col justify-center items-center py-5'>
            <h1 className='text-[#171717] font-[600] text-[50px] leading-[1.1]'>Exclusive</h1>
            <h1 className='text-[#171717] font-[600] text-[50px] leading-[1.1]'>Offers For You</h1>
            <p className='text-[#171717] font-[600] text-[22px] my-[25px]'>ONLY ON BEST SELLERS PRODUCTS</p>
            <button className='rounded-full bg-[#ff4141] border-none text-white text-[22px] font-[500] cursor-pointer px-3 py-2'>Check Now</button>
        </div>
        <div className='flex flex-1 justify-center items-end'>
            <img className='' src={exclusive_image} alt="" />
        </div>

    </div>
  )
}

export default Offers