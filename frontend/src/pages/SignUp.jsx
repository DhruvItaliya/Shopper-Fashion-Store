import React, { useEffect, useState } from 'react';
import { MdLock, MdEmail, MdPassword } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignUp = () => {
  const ConnString = import.meta.env.VITE_ConnString;
  const [userData, setUserData] = useState({ name: "", email: "", password: "", otp: "" });
  const [isOTPGet,setIsOTPGET] = useState(false);
  const navigate = useNavigate();
  const getotp = async () => {
    const data = await fetch(`${ConnString}/otp/getotp`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: userData.email })
    }
    );
    const json = await data.json();
    if (json.success) {
      toast.success(json.message)
    }
    else {
      toast.error(json.error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${ConnString}/auth/user/register`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: userData.name, email: userData.email, otp: userData.otp, password: userData.password })
    });
    const json = await response.json();

    if (json.success) {
      toast.success("Registered successfully");
      navigate('/');
    }
    else {
      toast.error(json.error);
    }
  }

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }
  return (
    <div>
      <div className='flex bg-[#fdefe9]'>
        <div className='flex justify-center items-center mx-auto w-full md:w-[60%] my-20'>
          <div className='flex flex-col justify-center items-center w-[80%] sm:w-[70%] bg-white rounded-md h-[450px] shadow-md'>
            <h1 className='text-3xl text-[#164043] my-2 justify-start'>Create Account</h1>
            <form onSubmit={handleSubmit} className='flex flex-col w-[90%] sm:w-[70%]'>
              <div className='flex items-center bg-gray-200 my-2 rounded-md w-full'>
                <FaUser className='m-2 text-[#ff3f6c] w-[5%]' /> <input id="name" name="name" type="text" className='bg-transparent border-l-2 border-gray-300 p-2 outline-none w-[95%]' placeholder='Your Name' value={userData.name} onChange={handleChange} required />
              </div>
              <div className='flex items-center  bg-gray-200 my-2 rounded-md w-full'>
                <MdEmail className='m-2 text-[#ff3f6c] w-[5%]' /><input id="email" name="email" type="email" className='bg-transparent border-l-2 border-gray-300 p-2 outline-none w-[70%]' placeholder='Email Address' value={userData.email} onChange={handleChange} required /><button type='button' onClick={getotp} className='bg-[#ff3f6c] text-white text-sm h-[80%] w-[25%] px-2 hover:bg-[#fd184d] rounded-md mx-1 shadow-md'>Get OTP</button>
              </div>
              <div className='flex items-center bg-gray-200 my-2 rounded-md w-full'>
                <MdPassword className='m-2 text-[#ff3f6c] w-[5%]' /><input id="otp" name="otp" type="otp" className='bg-transparent border-l-2 p-2 border-gray-300 outline-none w-[80%]' placeholder='Enter OTP' value={userData.otp} onChange={handleChange} required />
              </div>
              <div className='flex items-center bg-gray-200 my-2 rounded-md '>
                <MdLock className='m-2 text-[#ff3f6c] w-[5%]' /> <input id="password" name="password" type="password" className='bg-transparent border-l-2 border-gray-300 p-2 outline-none w-[80%]' placeholder='Password' value={userData.password} onChange={handleChange} required />
              </div>
              <div className='flex items-center text-sm gap-2 my-2 text-gray-400'>
                <input type="checkbox" name='' id='' required />
                <p>By continuing, i agree to the terms of use and privacy policy </p>
              </div>
              <button type='submit' className='bg-[#ff3f6c] text-lg text-white py-1 rounded-md'>Create</button>
              <div className='flex flex-col sm:flex-row my-2 space-x-1'>
                <p>Already have an account?</p><Link to="/login" className='text-[#ff3f6c] font-[500] underline underline-offset-2'>Login here</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp;