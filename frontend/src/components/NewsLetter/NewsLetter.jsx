import React from 'react'

const NewsLetter = () => {
    return (
        <div className='bg-gradient-to-b from-[rgb(225,102,131)] to-[#e1ffea22] flex flex-col items-center justify-center py-5 px-5 my-10'>
            <h1 className='text-[#101820] text-[30px] font-[600]'>Get Exclusive Offeres On Your Email</h1>
            <p className='text-[#454545] text-[20px]'>Subscribe to our newletter and stay updated</p>
            <div className='flex items-center justify-end gap-2 my-3'>
                <input type="email" className='w-[250px] border-none outline-none text-[#101820] placeholder-gray-600 font-[Poppins] text-[16px] bg-[#fc91ae] py-1 px-3 rounded-full' placeholder='Your Email id' />
                <button className='w-[100px] rounded-full py-1 px-2 bg-[#101820] text-white text-[16px] cursor-pointer'>Subscribe</button>
            </div>
        </div>
    )
}

export default NewsLetter