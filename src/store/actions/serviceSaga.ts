import { all, call, put, takeLatest, fork } from "redux-saga/effects";

import { IUser, IUserAuthData } from "../types/auth";

import { Api } from "../../config/api";
import { AUTH, REGISTER, NOTIFY, SERVICE } from "../actionTypes";
import { IServiceCreateParams, IServiceListItem } from "../types/services";

function* createService(action: any) {
  try {
    const createParams: IServiceCreateParams = action.payload;
    yield put({ type: NOTIFY.LOADING, payload: "Создание сервиса..." });
    const { data } = yield call(Api.createService, createParams);
    yield put({ type: NOTIFY.SUCCESS, payload: data });
  } catch (err) {
    yield put({ type: NOTIFY.ERROR, payload: err.message });
    console.log(err);
  }
}

function* getServiceList() {
  try {
    const { data } = yield call(Api.getServiceList);
    yield put({ type: SERVICE.LIST.SUCCESS, payload: data });
  } catch (err) {
    yield put({ type: NOTIFY.ERROR, payload: err.message });
    console.log(err);
  }
}

function* removeService(action: any) {
  try {
    const { data } = yield call(Api.removeService, action.payload);
    yield put({ type: NOTIFY.SUCCESS, payload: data });
    yield put({ type: SERVICE.LIST.REQUEST });
  } catch (e) {
    yield put({ type: NOTIFY.ERROR, payload: e.message });
  }
}

function* editService(action: any) {
  try {
    const service: IServiceListItem = action.payload;
    const { data } = yield call(Api.updateService, service.id, service);
    yield put({ type: NOTIFY.SUCCESS, payload: data });
  } catch (e) {
    yield put({ type: NOTIFY.ERROR, payload: e.message });
  }
}

function* allActions() {
  yield takeLatest(SERVICE.CREATE.REQUEST, createService);
  yield takeLatest(SERVICE.LIST.REQUEST, getServiceList);
  yield takeLatest(SERVICE.REMOVE.REQUEST, removeService);
  yield takeLatest(SERVICE.EDIT.REQUEST, editService);
}

function* serviceSaga() {
  yield all([fork(allActions)]);
}

export default serviceSaga;
