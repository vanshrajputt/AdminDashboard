import React, { useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination , Autoplay} from 'swiper/modules';
import { getMaincategory } from "../Redux/ActionCreators/MaincategoryActionCreators"
import { getProduct } from "../Redux/ActionCreators/ProductActionCreators"
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { Link } from 'react-router-dom'


export default function ProductSlider() {
    let [data, setData] = useState([])
    let [selected, setSelected] = useState("")
    let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
    let ProductStateData = useSelector(state => state.ProductStateData)
    let dispatch = useDispatch()



    let options = {
        slidesPerView: 4,
        spaceBetween: 30,
        pagination: {
            clickable: true,
        },
         autoplay: {
        delay: 1000, // 1 second
        disableOnInteraction: false,
    },
        modules: [Pagination , Autoplay]

    }

    useEffect(() => {
        (() => {
            dispatch(getProduct())
            setData(ProductStateData.filter(x => x.status))
        })()
    }, [ProductStateData.length])


    useEffect(() => {
        (() =>
            dispatch(getMaincategory())
        )()
    }, [MaincategoryStateData.length])


    return (
        <>
            <h5 className='btn btn-danger text-center text-light w-100'> Products</h5>
            <Swiper {...options}>
                {data
                    .filter(x => selected === "" || selected === x.maincategory)
                    .slice(0, 12)
                    .map((item) => (
                        <SwiperSlide key={item.id}>
                            <div className="container">
                                <div className="row mt-3 mb-5">
                                    <div key={item.id} className="col-12 p-1">
                                        <div className="card">
                                            <img
                                                src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.pic[0]}`}
                                                className="card-img-top"
                                                style={{
                                                    height: "200px",
                                                    objectFit: "cover"
                                                }}
                                                alt={item.name}
                                            />
                                            <div className="card-body">
                                                <h5 className="card-title" style={{ height: 30 }}>{item.name}</h5>

                                            </div>
                                            <ul className="list-group list-group-flush">

                                                <li className="list-group-item">
                                                    <p className='fs-6'><del>&#8377;{item.basePrice}</del> &#8377;{item.finalPrice} <sup>{item.discount} %Off</sup></p>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between" style={{ height: 55 }}>
                                                    <span><i className="bi bi-tag-fill text-danger fs-5"></i> {item.brand} </span>
                                                    <span><i className='bi bi-cart-check-fill text-primary fs-5 me-2'></i>{item.stockQuantity} Left in Stock </span>
                                                </li>
                                            </ul>
                                            <div className="card-body">
                                                <Link to={`/product/${item.id}`} className='btn btn-primary w-100'>ADD TO CART</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                       
                        </SwiperSlide>
                    ))}
        </Swiper >

        </>
    )
}
