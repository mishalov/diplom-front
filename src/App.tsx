import * as React from "react";
import RootRouter from "./RootRouter";
import { Provider } from "react-redux";
import { store } from "../src/store/root";
import Notice from "./components/Shared/Notice";
import "antd/dist/antd.css";
import "./App.scss";
import "./App.css";

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <div className="app" style={{ height: window.innerHeight - 5 + "px" }}>
          <Notice />
          <RootRouter />
        </div>
      </Provider>
    );
  }
}

export default App;
