import React, { useState } from 'react'
import upload_area from '../assets/upload_area.svg'
import { toast } from 'react-toastify';

const AddProduct = () => {
    const connString = import.meta.env.VITE_ConnString;
    const [image, setImage] = useState(false)
    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        category: "women",
        new_price: "",
        old_price: ""
    })

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    }

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value })
    }

    const addProduct = async () => {
        // console.log(productDetails);
        let responseData;
        let product = productDetails;
        let formData = new FormData();
        if (!image || !product.name || !product.new_price || !product.old_price) {
            toast.error("Please fill all details!")
            return;
        }
        formData.append('product', image)
        await fetch(`${connString}/admin/product-upload`, {
            method: 'POST',
            headers: {
                Accept: 'application/json'
            },
            body: formData
        }).then((response) => response.json()).then((data) => { responseData = data });

        if (responseData.success) {
            product.image = responseData.image_url;
            console.log(productDetails)
            console.log(product)
            await fetch(`${connString}/admin/add-product`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            }).then((response) => response.json()).then((data) => {
                data.success ? toast.success('Product added') : toast.error('Failed');
                // setTimeout(() => {
                //     location.reload();
                // }, 2000)
            })
        }
    }
    return (
        <div className='box-border md:w-full mx-3 p-3 my-5 md:max-w-[800px] rounded-md bg-white'>
            <div className='w-full text-[#7b7b7b] my-3'>
                <p>Product title</p>
                <input value={productDetails.name} onChange={changeHandler} className='box-border w-full rounded-md border border-[#c3c3c3] outline-none text-[#7b7b7b] py-2 text-[14px] pl-4' type="text" name='name' placeholder='Type here' required />
            </div>
            <div className='flex gap-8'>
                <div value={productDetails.old_price} onChange={changeHandler} className='w-full text-[#7b7b7b] my-3'>
                    <p>Price</p>
                    <input className='box-border w-full rounded-md border border-[#c3c3c3] outline-none text-[#7b7b7b] py-2 text-[14px] pl-4' type="number" name='old_price' placeholder='Type here' required />
                </div>
                <div value={productDetails.new_price} onChange={changeHandler} className='w-full text-[#7b7b7b] my-3'>
                    <p>Offer Price</p>
                    <input className='box-border w-full rounded-md border border-[#c3c3c3] outline-none text-[#7b7b7b] py-2 text-[14px] pl-4' type="number" name='new_price' placeholder='Type here' required />
                </div>
            </div>
            <div className='w-full text-[#7b7b7b] my-3'>
                <p>Product Category</p>
                <select value={productDetails.category} onChange={changeHandler} name="category" className='p-2 w-24 py-2 text-[#7b7b7b] border border-[#7b7b7b8d] rounded-[4px] outline-none'>
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kid">Kid</option>
                </select>
            </div>
            <div className='w-full text-[#7b7b7b] my-3'>
                <label htmlFor="file-input">
                    <img className='w-32 h-32 object-contain rounded-[7px]' src={image ? URL.createObjectURL(image) : upload_area} alt="" />
                    <input onChange={imageHandler} type="file" name='image' id='file-input' hidden required />
                </label>

            </div>
            <button onClick={addProduct} type='submit' className='w-40 bg-[rgb(225,102,131)] text-white py-2 text-[18px] font-[500] rounded-md  active:border active:scale-[98%]'>ADD</button>
        </div>
    )
}

export default AddProduct