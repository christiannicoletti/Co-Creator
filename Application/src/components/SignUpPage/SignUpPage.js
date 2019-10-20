import React, { Component } from "react";

import classes from "./SignUpPage.module.css";

import WithClass from "../../hoc/withClass";
import Background from "../Background/Background";
import SideImage from './UI/SideImage/SideImage';

/**
 * User Signup Page
 *
 * Called by FirstPage.js in <Button>
 */
class ui extends Component {
  render() {
    return (
      <WithClass>
        <Background />
        <SideImage className={classes.SideImage} />
      </WithClass>
    );
  }
}

export default ui;
