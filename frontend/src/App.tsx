import React, { useEffect, useState } from 'react';
import './App.css';

type ProductType = "gloves" | "beanies" | "facemasks";

interface Product {
  "id": string;
  "type": ProductType;
  "name": string;
  "color": [];
  "price": number;
  "manufacturer": "hennex" | "ippal" | "juuran" | "niksleh" | "abiplos" | "umpante";
}

function App() {
  const [products, setProducts] = useState<{
    "gloves"?: Product[];
    "beanies"?: Product[];
    "facemasks"?: Product[];
  }>({});
  const [selectedProductList, setSelectedProductList] = useState<ProductType>("gloves");

  const fetchProducts = async (type: ProductType) => {
    const productsRes = await fetch(`https://localhost:3001/products/${type}`);
    const productsJson: Product[] = await productsRes.json();

    setProducts((prevState) => ({
      ...prevState,
      [type]: productsJson
    }));
  }

  const handleProductLinkClick = (type: ProductType) => {
    if (!products[type]) {
      fetchProducts(type);
    }
    setSelectedProductList(type);
  }

  useEffect(() => {
    fetchProducts("gloves");
  }, []);

  return (
    <div className="App">
      <div className="content">
        <div>
          <div onClick={() => handleProductLinkClick("gloves")} className={`product-link${selectedProductList === "gloves" ? " selected-product-list" : ""}`}>
            {'Gloves'}
          </div>
          <div onClick={() => handleProductLinkClick("beanies")} className={`product-link${selectedProductList === "beanies" ? " selected-product-list" : ""}`}>
            {'Beanies'}
          </div>
          <div onClick={() => handleProductLinkClick("facemasks")} className={`product-link${selectedProductList === "facemasks" ? " selected-product-list" : ""}`}>
            {'Face masks'}
          </div>
        </div>
        <div>
          {selectedProductList === "gloves" && <>
            {products.gloves ? products.gloves.map((glove: Product) => {
              return glove;
            }) : 'Loading...'}
          </>}
          {selectedProductList === "beanies" && <>
            {products.beanies ? products.beanies.map((beanie: Product) => {
              return beanie;
            }) : 'Loading...'}
          </>}
          {selectedProductList === "facemasks" && <>
            {products.facemasks ? products.facemasks.map((facemask: Product) => {
              return facemask;
            }) : 'Loading...'}
          </>}
        </div>
      </div>
    </div>
  );
}

export default App;
