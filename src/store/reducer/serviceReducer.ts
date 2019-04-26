import { Reducer } from "redux";
import { IAuthReducer } from "../types/auth";
import { AUTH, REGISTER, SERVICE } from "../actionTypes";
import { IServiceReducer } from "../types/services";

// Type-safe initialState!
const initialState: IServiceReducer = {
  serviceList: { loading: true, solved: false, data: [] },
  serviceEdit: { loading: false, solved: false }
};

// Thanks to Redux 4's much simpler typings, we can take away a lot of typings on the reducer side,
// everything will remain type-safe.
const serviceReducer: Reducer<IServiceReducer> = (
  state = initialState,
  action
): IServiceReducer => {
  const { type, payload } = action;
  switch (type) {
    case SERVICE.LIST.REQUEST:
      return {
        ...state,
        serviceList: { solved: false, loading: true }
      };

    case SERVICE.LIST.SUCCESS:
      return {
        ...state,
        serviceList: {
          solved: true,
          loading: false,
          data: payload,
          error: undefined
        }
      };
    case SERVICE.LIST.ERROR:
      return {
        ...state,
        serviceList: {
          solved: false,
          loading: false,
          data: undefined,
          error: payload
        }
      };

    case SERVICE.EDIT.REQUEST:
      return {
        ...state,
        serviceEdit: { solved: false, loading: true }
      };

    case SERVICE.EDIT.SUCCESS:
      return {
        ...state,
        serviceEdit: {
          solved: true,
          loading: false,
          data: payload,
          error: undefined
        }
      };
    default: {
      return state;
    }
  }
};

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export { serviceReducer };
