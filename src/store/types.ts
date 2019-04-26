import { IAuthReducer } from "./types/auth";
import { IServerReducer } from "./types/servers";
import { IServiceReducer } from "./types/services";

export interface IStateObject {
  loading: boolean;
  solved: boolean;
  data?: any;
  error?: any;
}

export interface ISagaPayload {
  type: string;
  payload: any;
}

export interface IActionArgs {
  type: string;
}

export interface INotice {
  type: string;
  message: string;
}

export interface IBackendDateFormat {
  date: string;
  timezone: string;
  timezone_type: number;
}

export interface IStore {
  auth: IAuthReducer;
  server: IServerReducer;
  notice: INotice;
  service: IServiceReducer;
}
