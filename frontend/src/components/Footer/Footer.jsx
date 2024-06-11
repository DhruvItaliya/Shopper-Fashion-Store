import React from 'react';
import footer_logo from '../../assets/logo_big.png';
import instagram_icon from '../../assets/instagram_icon.png';
import pintester_icon from '../../assets/pintester_icon.png';
import whatsapp_icon from '../../assets/whatsapp_icon.png';


const Footer = () => {
    return (
        <div className='bg-[#aba5ab] flex flex-col justify-center items-center gap-12 px-5 py-5'>
            <div className='flex items-center gap-5'>
                <img src={footer_logo} alt="" />
                <p className='text-[383838] text-[46px] font-[700]'>SHOPPER</p>
            </div>
            <div className='w-full flex justify-around items-center px-5'>
                <ul className='flex flex-col md:flex-row gap-4 text-[18px]'>
                    <li className='cursor-pointer'>Company</li>
                    <li className='cursor-pointer'>Products</li>
                    <li className='cursor-pointer'>Offices</li>
                    <li className='cursor-pointer'>About</li>
                    <li className='cursor-pointer'>Contact</li>
                </ul>
                <div className='flex gap-3'>
                    <div>
                        <img className='cursor-pointer' src={instagram_icon} alt="" />
                    </div>
                    <div>
                        <img className='cursor-pointer' src={pintester_icon} alt="" />
                    </div>
                    <div>
                        <img className='cursor-pointer' src={whatsapp_icon} alt="" />
                    </div>
                </div>
            </div>
            <div className='w-full flex flex-col items-center'>
                <hr className='h-[1px] border-none w-full bg-black'/>
                <p className='mt-5'>Copyright @ 2024 - All Right Reserved</p>
            </div>
        </div>
    )
}

export default Footer