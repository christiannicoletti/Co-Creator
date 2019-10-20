import React, { Component } from "./node_modules/react";

import WithClass from "../../../hoc/withClass";
import StartPageToolbar from "../Navigation/Toolbar/Toolbar";

/**
 * Layouts contain the background top  nav
 * 
 * Called by SignupPage.js
 */
class Layout extends Component {
  render() {
    return (
      <WithClass>
        <StartPageToolbar />
      </WithClass>
    );
  }
}

export default Layout;
