import React, { useEffect, useState } from 'react'
import AdminSidebar from '../../../components/Admin/AdminSidebar'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import TextValidators from '../../../FormValidators/TextValidators'
import PicValidators from '../../../FormValidators/PicValidators'
import { ImTree } from 'react-icons/im'
import { getMaincategory, updateMaincategory } from '../../../Redux/ActionCreators/MaincategoryActionCreators'


export default function AdminUpdateMaincategoryPage() {
    let { id } = useParams()

    let [data, setData] = useState({
        name: '',
        pic: '',
        status: true,       //delete krne ki jurt ni hai agr product sale nhi krna chate to status inactive krdo 
    })
    let [errorMessage, setErrorMessage] = useState({
        name: "",
        pic: ""
    })

    let [show, setShow] = useState(false)
    let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
    let dispatch = useDispatch()

    let navigate = useNavigate() //ek page swe dusre page pr jane ke liye

    function getInputData(e) {
        let name = e.target.name
        let value = name === "pic" ? "maincategory/" + e.target.files[0].name : e.target.value

        setData({ ...data, [name]: name === "status" ? (value === "1" ? true : false) : value })            //data ki last value , and name me value stor kr do
        setErrorMessage({ ...errorMessage, [name]: name === "pic" ? PicValidators(e) : TextValidators(e) }) //textvalidator se error masg show krega ye

    }
    async function postData(e) {
        e.preventDefault()   //page reloud ni hota
        let error = Object.values(errorMessage).find(x => x !== "")
        if (error)
            setShow(true)
        else {

            let item = MaincategoryStateData.find(
                x => x.id !== id && x.name?.toLocaleLowerCase() === data.name?.toLocaleLowerCase()
            )

            if (item) {
                setShow(true)
                setErrorMessage({
                    ...errorMessage,
                    name: "Maincategory With This Name is Already Exist"
                })
                return
            }
            dispatch(updateMaincategory({ ...data }))

                navigate("/admin/maincategory")

        }


    }
    useEffect(() => {
        (() => {
            dispatch(getMaincategory())
            if(MaincategoryStateData.length){
                let item = MaincategoryStateData.find(x=>x.id==id)
                if(item)
                    setData({...data,...item})
                else
                    navigate("/admin/maincategory")
            }
        })()

    }, [MaincategoryStateData.length])
    return (
        <>
            <div className="container my-3">
                <div className="row">

                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>

                    <div className=" col-md-9 mt-5">
                        <h5 className='bg-primary text-center p-2 text-light'>Update Maincategory <Link to="/admin/maincategory">
                            <i className='bi bi-arrow-left text-light float-end'></i></Link></h5>
                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <label>Name <span className='text-danger'>*</span></label>
                                    <input type="text" name='name' value={data.name} onChange={getInputData} placeholder='Product Name'
                                        className={`form-control  ${show && errorMessage.name ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.name ? <p className='text-danger'> {errorMessage.name} </p> : null}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Pic</label>
                                    <input type="file" name='pic' onChange={getInputData}
                                        className={`form-control  ${show && errorMessage.pic ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.pic ? <p className='text-danger'> {errorMessage.pic} </p> : null}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Status</label>
                                    <select name="status" value={data.status ? "1" : "0"} onChange={getInputData} className='form-select border-primary'>
                                        <option value="1">Active</option>
                                        <option value="0">Inactive</option>
                                    </select>

                                </div>
                                <div className="col-12">
                                    <button type='submit' className='btn  btn-outline-danger w-100'>Update</button>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>

            </div>
        </>
    )
}
