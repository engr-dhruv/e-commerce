import React, { useEffect } from 'react'
import { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductCard from './ProductCard';


const LatestCollection = () => {
const {products} = useContext(ShopContext);
const [latestArray, setlatestArray] = useState([]);
// console.log(products);

useEffect(()=>{
    setlatestArray(products.slice(0,10));
},[])

    // console.log(latestArray[1].image);

  return (
    <div>
      <Title text1={'LATEST'} text2={'COLLECTION'}/>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
          {
            latestArray.map((item,index)=>(
                <ProductCard key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
          )
          )}
      </div>
    </div>
  )
}

export default LatestCollection
