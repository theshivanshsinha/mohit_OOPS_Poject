import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AddProduct.css';
import axios from 'axios';

const AddProduct = () => {
  const [product, setProduct] = useState({
    key: 'abc',
    productName: '',
    price: '',
    biddingEnds: '',
    description: '',
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setProduct({ ...product, [name]: files });
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create FormData object to handle file uploads
      const formData = new FormData();
      formData.append('image', product.images[0]); // Assuming only one image is selected

      // Make a POST request to upload the image
      const uploadResponse = await axios.post('/upload', formData);
      const imageUrl = uploadResponse.data.url; // Assuming the backend responds with the image URL

      // Update the product object with the image URL
      const updatedProduct = { ...product, images: [imageUrl] };

      // Make a POST request to add the product
      const response = await axios.post('/products', updatedProduct);
      console.log(response);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div>
      <header>
        <div className="logo-tagline">
          <h1>BITSBids</h1>
        </div>
        <span id="greeting"></span>
        <span className="tagline">...bid the BITS way</span>
      </header>
      <nav>
        <ul>
          <li>
            <Link to='/inventory'>Inventory</Link>
          </li>
          <li id='addproduct'>
            <Link to='/add-product'>Add Products</Link>
          </li>
          <li>
            <Link to='/message-bidder'>Message Bidder</Link>
          </li>
          <li>
            <Link to='/profile-sell'>Profile</Link>
          </li>
          <li>
            <Link to='/Home'>Back to Bidding</Link>
          </li>
        </ul>
      </nav>

      <div className='addbox'>
        {/* Form Section */}
        <div className='container'>
          <h2>Add Product</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor='productName'>Product Name</label>
            <input
              type='text'
              id='productName'
              name='productName'
              value={product.productName}
              onChange={handleChange}
              required
            />

            <label htmlFor='price'>Base Price</label>
            <input
              type='number'
              id='price'
              name='price'
              value={product.price}
              onChange={handleChange}
              required
            />

            <label htmlFor='biddingEnds'>Bidding Ends</label>
            <input
              type='datetime-local'
              id='biddingEnds'
              name='biddingEnds'
              value={product.biddingEnds}
              onChange={handleChange}
              required
            />

            <label htmlFor='description'>Description</label>
            <textarea
              id='description'
              name='description'
              value={product.description}
              onChange={handleChange}
              required
            ></textarea>

            <div className='file-input'>
              <label htmlFor='images'>Upload Images (JPEG, PNG, JPG)</label>
              <input
                type='file'
                id='images'
                name='images'
                accept='image/jpeg, image/png, image/jpg'
                onChange={handleFileChange}
                required
              />
            </div>

            <button type='submit'>Add Product</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
