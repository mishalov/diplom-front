import React from "react";
import { Layout, Menu, Icon } from "antd";
import { Link } from "react-router-dom";
import { makeTitle } from "../../../config/titles";
import "./SiderContainer.scss";
const { SubMenu } = Menu;
const { Sider } = Layout;

interface ISiderContainer {
  siderCollapsed: boolean;
}

class SiderContainer extends React.Component<ISiderContainer> {
  public render() {
    const { siderCollapsed } = this.props;
    return (
      <Sider width={siderCollapsed ? 0 : 200}>
        <div className="sider-container">
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            className="sider-container__menu"
            style={{ borderRight: 0 }}
          >
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="hdd" />
                  Сервер
                </span>
              }
            >
              <Menu.Item key="1">
                <Link to="/servers/list">{makeTitle("/servers/list")}</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/servers/reports">
                  {makeTitle("/servers/reports")}
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="cloud-upload" />
                  Сервисы
                </span>
              }
            >
              <Menu.Item key="5">
                <Link to="/services/list">{makeTitle("/services/list")}</Link>
              </Menu.Item>
            </SubMenu>

            <SubMenu
              key="sub4"
              title={
                <span>
                  <Icon type="user" />
                  Пользователи
                </span>
              }
            />
            <Menu.Item key="sub3">
              <span>
                <Icon type="notification" />
                Отчеты
              </span>
            </Menu.Item>
          </Menu>
        </div>
      </Sider>
    );
  }
}

export default SiderContainer;
