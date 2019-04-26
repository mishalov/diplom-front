import React from "react";
import { Icon } from "antd";

interface IHeaderUserSection {
  name: string;
  handleLogout: () => void;
}

export const HeaderUserSection = (props: IHeaderUserSection) => {
  return (
    <div>
      <Icon type="user" />
      {props.name}
    </div>
  );
};
