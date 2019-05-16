import { all, call, put, takeLatest, fork } from "redux-saga/effects";

import { Api } from "../../config/api";
import {
  SERVER_CREATION,
  NOTIFY,
  SERVERS_LIST,
  SERVER_DELETE,
  SERVER_BY_ID,
  SERVER_KEY_CREATE,
  SERVER_KEY_GET,
  DEPENDENCIES
} from "../actionTypes";
import * as R from "ramda";
import { IServerToCreate, IServer } from "../types/servers";
import { IDependencyToCreate } from "../types/dependencies";

function* createDependency(action: any) {
  try {
    const dependency: IDependencyToCreate = action.payload;
    yield put({
      type: NOTIFY.LOADING,
      payload: "Регистрация пакета зависимости..."
    });
    yield call(Api.createDependency, dependency);
    yield put({ type: DEPENDENCIES.GET.REQUEST });
    yield put({
      type: NOTIFY.SUCCESS,
      payload: "Зависимость создана успешно!"
    });
  } catch (err) {
    console.log(err);
    yield put({ type: NOTIFY.ERROR, payload: err.message });
  }
}

function* getDependencies(action: any) {
  try {
    const { data } = yield call(Api.getDependencies);
    yield put({ type: DEPENDENCIES.GET.SUCCESS, payload: data });
  } catch (err) {
    console.log(err);
    yield put({ type: NOTIFY.ERROR, payload: err.message });
  }
}

function* dependenciesAction() {
  yield takeLatest(DEPENDENCIES.CREATE.REQUEST, createDependency);
  yield takeLatest(DEPENDENCIES.GET.REQUEST, getDependencies);
}

function* dependencySaga() {
  yield all([fork(dependenciesAction)]);
}

export default dependencySaga;
