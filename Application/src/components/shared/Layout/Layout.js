import React, { Component } from "react";

import WithClass from "../../../hoc/withClass";
import StartPageToolbar from "../Navigation/Toolbar/Toolbar";
import StartPageFootbar from "../Navigation/Footbar/Footbar";

/**
 * Contains the background, top, and bottom nav
 * 
 * Called by FirstPage.js
 */
class Layout extends Component {
  render() {
    return (
      <WithClass>
        <StartPageToolbar />
        <StartPageFootbar />
      </WithClass>
    );
  }
}

export default Layout;
