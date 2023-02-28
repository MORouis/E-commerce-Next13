import axios from "axios"
import { BsFillTrashFill } from "react-icons/bs"
import settings from "../settings"

function DeleteProduct({ product, setProducts, getProducts }) {
    const onDeleteProduct = async (_id) => {
        try {
            const res = await axios.delete(`${settings.endpointUrl}/product/${_id}`)
            setProducts(Array.isArray(product) ? product?.filter((p) => p._id !== _id) : [])
            getProducts()
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <span className="btn btn-danger">
            <BsFillTrashFill onClick={() => onDeleteProduct(product?._id)} />
        </span>
    )
}

export default DeleteProduct
