import React from 'react';
import hand_icon from '../../assets/hand_icon.png';
import arrow_icon from '../../assets/arrow.png';
import hero_image from '../../assets/hero_image.png';

const Hero = () => {
  return (
    <>
      <div className='bg-gradient-to-b from-[rgb(225,102,131)] flex flex-col sm:flex-row px-5 md:px-44 py-10'>
        <div className='flex flex-1 flex-col items-center sm:items-start justify-center gap-5 '>
            <h2 className='text-[#090909] text-[26px] font-[60] leading-none'>NEW ARRIVALS ONLY</h2>
            <div>
              <div className='flex items-center gap-1'>
                <p className='text-[#171717] text-[40px] sm:text-[80px] font-[700] leading-none'>new</p>
                <img className='w-[40px] md:w-[80px] leading-none' src={hand_icon} alt="" />
              </div>
              <p className='text-[#171717] text-[40px] sm:text-[80px] font-[700] leading-none'>collections</p>
              <p className='text-[#171717] text-[40px] sm:text-[80px] font-[700] leading-none'>for you</p>
            </div>
          <div className='flex w-64 justify-center items-center gap-2 py-4 px-3 rounded-full mt-[30px] bg-[#ff4141] text-white text-[22px]'>
            <div>Latest Collection</div>
            <img src={arrow_icon} alt="" />
          </div>
        </div>
        <div className='sm:flex flex-1 flex-col items-end justify-center' >
          <img className='w-[26rem]' src={hero_image} alt="" />
          <div></div>
        </div>
      </div>
    </>
  )
}

export default Hero