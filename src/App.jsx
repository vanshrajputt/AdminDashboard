import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminHomePage from './Pages/Admin/AdminHomePage'

import NavbarPage from './Pages/NavbarPage'
import HomePage from './Pages/HomePage'
import AdminMaincategoryPage from './Pages/Admin/maincategory/AdminMaincategoryPage'
import AdminCreateMaincategoryPage from './Pages/Admin/maincategory/AdminCreateMaincategoryPage'
import AdminUpdateMaincategoryPage from './Pages/Admin/maincategory/AdminUpdateMaincategoryPage'
// import AdminProductPage from './Pages/Admin/product/AdminProductPage'
// import AdminCreateProductPage from './Pages/Admin/product/AdminCreateProductPage'
// import AdminUpdateProductPage from './Pages/Admin/product/AdminUpdateProductPage'



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
          {/* <Route path='/admin/product' element={<AdminProductPage />} />
          <Route path='/admin/product/create' element={<AdminCreateProductPage />} />
          <Route path='/admin/product/update/:id' element={<AdminUpdateProductPage />} /> */}

        </Routes>
      </BrowserRouter>
    </>
  )
}
