import React, { CSSProperties, SyntheticEvent, FormEvent } from "react";
import { Form, Input, InputNumber, Select, Button, Row } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { IHandleCreateParams } from ".";
import { IServiceListItem } from "../../../store/types/services";

const Item = Form.Item;

const inputStyle: CSSProperties = {
  width: "100%"
};

const formItemLayout = {
  labelCol: {
    xs: { span: 24, offset: 2 },
    sm: { span: 6, offset: 2 },
    md: { span: 6, offset: 0 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 18 }
  }
};

interface IServiceCreateFormProps extends FormComponentProps {
  handleCreate: (params: IHandleCreateParams) => void;
  handleEdit: (params: IServiceListItem) => void;
  service?: IServiceListItem;
}

class ServiceCreateForm extends React.Component<IServiceCreateFormProps> {
  public render() {
    const { form, service, handleCreate, handleEdit } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form
        labelAlign="left"
        {...formItemLayout}
        onSubmit={(e: SyntheticEvent<FormEvent>) => {
          e.preventDefault();
          form.validateFields((err, values) => {
            if (!err) {
              if (service) {
                handleEdit({ ...service, ...values });
              } else {
                handleCreate(values);
              }
            }
          });
        }}
      >
        <Item label="Название">
          {getFieldDecorator("name", {
            rules: [
              {
                required: true,
                message: "Название должно обязательно присутствовать"
              }
            ],
            initialValue: service ? service.name : ""
          })(<Input style={inputStyle} />)}
        </Item>
        <Item label="Кол-во реплик">
          {getFieldDecorator("replicas", {
            rules: [
              {
                required: true,
                message: "Название должно обязательно присутствовать"
              }
            ],
            initialValue: service ? service.replicas : 1
          })(<InputNumber style={inputStyle} min={1} max={5} />)}
        </Item>
        <Item label="Язык приложения">
          {getFieldDecorator("type", {
            rules: [
              {
                required: true,
                message: "Название должно обязательно присутствовать"
              }
            ],
            initialValue: service ? service.type : "node"
          })(
            <Select style={inputStyle}>
              <Select.Option value="node">JavaScript</Select.Option>
              <Select.Option value="python">Python</Select.Option>
              <Select.Option value="ruby">Ruby</Select.Option>
            </Select>
          )}
        </Item>
        <Row justify="end" type="flex">
          <Button type="primary" htmlType="submit">
            Создать
          </Button>
        </Row>
      </Form>
    );
  }
}
export default Form.create()(ServiceCreateForm);
