import { all, call, put, takeLatest, fork } from "redux-saga/effects";

import { IUser, IUserAuthData } from "../types/auth";

import { Api } from "../../config/api";
import { AUTH, REGISTER, NOTIFY } from "../actionTypes";

function* register(action: any) {
  try {
    const userData: IUser = action.payload;
    yield put({ type: NOTIFY.LOADING, payload: "Регистрация..." });
    yield call(Api.register, userData);
    yield put({ type: NOTIFY.SUCCESS, payload: "Регистрация прошла успешно!" });
  } catch (err) {
    yield put({ type: NOTIFY.ERROR, payload: err.message });
    console.log(err);
  }
}

function* login(action: any) {
  try {
    const userData: IUserAuthData = action.payload;
    yield put({ type: NOTIFY.LOADING, payload: "Аутентификация..." });
    const { data } = yield call(Api.login, userData);
    sessionStorage.setItem("token", data.token);
    const myData = yield call(Api.getMe);
    yield put({ type: AUTH.SUCCESS, payload: myData.data });
    yield put({ type: NOTIFY.SUCCESS, payload: "Добро пожаловать!" });
  } catch (err) {
    yield put({ type: NOTIFY.ERROR, payload: err.message });
  }
}

function* registerAction() {
  yield takeLatest(REGISTER.REQUEST, register);
}

function* loginAction() {
  yield takeLatest(AUTH.REQUEST, login);
}

function* authSaga() {
  yield all([fork(registerAction), fork(loginAction)]);
}

export default authSaga;
