import axios from "axios";
import { IUser, IUserAuthData } from "../store/types/auth";
import { IServerToCreate } from "../store/types/servers";
import {
  IServiceCreateParams,
  IServiceListItem
} from "../store/types/services";

interface IRequestParams {
  url: string;
  data?: any;
  method: "post" | "get" | "put" | "delete";
  headers?: object;
}

const request = (params: IRequestParams) => {
  let str = "";
  const { method, url, data } = params;
  if (method === "get") {
    str += "?";
    for (const key in data) {
      if (data[key]) {
        if (str !== "") {
          str += "&";
        }
        str += key + "=" + encodeURIComponent(data[key]);
      }
    }
  }
  return axios({
    data,
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      "Content-Type": "application/json"
    },
    method,
    url: "http://" + "localhost:8000/api/" + url + str
  });
};

class Api {
  /**Действия с пользователями */
  public static register = (user: IUser) =>
    request({ url: "register", data: { user }, method: "post" });
  public static login = (data: IUserAuthData) =>
    request({ url: "login_check", data, method: "post" });
  public static getMe = () => request({ url: "auth", method: "get" });

  /**Действия с серверами */
  public static createServer = (data: IServerToCreate) =>
    request({ url: "server", data: { server: data }, method: "post" });
  public static getServersList = () =>
    request({ url: "server", data: null, method: "get" });
  public static deleteServer = (id: number) =>
    request({ url: "server", data: { id }, method: "delete" });
  public static getServer = (id: number) =>
    request({ url: `server/${id}`, method: "get" });
  public static changeServerKey = (id: number, hash: string) =>
    request({ url: `server/${id}/key`, method: "post", data: { hash } });
  public static getServerKey = (id: number) =>
    request({ url: `server/${id}/key`, method: "get" });

  /**Действия с сервисами */
  public static createService = (service: IServiceCreateParams) =>
    request({ url: "services", method: "post", data: { service } });
  public static getServiceList = () =>
    request({ url: "services", method: "get" });
  public static removeService = (id: number) =>
    request({ url: `services/${id}`, method: "delete" });
  public static updateService = (id: number, service: IServiceListItem) =>
    request({ url: `services/${id}`, method: "post", data: { service } });
}

export { Api };
