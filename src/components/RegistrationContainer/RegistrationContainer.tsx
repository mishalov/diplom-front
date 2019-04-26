import { Card } from "antd";
import React from "react";

import "./RegistrationContainer.scss";
import RegistrationForm from "./RegistrationForm";
import { action } from "typesafe-actions";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IStore } from "../../store/types";
import { IUser, IAuthReducer } from "../../store/types/auth";
import { REGISTER } from "../../store/actionTypes";

interface IRegContainer {
  register: (user: IUser) => void;
  auth?: IAuthReducer;
}

class RegistrationContainer extends React.Component<IRegContainer> {
  public render() {
    return (
      <div className="registration-container container-background">
        <Card title="Вход" className="registration-block">
          <p>
            Регистрируюясь на этом сайте вы даете свое <a>согласие</a> на
            использование Ваших персональных данных в т.ч третьими сторонами
          </p>
          <RegistrationForm handleRegister={this.props.register} />
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state: IStore) => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  register: (user: IUser) => dispatch(action(REGISTER.REQUEST, user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationContainer);
