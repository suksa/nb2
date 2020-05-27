import axios from 'axios'
import { all, fork, takeEvery, call, put } from 'redux-saga/effects'
import {
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_IN_FAILURE,
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAILURE,
    LOG_OUT_REQUEST,
    LOG_OUT_SUCCESS,
    LOG_OUT_FAILURE,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAILURE,
} from '../reducers/user'

function loginApi(loginData) {
    return axios.post('/user/login', loginData, {
        withCredentials: true // backend와 쿠키 주고받을수있게됨
    })
}

function* login(action) {
    try {
        const result = yield call(loginApi, action.data)
        yield put({
            type: LOG_IN_SUCCESS,
            data: result.data
        })
    } catch (e) {
        console.error(e)
        yield put({
            type: LOG_IN_FAILURE
        })
    }
}

function* watchLogin() {
    yield takeEvery(LOG_IN_REQUEST, login)
}
//////////////////////////////////////
function signUpApi(signUpData) {
    return axios.post('/user/', signUpData)
}

function* signUp(action) {
    try {
        // yield call(signUpApi)
        yield call(signUpApi, action.data)
        yield put({
            type: SIGN_UP_SUCCESS
        })
    } catch (e) {
        console.error(e)
        yield put({
            type: SIGN_UP_FAILURE,
            error: e
        })
    }
}
function* watchSignUp() {
    yield takeEvery(SIGN_UP_REQUEST, signUp)
}
//////////////////////////////////////
function logOutApi(logOutData) {
    return axios.post('/user/logout', {}, logOutData, {
        withCredentials: true
    })
}

function* logOut() {
    try {
        yield call(logOutApi)
        yield put({
            type: LOG_OUT_SUCCESS
        })
    } catch (e) {
        console.error(e)
        yield put({
            type: LOG_OUT_FAILURE,
            error: e
        })
    }
}

function* watchLogOut() {
    yield takeEvery(LOG_OUT_REQUEST, logOut)
}
//////////////////////////////////////
function loadUserApi(userId) {
    return axios.get(userId ? `/user/${userId}` : '/user/', {
        withCredentials: true
    })
}

function* loadUser(action) {
    try {
        const result = yield call(loadUserApi, action.data)
        yield put({
            type: LOAD_USER_SUCCESS,
            data: result.data,
            me: !action.data,
        })
    } catch (e) {
        console.error(e)
        yield put({
            type: LOAD_USER_FAILURE,
            error: e
        })
    }
}

function* watchLoadUser() {
    yield takeEvery(LOAD_USER_REQUEST, loadUser)
}

export default function* userSaga() {
    yield all([
        fork(watchLogin),
        fork(watchLogOut),
        fork(watchLoadUser),
        fork(watchSignUp),
    ])
}