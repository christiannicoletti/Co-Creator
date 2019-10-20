import React, { Component } from "react";

import WithClass from "../../hoc/withClass";
import Background from "../Background/Background";

/**
 * Main projects Page
 *
 * Called by FirstPage.js in <Button>
 */
class ui extends Component {
  render() {
    return (
      <WithClass>
        <Background />
      </WithClass>
    );
  }
}

export default ui;
