import React from 'react'
import {assets} from '../assets/assets.js'
import { Link} from 'react-router-dom'

const Navbar = ({setToken}) => {
  return (
    <div className='flex justify-between items-center py-2 px-[4%]'>
      <Link to="/" className='cursor-pointer w-[max(10%,80px)]'>
      <img src={assets.logo} alt="" />
      </Link>
      <button onClick={()=>{
        setToken('');
      }} className='bg-gray-600 text-white rounded-full px-7 py-2 text-sm cursor-pointer'>Logout</button>
    </div>
  )
}

export default Navbar
