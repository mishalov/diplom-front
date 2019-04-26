import React from "react";
import ServersAddForm from "./ServersAddForm";
import { Dispatch } from "redux";
import { action } from "typesafe-actions";
import { connect } from "react-redux";
import { SERVER_CREATION } from "../../../store/actionTypes";
import { IStore } from "../../../store/types";
import { IServerToCreate } from "../../../store/types/servers";

interface IServersAddContainer {
  createServer: (serverToCreate: IServerToCreate) => void;
}

export interface IModalHandler extends IServersAddContainer {
  hideModal?: () => void;
}

class ServersAddContainer extends React.Component<IModalHandler> {
  public render() {
    return <ServersAddForm {...this.props} />;
  }
}

const mapStateToProps = (state: IStore) => ({
  serverCreation: state.server.serverCreation
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  createServer: (serverToCreate: IServerToCreate) => {
    dispatch(action(SERVER_CREATION.REQUEST, serverToCreate));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServersAddContainer);
