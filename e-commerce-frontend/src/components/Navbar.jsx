import { useEffect} from 'react'
import { Link, NavLink } from 'react-router-dom'
import {assets} from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const NavBar = ({setToken}) => {

    const navigate = useNavigate();

    const handleSignOut = () => {
        setToken(''); // Clear the token state
        localStorage.removeItem('token'); // Remove the token from localStorage
        navigate('/login'); // Redirect to login page
      };

    // useEffect(() => {
    //      // toast.success("Login successful! Redirecting...");
    //      if(!token)
    //      navigate("/login");
        
    //   }, [token]);

  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      <div>
       <Link to='/'><img src={assets.logo} className='w-36' alt="" /></Link>
      </div>
      <div>
        <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
            <NavLink to='/' className='flex flex-col items-center gap-1'>
                <p>HOME</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
            </NavLink>
            <NavLink to='/collection' className='flex flex-col items-center gap-1'>
                <p>COLLECTION</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
            </NavLink>
            <NavLink to='/about' className='flex flex-col items-center gap-1'>
                <p>ABOUT</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
            </NavLink>
            <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                <p>CONTACT</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
            </NavLink>
            
        </ul>
        </div>
        <div className='flex items-center gap-6'>
            <img src={assets.search_icon} alt="" className='w-5 cursor-pointer'/>
            <div className='group relative'>
            <Link to='/login'><img src={assets.profile_icon} alt="" className='w-5 cursor-pointer'/></Link>
            <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                    <p className='hover:text-black cursor-pointer'>My Profile</p>
                    <p className='hover:text-black cursor-pointer'>My Orders</p>
                    <p onClick={handleSignOut} className='hover:text-black cursor-pointer'>Signout</p>
                </div>
            </div>
            </div>
            <Link to='/cart' className='relative'>
                <img src={assets.cart_icon} className='w-5 min-w-5' alt="" />
                <p className='absolute right-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>10</p>
            </Link>
        </div>
    </div>
  )
}

export default NavBar
