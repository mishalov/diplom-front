import React from "react";
import { Card, Table, Icon, Dropdown, Menu, Popconfirm } from "antd";
import "./ServiceCard.scss";
import { IServiceListItem } from "../../../store/types/services";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { IStore } from "../../../store/types";
import { SERVICE } from "../../../store/actionTypes";
import { Dispatch } from "redux";
import { connect } from "react-redux";

const { Column } = Table;
const linkInListStyle: React.CSSProperties = {
  position: "absolute",
  width: "100%",
  height: "100%",
  padding: "5px 12px"
};

const menu = (
  service: IServiceListItem,
  handleDelete: (id: number) => void
) => {
  const onDeleteConfirm = () => {
    handleDelete(service.id);
  };
  const changeStatusItem = service.status ? (
    <Menu.Item>Остановить</Menu.Item>
  ) : (
    <Menu.Item>Запустить</Menu.Item>
  );
  return (
    <Menu>
      <Menu.Item>
        <Link to={`/services/${service.id}/edit`}>Изменить</Link>
      </Menu.Item>
      <Menu.Item
        style={{ position: "relative", height: "32px", padding: "0px" }}
      >
        <Popconfirm
          title="Вы действительно хотите удалить этот сервис?"
          onConfirm={onDeleteConfirm}
          okText="Да"
          cancelText="Нет"
        >
          <div style={linkInListStyle}>Удалить</div>
        </Popconfirm>
      </Menu.Item>

      {changeStatusItem}
    </Menu>
  );
};

interface IServiceCardProps extends RouteComponentProps {
  service: IServiceListItem;
  removeService: (id: number) => void;
}

class ServiceCard extends React.Component<IServiceCardProps> {
  public render() {
    const { service, removeService, history } = this.props;
    const removeWithRedirect = (id: number) => {
      removeService(id);
      history.push("/services/list");
    };
    const data = [
      {
        title: "Состояние",
        value: service.status ? (
          <>
            <Icon type="check-circle" className="service-card__icon--online" />
            Онлайн
          </>
        ) : (
          <>
            <Icon type="stop" className="service-card__icon--offline" />
            Остановлен
          </>
        )
      },
      { title: "Реплик", value: service.replicas },
      { title: "Адрес", value: `http://${service.address}:${service.port}` },
      { title: "Тип", value: service.type }
    ];
    return (
      <Card
        title={<Link to={`/services/${service.id}`}>{service.name}</Link>}
        className="service-card"
        extra={
          <Dropdown
            overlay={menu(service, removeWithRedirect)}
            placement="bottomLeft"
          >
            <a>
              <Icon type="bars" />
            </a>
          </Dropdown>
        }
      >
        <Table dataSource={data} pagination={false} showHeader={false}>
          <Column dataIndex="title" />
          <Column dataIndex="value" />
        </Table>
      </Card>
    );
  }
}

const mapStateToProps = (state: IStore) => ({});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  removeService: (id: number) =>
    dispatch({ type: SERVICE.REMOVE.REQUEST, payload: id })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ServiceCard));
