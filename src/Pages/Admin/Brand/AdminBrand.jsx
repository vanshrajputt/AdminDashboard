import React, { useEffect, useState } from 'react'
// import AdminSidebar from '../../../components/Admin/AdminSidebar'
import { Link } from 'react-router-dom'
import { deleteBrand, getBrand } from "../../../Redux/ActionCreators/BrandActionCreators"
import { useDispatch, useSelector } from 'react-redux'


export default function AdminBrandPage() {
    let [data, setData] = useState([])
    let BrandStateData = useSelector(state => state.BrandStateData)
    let dispatch = useDispatch()

    function deleteRecord(id) {
        if (window.confirm("Are You Sure To Delete This Record:")) {
            dispatch(deleteBrand({ id: id }))
            setData(data.filter(x => x.id !== id))
        }
    }
    useEffect(() => {
        (async () => {
            dispatch(getBrand())
            if (BrandStateData.length) {
                setData(BrandStateData)
            }
        })()

    }, [BrandStateData.length])
    return (
        <>
            <div className="container my-3 ">
                <div className="row">



                    <div className=" col-12">
                        <Link to='/admin/brand/create'>
                         <h5 className='bg-primary text-center p-2 text-light mt-5'>Brand <Link to="/admin/brand/create"><i className='bi bi-plus text-light float-end'></i></Link></h5>
                        </Link>
                        <div className="row mt-5">
                            {data.map((item) => (
                                <div className="col-md-2 mb-3" key={item.id}>
                                    <div className="card h-60">
                                        <Link
                                            to={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.pic}`}
                                            target="_blank"
                                        >
                                            <img
                                                src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.pic}`}
                                                className="card-img-top"
                                                style={{ height: "100px", objectFit: "cover" }}
                                                alt=""
                                            />
                                        </Link>

                                        <div className="card-body">
                                            <h5 className="card-title" style={{ height: 15 }}>{item.name}</h5>
                                        </div>
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item">  Id : {item.id}</li>
                                            <li className="list-group-item">  Status : {item.status ? "Active" : "Inactive"}</li>
                                            <li className="list-group-item d-flex justify-content-between">
                                                <span> <Link to={`/admin/brand/update/${item.id}`} className='btn btn-primary'>
                                                    <i className='bi bi-pencil'></i>
                                                </Link></span>
                                                <span><button className='btn btn-danger' onClick={() => deleteRecord(item.id)}><i className='bi bi-trash'></i></button></span>
                                            </li>

                                        </ul>






                                    </div>
                                </div>
                            ))
                            }

                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}
