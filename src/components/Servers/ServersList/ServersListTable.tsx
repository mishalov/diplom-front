import { Table, Divider, Icon, Popconfirm, Checkbox } from "antd";
import React from "react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { IBackendDateFormat } from "../../../store/types";
import { IServerListState, IServer } from "../../../store/types/servers";

interface IServersListTable {
  serversList: IServerListState;
  deleteServer: (id: number) => void;
}

class ServersListTable extends React.Component<IServersListTable> {
  public render() {
    const columns = [
      {
        title: "Название",
        dataIndex: "name",
        key: "name",
        render: (text: string) => <a href="javascript:;">{text}</a>
      },
      {
        title: "Менеджер",
        dataIndex: "leader",
        key: "leader",
        render: (isLeader: boolean) => (
          <Checkbox checked={isLeader} disabled={true} />
        )
      },
      {
        title: "IP адрес",
        dataIndex: "ip",
        key: "ip"
      },
      {
        title: "Дата создания",
        dataIndex: "created",
        key: "created",
        render: (created: IBackendDateFormat) =>
          dayjs(created.date).format("DD-MM-YYYY HH:mm:ss") // display
      },
      {
        title: "Действия",
        key: "actions",
        render: (name: string, record: IServer) => (
          <span>
            <Link to={`/servers/${record.id}/control`}>
              Управление 一 {record.name}
            </Link>
            <Divider type="vertical" />
            <Popconfirm
              title="Вы уверены？"
              icon={<Icon type="question-circle-o" style={{ color: "red" }} />}
              cancelText="Отмена"
              okText="Удалить"
              onConfirm={() => {
                this.props.deleteServer(record.id);
              }}
            >
              <a href="javascript:;">Удалить</a>
            </Popconfirm>

            <Divider type="vertical" />
          </span>
        )
      }
    ];

    return (
      <Table
        columns={columns}
        dataSource={this.props.serversList.data}
        loading={this.props.serversList.loading}
        locale={{ emptyText: "Серверов нет" }}
        rowKey="id"
      />
    );
  }
}

export { ServersListTable };
