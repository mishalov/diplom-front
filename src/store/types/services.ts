import { IStateObject, IBackendDateFormat } from "../types";

// Типы данных DTO
export interface IService extends IServiceListItem {}

export interface IServiceListItem {
  id: number;
  name: string;
  address: string;
  replicas: number;
  status: string;
  port: string;
  type: string;
  fileBase64: string;
}

export interface IServiceCreateParams {
  name: string;
  type: "node" | "python" | "ruby";
  replicas: number;
  fileBase64: string;
}

export interface IServiceListState extends IStateObject {
  data?: IServiceListItem[];
}

export interface IServiceEditState extends IStateObject {
  data?: IServiceListItem;
}

// Интерфейс редюсера серверов

export interface IServiceReducer {
  serviceList: IServiceListState;
  serviceEdit: IServiceEditState;
}

//   ////////////////////////

// export interface IServerToCreate {
//   name: string;
//   description?: string;
//   ip: string;
// }

// export interface IServerKey {
//   valid: boolean;
//   uploadedAt: IBackendDateFormat;
// }

// export interface IServerCreation {
//   answer: string;
// }

// // Интерфейсы состояний (State)
// export interface IServerKeyState extends IStateObject {
//   data?: IServerKey;
// }

// export interface IServerListState extends IStateObject {
//   data?: IServer[];
// }

// export interface IServerCreationState extends IStateObject {
//   data?: IServerCreation;
// }

// export interface IServerByIdState extends IStateObject {
//   data?: IServer;
//   serverKey?: IServerKeyState;
// }
