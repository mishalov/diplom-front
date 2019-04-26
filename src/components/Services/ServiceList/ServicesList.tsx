import React from "react";
import ServiceCard from "../ServiceCard/ServiceCard";
import { Button, Icon, Spin } from "antd";
import { Link } from "react-router-dom";
import { IStore } from "../../../store/types";
import { IServiceListState } from "../../../store/types/services";
import { Dispatch } from "redux";
import { action } from "typesafe-actions";
import { SERVICE } from "../../../store/actionTypes";
import { connect } from "react-redux";

interface IServiceListProps {
  serviceList: IServiceListState;
  getServiceList: () => void;
}

class ServicesList extends React.Component<IServiceListProps> {
  public componentDidMount() {
    this.props.getServiceList();
  }

  public createList = () => {
    const { serviceList } = this.props;
    if (serviceList.loading || !serviceList.solved || !serviceList.data)
      return <Spin />;
    return serviceList.data.map(service => (
      <ServiceCard service={service} key={service.id} />
    ));
  };

  public render() {
    return (
      <div>
        <div className="control-line">
          <Link to="/services/create">
            <Button type="primary">
              <Icon type="plus" />
              Создать сервис
            </Button>
          </Link>
        </div>
        {this.createList()}
      </div>
    );
  }
}

const mapStateToProps = (state: IStore) => ({
  serviceList: state.service.serviceList
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getServiceList: () => dispatch(action(SERVICE.LIST.REQUEST))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServicesList);
