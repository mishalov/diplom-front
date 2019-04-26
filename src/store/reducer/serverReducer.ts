import { Reducer } from "redux";
import {
  SERVER_CREATION,
  SERVERS_LIST,
  SERVER_BY_ID,
  SERVER_KEY_GET
} from "../actionTypes";
import { IServerReducer } from "../types/servers";

// Type-safe initialState!
const initialState: IServerReducer = {
  serverCreation: { solved: false, loading: false, error: null },
  serverList: { solved: false, loading: false, error: null },
  serverKeyInfo: { solved: false, loading: false, error: null },
  serverById: {
    solved: false,
    loading: false,
    error: null,
    serverKey: {
      solved: false,
      loading: false,
      error: null
    }
  }
};

// Thanks to Redux 4's much simpler typings, we can take away a lot of typings on the reducer side,
// everything will remain type-safe.
const serverReducer: Reducer<IServerReducer> = (
  state = initialState,
  action
) => {
  const { type, payload } = action;
  switch (type) {
    // Создание сервера
    case SERVER_CREATION.REQUEST:
      return {
        ...state,
        serverCreation: { solved: false, loading: true }
      };

    case SERVER_CREATION.SUCCESS:
      return {
        ...state,
        serverCreation: {
          solved: true,
          loading: false,
          data: payload,
          error: undefined
        }
      };

    case SERVER_CREATION.ERROR:
      return {
        ...state,
        usserverCreationer: {
          solved: false,
          loading: false,
          data: undefined,
          error: payload
        }
      };
    // Получение всех серверов

    case SERVERS_LIST.REQUEST:
      return {
        ...state,
        serverList: { solved: false, loading: true }
      };

    case SERVERS_LIST.SUCCESS:
      return {
        ...state,
        serverList: {
          solved: true,
          loading: false,
          data: payload,
          error: undefined
        }
      };

    case SERVERS_LIST.ERROR:
      return {
        ...state,
        serverList: {
          solved: false,
          loading: false,
          data: undefined,
          error: payload
        }
      };

    // SERVER по ID
    case SERVER_BY_ID.REQUEST:
      return {
        ...state,
        serverById: { solved: false, loading: true }
      };

    case SERVER_BY_ID.SUCCESS:
      return {
        ...state,
        serverById: {
          solved: true,
          loading: false,
          data: payload,
          error: undefined
        }
      };

    case SERVER_BY_ID.ERROR:
      return {
        ...state,
        serverById: {
          solved: false,
          loading: false,
          data: undefined,
          error: payload
        }
      };

    // КЛЮЧ СЕРВЕРА по ID
    case SERVER_KEY_GET.REQUEST:
      return {
        ...state,
        serverKeyInfo: { solved: false, loading: true }
      };

    case SERVER_KEY_GET.SUCCESS:
      return {
        ...state,
        serverKeyInfo: {
          solved: true,
          loading: false,
          data: payload,
          error: undefined
        }
      };

    case SERVER_KEY_GET.ERROR:
      return {
        ...state,
        serverKeyInfo: {
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
export { serverReducer };
