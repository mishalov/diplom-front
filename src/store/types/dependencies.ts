import { IStateObject } from "../types";

export interface IDependency {
  id: number;
  name: string;
  lang: "node" | "python";
  version: "string";
}

export interface IDependencyToCreate {
  name: string;
  lang: "node" | "python";
  version: "string";
}

export interface IDependencyListState extends IStateObject {
  data?: IDependency[];
}

export interface IDependencyReducer {
  dependenciesList: IDependencyListState;
}
