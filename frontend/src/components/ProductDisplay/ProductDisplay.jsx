import React, { useContext, useState } from 'react'
import star_icon from '../../assets/star_icon.png'
import star_dull_icon from '../../assets/star_dull_icon.png'
import { ShopContext } from '../../context/ShopContext';

const ProductDisplay = (props) => {
    const { product } = props;
    const [activeSize, setActiveSize] = useState(null);
        const { addToCart,cartItems, removeFromCart } = useContext(ShopContext)
    return (
        <div className='flex flex-col lg:flex-row my-4 px-5 md:px-40'>
            <div className='flex gap-2 my-2'>
                <div className='flex flex-col gap-3'>
                    <img className='w-[183px]' src={product.image} alt="" />
                    <img className='w-[183px]' src={product.image} alt="" />
                    <img className='w-[183px]' src={product.image} alt="" />
                    <img className='w-[183px]' src={product.image} alt="" />
                </div>
                <div className=''>
                    <img className='w-[800px]' src={product.image} alt="" />
                </div>
            </div>
            <div className='flex flex-col mx-10 my-2'>
                <h1 className='text-2xl font-[700]'>{product.name}</h1>
                <div className='flex items-center my-3 gap-1 text-[#1c1c1c]'>
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>(122)</p>
                </div>
                <div className='flex mx-5 gap-3 font-[700] text-xl'>
                    <div className='text-[#818181] line-through'>${product.old_price}</div>
                    <div className='text-[rgb(225,102,131)]'>${product.new_price}</div>
                </div>
                <div className='my-2'>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis molestias eius sint, rem dolores aliquam impedit modi sequi expedita iusto deserunt velit, odit minus, cupiditate harum? Nemo velit facilis itaque!
                </div>
                <div>
                    <h1 className='mt-8 text-[#656565] text-xl font-[600]'>Select Size</h1>
                    <div className='flex my-6 gap-4'>
                        <div onClick={() => setActiveSize("S")} className={`px-4 py-4 ${activeSize === "S" ? 'bg-[#e2cece]' : 'bg-[#fbfbfb]'} border border-[#ebebeb] rounded-[3px] cursor-pointer`}>S</div>
                        <div onClick={() => setActiveSize("M")} className={`px-4 py-4 ${activeSize=== "M" ? 'bg-[#e2cece]' : 'bg-[#fbfbfb]'} border border-[#ebebeb] rounded-[3px] cursor-pointer`}>M</div>
                        <div onClick={() => setActiveSize("L")} className={`px-4 py-4 ${activeSize === "L" ? 'bg-[#e2cece]' : 'bg-[#fbfbfb]'} border border-[#ebebeb] rounded-[3px] cursor-pointer`}>L</div>
                        <div onClick={() => setActiveSize("XL")} className={`px-4 py-4 ${activeSize === "XL" ? 'bg-[#e2cece]' : 'bg-[#fbfbfb]'} border border-[#ebebeb] rounded-[3px] cursor-pointer`}>XL</div>
                        <div onClick={() => setActiveSize("XXL")} className={`px-4 py-4 ${activeSize === "XXL" ? 'bg-[#e2cece]' : 'bg-[#fbfbfb]'} border border-[#ebebeb] rounded-[3px] cursor-pointer`}>XXL</div>
                    </div>
                </div>
                {cartItems[product.id]==0 ? <button className='bg-[rgb(225,102,131)] w-[200px] px-2 py-2 text-white font-[600] mb-4 cursor-pointer active:scale-95' onClick={() => {addToCart(product.id)}}>ADD TO CART</button> :
                    <div className='mb-4'>
                        <button className=' bg-[rgb(225,102,131)] text-xl px-4 py-2  active:scale-95 shadow-md' onClick={() => removeFromCart(product.id)}>-</button>
                        <button className='text-xl px-4 py-2 shadow-md'>{cartItems[product.id]}</button>
                        <button className='bg-[rgb(225,102,131)] text-xl px-4 py-2 active:scale-95 shadow-md' onClick={() => addToCart(product.id)}>+</button>
                    </div>

                }
                <p><span className='font-[600]'>Category : </span>Women, T-shirt, Crop Top</p>
                <p><span className='font-[600]'>Tags : </span>Modern, Latest</p>
            </div>
        </div>
    )
}

export default ProductDisplay