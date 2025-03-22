import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductCard from './ProductCard';

const BestSellers = () => {
    const {products} = useContext(ShopContext);
    const [arr,setArr] = useState([]);
    useEffect(()=>{
        const bestProducts = products.filter((item)=>(item.bestseller));
        // console.log(bestProducts);
        setArr(bestProducts.slice(0,5));
    },[])
    
  return (
    <div>
    <Title text1={'Best'} text2={'Sellers'}/>
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
    {
      arr.map((item,index)=>(
        <ProductCard key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
  ))
    }
    </div>
    </div>
  )
}

export default BestSellers
