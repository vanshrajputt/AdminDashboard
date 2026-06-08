import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function NavbarPage() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow">
            <div className="container-fluid">

                <NavLink className="navbar-brand fw-bold" to="/">
                    Admin Dashboard
                </NavLink>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav mx-auto">

                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Dashboard
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                to="/admin/maincategory"
                            >
                                Main Category
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                to="/admin/subcategory"
                            >
                                Sub Category
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/admin/brand">
                                Brands
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/admin/product">
                                Products
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/admin/orders">
                                Orders
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/admin">
                               Admin
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/admin/reports">
                                Reports
                            </Link>
                        </li>
                    </ul>

                    <form className="d-flex">
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search Product"
                        />
                        <button
                            className="btn btn-outline-light"
                            type="submit"
                        >
                            Search
                        </button>
                    </form>
                </div>
            </div>
        </nav>
    )
}