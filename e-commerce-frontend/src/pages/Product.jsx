import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios'; // Import Axios

const Product = () => {
  const { productId } = useParams();
  const { products, currency } = useContext(ShopContext);
  const [parray, setparray] = useState([]);
  const [cost, setcost] = useState(0);
  const [nam, setname] = useState('');
  const [des, setdes] = useState('');
  useEffect(() => {
    const foundItem = products.find((item) => item._id === productId);
    if (foundItem) {
      setparray(foundItem.image);
      setcost(foundItem.price);
      setname(foundItem.name);
      setdes(foundItem.description);
    }
  }, [productId, products, currency]);

  const handleAddToCart = async () => {
    const token = localStorage.getItem('token'); // Get token from localStorage
    if (!token) {
      alert('Please login to add items to cart!');
      return;
    }
    console.log("TOKEN:",token);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/addToCart`,
        {
          productId, // Make sure this is correct and matches the productId
          size: 'M',  // Default size, make sure this is valid
          quantity: 1, // Default quantity, can be dynamic
          token, // Ensure the token is available and valid
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      

      if (response.data.success) {
        alert('Item added to cart!');
      } else {
        alert(response.data.error || 'Failed to add item to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Something went wrong!');
    }
  };

  return (
    <div className='flex'>
      <div className='w-1/2'>
        <img src={parray[0]} alt="" />
      </div>
      <div className='w-1/2 ml-7 flex flex-col gap-10 justify-center'>
        <div className='flex flex-col gap-5'>
          <h1 className='text-3xl'>{nam}</h1>
          <h1 className='text-3xl'>{currency}{cost}</h1>
        </div>
        <div className='flex flex-col gap-15'>
          <p className='text-gray-500'>{des}</p>
          <button 
            className='text-white bg-black cursor-pointer w-1/4 py-3 text-xl'
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
