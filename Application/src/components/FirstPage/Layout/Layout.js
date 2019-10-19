import React, { Component } from "react";

import WithClass from "../../../hoc/withClass";
import StartPageToolbar from "../Navigation/Toolbar/Toolbar";
import StartPageFootbar from "../Navigation/Footbar/Footbar";
import Background from "../../Background/Background";

/**
 * Layouts contain the background top and (optional)bottom nav
 * 
 * Called by FirstPage.js
 */
class Layout extends Component {
  render() {
    return (
      <WithClass>
        <Background />
        <StartPageToolbar />
        <StartPageFootbar />
      </WithClass>
    );
  }
}

export default Layout;
