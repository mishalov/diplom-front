import LoginContainer from "./components/LoginContainer/LoginContainer";
import RegistrationContainer from "./components/RegistrationContainer/RegistrationContainer";

import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MainContainer from "./components/MainContainer/MainContainer";
import { connect } from "react-redux";
import { IStore } from "./store/types";
import { IAuthReducer } from "./store/types/auth";

interface IRootRouter {
  auth: IAuthReducer;
}

class RootRouter extends React.Component<IRootRouter> {
  public render() {
    const { auth } = this.props;
    return (
      <BrowserRouter>
        {!auth.user.solved ? (
          <Switch>
            <Route path="/">
              <LoginContainer />
            </Route>
            <Route path="/registration" exact={true}>
              <RegistrationContainer />
            </Route>
          </Switch>
        ) : (
          <Route path="/">
            <MainContainer />
          </Route>
        )}
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state: IStore) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(RootRouter);
