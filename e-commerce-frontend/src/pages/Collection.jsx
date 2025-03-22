import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import ProductCard from '../components/ProductCard';

const Collection = () => {
  const {products} = useContext(ShopContext);
  return (
    <div>
      <Title text1={'ALL'} text2={'COLLECTION'}/>
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 gap-y-6'>
      {
        products.map((item,index)=>(
          <ProductCard key={index} id={item._id} name={item.name} image={item.image} price={item.price}/>
        ))
      }
    </div>
    </div>
  )
}

export default Collection
