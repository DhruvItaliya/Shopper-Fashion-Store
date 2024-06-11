import React from 'react'
import { Link,useParams,useNavigate } from 'react-router-dom'

const CheckoutSuccess = () => {
    const {id} =useParams() 
    const navigate = useNavigate()
  return id?(
    <div className='flex justify-center items-center h-[70vh]'>
        <div className='px-2 py-4 shadow-md border-2 flex justify-center flex-col items-center gap-2'>
            <button className='bg-green-500 text-white rounded-full px-2 py-1'>Order Placed!</button>
            <p>Your order id is <span className='text-[rgb(225,102,131)]'>{id}</span></p>
            <div className='flex justify-around items-center w-full'>
                <Link to='/'><button className='bg-yellow-400 rounded-full px-2 py-1 text-sm active:scale-100 cursor-pointer hover:scale-[102%]'>Check Status</button></Link>
                <Link to='/'><button className='bg-red-400 rounded-full px-2 py-1 text-sm active:scale-100 cursor-pointer hover:scale-[102%]'>Shop more</button></Link>
            </div>
        </div>
    </div>
  ):navigate('/')
}

export default CheckoutSuccess