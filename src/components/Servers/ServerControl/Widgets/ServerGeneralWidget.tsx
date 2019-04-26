import React from "react";
import { Card, Table } from "antd";
import dayjs from "dayjs";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { action } from "typesafe-actions";
import { IServerByIdState } from "../../../../store/types/servers";
import { IStore } from "../../../../store/types";
import { SERVER_BY_ID } from "../../../../store/actionTypes";

const cols = [
  {
    dataIndex: "title",
    key: "title"
  },
  {
    dataIndex: "value",
    key: "value"
  }
];

interface IServerGeneralWidget {
  serverById: IServerByIdState;
  getServerById: (id: number) => void;
  id: number;
}

class ServerGeneralWidget extends React.Component<IServerGeneralWidget> {
  public componentDidMount() {
    this.props.getServerById(this.props.id);
  }
  public render() {
    const serverById = this.props.serverById.data
      ? this.props.serverById.data
      : {
          name: "",
          id: "",
          ip: "",
          description: "",
          created: { date: new Date() }
        };
    const tableData = [
      {
        key: 0,
        title: "Название",
        value: serverById.name
      },
      {
        key: 1,
        title: "IP - адрес",
        value: serverById.ip
      },
      {
        key: 2,
        title: "Создан",
        value: dayjs(serverById.created.date).format("DD-MM-YYYY HH-mm")
      },
      {
        key: 3,
        title: "Описание",
        value: serverById.description
      }
    ];
    return (
      <Card title="Основные данные" extra={<a href="#">Изменить</a>}>
        <Table
          showHeader={false}
          columns={cols}
          dataSource={tableData}
          pagination={false}
          className="mb-5"
          loading={this.props.serverById.loading}
        />
      </Card>
    );
  }
}
const mapStateToProps = (state: IStore) => ({
  serverById: state.server.serverById
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getServerById: (id: number) => dispatch(action(SERVER_BY_ID.REQUEST, { id }))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServerGeneralWidget);
