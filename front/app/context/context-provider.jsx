'use client'

import { createContext } from "react"

export const ProductContext = createContext()
function ProductProvider({ children }) {

    return (
        <ProductContext.Provider value={{ products, setProducts, getProducts }}>
            {children}
        </ProductContext.Provider>
    )
}
export default ProductProvider
