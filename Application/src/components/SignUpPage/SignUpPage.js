import React, { Component } from 'react';
import classes from "./SignupPage.module.css";

import WithClass from "../../hoc/withClass";
import Background from "../Background/Background";
import SideImage from './UI/SideImage/SideImage';
import Form from './Form/Form';

/**
 * User Signup Page
 *
 * Called by NavItems.js in <NavLink>
 */
class ui extends Component {
  render() {
    return (
      <WithClass>
        <Background />
        <SideImage className={classes.SideImage} />
        <Form className={classes.Form}/>
      </WithClass>
    );
  }
}

export default ui;
