import React, { useEffect } from 'react'
import { getMaincategory } from "../Redux/ActionCreators/MaincategoryActionCreators"
import { getProduct } from "../Redux/ActionCreators/ProductActionCreators"
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { Link } from 'react-router-dom'


export default function ProductPage() {
    let [data, setData] = useState([])
    let [selected, setSelected] = useState("")

    let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
    let ProductStateData = useSelector(state => state.ProductStateData)
    let dispatch = useDispatch()


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
            <h4 className='border  border-primary bg-primary rounded w-100  text-center text-light p-2'>All Products</h4>
            <div className="container">
                <div className="mb-3">
                    <div className=" m-auto">
                        <div className="btn-group w-100">

                            <button onClick={() => setSelected("")} className={`btn ${selected === "" ? ' btn-danger p-1' : ''} p-1`}
                                style={{ width: 150 }}>ALL</button>

                            {MaincategoryStateData.filter(x => x.status).map((item, index) => {
                                return <button key={index} onClick={() => { setSelected(item.name) }}
                                    className={`btn ${selected === item.name ? ' btn-danger p-1' : 'btn-light'} p-1`}
                                    style={{ width: 150 }}>{item.name}</button>
                            })}
                        </div>
                    </div>
                </div>
                <div className="row mt-3">

                    {data.filter(x => selected === "" || selected === x.maincategory).slice(0, 12).map((item => {
                        return <div key={item.id} className="col-lg-3 p-3">
                            <div className="card">
                                <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.pic[0]}`} className="card-img-top" height={200} alt="..." />
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
                    }))}
                </div>
            </div>
        </>
    )
}
