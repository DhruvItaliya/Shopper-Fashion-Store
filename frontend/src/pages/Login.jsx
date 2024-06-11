import React, { useEffect, useState,useContext } from 'react';
import { MdLock, MdEmail } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const ConnString = import.meta.env.VITE_ConnString;
  const {setIsLoggedIn} = useContext(AuthContext);
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [isOTPGet,setIsOTPGET] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${ConnString}/auth/user/login`, {
      method: "POST",
      credentials:"include",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: userData.email,  password: userData.password })
    });
    const json = await response.json();

    if (json.success) {
      localStorage.setItem('auth-token',json.token);
      setIsLoggedIn(true);
      toast.success("LoggedIn successfully");
      window.location.assign('/')
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
          <div className='flex flex-col justify-center items-center w-[80%] sm:w-[60%] bg-white rounded-md h-[300px] shadow-md'>
            <h1 className='text-3xl text-[#164043] my-2 justify-start'>Sign In</h1>
            <form onSubmit={handleSubmit} className='flex flex-col w-[90%] sm:w-[70%]'>
              <div className='flex items-center  bg-gray-200 my-2 rounded-md w-full'>
                <MdEmail className='m-2 text-[#ff3f6c] w-[5%]' /><input id="email" name="email" type="email" className='bg-transparent border-l-2 border-gray-300 p-2 outline-none w-[70%]' placeholder='Email Address' value={userData.email} onChange={handleChange} required />
              </div>
              <div className='flex items-center bg-gray-200 my-2 rounded-md '>
                <MdLock className='m-2 text-[#ff3f6c] w-[5%]' /> <input id="password" name="password" type="password" className='bg-transparent border-l-2 border-gray-300 p-2 outline-none w-[80%]' placeholder='Password' value={userData.password} onChange={handleChange} required />
              </div>
              <button type='submit' className='bg-[#ff3f6c] text-lg text-white py-1 my-2 rounded-md'>Continue</button>
              <div className='flex flex-col sm:flex-row my-2 space-x-1'>
                <p>Don't you have an account?</p><Link to="/signup" className='text-[#ff3f6c] font-[500] underline underline-offset-2'>SignUp here</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login