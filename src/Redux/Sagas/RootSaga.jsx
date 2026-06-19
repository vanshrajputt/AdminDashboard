import { all } from "redux-saga/effects";
import MaincategorySagas from "./MaincategorySagas"
import SubcategorySagas from "./SubcategorySagas";
import BrandSagas from "./BrandSagas";
import ProductSagas from "./ProductSagas";
export default function* RootSaga() {
    yield all([
        MaincategorySagas(),
        SubcategorySagas(),
        BrandSagas(),
        ProductSagas(),

    ])
}