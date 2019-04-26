import { Input } from "antd";
import React, { RefObject } from "react";
import ReactInputMask from "react-input-mask";

interface IMaskedInput {
  mask: string;
  maskChar: string;
  formatChars?: { [key: string]: string };
  alwaysShowMask?: boolean;
  inputRef?:
    | ((instance: HTMLInputElement | null) => void)
    | RefObject<HTMLInputElement>
    | null
    | undefined;
  disabled?: boolean;
  inputProps?: any;
}

class MaskedInput extends React.Component<IMaskedInput> {
  public render() {
    return (
      <ReactInputMask
        mask={this.props.mask}
        alwaysShowMask={this.props.alwaysShowMask}
        formatChars={this.props.formatChars}
        maskChar={this.props.maskChar}
      >
        {() => <Input {...this.props.inputProps} />}
      </ReactInputMask>
    );
  }
}

export { MaskedInput };
