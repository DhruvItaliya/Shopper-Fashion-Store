import React from 'react'
import { Link } from 'react-router-dom'

const Item = (props) => {
  return (
    <div className='hover:scale-105 duration-500 border'>
       <Link to={`/product/${props.id}`}> <img src={props.image} alt="" onClick={window.scrollTo({top: 0,behavior: "smooth"})}/></Link>
        <p className='mx-1 my-1.5' >{props.name}</p>
        <div className='flex mx-1 gap-5'>
            <div className='text-[#374151] text-[18px] font-[600]'>
                ${props.new_price}
            </div>
            <div className='text-[#8c8c8c] text-[18px] font-[500] line-through'>
                ${props.old_price}
            </div>
        </div>
    </div>
  )
}

export default Item