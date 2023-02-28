'use client'

import { useForm } from "react-hook-form";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs"
import { useState } from "react"
import settings from "../settings";
import { useRouter } from "next/navigation";
import axios from "axios";

function AddProduct() {
    const [show, setShow] = useState(true)
    const router = useRouter()

    const onSubmitProduct = async (data) => {
        const { title, price, category, image } = data
        const formData = new FormData();
        formData.append('title', title);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('image', image[0]);
        try {
            const res = await axios.post(`${settings.endpointUrl}/add-product`, formData)
            router.push('/products')
        } catch (error) {
            console.error(error);
        }
    }
    const schema = yup.object().shape({
        title: yup.string().required(),
        price: yup.number().required(),
        category: yup.string().required(),
        image: yup.mixed().required()
    })
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    return (
        <div className="container mt-4">
            <div className="alert alert-primary d-flex justify-content-between" role="alert">
                <div>
                    <h5>All Products:</h5>
                </div>
                <button className="btn btn-info" onClick={() => setShow(!show)}>
                    {show ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
                </button>
            </div>
            {show && <form className="p-3" onSubmit={handleSubmit(onSubmitProduct)} encType="multipart/form-data">
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingInput" placeholder="..." {...register('title')} />
                    <label htmlFor="floatingInput">title</label>
                </div>
                {errors.title && <span className="text-danger">This field is required</span>}
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingInput" placeholder="..." {...register('category')} />
                    <label htmlFor="floatingInput">category</label>
                </div>
                {errors.category && <span className="text-danger">This field is required</span>}
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingInput" placeholder="..." {...register('price')} />
                    <label htmlFor="floatingInput">price</label>
                </div>
                {errors.price && <span className="text-danger">This field is required</span>}
                <div className="mb-3">
                    <label htmlFor="formFile" className="form-label">image</label>
                    <input className="form-control" type="file" id="formFile" {...register('image')} accept="image/*" name="image" />
                </div>
                {errors.image && <span className="text-danger">This field is required</span>}
                <input type="submit" className="btn btn-success mt-3" value="Add Product" />
            </form>}
        </div>
    )
}
export default AddProduct
