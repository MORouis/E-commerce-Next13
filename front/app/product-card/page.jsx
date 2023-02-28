"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import settings from "../settings"

function ProductCard() {
  const [products, setProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedPriceRange, setSelectedPriceRange] = useState(50)

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(`${settings.endpointUrl}/products`)
        setProducts(res.data)
      } catch (error) {
        console.error(error);
      }
    }
    getProducts()
  }, [])

  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === "" || product.category === selectedCategory) &&
      product.price === selectedPriceRange
  );
  return (
    <div>
      <div className="container mt-4">
        <div className="row justify-content-center">
          <label htmlFor="cat-select" className="form-label text-info text-center font-weight-bold">Choose By Category:</label>
          <select
            className="form-select m-2 w-25"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {
              Array.from(new Set(products?.map((product) => product.category)))
                ?.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))
            }
          </select>
        </div>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <label htmlFor="customRange1" className="form-label text-info text-center font-weight-bold mt-4">Price</label>
          <input type="range" className="form-range w-25" id="customRange1" min="0" max="100" step="10" onChange={(e) => setSelectedPriceRange(parseInt(e.target.value))} />
        </div>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          {
            filteredProducts?.map((product) => (
              <div className="card w-25 m-5 bg-info text-center" key={product._id}>
                <div className="card-body">
                  <h5 className="card-title text-danger">Title: {product.title}</h5>
                  <p className="card-text">Category: {product.category}</p>
                  <p className="card-text">Price: {product.price} DT</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
export default ProductCard 
