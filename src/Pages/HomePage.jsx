import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getMaincategory } from "../../src/Redux/ActionCreators/MaincategoryActionCreators";
import { getSubcategory } from "../../src/Redux/ActionCreators/SubcategoryActionCreators";
import { getBrand } from "../../src/Redux/ActionCreators/BrandActionCreators";
import { getProduct } from "../../src/Redux/ActionCreators/ProductActionCreators";
import ProductPage from "./ProductPage";
import ProductSlider from "../components/ProductSlider";


export default function HomePage() {
    let [data, setData] = useState([])
    let [selected, setSelected] = useState("")
    let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
    let BrandStateData = useSelector((state) => state.BrandStateData);
    let SubcategoryStateData = useSelector((state) => state.SubcategoryStateData);
    let ProductStateData = useSelector(state => state.ProductStateData)

    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(getMaincategory());
        dispatch(getSubcategory());
        dispatch(getBrand());
        dispatch(getProduct());
    }, []);

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
        <div className="container-fluid py-4">

            {/* Hero Section */}
            <div className="dashboard-banner mb-4 mt-5">
                <div>
                    <h2>Welcome Back Admin 👋</h2>
                    <p className="mb-0">
                        Manage products, categories, brands and orders efficiently.
                    </p>
                </div>

                <Link to="/shop" className="btn btn-light fw-bold">
                    Visit Store
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="row g-4">

                <div className="col-md-6 col-lg-3">
                    <Link to='/admin/product/create' className="text-decoration-none text-dark">
                        <div className="stats-card">
                            <div>
                                <h6>Total Products</h6>
                                <h2>{ProductStateData.length}</h2>

                            </div>

                            <div className="stats-icon">
                                📦
                            </div>
                        </div>
                    </Link>
                </div>

                <div className="col-md-6 col-lg-3">
                    <Link
                        to="/admin/maincategory" className="text-decoration-none text-dark">
                        <div className="stats-card">
                            <div>
                                <h6>Main Categories</h6>
                                <h2>{MaincategoryStateData.length}</h2>
                            </div>

                            <div className="stats-icon">
                                🗂️
                            </div>
                        </div>
                    </Link>
                </div>


                <div className="col-md-6 col-lg-3">
                    <Link
                        to="/admin/subcategory" className="text-decoration-none text-dark">
                        <div className="stats-card">
                            <div>
                                <h6>Sub Categories</h6>
                                <h2>{SubcategoryStateData.length}</h2>
                            </div>

                            <div className="stats-icon">
                                🗂️
                            </div>
                        </div>
                    </Link>
                </div>

                <div className="col-md-6 col-lg-3">
                    <Link
                        to="/admin/brand" className="text-decoration-none text-dark">
                        <div className="stats-card">
                            <div>
                                <h6>Brand</h6>
                                <h2>{BrandStateData.length}</h2>
                            </div>

                            <div className="stats-icon">
                                🗂️
                            </div>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Quick Actions */}
            < div className="row mt-4" >

                <div className="col-lg-4 mb-4">
                    <div className="card dashboard-card h-100">
                        <div className="card-body">
                            <h4>Quick Actions</h4>

                            <div className="d-grid gap-3 mt-4">

                                <Link
                                    to="/admin/maincategory/create"
                                    className="btn btn-primary"
                                >
                                    Add Main Category
                                </Link>

                                <Link
                                    to="/admin/subcategory/create"
                                    className="btn btn-success"
                                >
                                    Add Sub Category
                                </Link>

                                <Link
                                    to="/admin/brand/create"
                                    className="btn btn-warning"
                                >
                                    Add Brand
                                </Link>

                                <Link
                                    to="/admin/product/create"
                                    className="btn btn-dark"
                                >
                                    Add Product
                                </Link>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-8 mb-4">
                    <div className="card dashboard-card h-100">
                        <div className="card-body">

                            <h4>Store Overview</h4>

                            <div className="row text-center mt-4">

                                <div className="col-md-4">
                                    <h2 className="text-primary">₹1.25L</h2>
                                    <p>Revenue</p>
                                </div>

                                <div className="col-md-4">
                                    <h2 className="text-success">450</h2>
                                    <p>Customers</p>
                                </div>

                                <div className="col-md-4">
                                    <h2 className="text-danger">120</h2>
                                    <p>Orders</p>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>

            </div >


               <ProductPage />
            <ProductSlider />
         
            {/* Recent Orders */}
            < div className="card dashboard-card mb-4" >
                <div className="card-header bg-white">
                    <h4 className="mb-0">Recent Orders</h4>
                </div>

                <div className="card-body">

                    <table className="table table-hover">

                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Status</th>
                                <th>Amount</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>#1001</td>
                                <td>Rahul</td>
                                <td>
                                    <span className="badge bg-success">
                                        Delivered
                                    </span>
                                </td>
                                <td>₹2500</td>
                            </tr>

                            <tr>
                                <td>#1002</td>
                                <td>Amit</td>
                                <td>
                                    <span className="badge bg-warning">
                                        Pending
                                    </span>
                                </td>
                                <td>₹1800</td>
                            </tr>

                            <tr>
                                <td>#1003</td>
                                <td>Rohit</td>
                                <td>
                                    <span className="badge bg-primary">
                                        Shipped
                                    </span>
                                </td>
                                <td>₹3200</td>
                            </tr>
                        </tbody>

                    </table>

                </div>
            </div >

        </div >
    );
}