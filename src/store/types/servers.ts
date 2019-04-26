import { IStateObject, IBackendDateFormat } from "../types";

// Типы данных DTO
export interface IServer {
  id: number;
  name: string;
  description?: string;
  created: IBackendDateFormat;
  ip: string;
}

export interface IServerToCreate {
  name: string;
  description?: string;
  ip: string;
}

export interface IServerKey {
  valid: boolean;
  uploadedAt: IBackendDateFormat;
}

export interface IServerCreation {
  answer: string;
}

// Интерфейсы состояний (State)
export interface IServerKeyState extends IStateObject {
  data?: IServerKey;
}

export interface IServerListState extends IStateObject {
  data?: IServer[];
}

export interface IServerCreationState extends IStateObject {
  data?: IServerCreation;
}

export interface IServerByIdState extends IStateObject {
  data?: IServer;
  serverKey?: IServerKeyState;
}

// Интерфейс редюсера серверов

export interface IServerReducer {
  serverList: IServerListState;
  serverCreation: IServerCreationState;
  serverById: IServerByIdState;
  serverKeyInfo: IServerKeyState;
}
