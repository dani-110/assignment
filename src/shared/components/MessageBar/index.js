import React from "react";
import { MessageBar, MessageBarManager } from "react-native-message-bar";
import { Platform } from "react-native";
import { Colors } from "../../../constants/colors";
import { isIphoneX } from "react-native-iphone-x-helper";

export default class extends React.Component {
  componentDidMount() {
    MessageBarManager.registerMessageBar(this.refs.alert);
  }

  componentWillUnmount() {
    MessageBarManager.unregisterMessageBar();
  }

  styles = {
    error: {
      backgroundColor: Colors.red,
      strokeColor: Colors.red,
      titleColor: Colors.headerColor,
      messageColor: Colors.headerColor
    },
    success: {
      backgroundColor: Colors.green,
      strokeColor: Colors.green,
      titleColor: Colors.headerColor,
      messageColor: Colors.headerColor
    },
    info: {
      backgroundColor: Colors.blue,
      strokeColor: Colors.blue,
      titleColor: Colors.headerColor,
      messageColor: Colors.headerColor
    }
  };

  render() {
    const { error, success, info } = this.styles;
    return (
      <MessageBar
        ref="alert"
        stylesheetError={error}
        stylesheetSuccess={success}
        stylesheetInfo={info}
        viewTopInset={Platform.OS === "ios" ? (isIphoneX() ? 50 : 20) : 0}
      />
    );
  }
}
