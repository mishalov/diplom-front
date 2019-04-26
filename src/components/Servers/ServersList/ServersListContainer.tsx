import React from "react";
import { ControlLine } from "./ControlLine";
import { Modal, message } from "antd";
import ServersAddContainer from "../ServersAdd/ServersAddContainer";
import { ServersListTable } from "./ServersListTable";
import { Dispatch } from "redux";
import { action } from "typesafe-actions";
import { connect } from "react-redux";
import "./ServersList.scss";
import { IStore } from "../../../store/types";
import { SERVERS_LIST, SERVER_DELETE } from "../../../store/actionTypes";
import { IServerListState } from "../../../store/types/servers";

interface IServersListContainer {
  serversList: IServerListState;
  getServerList: () => void;
  deleteServer: (id: number) => void;
}

class ServersListContainer extends React.Component<IServersListContainer> {
  public state = {
    createVisible: false,
    dismissionTime: 0
  };

  public componentDidMount() {
    this.props.getServerList();
  }

  public showCreate = () => {
    this.setState({ createVisible: true });
  };

  public hideCreate = () => {
    this.setState({ createVisible: false });
  };

  public handleOk = (submitHandler: () => Promise<string>) => {
    submitHandler()
      .then(value => {
        message.success(value);
        this.hideCreate();
      })
      .catch(er => message.error(er));
  };

  public render() {
    return (
      <div className="servers-list">
        <ControlLine showCreate={this.showCreate} />
        <Modal
          visible={this.state.createVisible}
          title="Создание нового сервера"
          onCancel={this.hideCreate}
          footer={null}
        >
          <ServersAddContainer hideModal={this.hideCreate} />
        </Modal>
        <ServersListTable
          serversList={this.props.serversList}
          deleteServer={this.props.deleteServer}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: IStore) => ({
  serversList: state.server.serverList
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getServerList: () => {
    dispatch(action(SERVERS_LIST.REQUEST));
  },
  deleteServer: (id: number) => {
    dispatch(action(SERVER_DELETE.REQUEST, { id }));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServersListContainer);
