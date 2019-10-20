import React, { Component } from "react";

import WithClass from "../../hoc/withClass";
import Background from "../Background/Background";

/**
 * First Default landing page
 *
 * Called by App.js in <Route>
 */
class ui extends Component {

  findProjectsContinued = () => {
    this.props.history.push({
      pathname: '/signup',
    });
  }

  render() {
    return (
      <WithClass>
        <Background />
      </WithClass>
    );
  }
}

export default ui;
