import React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { Row, Col } from "antd";
import ServerGeneralWidget from "./Widgets/ServerGeneralWidget";

class ServerControlContainer extends React.Component<RouteComponentProps> {
  public render() {
    const id = (this.props.match.params as { id: number }).id;

    return (
      <div>
        <Row gutter={12}>
          <Col md={12} sm={12} lg={8} xs={24}>
            <ServerGeneralWidget id={id} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(ServerControlContainer);
