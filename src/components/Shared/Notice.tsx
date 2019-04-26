import React from "react";
import { connect } from "react-redux";
import { message } from "antd";
import { IStore, INotice } from "../../store/types";

const selectNotice = (type: string, pMessage: string) => {
  message.destroy();
  switch (type) {
    case "success":
      return message.success(pMessage);
    case "error":
      return message.error(pMessage);
    case "info":
      return message.info(pMessage);
    case "loading":
      return message.loading(pMessage, 0);
    case "destroy":
      return message.destroy();
  }
};

interface INoticeProps {
  notice: INotice;
}

class Notice extends React.Component<INoticeProps> {
  public componentDidUpdate() {
    selectNotice(this.props.notice.type, this.props.notice.message);
  }
  public render() {
    return <div className="d-none"> {this.props.notice.message} </div>;
  }
}

const mapStateToProps = (state: IStore) => ({
  notice: state.notice
});

export default connect(mapStateToProps)(Notice);
