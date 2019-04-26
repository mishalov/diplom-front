import { Reducer } from "redux";
import { INotice } from "../types";
import { NOTIFY } from "../actionTypes";

// Type-safe initialState!
const initialState: INotice = {
  type: "",
  message: ""
};

// Thanks to Redux 4's much simpler typings, we can take away a lot of typings on the reducer side,
// everything will remain type-safe.
const noticeReducer: Reducer<INotice> = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case NOTIFY.DESTROY:
      return { type: "destroy", message: payload };
    case NOTIFY.INFO:
      return { type: "info", message: payload };
    case NOTIFY.LOADING:
      return { type: "loading", message: payload };
    case NOTIFY.SUCCESS:
      return { type: "success", message: payload };
    case NOTIFY.ERROR:
      return { type: "error", message: payload };
    default: {
      return state;
    }
  }
};

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export { noticeReducer };
