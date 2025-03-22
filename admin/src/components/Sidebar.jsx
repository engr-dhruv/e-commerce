import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  return (
    <div className='w-[18%] border-r-2 border-gray-300 min-h-screen'>
      <div className='flex flex-col gap-4 pt-6 pl-[20%]'>
        <NavLink to="/add" className='flex items-center gap-3 border border-gray-300 py-3 px-5'>
            <img src={assets.add_icon} alt="" />
            <p>Add Items</p>
        </NavLink>
        <NavLink to="/list" className='flex items-center gap-3 border border-gray-300 py-3 px-5'>
            <img src={assets.order_icon} alt="" />
            <p>List Items</p>
        </NavLink>
        <NavLink to="/orders" className='flex items-center gap-3 border border-gray-300 py-3 px-5'>
            <img src={assets.order_icon} alt="" />
            <p>Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
