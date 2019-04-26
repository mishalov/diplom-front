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
import { SERVICE } from "../../../store/actionTypes";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";

export interface IHandleCreateParams {
  type: "node" | "python" | "ruby";
  name: string;
  replicas: number;
}

interface IServiceCreateProps extends RouteComponentProps {
  createService: (params: IServiceCreateParams) => void;
  editService: (params: IServiceListItem) => void;
  service: IServiceReducer;
}

class ServiceCreate extends React.Component<IServiceCreateProps> {
  state = {
    toEdit: undefined,
    program:
      'module.exports.program = function(args) { \n\treturn "я родился!"; \n};  '
  };

  componentDidMount() {
    const { service, match, history } = this.props;
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
    const { state } = this;
    return (
      <Row gutter={12} type="flex">
        <Col xl={{ span: 10, order: 1 }} sm={{ span: 24, order: 2 }}>
          <ServiceCreateForm
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

const mapStateToProps = (state: IStore) => ({ service: state.service });
const mapDispatchToProps = (dispatch: Dispatch) => ({
  editService: (params: IServiceListItem) =>
    dispatch(action(SERVICE.EDIT.REQUEST, params)),
  createService: (params: IServiceCreateParams) =>
    dispatch(action(SERVICE.CREATE.REQUEST, params))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ServiceCreate));
