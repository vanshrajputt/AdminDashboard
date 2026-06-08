import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
    // const [mainCategoryCount, setMainCategoryCount] = useState(0);



    // async function getData() {
    //     let response = await fetch(
    //         `${import.meta.env.VITE_APP_BACKEND_SERVER}/maincategory`
    //     );
    //     response = await response.json();
    //     setMainCategoryCount(response.length);
    // }

    // useEffect(() => {
    //     getData();
    // }, []);
    // const [productCount, setProductCount] = useState(0);


    // async function getProductData() {
    //     let response = await fetch(
    //         `${import.meta.env.VITE_APP_BACKEND_SERVER}/product`
    //     );
    //     response = await response.json();
    //     setProductCount(response.length);
    // }

    // useEffect(() => {
    //     getProductData();
    // }, []);
   
   
    let [mainCategoryCount, setMainCategoryCount] = useState(0);
    let [productCount, setProductCount] = useState(0);

    useEffect(() => {
        async function getData() {
            let mainCategoryResponse = await fetch(
                `${import.meta.env.VITE_APP_BACKEND_SERVER}/maincategory`
            );

            let productResponse = await fetch(
                `${import.meta.env.VITE_APP_BACKEND_SERVER}/product`
            );

            mainCategoryResponse = await mainCategoryResponse.json();
            productResponse = await productResponse.json();

            setMainCategoryCount(mainCategoryResponse.length);
            setProductCount(productResponse.length);
        }

        getData();
    }, []);
    return (
        <div className="container-fluid dashboard-container">

            {/* Welcome Banner */}
            <div className="dashboard-banner mt-5">
                <div>
                    <h1>Welcome Back Admin 👋</h1>
                    <p>
                        Manage Categories, Products, Brands and Orders from one dashboard.
                    </p>
                </div>

                <div>
                    <button className="btn btn-light">
                        View Reports
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="row g-4 mt-2">

                <div className="col-md-6 col-lg-3">
                    <Link
                        to="/admin/product"
                        className="text-decoration-none text-dark"
                    >
                        <div className="stats-card">
                            <div>
                                <p>Total Products</p>
                                <h2> {productCount} </h2>
                            </div>

                            <div className="icon-circle">
                                📦
                            </div>
                        </div>
                    </Link>
                </div>

                <div className="col-md-6 col-lg-3">
                    <Link
                        to="/admin/maincategory"
                        className="text-decoration-none text-dark"
                    >
                        <div className="stats-card">
                            <div>
                                <p>Main Categories</p>
                                <h2>{mainCategoryCount}</h2>
                            </div>

                            <div className="icon-circle">
                                🗂️
                            </div>
                        </div>
                    </Link>
                </div>

                <div className="col-md-6 col-lg-3">
                    <div className="stats-card">
                        <div>
                            <p>Total Brands</p>
                            <h2>15</h2>
                        </div>

                        <div className="icon-circle">
                            🏷️
                        </div>
                    </div>
                </div>

                <div className="col-md-6 col-lg-3">
                    <div className="stats-card">
                        <div>
                            <p>Total Orders</p>
                            <h2>120</h2>
                        </div>

                        <div className="icon-circle">
                            🛒
                        </div>
                    </div>
                </div>

            </div>

            {/* Quick Actions + Overview */}
            <div className="row mt-5">

                <div className="col-lg-4 mb-4">
                    <div className="card border-0 shadow-lg h-100">
                        <div className="card-body">
                            <h4>Quick Actions</h4>

                            <div className="d-grid gap-3 mt-4">

                                <Link
                                    to="/admin/maincategory/create"
                                    className="btn btn-success"
                                >
                                    Add Main Category
                                </Link>

                                <Link
                                    to="/admin/product/create"
                                    className="btn btn-primary"
                                >
                                    Add Product
                                </Link>

                                <Link
                                    to="/admin/brand/create"
                                    className="btn btn-warning"
                                >
                                    Add Brand
                                </Link>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-8 mb-4">
                    <div className="card border-0 shadow-lg h-100">
                        <div className="card-body">
                            <h4>Store Overview</h4>

                            <div className="row text-center mt-4">
                                <div className="col-4">
                                    <h2>₹1.25L</h2>
                                    <p>Revenue</p>
                                </div>

                                <div className="col-4">
                                    <h2>450</h2>
                                    <p>Users</p>
                                </div>

                                <div className="col-4">
                                    <h2>120</h2>
                                    <p>Orders</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Latest Products */}
            <div className="card border-0 shadow-lg mt-4">
                <div className="card-header bg-white">
                    <h4 className="mb-0">Latest Products</h4>
                </div>

                <div className="card-body">
                    <div className="row">

                        <div className="col-md-3 mb-4">
                            <div className="product-card">
                                <img
                                    src="https://via.placeholder.com/300"
                                    alt=""
                                />

                                <h5 className="mt-3">
                                    iPhone 15
                                </h5>

                                <p>₹79,999</p>
                            </div>
                        </div>

                        <div className="col-md-3 mb-4">
                            <div className="product-card">
                                <img
                                    src="https://via.placeholder.com/300"
                                    alt=""
                                />

                                <h5 className="mt-3">
                                    Nike Air Max
                                </h5>

                                <p>₹8,999</p>
                            </div>
                        </div>

                        <div className="col-md-3 mb-4">
                            <div className="product-card">
                                <img
                                    src="https://via.placeholder.com/300"
                                    alt=""
                                />

                                <h5 className="mt-3">
                                    Samsung S24
                                </h5>

                                <p>₹69,999</p>
                            </div>
                        </div>

                        <div className="col-md-3 mb-4">
                            <div className="product-card">
                                <img
                                    src="https://via.placeholder.com/300"
                                    alt=""
                                />

                                <h5 className="mt-3">
                                    Smart Watch
                                </h5>

                                <p>₹4,999</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
}