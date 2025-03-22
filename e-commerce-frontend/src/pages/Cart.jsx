import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { products } = useContext(ShopContext);

  useEffect(() => {
    const fetchCartData = async () => {
      const token = localStorage.getItem('token'); // Get token from localStorage

      if (!token) {
        setError('Please log in to view your cart.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/fetchCart`,
          { token },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.data.success) {
          setCartItems(response.data.cart);
        } else {
          setError('Failed to load cart data.');
        }
      } catch (err) {
        setError('An error occurred while fetching the cart data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, []);

  // Map through cart items and fetch the corresponding product from the local `products` array
  const cartItemsWithDetails = cartItems.map(item => {
    const product = products.find(p => p._id === item.productId); // Find product by ID

    if (product) {
      return {
        ...item,
        productDetails: product, // Add product details to the cart item
      };
    }
    return null; // Return null if product is not found
  }).filter(item => item !== null); // Filter out nulls in case product not found

  // Handle cart empty case
  if (loading) {
    return <div className="text-center p-4">Loading cart...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  const handlePlaceOrder = () => {
    alert("Order placed!");
    // You can add logic here to call an API to place the order
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {cartItemsWithDetails.length === 0 ? (
        <h2 className="text-center text-xl font-semibold text-gray-700">Your cart is empty.</h2>
      ) : (
        <>
          <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">Your Cart</h2>
          <div className="space-y-6">
            {cartItemsWithDetails.map((item) => (
              <div key={item._id} className="flex items-center space-x-6 p-4 border rounded-lg shadow-md">
                <img
                  src={item.productDetails.image[0]} // Use the image from local product data
                  alt={item.productDetails.name}
                  className="w-32 h-32 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-medium text-gray-900">{item.productDetails.name}</h3>
                  <p className="text-gray-600">Size: {item.size}</p>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                  <p className="text-gray-900 font-semibold">
                    Price: ${item.productDetails.price * item.quantity} {item.productDetails.currency}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-6">
            <button
              onClick={handlePlaceOrder}
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
