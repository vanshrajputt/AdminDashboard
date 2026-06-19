import { combineReducers } from "@reduxjs/toolkit";
import MaincategoryReducer from "./MaincategoryReducer";
import SubcategoryReducer from "./SubcategoryReducer";
import BrandReducer from "./BrandReducer";
import ProductReducer from "./ProductReducer";


export default combineReducers({
    MaincategoryStateData: MaincategoryReducer,
    SubcategoryStateData: SubcategoryReducer,
    BrandStateData: BrandReducer,
    ProductStateData: ProductReducer,

})

