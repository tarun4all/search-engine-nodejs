import {takeLatest, put} from 'redux-saga/effects';
import {GET_CONFIG, GET_CONFIG_SUCCESS, GET_CONFIG_ERROR} from "./action";

import {GET} from '../../service/API';

function* incrementCounter(action) {
    try {
        let data = yield GET('config');
        yield put({type: GET_CONFIG_SUCCESS, ...data});
    } catch (e) {
        yield put({type: GET_CONFIG_ERROR});
    }
}

export default function* rootSaga() {
    yield takeLatest(GET_CONFIG, incrementCounter);
}
