import React, { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import Axios from "axios";
import Nav from "../Nav1/Nav";
import Product from "../Product/Product";
import { useLocation } from 'react-router-dom';

function Home() {
  const greetingRef = useRef(null);
  const [productsData, setProductsData] = useState([]);
  const location = useLocation();
  const username = location.state?.username || '';

  useEffect(() => {
    const options = {
      strings: [`Welcome${username ? `, ${username}!` : '!'}`],
      typeSpeed: 50,
      showCursor: true,
      cursorChar: "|",
    };

    const typed = new Typed(greetingRef.current, options);

    Axios.get("http://192.168.137.1:8080/products")
      .then((res) => {
        setProductsData(res.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });

    return () => {
      typed.destroy();
    };
  }, [username]);

  return (
    <div>
      <Nav />
      <div
        ref={greetingRef}
        style={{
          textAlign: "center",
          padding: "20px",
          fontSize: "28px",
          color: "#333",
          fontWeight: "bold",
        }}
      ></div>
      <div className="product-list">
        {productsData.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Home;
