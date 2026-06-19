import React, { useEffect, useState } from 'react'
import AdminSidebar from '../../../components/Admin/AdminSidebar'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import TextValidators from '../../../FormValidators/TextValidators'
import PicValidators from '../../../FormValidators/PicValidators'
import { ImTree } from 'react-icons/im'
import { getProduct, updateProduct } from '../../../Redux/ActionCreators/ProductActionCreators'
import { getMaincategory } from '../../../Redux/ActionCreators/MaincategoryActionCreators'
import { getSubcategory } from '../../../Redux/ActionCreators/SubcategoryActionCreators'
import { getBrand } from '../../../Redux/ActionCreators/BrandActionCreators'

const colors = ["White", "Black", "Blue", "Red", "Orange", "Yellow", "Green", "Purple", "Pink", "Gray", "Navy Blue", "N/A"]
const size = ["XXXL", "XXL", "XL", "L", "MD", "SM", "XS", "NB", "24", "26", "28", "30", "32", "34", "36", "38", "40", "42", "44", "46"]

export default function AdminUpdateProductPage() {


    let [data, setData] = useState({
        name: '',

        maincategory: '',
        subcategory: '',
        brand: '',
        basePrice: '',
        finalPrice: '',
        discount: '',
        stock: true,
        stockQuantity: '',
        description: '',
        color: [],
        size: [],
        pic: [],
        status: true,      //delete krne ki jurt ni hai agr product sale nhi krna chate to status inactive krdo 
    })
    let [errorMessage, setErrorMessage] = useState({
        name: "",
        pic: "",
        color: "",
        basePrice: "",
        size: "",
        discount: "",
        description: "",
        stockQuantity: "",
    })

    let [show, setShow] = useState(false)
    let [flag, setFlag] = useState(false)


    let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
    let SubcategoryStateData = useSelector(state => state.SubcategoryStateData)
    let BrandStateData = useSelector(state => state.BrandStateData)
    let ProductStateData = useSelector(state => state.ProductStateData)


    let { id } = useParams()
    let dispatch = useDispatch()

    let navigate = useNavigate() //ek page swe dusre page pr jane ke liye

    function getInputData(e) {
        let name = e.target.name
        let value = name === "pic" ? data.pic.concat(Array.from(e.target.files).map(x => "product/" + x.name)) : e.target.value

        setData({ ...data, [name]: name === "status" ? (value === "1" ? true : false) : value })            //data ki last value , and name me value stor kr do
        setErrorMessage({ ...errorMessage, [name]: name === "pic" ? PicValidators(e) : TextValidators(e) }) //textvalidator se error masg show krega ye

    }
    function getInputCheckbox(key, value) {
        let arr = key === "color" ? data.color : data.size
        if (arr.includes(value))
            arr = arr.filter(x => x !== value)
        else
            arr.push(value)
        setData({ ...data, [key]: arr })
        setErrorMessage({ ...errorMessage, [key]: arr.length === 0 ? `Please Select At least one ${key}` : '' })

    }
     async function postData(e) {
           e.preventDefault()                                         //page reloud ni hota
           let error = Object.values(errorMessage).find(x => x !== "")
           if (error)
               setShow(true)
            else if(data.pic.length===0){
                setShow(true)
                setErrorMessage({...errorMessage,pic:"Please Upload Atleast One Image"})
            }
           else {
               let bp = parseInt(data.basePrice)
               let d = parseInt(data.discount)
               let fp = parseInt(bp - bp * d / 100)
               let sc = parseInt(data.stockQuantity)
   
               dispatch(updateProduct({
                   ...data,
                   maincategory: data.maincategory || MaincategoryStateData[0].name,
                   subcategory: data.subcategory || SubcategoryStateData[0].name,
                   brand: data.brand || BrandStateData[0].name,
                   basePrice: bp,
                   discount: d,
                   finalPrice: fp,
                   stockQuantity: sc,
               }))
               navigate("/admin/product")
           }
       }
    useEffect(() => {
        (() => {
            dispatch(getProduct())
            if (ProductStateData.length) {
                let item = ProductStateData.find(x => x.id == id)
                if (item)
                    setData({ ...data, ...item })
                else
                    navigate("/admin/product")
            }
        })()

    }, [ProductStateData.length])
    useEffect(() => {
        (() => {
            dispatch(getMaincategory())
        })()

    }, [MaincategoryStateData.length])
    useEffect(() => {
        (() => {
            dispatch(getSubcategory())
        })()

    }, [SubcategoryStateData.length])
    useEffect(() => {
        (() => {
            dispatch(getBrand())
        })()

    }, [BrandStateData.length])
    return (
        <>
            <div className="container my-3">
                <div className="row">



                    <div className=" col-12 mt-5">
                        <h5 className='bg-danger text-center p-2 text-light'>Update Product <Link to="/admin/product">
                            <i className='bi bi-arrow-left text-light float-end'></i></Link></h5>
                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <label>Name <span className='text-danger'>*</span></label>
                                    <input type="text" name='name' value={data.name} onChange={getInputData} placeholder='Product Name'
                                        className={`form-control  ${show && errorMessage.name ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.name ? <p className='text-danger'> {errorMessage.name} </p> : null}
                                </div>
                                <div className="col-lg-3 mb-3">
                                    <label>Maincategory <span className='text-danger'>*</span></label>
                                    <select name="maincategory" value={data.maincategory} className='form-select border-primary' onChange={getInputData}>
                                        {MaincategoryStateData.filter(x => x.status).map(item => {
                                            return <option key={item.id}> {item.name} </option>
                                        })}
                                    </select>
                                </div>
                                <div className="col-lg-3 mb-3">
                                    <label>Subcategory <span className='text-danger'>*</span></label>
                                    <select name="subcategory" value={data.subcategory} onChange={getInputData} className='form-select border-primary'>
                                        {SubcategoryStateData.filter(x => x.status).map(item => {
                                            return <option key={item.id}> {item.name} </option>
                                        })}
                                    </select>
                                </div>
                                <div className="col-lg-3 mb-3">
                                    <label>Brand <span className='text-danger'>*</span></label>
                                    <select name="brand" value={data.brand} onChange={getInputData} className='form-select border-primary'>
                                        {BrandStateData.filter(x => x.status).map(item => {
                                            return <option key={item.id}> {item.name} </option>
                                        })}
                                    </select>
                                </div>
                                <div className="col-lg-3 mb-3">
                                    <label>Stock <span className='text-danger'>*</span></label>
                                    <select name="stock" value={data.stock} onChange={getInputData} className='form-select border-primary'>
                                        <option value="1">In Stock</option>
                                        <option value="0">Out  of Stock</option>
                                    </select>
                                </div>
                                <div className="col-lg-6 mb-3">
                                    <label>Base Price<span className='text-danger'>*</span></label>
                                    <input type="number" name='basePrice' value={data.basePrice} onChange={getInputData} placeholder='Product Base Price'
                                        className={`form-control  ${show && errorMessage.basePrice ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.basePrice ? <p className='text-danger'> {errorMessage.basePrice} </p> : null}
                                </div>
                                <div className="col-lg-6 mb-3">
                                    <label>Discount<span className='text-danger'>*</span></label>
                                    <input type="number" name='discount' value={data.discount} onChange={getInputData} placeholder='Product Discount'
                                        className={`form-control  ${show && errorMessage.discount ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.discount ? <p className='text-danger'> {errorMessage.discount} </p> : null}
                                </div>
                                <div className="col-lg-12 mb-3">
                                    <label>Colors<span className='text-danger'>*</span></label>
                                    <div className='border border-primary rounded p-3'>
                                        <div className="row">
                                            {colors.map((item, index) => {
                                                return <div key={index} className='col-xl-2 col-lg-3 col-4'>
                                                    <input type="checkbox" id={item} checked={data.color?.includes(item)} onChange={() => getInputCheckbox('color', item)} />
                                                    <label htmlFor={item} className='ms-3'> {item} </label>
                                                </div>
                                            })}

                                        </div>

                                    </div>
                                    {show && errorMessage.color ? <p className='text-danger'> {errorMessage.color} </p> : null}


                                </div>
                                <div className="col-lg-12 mb-3">
                                    <label>Size<span className='text-danger'>*</span></label>
                                    <div className='border border-primary rounded p-3'>
                                        <div className="row">
                                            {size.map((item, index) => {
                                                return <div key={index} className='col-xl-2 col-lg-3 col-4'>
                                                    <input type="checkbox" value={data.size} id={item} checked={data.size?.includes(item)} onChange={() => getInputCheckbox('size', item)} />
                                                    <label htmlFor={item} className='ms-3'> {item} </label>
                                                </div>
                                            })}

                                        </div>
                                    </div>
                                    {show && errorMessage.size ? <p className='text-danger'> {errorMessage.size} </p> : null}

                                </div>
                                <div className="col-12 mb-3">
                                    <label>Description <span className='text-danger'>*</span></label>
                                    <textarea
                                        name="description"
                                        onChange={getInputData} value={data.description}
                                        className='border border-primary rounded w-100'
                                    />

                                </div>


                                <div className="col-lg-6 mb-3">
                                    <label>Pic  <span className='text-danger'>*</span></label>
                                    <input type="file" name='pic' multiple onChange={getInputData}
                                        className={`form-control  ${show && errorMessage.pic ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.pic ? <p className='text-danger'> {errorMessage.pic} </p> : null}
                                </div>
                                <div className="col-lg-6 mb-3">
                                    <label>Old Pics(Click on Pic to Remove)</label>
                                    <div>
                                        {data.pic.map((item, index) => {
                                            return <img onClick={() => {
                                                data.pic.splice(index, 1)
                                                setFlag(!flag)
                                            }} src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item}`} height={80} width={80} className='m-1' alt="" />
                                        })}
                                    </div>

                                </div>

                                <div className="col-lg-6 mb-3">
                                    <label>Status<span className='text-danger'>*</span></label>
                                    <select name="status" onChange={getInputData} value={data.status} className='form-select border-primary'>
                                        <option value="1">Active</option>
                                        <option value="0">Inactive</option>
                                    </select>

                                </div>
                                <div className="col-lg-6 mb-3">
                                    <label>Stock Quantity<span className='text-danger'>*</span></label>
                                    <input type="number" name='stockQuantity' value={data.stockQuantity} onChange={getInputData} placeholder='Product Stock Quantity'
                                        className={`form-control  ${show && errorMessage.stockQuantity ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.stockQuantity ? <p className='text-danger'> {errorMessage.stockQuantity} </p> : null}
                                </div>
                                <div className="col-12">
                                    <button type='submit' className='btn  btn-outline-success w-100'>Update </button>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>

            </div>
        </>
    )
}
