import React, { Component } from 'react';

import WithClass from "../../../hoc/withClass";
import Toolbar from "../../FirstPage/Navigation/Toolbar/Toolbar";

/**
 * Layouts contain the background top  nav
 * 
 * Called by SignupPage.js
 */
class Layout extends Component {
  render() {
    return (
      <WithClass>
        <Toolbar />
      </WithClass>
    );
  }
}

export default Layout;
