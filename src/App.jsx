import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminHomePage from './Pages/Admin/AdminHomePage'


import NavbarPage from './Pages/NavbarPage'
import HomePage from './Pages/HomePage'
import AdminMaincategoryPage from './Pages/Admin/maincategory/AdminMaincategoryPage'
import AdminCreateMaincategoryPage from './Pages/Admin/maincategory/AdminCreateMaincategoryPage'
import AdminUpdateMaincategoryPage from './Pages/Admin/maincategory/AdminUpdateMaincategoryPage'
import AdminSubcategoryPage from './Pages/Admin/subcategory/AdminSubcategory'
import AdminCreateSubcategoryPage from './Pages/Admin/subcategory/AdminCreateSubcategoryPage'
import AdminUpdateSubcategoryPage from './Pages/Admin/subcategory/AdminUpdateSubcategoryPage'
import AdminBrandPage from './Pages/Admin/Brand/AdminBrand'
import AdminCreateBrandPage from './Pages/Admin/Brand/AdminCreateBrandPage'
import AdminUpdateBrandPage from './Pages/Admin/Brand/AdminUpdateBrandPage'
import AdminProductPage from './Pages/Admin/Product/AdminProductPage'
import AdminCreateProductpage from './Pages/Admin/Product/AdminCreateProductPage'
import AdminUpdateProductPage from './Pages/Admin/Product/AdminUpdateProductPage'
import ShopPage from './Pages/ShopPage'




export default function App() {
  return (
    <>
      <BrowserRouter>
        <NavbarPage />

        <Routes>

          {/* Admin Routes */}
          <Route path='/admin' element={<AdminHomePage />} />
          <Route path='/' element={<HomePage />} />

          <Route path='/admin/maincategory' element={<AdminMaincategoryPage />} />
          <Route path='/admin/maincategory/create' element={<AdminCreateMaincategoryPage />} />
          <Route path='/admin/maincategory/update/:id' element={<AdminUpdateMaincategoryPage />} />
          <Route path='/admin/subcategory' element={<AdminSubcategoryPage />} />
          <Route path='/admin/subcategory/create' element={<AdminCreateSubcategoryPage />} />
          <Route path='/admin/subcategory/update/:id' element={<AdminUpdateSubcategoryPage />} />
          <Route path='/admin/brand' element={<AdminBrandPage />} />
          <Route path='/admin/brand/create' element={<AdminCreateBrandPage/>} />
          <Route path='/admin/brand/update/:id' element={<AdminUpdateBrandPage />} />
          <Route path='/admin/product' element={<AdminProductPage />} />
          <Route path='/admin/product/create' element={<AdminCreateProductpage/>} />
          <Route path='/admin/product/update/:id' element={<AdminUpdateProductPage/>} />
          <Route path='/admin/shop' element={<ShopPage />} />


        </Routes>
      </BrowserRouter>
    </>
  )
}
