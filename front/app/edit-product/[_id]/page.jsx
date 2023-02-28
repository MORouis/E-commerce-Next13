"use client"

import { useForm } from "react-hook-form";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import axios from "axios";
import settings from "@/app/settings";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from 'next/image'
import { BsFillPencilFill } from "react-icons/bs";
//import '../style.scss';

function EditProduct({ params }) {
    const { _id } = params
    const router = useRouter()
    const [selectedImg, setSelectedImg] = useState(null)

    const onEditProduct = async (data) => {
        try {
            const res = await axios.put(`${settings.endpointUrl}/product/${_id}`, data)
            router.push('/products')
        } catch (error) {
            console.error(error)
        }
    }
    const schema = yup.object().shape({
        title: yup.string().required(),
        price: yup.number().required(),
        category: yup.string().required(),
        image: yup.mixed().required(),
    })
    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm({
        resolver: yupResolver(schema),
    })

    useEffect(() => {
        if (_id) {
            const getSingleProduct = async () => {
                try {
                    const res = await axios.get(`${settings.endpointUrl}/product/${_id}`)
                    reset(res.data)
                } catch (error) {
                    console.error(error);
                }
            }
            getSingleProduct()
        }
    }, [_id])

    const image = watch('image')
    
    const onImageSelect = (e) => {
        setSelectedImg(e.target.files[0])
    }
    const src = selectedImg && URL.createObjectURL(selectedImg)
    console.log(src, 'src');
    

    useEffect(() => {
        return () => src && URL.revokeObjectURL(src) //libére Url
    }, [src])

    return (
        <div className="container mt-4">
            <form className="p-3" onSubmit={handleSubmit(onEditProduct)}>
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
                <div className="card w-25 position-relative">
                    <Image src={`${settings.endpointUrl}/uploads/${image}`} className="img-fluid" alt="" width={100} height={100} {...register('image')} />
                    <label className="btn position-absolute top-0 end-0 badge rounded-pill bg-success" htmlFor="file-input">
                        <BsFillPencilFill />
                    </label>
                    <input type="file" id="file-input" className="d-none" onChange={onImageSelect} {...register('image')} />
                </div>

                <input type="submit" className="btn btn-success mt-3" value="Save" />
            </form>
        </div>
    )
}
export default EditProduct