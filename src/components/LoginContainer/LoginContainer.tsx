import { Card } from "antd";
import React from "react";
import { Dispatch } from "redux";
import "./LoginContainer.scss";
import LoginForm from "./LoginForm";
import { connect } from "react-redux";
import { action } from "typesafe-actions";
import { IStore } from "../../store/types";
import { AUTH } from "../../store/actionTypes";
import { IUserAuthData, IUserState } from "../../store/types/auth";

interface ILoginContainer {
  login: (user: IUserAuthData) => void;
  user?: IUserState;
}

class LoginContainer extends React.Component<ILoginContainer> {
  public render() {
    return (
      <div className="login-container container-background">
        <Card title="Вход" className="login-block">
          <p>
            Для использования сервиса Вам необходимо авторизоваться или создать
            учетную запись
          </p>
          <LoginForm login={this.props.login} />
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state: IStore) => ({
  user: state.auth.user
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  login: (userData: IUserAuthData) => dispatch(action(AUTH.REQUEST, userData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);
