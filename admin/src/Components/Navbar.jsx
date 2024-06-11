import React,{useContext} from 'react'
import navLogo from '../assets/nav-logo.svg';
import { MdLogin, MdLogout } from "react-icons/md";
import navProfile from '../assets/nav-profile.svg';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { handleLogout,isLoggedIn } = useContext(AuthContext);
  return (
    <div className='sticky top-0 z-10 flex items-center justify-between py-2 md:py-4 mb-[2px] px-5 sm:px-10 md:px-16 shadow-md bg-white'>
      <img className='w-40 sm:w-44 md:w-48' src={navLogo} alt="" />
      <div className='flex items-center gap-3'>
        {/* login button */}
        {!isLoggedIn ? <Link to='/login'><button className='hidden md:flex justify-center items-center text-lg bg-black active:bg-slate-800 text-white rounded-full px-4 py-1'><MdLogin size={25} className='mr-3' />Login</button></Link>
                    : <button onClick={handleLogout} className='hidden md:flex justify-center items-center text-lg bg-black active:bg-slate-800 text-white rounded-full px-4 py-1'><MdLogout size={25} className='mr-3' />Logout</button>}
        {isLoggedIn?<img className='w-16 md:w-20' src={navProfile} alt="" />:null}
      </div>
    </div>
  )
}

export default Navbar