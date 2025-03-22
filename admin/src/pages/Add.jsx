import React, { useState } from 'react';
import { backendUrl } from '../App.jsx';
import axios from 'axios';

const Add = () => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    subCategory: '',
    sizes: [],
    bestseller: false,
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + productData.images.length <= 4) {
      setProductData((prevData) => ({
        ...prevData,
        images: [...prevData.images, ...files],
      }));
    } else {
      alert('You can only upload a maximum of 4 images.');
    }
  };
  

  const handleSizesChange = (e) => {
    const selectedSizes = Array.from(e.target.selectedOptions, option => option.value);
    setProductData((prevData) => ({
      ...prevData,
      sizes: selectedSizes,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation for required fields
    const { name, description, price, category, subCategory, sizes } = productData;
    if (!name || !description || !price || !category || !subCategory || sizes.length === 0) {
      alert('Please fill out all required fields.');
      return;
    }

    // Create FormData object
    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('description', productData.description);
    formData.append('price', productData.price);
    formData.append('category', productData.category);
    formData.append('subCategory', productData.subCategory);
    formData.append('bestseller', productData.bestseller);
    formData.append('sizes', JSON.stringify(productData.sizes)); // Convert the array to a JSON string
    formData.append('date', Date.now());

    // Append images to FormData
    productData.images.forEach((image, index) => {
        formData.append(`image${index + 1}`, image);
      });

    try {
      // Send data to API using axios
      const response = await axios.post(backendUrl + `/api/product/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Ensures the request is sent as FormData
        },
      });

      console.log('Product added successfully:', response.data);
      // Reset form after submission (optional)
      setProductData({
        name: '',
        description: '',
        price: '',
        category: '',
        subCategory: '',
        sizes: [],
        bestseller: false,
        images: [],
      });
    } catch (error) {
      console.error('Error adding product:', error);
      alert('There was an error while adding the product.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Product Name</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Category</label>
          <input
            type="text"
            name="category"
            value={productData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Sub-Category</label>
          <input
            type="text"
            name="subCategory"
            value={productData.subCategory}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Sizes (Select Multiple)</label>
          <select
            name="sizes"
            multiple
            value={productData.sizes}
            onChange={handleSizesChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700">Bestseller</label>
          <input
            type="checkbox"
            name="bestseller"
            checked={productData.bestseller}
            onChange={() => setProductData((prevData) => ({
              ...prevData,
              bestseller: !prevData.bestseller,
            }))}
            className="mr-2"
          />
          <span>Bestseller</span>
        </div>

        <div>
          <label className="block text-gray-700">Images</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            multiple
            className="w-full p-2 border rounded"
          />
          <div className="mt-2">
            {productData.images.length > 0 && (
              <div>
                <h3 className="text-sm">Selected Images:</h3>
                <ul>
                  {productData.images.map((img, index) => (
                    <li key={index}>{img.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Product</button>
      </form>
    </div>
  );
};

export default Add;
