import { Reducer } from "redux";
import { IServerReducer } from "../types/servers";
import { IDependencyReducer } from "../types/dependencies";
import { DEPENDENCIES } from "../actionTypes";

// Type-safe initialState!
const initialState: IDependencyReducer = {
  dependenciesList: { loading: false, solved: false }
};

// Thanks to Redux 4's much simpler typings, we can take away a lot of typings on the reducer side,
// everything will remain type-safe.
const dependenciesReducer: Reducer<IDependencyReducer> = (
  state = initialState,
  action
) => {
  const { type, payload } = action;
  switch (type) {
    // Получение списка зависимостей

    case DEPENDENCIES.GET.REQUEST:
      return {
        ...state,
        dependenciesList: { solved: false, loading: true }
      };

    case DEPENDENCIES.GET.SUCCESS:
      return {
        ...state,
        dependenciesList: {
          solved: true,
          loading: false,
          data: payload,
          error: undefined
        }
      };

    case DEPENDENCIES.GET.ERROR:
      return {
        ...state,
        dependenciesList: {
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
export { dependenciesReducer };
