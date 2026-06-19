import React, { useEffect, useState } from 'react'
// import AdminSidebar from '../../../components/Admin/AdminSidebar'
import { Link } from 'react-router-dom'
import { deleteProduct, getProduct } from "../../../Redux/ActionCreators/ProductActionCreators"
import { useDispatch, useSelector } from 'react-redux'
import DataTable from 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';


export default function AdminProductPage() {
    let [data, setData] = useState([])
    let ProductStateData = useSelector(state => state.ProductStateData)
    let dispatch = useDispatch()

    function deleteRecord(id) {
        if (window.confirm("Are You Sure To Delete This Record:")) {
            dispatch(deleteProduct({ id: id }))
            setData(data.filter(x => x.id !== id))
        }
    }
    useEffect(() => {
        let time = (() => {
            dispatch(getProduct())
            if (ProductStateData.length) {
                setData(ProductStateData)
            }

            let time = setTimeout(() => {
                new DataTable('#myTable');
            }, 500)
            return time
        })()
        return () => clearTimeout(time)

    }, [ProductStateData.length])
    return (
        <>
            <div className="container my-3 ">
                <div className="row">

                    <div className=" col-12">

                        <h5 className='bg-danger text-center p-2 text-light mt-5'>Product <Link to="/admin/product/create"><i className='bi bi-plus text-light float-end'></i></Link></h5>
                        <div className="table-responsive">
                            <table className=' table table-bordered' id='myTable'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Maincategory</th>
                                        <th>Subcategory</th>
                                        <th>Brand</th>
                                        <th>Color</th>
                                        <th>Size</th>
                                        <th>Base Price</th>
                                        <th>Discount</th>
                                        <th>Final Price</th>
                                        <th>Stock</th>
                                        <th>Stock Quantity</th>
                                        <th>Pic</th>
                                        <th>Status</th>
                                        <th></th>
                                        <th></th>


                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item) => {
                                       
                                        return <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.maincategory}</td>
                                            <td>{item.subcategory}</td>
                                            <td>{item.brand}</td>
                                            <td>{item.color?.join()}</td>
                                            <td>{item.size?.join()}</td>
                                            <td>&#8377;{item.basePrice}</td>
                                            <td>{item.discount}%OFF</td>
                                            <td>&#8377;{item.finalPrice}</td>
                                            <td>{item.stock ? "In Stock" : 'Out Of Stock'}</td>
                                            <td>{item.stockQuantity}</td>

                                            <td >
                                                <div style={{ width: 400 }}>
                                                    {Array.isArray(item.pic) ? (
                                                        item.pic.map((p, index) => (
                                                            <img
                                                                key={index}
                                                                src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${p}`}
                                                                className="m-1"
                                                                height={60}
                                                                width={80}
                                                                alt=""
                                                            />
                                                        ))
                                                    ) : item.pic ? (
                                                        <img
                                                            src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.pic}`}
                                                            className="m-1"
                                                            height={60}
                                                            width={80}
                                                            alt=""
                                                        />
                                                    ) : null}
                                                </div>
                                            </td>
                                            <td>{item.status ? "Active" : "Inactive"}</td>
                                            <td><Link to={`/admin/product/update/${item.id}`} className='btn btn-primary'><i className='bi bi-pencil'></i></Link></td>
                                            <td>
                                                {localStorage.getItem("role") === "Super Admin" ?
                                                    <button className='btn btn-danger' onClick={() => deleteRecord(item.id)}><i className='bi bi-trash'></i></button> : null
                                                }
                                            </td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}





