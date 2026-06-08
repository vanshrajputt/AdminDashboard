import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminSidebar() {
    return (
        <div className="list-group mt-5">
            <Link to="/" className="list-group-item list-group-item-action active mb-1" aria-current="true">
            <i className='bi bi-house-check'></i><span className='float-end'>Home</span></Link>
             <Link to="/admin/maincategory" className="list-group-item list-group-item-action active mb-1" aria-current="true">
            <i className="bi bi-folder"></i><span className='float-end'>MainCategory</span></Link>
             <Link to="/admin/subcategory" className="list-group-item list-group-item-action active mb-1" aria-current="true">
            <i className='bi bi-folder2-open'></i><span className='float-end'>SubCategory</span></Link>
               <Link to="/admin/brand" className="list-group-item list-group-item-action active mb-1" aria-current="true">
            <i className='bi bi-award'></i><span className='float-end'>Brand</span></Link>
             <Link to="/admin/product" className="list-group-item list-group-item-action active mb-1" aria-current="true">
            <i className='bi bi-box-seam'></i><span className='float-end'>Products</span></Link>
           <Link to="/admin/contactus" className="list-group-item list-group-item-action active mb-1" aria-current="true">
            <i className='bi bi-telephone'></i><span className='float-end'>Contact Us</span></Link>
             <Link to="/admin/order" className="list-group-item list-group-item-action active mb-1" aria-current="true">
            <i className='bi bi-bag-check'></i><span className='float-end'>Orders</span></Link>
            
        </div>
    )
}
