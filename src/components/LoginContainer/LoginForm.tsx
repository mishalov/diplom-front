import { Button, Checkbox, Col, Form, Icon, Input, Row } from "antd";
import React, { FormEvent } from "react";
import { Link } from "react-router-dom";
import { FormComponentProps } from "antd/lib/form";
import { IUserAuthData } from "../../store/types/auth";

const Item = Form.Item;

interface ILoginForm extends FormComponentProps {
  login: (arg: IUserAuthData) => void;
}

const LoginForm = (props: ILoginForm) => {
  const { getFieldDecorator } = props.form;
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    props.form.validateFields((err: any, values: IUserAuthData) => {
      if (!err) {
        props.login(values);
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Item>
        {getFieldDecorator("username", {
          rules: [
            { required: true, message: "Пожалуйста, заполните это поле!" }
          ],
          initialValue: "admin"
        })(
          <Input
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Имя пользователя"
          />
        )}
      </Item>
      <Item>
        {getFieldDecorator("password", {
          rules: [
            { required: true, message: "Пожалуйста, заполните это поле!" }
          ],
          initialValue: "495800"
        })(
          <Input
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Пароль"
            type="password"
          />
        )}
      </Item>
      <Row justify="space-between" type="flex">
        <Col span={12}>
          <Item>
            <Checkbox>Запомнить меня</Checkbox>
          </Item>
        </Col>
        <Col span={12}>
          <Item>
            <a className="login-form-forgot" href="">
              Забыл пароль
            </a>
          </Item>
        </Col>
      </Row>
      <Button type="primary" htmlType="submit" className="login-form-button">
        Войти
      </Button>
      Или <Link to="/registration">зарегистрироваться сейчас</Link>
    </Form>
  );
};

export default Form.create()(LoginForm);
