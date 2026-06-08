import React, { useEffect, useState } from 'react'
// import AdminSidebar from '../../../components/Admin/AdminSidebar'
import { Link } from 'react-router-dom'


export default function AdminMaincategoryPage() {
    let [MaincategoryStateData, setMaincategoryStateData] = useState([])

    async function deleteRecord(id) {
        if (window.confirm("Are You Sure To Delete This Record:")) {
            let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/maincategory/${id}`, {
                method: "DELETE",
                headers: {
                    "content-type": "application/json"
                }
            })
            response = await response.json()
            // FRONTEND SE DELETE KRNE KE LIYE
            setMaincategoryStateData(MaincategoryStateData.filter(x => x.id !== id))
        }
    }
    useEffect(() => {
        (async () => {
            let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/maincategory`, {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                }
            })
            response = await response.json()
            setMaincategoryStateData(response)
        })()

    }, [])
    return (
        <>
            <div className="container my-3 ">
                <div className="row">

                  

                    <div className=" col-12">
                        <h5 className='bg-primary text-center p-2 text-light mt-5'>Maincategory <Link to="/admin/maincategory/create"><i className='bi bi-plus text-light float-end'></i></Link></h5>
                        <div className="row mt-5">
                            {MaincategoryStateData.map((item) => (
                                <div className="col-md-3 mb-3" key={item.id}>
                                    <div className="card h-100">
                                        <Link
                                            to={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.pic}`}
                                            target="_blank"
                                        >
                                            <img
                                                src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.pic}`}
                                                className="card-img-top"
                                                style={{ height: "150px", objectFit: "cover" }}
                                                alt=""
                                            />
                                        </Link>

                                        <div className="card-body">
                                            <h5 className="card-title" style={{ height: 30 }}>{item.name}</h5>
                                        </div>
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item">  Id : {item.id}</li>
                                            <li className="list-group-item">  Status : {item.status ? "Active" : "Inactive"}</li>
                                            <li className="list-group-item d-flex justify-content-between">
                                                <span> <Link to={`/admin/maincategory/update/${item.id}`} className='btn btn-primary'>
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
