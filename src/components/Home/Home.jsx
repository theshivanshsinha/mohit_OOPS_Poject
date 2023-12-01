import React, { useEffect, useRef } from "react";
import Typed from "typed.js"; 
import Product from "../Product/Product";
import Axios from "axios";
import Nav from "../Nav1/Nav";
function Home() {
    const greetingRef = useRef(null);

    useEffect(() => {
        const username = getUsernameFromURL();

        const options = {
            strings: [`Welcome${username ? `, ${username}!` : '!'}`],
            typeSpeed: 50, 
            showCursor: true,
            cursorChar: "|", 
        };

        const typed = new Typed(greetingRef.current, options);

        
        return () => {
            typed.destroy();
        };
    }, []);

    function getUsernameFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get("username");
    }

    Axios.get("/products/search").then((res)=>{console.log(res.data)});
    return (
        <div>
            <Nav />
            <div ref={greetingRef} style={{ textAlign: "center", padding: "20px", fontSize: "28px", color: "#333", fontWeight: "bold" }}></div>
            <Product />
        </div>
    );
}

export default Home;
