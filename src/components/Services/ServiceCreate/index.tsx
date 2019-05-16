import React from "react";
import { Row, Col } from "antd";
import AceEditor from "react-ace";
import "brace/mode/javascript";
import "brace/snippets/javascript";
import "brace/ext/language_tools";
import "brace/theme/monokai";
import ServiceCreateForm from "./ServiceCreateForm";
import {
  IServiceCreateParams,
  IServiceListItem,
  IServiceReducer
} from "../../../store/types/services";
import { IStore } from "../../../store/types";
import { Dispatch } from "redux";
import { action } from "typesafe-actions";
import { SERVICE, DEPENDENCIES } from "../../../store/actionTypes";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { IDependencyListState } from "../../../store/types/dependencies";

export interface IHandleCreateParams {
  type: "node" | "python";
  name: string;
  replicas: number;
}

interface IServiceCreateProps extends RouteComponentProps {
  createService: (params: IServiceCreateParams) => void;
  editService: (params: IServiceListItem) => void;
  getDependencies: () => void;
  dependenciesList: IDependencyListState;
  service: IServiceReducer;
}

class ServiceCreate extends React.Component<IServiceCreateProps> {
  state = {
    toEdit: undefined,
    program:
      'module.exports.program = function(args) { \n\treturn "Hello world!"; \n};  '
  };

  componentDidMount() {
    const { service, match, history, getDependencies } = this.props;
    getDependencies();
    const id = (match.params as any).id;
    if (id) {
      const serviceNow = service.serviceList.data!.find(el => el.id == id);
      if (service.serviceList.data!.length === 0 || !serviceNow) {
        history.push("/services/list");
        return;
      }
      const program = atob(serviceNow.fileBase64);
      this.setState({ toEdit: serviceNow, program });
    }
  }

  onChange = (program: string) => {
    this.setState({ program });
  };

  handleCreate = (params: IHandleCreateParams) => {
    const { state, props } = this;
    const fileBase64 = btoa(unescape(encodeURIComponent(state.program)));
    const toCreate: IServiceCreateParams = {
      fileBase64,
      ...params
    };
    props.createService(toCreate);
  };

  handleEdit = (params: IServiceListItem) => {
    const { state, props } = this;
    const fileBase64 = btoa(unescape(encodeURIComponent(state.program)));

    const toEdit: IServiceListItem = {
      ...params,
      fileBase64
    };
    props.editService(toEdit);
  };

  public render() {
    const { state, props } = this;
    return (
      <Row gutter={12} type="flex">
        <Col xl={{ span: 10, order: 1 }} sm={{ span: 24, order: 2 }}>
          <ServiceCreateForm
            dependencyList={props.dependenciesList}
            handleEdit={this.handleEdit}
            handleCreate={this.handleCreate}
            service={this.state.toEdit}
          />
        </Col>
        <Col xl={{ span: 14, order: 2 }} sm={{ span: 24, order: 1 }}>
          <AceEditor
            width="100%"
            mode="javascript"
            theme="monokai"
            name="blah2"
            onChange={this.onChange}
            value={state.program}
            fontSize={14}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
              tabSize: 2
            }}
          />
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state: IStore) => ({
  service: state.service,
  dependenciesList: state.dependencies.dependenciesList
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  editService: (params: IServiceListItem) =>
    dispatch(action(SERVICE.EDIT.REQUEST, params)),
  createService: (params: IServiceCreateParams) =>
    dispatch(action(SERVICE.CREATE.REQUEST, params)),
  getDependencies: () => dispatch(action(DEPENDENCIES.GET.REQUEST))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ServiceCreate));
