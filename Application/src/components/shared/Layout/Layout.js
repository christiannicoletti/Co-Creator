import React, { Component } from "react";

import WithClass from "../../../hoc/withClass";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SubToolbar from "../Navigation/SubToolbar/SubToolbar";

/**
 * Contains the background, top, and bottom nav
 * 
 * Called by FirstPage.js
 */
class Layout extends Component {
  render() {
    return (
      <WithClass>
        <Toolbar />
        <SubToolbar />
      </WithClass>
    );
  }
}

export default Layout;
