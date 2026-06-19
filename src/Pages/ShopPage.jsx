import React, { useEffect } from 'react'
import { getMaincategory } from "../Redux/ActionCreators/MaincategoryActionCreators"
import { getProduct } from "../Redux/ActionCreators/ProductActionCreators"
import { getBrand } from "../Redux/ActionCreators/BrandActionCreators"
import { getSubcategory } from "../Redux/ActionCreators/SubcategoryActionCreators"
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import ProductSlider from '../components/ProductSlider'
const color = ["White", "Black", "Blue", "Red", "Orange", "Yellow", "Green", "Purple", "Pink", "Gray", "Navy Blue", "N/A"]
const size = ["XXXL", "XXL", "XL", "L", "MD", "SM", "XS", "NB", "24", "26", "28", "30", "32", "34", "36", "38", "40", "42", "44", "46"]

export default function ShopPage() {
  let [data, setData] = useState([])
  let [search, setSearch] = useState("")
  let [selected, setSelected] = useState("")

  let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
  let SubcategoryStateData = useSelector(state => state.SubcategoryStateData)
  let ProductStateData = useSelector(state => state.ProductStateData)
  let BrandStateData = useSelector(state => state.BrandStateData)

  let dispatch = useDispatch()

  const searchData = (e) => {
    e.preventDefault();

    let items = ProductStateData.filter(
      (x) => x.status &&
        (
          x.name?.toLowerCase().includes(search.toLowerCase()) ||
          x.maincategory?.toLowerCase().includes(search.toLowerCase()) ||
          x.subcategory?.toLowerCase().includes(search.toLowerCase()) ||
          x.brand?.toLowerCase().includes(search.toLowerCase()) ||
          x.color?.some(item =>
            item.toLowerCase().includes(search.toLowerCase())
          )
        )
    );

    setData(items);
  };


  useEffect(() => {
    (() => dispatch(getMaincategory()))()
  }, [MaincategoryStateData.length])

  useEffect(() => {
    (() => dispatch(getSubcategory()))()
  }, [SubcategoryStateData.length])

  useEffect(() => {
    (() => dispatch(getBrand()))()
  }, [BrandStateData.length])

  useEffect(() => {
    (() => {
      dispatch(getProduct())
      if (ProductStateData.length) {
        setData(ProductStateData.filter(x => x.status))
      }
    })()

  }, [ProductStateData.length])

  return (
    <>

      <div className='mt-5' >
        <div className="container">
          <div className="col-12 mt-5 d-flex">
            <form onSubmit={searchData} >
              <div className="btn-group w-100 mt-5">
                <input type="search" name="search" onChange={(e) => setSearch(e.target.value)}
                  value={search} placeholder='Search Product By Name, Category, Color, Etc' className='form-control border-primary rounded-0' />
                <button type='submit' className='btn btn-primary'>Search</button>
              </div>
            </form>
          </div>

          <div className="row mt-3">

            {/* {data.filter(x => selected === "" || selected === x.maincategory).slice(0, 12).map((item => { */}
            {data.slice(0, 12).map((item => {

              return <div key={item.id} className="col-lg-3 p-3">
                <div className="card">
                  <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.pic[0]}`} className="card-img-top" height={200} alt="..." />
                  <div className="card-body">
                    <h5 className="card-title" style={{ height: 30 }}>{item.name}</h5>

                  </div>
                  <ul className="list-group list-group-flush">

                    <li className="list-group-item">
                      <p className='fs-6'><del>&#8377;{item.basePrice}</del> &#8377;{item.finalPrice} <sup>{item.discount} %Off</sup></p>
                    </li>
                    <li className="list-group-item d-flex justify-content-between" style={{ height: 55 }}>
                      <span><i className="bi bi-tag-fill text-danger fs-5"></i> {item.brand} </span>
                      <span><i className='bi bi-cart-check-fill text-primary fs-5 me-2'></i>{item.stockQuantity} Left in Stock </span>
                    </li>
                  </ul>
                  <div className="card-body">
                    <Link to={`/product/${item.id}`} className='btn btn-primary w-100'>ADD TO CART</Link>
                  </div>
                </div>
              </div>
            }))}
          </div>
        </div>
      </div>
      <div className='mt-3'>
        <ProductSlider></ProductSlider>

      </div>
    </>
  )
}
