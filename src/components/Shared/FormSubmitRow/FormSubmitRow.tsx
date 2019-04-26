import React from "react";
import { Button } from "antd";
import "./FormSubmitRow.scss";

interface IFormSubmitRow {
  submitText?: string;
  cancelText?: string;
  hideCancel?: boolean;
  rightSide?: boolean;
  onCancel?: () => void;
}

class FormSubmitRow extends React.Component<IFormSubmitRow> {
  public render() {
    return (
      <div
        className="form-submit-row"
        style={{ flexDirection: this.props.rightSide ? "row-reverse" : "row" }}
      >
        <Button type="primary" htmlType="submit">
          {this.props.submitText || "Отправить"}
        </Button>
        <Button type="default" onClick={this.props.onCancel}>
          {this.props.cancelText || "Отмена"}
        </Button>
      </div>
    );
  }
}

export { FormSubmitRow };
