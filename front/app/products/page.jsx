'use client'

import { useEffect, useState } from "react";
import axios from "axios"
import settings from "../settings";
import DeleteProduct from "../delete-product/page";
import { BsFillCartPlusFill, BsFillPencilFill } from "react-icons/bs"
import Link from "next/link";
import Image from 'next/image'

function Products() {

    const [products, setProducts] = useState([])

    const getProducts = async () => {
        try {
            const res = await axios.get(`${settings.endpointUrl}/products`);
            setProducts(res.data)
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getProducts()
    }, [])

    return (
        <div>
            <div className="container mt-4">
                <div className="row justify-content-end">
                    <div className="col-1">
                        <Link href={'/add-product'} className="btn btn-dark">
                            <BsFillCartPlusFill />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="container p-5">
                <table className="table table-info table-bordered table-hover">
                    <thead>
                        <tr className="table-active">
                            <th scope="col">title</th>
                            <th scope="col">price</th>
                            <th scope="col">category</th>
                            <th scope="col">image</th>
                            <th scope="col">action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products?.map((product) => {
                                return (
                                    <tr key={product._id}>
                                        <td>{product.title}</td>
                                        <td>{product.price} DT</td>
                                        <td>{product.category}</td>
                                        <td><Image src={`${settings.endpointUrl}/uploads/${product.image}`} alt={product.title} width={50} height={50} decoding="async" loading="lazy" /></td>
                                        <td>
                                            <DeleteProduct product={product} setProducts={setProducts} getProducts={getProducts} />
                                            <Link href={`/edit-product/${product._id}`} className="btn btn-success ms-5" >
                                                <BsFillPencilFill />
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>

    )
}
export default Products
