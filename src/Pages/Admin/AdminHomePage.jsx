import React from 'react'
import AdminSidebar from '../../components/Admin/AdminSidebar'


export default function AdminHomePage() {
    return (
        <>
            <div className="container my-3 mt-5">
                <div className="row">

                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>

                    <div className=" col-md-9 mt-5">
                        <h3 className='bg-primary text-center p-2 text-light'>Your Profile</h3>
                        <table className='table table-bordered'>
                            <tbody>
                                <tr>
                                    <th>Name</th>
                                    <td>Vansh Rajput</td>
                                </tr>
                                <tr>
                                    <th>User Name</th>
                                    <td>Vansh</td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <td>vanshrajput2288@gmail.com</td>
                                </tr>
                                <tr>
                                    <th>Phone</th>
                                    <td>8958811770</td>
                                </tr>
                                <tr>
                                    <th>Role</th>
                                    <td>Super Admin</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </>
    )
}
