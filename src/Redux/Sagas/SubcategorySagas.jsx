
import { put, takeEvery } from "redux-saga/effects";
import { CREATE_SUBCATEGORY,CREATE_SUBCATEGORY_RED,DELETE_SUBCATEGORY,DELETE_SUBCATEGORY_RED,GET_SUBCATEGORY,GET_SUBCATEGORY_RED, UPDATE_SUBCATEGORY, UPDATE_SUBCATEGORY_RED} from "../Constant";

import { createRecord, deleteRecord, getRecord, updateRecord } from "./Service/index";
// import { createMultipartRecord ,updateMultipartRecord,getRecord,deleteRecord } from "./Service/index";

function* createSaga(action) {                              //worker saga
    let response = yield createRecord("subcategory",action.payload)
    // let response = yield createMultipartRecord(action.payload)  // if record has file field
    yield put({ type: CREATE_SUBCATEGORY_RED, payload: response })
}
function* getSaga(action) {                                    //worker saga
    let response = yield getRecord("subcategory")
    yield put({ type: GET_SUBCATEGORY_RED, payload: response })
}
function* updateSaga(action) {                                 //worker saga

    // let response = yield updateMultipartRecord(action.payload)
    // yield put({ type: UPDATE_SUBCATEGORY_RED, payload: response})

    yield updateRecord("subcategory",action.payload)
    yield put({ type: UPDATE_SUBCATEGORY_RED, payload: action.payload })
}

function* deleteSaga(action) {                                        //worker saga
    yield deleteRecord("subcategory",action.payload)
    yield put({ type: DELETE_SUBCATEGORY_RED, payload: action.payload })
}


export default function* SubcategorySagas() {                                    // Watcher saga
    yield takeEvery(CREATE_SUBCATEGORY, createSaga)
    yield takeEvery(GET_SUBCATEGORY, getSaga)
    yield takeEvery(UPDATE_SUBCATEGORY, updateSaga)
    yield takeEvery(DELETE_SUBCATEGORY, deleteSaga)

}