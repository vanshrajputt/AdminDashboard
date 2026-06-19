
import { put, takeEvery } from "redux-saga/effects";
import { CREATE_PRODUCT,CREATE_PRODUCT_RED,DELETE_PRODUCT,DELETE_PRODUCT_RED,GET_PRODUCT,GET_PRODUCT_RED, UPDATE_PRODUCT, UPDATE_PRODUCT_RED} from "../Constant";

import { createRecord, deleteRecord, getRecord, updateRecord } from "./Service/index";
// import { createMultipartRecord ,updateMultipartRecord,getRecord,deleteRecord } from "./Service/index";

function* createSaga(action) {                              //worker saga
    let response = yield createRecord("product",action.payload)
    // let response = yield createMultipartRecord(action.payload)  // if record has file field
    yield put({ type: CREATE_PRODUCT_RED, payload: response })
}
function* getSaga(action) {                                    //worker saga
    let response = yield getRecord("product")
    yield put({ type: GET_PRODUCT_RED, payload: response })
}
function* updateSaga(action) {                                 //worker saga

    // let response = yield updateMultipartRecord(action.payload)
    // yield put({ type: UPDATE_PRODUCT_RED, payload: response})

    yield updateRecord("product",action.payload)
    yield put({ type: UPDATE_PRODUCT_RED, payload: action.payload })
}

function* deleteSaga(action) {                                        //worker saga
    yield deleteRecord("product",action.payload)
    yield put({ type: DELETE_PRODUCT_RED, payload: action.payload })
}


export default function* ProductSagas() {                                    // Watcher saga
    yield takeEvery(CREATE_PRODUCT, createSaga)
    yield takeEvery(GET_PRODUCT, getSaga)
    yield takeEvery(UPDATE_PRODUCT, updateSaga)
    yield takeEvery(DELETE_PRODUCT, deleteSaga)

}