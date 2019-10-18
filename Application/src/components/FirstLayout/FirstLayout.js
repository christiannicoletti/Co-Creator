import React, { Component } from "react";

import classes from "./FirstLayout.module.css";
import WithClass from "../../hoc/withClass";
import StartupToolbar from "../Navigation/StartupToolbar/StartupToolbar";
import Background from "../Background/Background";

class Layout extends Component {
  state = {};
  render() {
    return (
      <WithClass>
        <div className={classes.Background}>
          <Background />
        </div>
        <StartupToolbar />
        <div className={classes.Text}>
          <div>Start-up ui</div>
          <div>Start-up Footbar</div>
        </div>
      </WithClass>
    );
  }
}

export default Layout;
