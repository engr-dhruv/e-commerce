import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl } from '../App.jsx';

const List = () => {
  const [products, setProducts] = useState([]);  // Store products
  const [loading, setLoading] = useState(true);  // Track loading state
  const [error, setError] = useState(null);  // Track error state

  // Fetch products on component mount
  useEffect(() => {
    // Define function to fetch products
    const fetchProducts = async () => {
      try {
        const response = await axios.post(backendUrl+'/api/product/list');
        if (response.data.success) {
          setProducts(response.data.products); // Update state with fetched products
        } else {
          setError('Failed to fetch products');
        }
      } catch (error) {
        setError('Error fetching products');
      } finally {
        setLoading(false);  // Stop loading after the request completes
      }
    };

    fetchProducts();
  }, []);  // Empty dependency array ensures it runs once on mount

  // Show loading state while fetching data
  if (loading) return <div>Loading products...</div>;

  // Show error if there was an issue
  if (error) return <div>{error}</div>;

  // Render products
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">All Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product._id} className="border p-4 rounded-lg shadow-lg">
            <img src={product.image[0]} alt={product.name} className="w-full h-48 object-cover mb-4" />
            <h3 className="text-xl font-bold">{product.name}</h3>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-lg font-semibold">${product.price}</p>
            <p className="text-sm text-gray-500">Category: {product.category}</p>
            <p className="text-sm text-gray-500">Sub-category: {product.subCategory}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
