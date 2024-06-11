import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../../context/ShopContext';
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from 'react-toastify';
import { Link,useNavigate } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa6";
import {loadStripe} from '@stripe/stripe-js';


const CartItems = () => {
    const ConnString = import.meta.env.VITE_ConnString;
    const STRIPE_KEY = import.meta.env.VITE_STRIPE_KEY;
    const { all_product, cartItems, removeFromCart, addToCart, deleteFromCart, getTotalCartAmount, clearCart } = useContext(ShopContext);
    const [isCart, setIsCart] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        setIsCart(Object.keys(cartItems).some(key => cartItems[key] > 0))
    }, [cartItems])

    const proceedToBuy = async () => {
        if (localStorage.getItem('auth-token')) {
            try {
                const stripe = await loadStripe(STRIPE_KEY);
                const itemsToBeBuy = [];
                all_product.forEach(item => {
                    if(cartItems[item.id]>0){
                        item.qty = cartItems[item.id];
                        itemsToBeBuy.push(item);
                    }
                });
                const response = await fetch(`${ConnString}/user/placeorder`, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        'auth-token': `${localStorage.getItem('auth-token')}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ orderItems: itemsToBeBuy }),
                });
                const json = await response.json();
                if (json.success) {
                    // const result = stripe.redirectToCheckout({
                    //     sessionId:json.id
                    // })
                    toast.success("Order placed successfully");
                    navigate(`/checkout-success/${json.orderId}`);
                    setTimeout(() => {
                        clearCart()
                    }, 1500)
                }
                else {
                    toast.error("Unauthorized access! Refesh the page");
                }
            }
            catch (err) {
                toast.error("Unexpected error!");
                console.log(err);
            }
        }
        else {
            toast.error("Please loggin to place order");
        }
    }

    return isCart ? (
        <div className=' my-7 px-5 md:px-44'>
            {/* {cartItems.length > 0 ?
                <> */}
            {/* <div className='hidden sm:flex w-full gap-2'>
                    <div className='w-1/12 flex justify-center'><p>Products</p></div>
                    <div className='w-1/3 flex justify-center'><p>Title</p></div>
                    <div className='w-1/6 flex justify-center'><p>Price</p></div>
                    <div className='w-1/6 flex justify-center'><p>Quantity</p></div>
                    <div className='w-1/6 flex justify-center'><p>Total</p></div>
                    <div className='w-1/12 flex justify-center'><p>Remove</p></div>
            </div>
            <hr /> */}
            <div className='hidden sm:flex w-full gap-2'>
                <div className='flex w-full justify-between'>
                    <div className='w-1/6 flex justify-center'><p>Products</p></div>
                    <div className='w-2/3 flex justify-center'><p>Title</p></div>
                    <div className='w-1/3 flex justify-center'><p>Price</p></div>
                </div>
                <div className='flex w-full justify-between'>
                    <div className='w-1/3 flex justify-center'><p>Quantity</p></div>
                    <div className='w-1/3 flex justify-center'><p>Total</p></div>
                    <div className='w-1/6 flex justify-center'><p>Remove</p></div>
                </div>
            </div>
            <hr />
            {/* </> : <h1 className='text-4xl text-center my-40 text-gray-500'>Cart is Empty</h1>} */}

            {all_product.map((item) => {
                if (cartItems[item.id] > 0) {
                    return (
                        <div key={item.id}>
                            <div className='flex flex-col sm:flex-row w-full py-2 justify-center items-center'>
                                <div className='flex flex-1 justify-between'>
                                    <div className='w-1/3 sm:w-1/6 flex justify-center items-center'>
                                        <img src={item.image} className='w-[90px] sm:w-[65px]' alt="" />
                                    </div>
                                    <div className='w-1/3 sm:w-2/3 flex justify-center items-center'><p>{item.name}</p></div>
                                    <div className='w-1/3 sm:w-1/3 flex justify-center items-center'><p>${item.new_price}</p></div>
                                </div>
                                <div className='flex flex-1 justify-between py-2'>
                                    <div className='w-1/6 sm:w-1/3 flex justify-center items-center'>
                                        <button className='border-t-2 border-l-2 border-b-2 border-1 px-3 py-1 hover:bg-gray-200 active:scale-95 shadow-md' onClick={() => removeFromCart(item.id)}>-</button>
                                        <button className='border-2 px-3 py-1 shadow-md'>{cartItems[item.id]}</button>
                                        <button className='border-t-2 border-r-2 border-b-2 px-3 py-1 hover:bg-gray-200 active:scale-95 shadow-md' onClick={() => addToCart(item.id)}>+</button>
                                    </div>
                                    <div className='w-1/6 sm:w-1/3 flex justify-center items-center'><span className='sm:hidden'>Total: </span><p>${item.new_price * cartItems[item.id]}</p></div>
                                    <div className='w-1/12 sm:w-1/6 flex justify-center items-center'>
                                        <div className='hover:bg-red-500 hover:text-white p-1 rounded-md active:scale-90 duration-100'><AiOutlineDelete className='' size={30} onClick={() => deleteFromCart(item.id)} /></div>
                                    </div>
                                </div>
                            </div>
                            <hr />
                        </div>
                    )
                }
                return null;
            })}
            <div className='flex flex-col lg:flex-row my-20 gap-10 w-full justify-center items-center'>
                <div className='flex flex-col w-[80%] lg:w-1/2'>
                    <h1 className='text-3xl font-[500]'>Cart Totals</h1>
                    <div className='flex flex-col justify-center'>
                        <div className='flex justify-between py-2 items-center'>
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className='flex justify-between py-2 items-center'>
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className='flex justify-between py-2 items-center'>
                            <h3>Total</h3>
                            <h3>${getTotalCartAmount()}</h3>
                        </div>
                    </div>
                    <button onClick={proceedToBuy} className='bg-[rgb(225,102,131)] w-[300px] px-2 py-2 text-white font-[600] mb-4 cursor-pointer hover:bg-[rgb(225,86,119)] active:scale-[98%]'>PROCEED TO CHECKOUT</button>
                </div>
                <div className='flex flex-col w-[80%] lg:w-1/2 gap-2'>
                    <p>If you have promo code, Enter it here</p>
                    <div>
                        <input className='border-2 px-2 py-1 outline-none bg-gray-300' type="text" placeholder='Promo code' />
                        <button className='px-2 py-1 bg-gray-700 text-white active:scale-95 duration-200'>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div className='flex flex-col justify-center items-center my-44'>
            <h1 className='text-4xl sm:text-5xl text-[#adabab] my-3'>Let's Buy Something</h1>
            <Link to='/'><button className='flex items-center gap-2 text-2xl text-white rounded-full bg-[rgb(225,102,131)] hover:bg-[rgb(239,102,102)] px-4 py-1'>Shop <FaArrowRight/></button></Link>
        </div>
    )
}

export default CartItems