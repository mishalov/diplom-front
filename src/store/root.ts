import {
  combineReducers,
  Action,
  AnyAction,
  Dispatch,
  compose,
  applyMiddleware,
  createStore
} from "redux";
import { IStore } from "./types";
import { authReducer } from "./reducer/authReducer";
import createSagaMiddleware from "redux-saga";
import authSaga from "./actions/authSaga";
import { serverReducer } from "./reducer/serverReducer";
import serverSaga from "./actions/serverSaga";
import serviceSaga from "./actions/serviceSaga";
import logger from "redux-logger";
import { noticeReducer } from "./reducer/noticeReducer";
import { serviceReducer } from "./reducer/serviceReducer";
import { dependenciesReducer } from "./reducer/dependenciesReducer";
import dependencySaga from "./actions/dependenciesSaga";
// Whenever an action is dispatched, Redux will update each top-level application state property
// using the reducer with the matching name. It's important that the names match exactly, and that
// the reducer acts on the corresponding ApplicationState property type.

export const rootReducer = combineReducers<IStore>({
  auth: authReducer,
  server: serverReducer,
  notice: noticeReducer,
  service: serviceReducer,
  dependencies: dependenciesReducer
});

// The top-level state object

// Additional props for connected React components. This prop is passed by default with `connect()`
export interface IConnectedReduxProps<A extends Action = AnyAction> {
  dispatch: Dispatch<A>;
}

// Here we use `redux-saga` to trigger actions asynchronously. `redux-saga` uses something called a
// "generator function", which you can read about here:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*

const sagaMiddleware = createSagaMiddleware();

// const logger = createLogger({
//   collapsed: true
// });

const middleware = [sagaMiddleware, logger];
const createStoreWithMiddle = compose(applyMiddleware(...middleware))(
  createStore
);

export const store = createStoreWithMiddle(rootReducer, {});
sagaMiddleware.run(authSaga);
sagaMiddleware.run(serviceSaga);
sagaMiddleware.run(serverSaga);
sagaMiddleware.run(dependencySaga);
