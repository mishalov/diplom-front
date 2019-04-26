import React, { FormEvent } from "react";
import { Card, Input, Icon } from "antd";
import { IService } from "../../../store/types/services";
import Form, { FormComponentProps } from "antd/lib/form";
import "./ServiceProgramCard.scss";
import { Button } from "antd";
import TextArea from "antd/lib/input/TextArea";
import Axios from "axios";

interface IServiceProgramCard extends FormComponentProps {
  service: IService;
}

let id = 0;

class ServiceProgramCard extends React.Component<IServiceProgramCard> {
  state = { result: "" };
  public remove = (k: string) => {
    const { form } = this.props;
    const keys = form.getFieldValue("keys");
    if (keys.length === 1) {
      return;
    }
    form.setFieldsValue({
      keys: keys.filter((key: string) => key !== k)
    });
  };

  public add = () => {
    const { form } = this.props;
    const keys = form.getFieldValue("keys");
    const nextKeys = keys.concat(id++);
    form.setFieldsValue({
      keys: nextKeys
    });
  };

  handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { form, service } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        Axios({
          method: "POST",
          url: `http://${service.address}:${service.port}`,
          data: values.names ? values.names.filter((el: string) => el) : []
        }).then(response => {
          this.setState({ result: JSON.stringify(response.data) });
        });
      }
    });
  };

  public render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16, offset: 4 }
      }
    };
    getFieldDecorator("keys", { initialValue: [] });
    const keys = getFieldValue("keys");
    const formItems = keys.map((k: string, index: number) => (
      <Form.Item
        {...formItemLayout}
        label={`Параметр ${index + 1}`}
        required={false}
        key={k}
      >
        {getFieldDecorator(`names[${k}]`, {
          validateTrigger: ["onChange", "onBlur"],
          rules: [
            {
              required: true,
              whitespace: true,
              message:
                "Пожалуйста, введите значение параметра или удалите это поле."
            }
          ]
        })(
          <Input
            placeholder="значение"
            style={{ width: "90%", marginRight: 8 }}
          />
        )}
        {keys.length > 0 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={() => this.remove(k)}
          />
        ) : null}
      </Form.Item>
    ));
    return (
      <Card className="service-program-card" title="Программа">
        <Form onSubmit={this.handleSubmit}>
          <Form.Item label="Результат выполнения:">
            <TextArea value={this.state.result} />
          </Form.Item>
          {formItems}
          <Form.Item>
            <Button type="dashed" onClick={this.add} style={{ width: "100%" }}>
              <Icon type="plus" /> Добавить поле
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Выполнить программу
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}

export default Form.create()(ServiceProgramCard);
