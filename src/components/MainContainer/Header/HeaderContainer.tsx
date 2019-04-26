import React from "react";
import { Layout, Menu, Icon } from "antd";
import { connect } from "react-redux";
import { HeaderUserSection } from "./HeaderUserSection/HeaderUserSection";
import { IUser } from "../../../store/types/auth";
import { IStore } from "../../../store/types";

const { Header } = Layout;

interface IHeaderContainerProps {
  user?: IUser;
  handleCollapseSider: () => void;
  siderCollapsed: boolean;
}

class HeaderContainer extends React.Component<IHeaderContainerProps> {
  public render() {
    const { props } = this;
    const { handleCollapseSider, siderCollapsed } = props;
    return (
      <Header className="header-container">
        <Menu
          theme="dark"
          mode="horizontal"
          className="header-container__menu"
          selectable={false}
        >
          <Menu.Item key="1" onClick={handleCollapseSider}>
            {siderCollapsed ? (
              <Icon type="menu-unfold" />
            ) : (
              <Icon type="menu-fold" />
            )}
          </Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
          <Menu.Item key="4" style={{ float: "right" }}>
            <HeaderUserSection
              name={`${props.user!.name} ${props.user!.surname}`}
              handleLogout={() => {
                alert("абыр");
              }}
            />
          </Menu.Item>
        </Menu>
      </Header>
    );
  }
}

/*
 <Header className="header">
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
      </Menu>
    </Header>

*/

const mapStateToProps = (state: IStore) => ({
  user: state.auth.user.data
});

export default connect(mapStateToProps)(HeaderContainer);
