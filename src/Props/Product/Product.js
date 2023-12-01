import React from "react";

function Product({ products }) {
  return (
    <main>
      <div className="product-container trending-products">
        <h2>Trending Products</h2>
        {products.trending.map((product, index) => (
          <div className="product-box" key={`trending-${index}`}>
            <img className="product-image" src={product.image} alt={product.title} />
            <div className="product-title">{product.title}</div>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
          </div>
        ))}
      </div>

      <div className="product-container new-arrivals">
        <h2>New Arrivals</h2>
        {products.newArrivals.map((product, index) => (
          <div className="product-box" key={`new-arrivals-${index}`}>
            <img className="product-image" src={product.image} alt={product.title} />
            <div className="product-title">{product.title}</div>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Product;
