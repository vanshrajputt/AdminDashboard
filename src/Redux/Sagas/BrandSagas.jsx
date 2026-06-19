
import { put, takeEvery } from "redux-saga/effects";
import { CREATE_BRAND,CREATE_BRAND_RED,DELETE_BRAND,DELETE_BRAND_RED,GET_BRAND,GET_BRAND_RED, UPDATE_BRAND, UPDATE_BRAND_RED} from "../Constant";

import { createRecord, deleteRecord, getRecord, updateRecord } from "./Service/index";
// import { createMultipartRecord ,updateMultipartRecord,getRecord,deleteRecord } from "./Service/index";

function* createSaga(action) {                              //worker saga
    let response = yield createRecord("brand",action.payload)
    // let response = yield createMultipartRecord(action.payload)  // if record has file field
    yield put({ type: CREATE_BRAND_RED, payload: response })
}
function* getSaga(action) {                                    //worker saga
    let response = yield getRecord("brand")
    yield put({ type: GET_BRAND_RED, payload: response })
}
function* updateSaga(action) {                                 //worker saga

    // let response = yield updateMultipartRecord(action.payload)
    // yield put({ type: UPDATE_BRAND_RED, payload: response})

    yield updateRecord("brand",action.payload)
    yield put({ type: UPDATE_BRAND_RED, payload: action.payload })
}

function* deleteSaga(action) {                                        //worker saga
    yield deleteRecord("brand",action.payload)
    yield put({ type: DELETE_BRAND_RED, payload: action.payload })
}


export default function* BrandSagas() {                                    // Watcher saga
    yield takeEvery(CREATE_BRAND, createSaga)
    yield takeEvery(GET_BRAND, getSaga)
    yield takeEvery(UPDATE_BRAND, updateSaga)
    yield takeEvery(DELETE_BRAND, deleteSaga)

}