import React from "react";
import { Row, Col, Button, Icon } from "antd";

interface IControlLine {
  showCreate: () => void;
}

class ControlLine extends React.Component<IControlLine> {
  public render() {
    return (
      <Row className="control-line">
        <Col span={3}>
          <Button type="primary" onClick={this.props.showCreate}>
            <Icon type="plus" /> Добавить сервер
          </Button>
        </Col>
      </Row>
    );
  }
}

export { ControlLine };
