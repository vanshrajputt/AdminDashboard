//  use generator function means * function ke aage * lga dete h
// it work exaple 
// function example(){
// return 10
// return 10
// / /}   
// normal functiom me har bar 10 return hoga Aur genrator fun me yield lgane se phle 10 print hoga uske baad ki value print krega

import { put, takeEvery } from "redux-saga/effects";
import { CREATE_MAINCATEGORY, CREATE_MAINCATEGORY_RED, DELETE_MAINCATEGORY, DELETE_MAINCATEGORY_RED, GET_MAINCATEGORY, GET_MAINCATEGORY_RED, UPDATE_MAINCATEGORY_RED } from "../Constant";
import { createRecord, deleteRecord, getRecord,  updateRecord } from "./Service/index";
// import { createMultipartRecord ,updateMultipartRecord,getRecord,deleteRecord } from "./Service/index";

function* createSaga(action) {                              //worker saga
    let response = yield createRecord(action.payload)
    // let response = yield createMultipartRecord(action.payload)  // if record has file field
    yield put({ type: CREATE_MAINCATEGORY_RED, payload: response })
}
function* getSaga(action) {                                    //worker saga
    let response = yield getRecord()
    yield put({ type: GET_MAINCATEGORY_RED, payload: response })
}
function* updateSaga(action) {                                 //worker saga

    // let response = yield updateMultipartRecord(action.payload)
    // yield put({ type: UPDATE_MAINCATEGORY_RED, payload: response})

    yield updateRecord(action.payload)
    yield put({ type: UPDATE_MAINCATEGORY_RED, payload: action.payload })
}

function* deleteSaga(action) {                                        //worker saga
     yield deleteRecord()
    yield put({ type: DELETE_MAINCATEGORY_RED, payload: action.payload })
}


function* MaincategorySagas() {                                    // Watcher saga
    yield takeEvery(CREATE_MAINCATEGORY, createSaga)
    yield takeEvery(GET_MAINCATEGORY, getSaga)
    yield takeEvery(UPDATE_MAINCATEGORY, updateSaga)
    yield takeEvery(DELETE_MAINCATEGORY, deleteSaga)

}