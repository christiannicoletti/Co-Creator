import React, { Component } from "react";

import classes from "./Layout.module.css";
import WithClass from "../../../hoc/withClass";
import StartPageToolbar from "../../Navigation/StartPageHeaders/Toolbar/Toolbar";
import StartPageFootbar from "../../Navigation/StartPageHeaders/Footbar/Footbar";
import Background from "../../Background/Background";

class Layout extends Component {
  render() {
    return (
      <WithClass>
        <div className={classes.Background}>
          <Background />
        </div>
        <StartPageToolbar />
        <StartPageFootbar />
      </WithClass>
    );
  }
}

export default Layout;
