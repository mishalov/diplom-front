import { Button, Form, Icon, Input } from "antd";
import React, { FormEvent } from "react";
import { FormComponentProps } from "antd/lib/form";
import { IUser } from "../../store/types/auth";
const Item = Form.Item;

interface IUserFormProps extends FormComponentProps {
  handleRegister: (user: IUser) => void;
}

const config = {
  rules: [
    {
      type: "string",
      required: true,
      message: "Данное поле обязательно для заполнения"
    }
  ]
};

const RegistrationForm = (props: IUserFormProps) => {
  const { form, handleRegister } = props;
  const { getFieldDecorator } = form;
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    props.form.validateFields((err: any, fieldsValue: IUser) => {
      if (err) {
        console.log(err);
        return;
      }
      console.warn(fieldsValue);
      handleRegister(fieldsValue);
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Item>
        {getFieldDecorator("name", config)(
          <Input placeholder="Имя" prefix={<Icon type="book" />} />
        )}
      </Item>
      <Item>
        {getFieldDecorator("surname", config)(
          <Input placeholder="Фамилия" prefix={<Icon type="book" />} />
        )}
      </Item>
      <Item>
        {getFieldDecorator("email", config)(
          <Input placeholder="EMail" prefix={<Icon type="mail" />} />
        )}
      </Item>
      <Item>
        {getFieldDecorator("username", config)(
          <Input placeholder="Имя пользователя" prefix={<Icon type="user" />} />
        )}
      </Item>
      <Item>
        {getFieldDecorator("password", config)(
          <Input placeholder="Пароль" prefix={<Icon type="lock" />} />
        )}
      </Item>
      <Button type="primary" className="register-form-button" htmlType="submit">
        Отправить
      </Button>
    </Form>
  );
};

export default Form.create()(RegistrationForm);
