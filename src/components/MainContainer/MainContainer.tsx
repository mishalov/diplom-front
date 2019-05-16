import React from "react";
import HeaderContainer from "./Header/HeaderContainer";
import { Layout, Divider } from "antd";
import { Route, withRouter, Switch } from "react-router-dom";
import SiderContainer from "./Sider/SiderContainer";
import ServersListContainer from "../Servers/ServersList/ServersListContainer";
import ServerControlContainer from "../Servers/ServerControl/ServerControlContainer";
import ServicesList from "../Services/ServiceList/ServicesList";
import { makeTitle } from "../../config/titles";
import ServiceCreate from "../Services/ServiceCreate";
import ServicePage from "../Services/ServicePage";
import DependenciesList from "../Services/DependenciesList";
const { Content } = Layout;

class MainContainer extends React.Component<any> {
  state = { siderCollapsed: false };

  public handleCollapseSider = () => {
    const { siderCollapsed } = this.state;
    this.setState({ siderCollapsed: !siderCollapsed });
  };

  public render() {
    const { siderCollapsed } = this.state;
    return (
      <Layout>
        <HeaderContainer
          handleCollapseSider={this.handleCollapseSider}
          siderCollapsed={siderCollapsed}
        />
        <Layout>
          <SiderContainer siderCollapsed={siderCollapsed} />
          <Content className="content-area">
            <h2> {makeTitle(this.props.location.pathname)}</h2>
            <Divider />
            <Switch>
              <Route path="/servers/list" exact={true}>
                <ServersListContainer />
              </Route>
              <Route path="/servers/report" exact={true}>
                <p> здесь будет страница отчетов по серверам</p>
              </Route>
              <Route path="/servers/:id/control" exact={true}>
                <ServerControlContainer />
              </Route>
              <Route path="/services/list" exact={true}>
                <ServicesList />
              </Route>
              <Route path="/services/create" exact={true}>
                <ServiceCreate />
              </Route>
              <Route path="/services/dependencies" exact={true}>
                <DependenciesList />
              </Route>
              <Route path="/services/:id/edit" exact={true}>
                <ServiceCreate />
              </Route>
              <Route path="/services/:id" exact={true}>
                <ServicePage />
              </Route>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(MainContainer);
