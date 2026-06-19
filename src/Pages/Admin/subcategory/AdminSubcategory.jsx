import React, { useEffect, useState } from 'react'
// import AdminSidebar from '../../../components/Admin/AdminSidebar'
import { Link } from 'react-router-dom'
import { deleteSubcategory, getSubcategory } from "../../../Redux/ActionCreators/SubcategoryActionCreators"
import { useDispatch, useSelector } from 'react-redux'


export default function AdminSubcategoryPage() {
    let [data, setData] = useState([])
    let SubcategoryStateData = useSelector(state => state.SubcategoryStateData)
    let dispatch = useDispatch()

    function deleteRecord(id) {
        if (window.confirm("Are You Sure To Delete This Record:")) {
            dispatch(deleteSubcategory({id:id}))
            setData(data.filter(x=>x.id!==id))
        }
    }
    useEffect(() => {
        (async () => {
            dispatch(getSubcategory())
            if (SubcategoryStateData.length) {
                setData(SubcategoryStateData)
            }
        })()

    }, [SubcategoryStateData.length])
    return (
        <>
            <div className="container my-3 ">
                <div className="row">



                    <div className=" col-12">
                        <h5 className='bg-primary text-center p-2 text-light mt-5'>Subcategory <Link to="/admin/subcategory/create"><i className='bi bi-plus text-light float-end'></i></Link></h5>
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
                                                <span> <Link to={`/admin/subcategory/update/${item.id}`} className='btn btn-primary'>
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
