import { Reducer } from "redux";
import { IAuthReducer } from "../types/auth";
import { AUTH, REGISTER } from "../actionTypes";

// Type-safe initialState!
const initialState: IAuthReducer = {
  user: { solved: false, loading: false }
};

// Thanks to Redux 4's much simpler typings, we can take away a lot of typings on the reducer side,
// everything will remain type-safe.
const authReducer: Reducer<IAuthReducer> = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case AUTH.REQUEST:
      return {
        ...state,
        user: { solved: false, loading: true }
      };

    case AUTH.SUCCESS:
      return {
        ...state,
        user: { solved: true, loading: false, data: payload, error: undefined }
      };
    case AUTH.ERROR:
      return {
        ...state,
        user: { solved: false, loading: false, data: undefined, error: payload }
      };

    case REGISTER.REQUEST:
      return {
        ...state,
        registred: { solved: false, loading: true }
      };

    case REGISTER.SUCCESS:
      return {
        ...state,
        registred: {
          solved: true,
          loading: false,
          data: payload,
          error: undefined
        }
      };
    case REGISTER.ERROR:
      return {
        ...state,
        registred: {
          solved: false,
          loading: false,
          data: undefined,
          error: payload
        }
      };

    default: {
      return state;
    }
  }
};

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export { authReducer };
