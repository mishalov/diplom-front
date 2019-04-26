import { all, call, put, takeLatest, fork } from "redux-saga/effects";

import { Api } from "../../config/api";
import {
  SERVER_CREATION,
  NOTIFY,
  SERVERS_LIST,
  SERVER_DELETE,
  SERVER_BY_ID,
  SERVER_KEY_CREATE,
  SERVER_KEY_GET
} from "../actionTypes";
import * as R from "ramda";
import { IServerToCreate, IServer } from "../types/servers";

function* createServer(action: any) {
  try {
    const serverCreated: IServerToCreate = action.payload;
    yield put({ type: NOTIFY.LOADING, payload: "Создание сервера..." });
    const { data } = yield call(Api.createServer, serverCreated);
    yield put({ type: SERVER_CREATION.SUCCESS, payload: data });
    yield put({ type: NOTIFY.SUCCESS, payload: "Сервер успешно создан!" });
    yield put({ type: SERVERS_LIST.REQUEST });
  } catch (err) {
    console.log(err);
    yield put({ type: NOTIFY.ERROR, payload: err.message });
  }
}

function* deleteServer(action: any) {
  try {
    const { id } = action.payload;
    yield put({ type: NOTIFY.LOADING, payload: "Удаление сервера..." });
    const { data } = yield call(Api.deleteServer, id);
    yield put({ type: NOTIFY.SUCCESS, payload: data });
    yield put({ type: SERVERS_LIST.REQUEST });
  } catch (err) {
    yield put({ type: NOTIFY.ERROR, payload: err.message });
  }
}

function* getServerById(action: any) {
  try {
    const { id } = action.payload;
    const { data } = yield call(Api.getServer, id);
    yield put({ type: SERVER_BY_ID.SUCCESS, payload: data });
  } catch (err) {
    yield put({ type: NOTIFY.ERROR, payload: err.message });
  }
}

function* getServersList(action: any) {
  try {
    const serversList: IServer[] = (yield call(Api.getServersList)).data;
    yield put({ type: SERVERS_LIST.SUCCESS, payload: serversList });
  } catch (err) {
    yield put({ type: NOTIFY.ERROR, payload: err.message });
  }
}

function* getServerKey(action: any) {
  try {
    const { id } = action.payload;
    const { data } = yield call(Api.getServerKey, id);
    yield put({
      type: SERVER_KEY_GET.SUCCESS,
      payload: R.isEmpty(data) || data === null ? null : data
    });
  } catch (err) {
    yield put({ type: NOTIFY.ERROR, payload: err.message });
  }
}

function* changeServerKey(action: any) {
  try {
    const { id, hash } = action.payload;
    const { data } = yield call(Api.changeServerKey, id, hash);
    yield put({ type: NOTIFY.SUCCESS, payload: data });
    yield put({ type: SERVER_KEY_GET.REQUEST, payload: { id } });
  } catch (err) {
    yield put({ type: NOTIFY.ERROR, payload: err.message });
  }
}

function* createServerAction() {
  yield takeLatest(SERVER_CREATION.REQUEST, createServer);
  yield takeLatest(SERVERS_LIST.REQUEST, getServersList);
  yield takeLatest(SERVER_DELETE.REQUEST, deleteServer);
  yield takeLatest(SERVER_BY_ID.REQUEST, getServerById);
  yield takeLatest(SERVER_KEY_CREATE.REQUEST, changeServerKey);
  yield takeLatest(SERVER_KEY_GET.REQUEST, getServerKey);
}

function* serverSaga() {
  yield all([fork(createServerAction)]);
}

export default serverSaga;
