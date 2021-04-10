import React, { Component } from "react";

import classes from "./SigninPage.module.css";

import WithClass from "../../hoc/withClass";
import Background from "../shared/Background/Background";
import Form from "../../containers/SigninPage/Form/Form";
import Layout from "../shared/Layout/Layout";

/**
 * User Signin Page
 *
 * Called by NavItems.js in <NavLink>
 */
class ui extends Component {
  render() {
    return (
      <WithClass>
        <Background />
        <Layout />
        <div className={classes.Container}>
          <Form className={classes.Form} />
        </div>
      </WithClass>
    );
  }
}

export default ui;
