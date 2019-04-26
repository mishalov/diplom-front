import React from "react";
import ServiceCard from "../ServiceCard/ServiceCard";
import { IServiceListState } from "../../../store/types/services";
import { IStore } from "../../../store/types";
import { Dispatch } from "redux";
import { SERVICE } from "../../../store/actionTypes";
import { connect } from "react-redux";
import { Spin } from "antd";
import { withRouter, RouteComponentProps } from "react-router";
import ServiceProgramCard from "../ServiceProgramCard";
import "./ServicePage.scss";

interface IServicePageProps extends RouteComponentProps {
  serviceList: IServiceListState;
  getServiceList: () => void;
}

class ServicePage extends React.Component<IServicePageProps> {
  public componentDidMount() {
    const { serviceList, getServiceList } = this.props;
    console.log("serviceList: ", serviceList);
    if (!serviceList.solved) {
      getServiceList();
    }
  }
  public render() {
    const { serviceList, match, history } = this.props;
    if (serviceList.loading || !serviceList.data) {
      return <Spin />;
    }
    const currentService = serviceList.data.find(
      service => service.id == (match.params as any).id
    );
    if (!currentService) {
      history.push("/services/list");
      return null;
    }
    return (
      <div className="service-page">
        <ServiceCard service={currentService} />
        <ServiceProgramCard service={currentService} />
      </div>
    );
  }
}

const mapStateToProps = (state: IStore) => ({
  serviceList: state.service.serviceList
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getServiceList: () => dispatch({ type: SERVICE.LIST.REQUEST })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ServicePage));
