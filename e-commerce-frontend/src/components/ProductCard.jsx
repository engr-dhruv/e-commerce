import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';


const ProductCard = ({id,image,name,price}) => {
    const {currency} = useContext(ShopContext);
  return (
    <Link to={`/product/${id}`}>
        <div className='overflow-hidden'>
            <img className='hover:scale-110 transition ease-in-out'  src={image[0]} alt="" />
        </div>
        <p>{name}</p>
        <p>{currency}{price}</p>
    </Link>
  )
}

export default ProductCard
