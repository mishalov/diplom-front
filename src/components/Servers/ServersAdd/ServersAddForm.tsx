import {
  Form,
  Input,
  message,
  //   Tooltip,
  //   Icon,
  //   Cascader,
  //   Select,
  //   Row,
  //   Col,
  //   Checkbox,
  Divider,
  InputNumber,
  Checkbox
  //   AutoComplete
} from "antd";
// import ReactInputMask from "react-input-mask";
import React from "react";
import { FormComponentProps } from "antd/lib/form";
import { IModalHandler } from "./ServersAddContainer";
import { IServerToCreate } from "../../../store/types/servers";
import { FormSubmitRow } from "../../Shared/FormSubmitRow/FormSubmitRow";

interface IServersAddForm extends FormComponentProps, IModalHandler {
  createServer: (serverToCreate: IServerToCreate) => void;
  hideModal?: () => void;
}

// const { Option } = Select;
// const AutoCompleteOption = AutoComplete.Option;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};
class ServersAddForm extends React.Component<IServersAddForm> {
  public handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.props.form.validateFields((err: Error, values: any) => {
      if (!err) {
        this.props.createServer(values);
        if (this.props.hideModal) {
          this.props.hideModal();
        }
      } else {
        message.error(err.message);
      }
    });
  };

  public render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item {...formItemLayout} label="Имя сервера">
          {getFieldDecorator("name", {
            rules: [
              {
                type: "string",
                message: "Значение не может быть именем!"
              },
              {
                required: true,
                message: "Пожалуйста, укажите имя сервера"
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="IP адрес">
          {getFieldDecorator("ip", {
            rules: [
              {
                type: "string",
                pattern: new RegExp(
                  "(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$"
                ),
                message: "Неверный IP адрес!"
              },
              {
                required: true,
                message: "Пожалуйста, укажите имя сервера"
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="Порт">
          {getFieldDecorator("port", {
            initialValue: 2377,
            rules: [
              {
                type: "number",
                message: "Неверный формат порта!"
              },
              {
                required: true,
                message: "Пожалуйста, укажите имя сервера"
              }
            ]
          })(<InputNumber />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="Узел-менеджер">
          {getFieldDecorator("leader", {
            initialValue: false
          })(<Checkbox />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="Описание">
          {getFieldDecorator("description", {})(<Input />)}
        </Form.Item>
        <Divider />
        <FormSubmitRow onCancel={this.props.hideModal} submitText="Создать" />
      </Form>
    );
  }
}

export default Form.create()(ServersAddForm);
