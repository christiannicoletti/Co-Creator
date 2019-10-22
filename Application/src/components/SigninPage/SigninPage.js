import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

import classes from "./SigninPage.module.css";

import WithClass from "../../hoc/withClass";
import Background from "../shared/Background/Background";
import Button from '../shared/UI/Buttons/Buttons';
import Form from './Form/Form';
import Layout from '../shared/Layout/Layout';

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
          <Form className={classes.Form}/>
          <div className={classes.ButtonContainer}>
            <Button title="Sign in >" className={classes.Button}/>
          </div>
          <div className={classes.TextContainer}>
            <NavLink className={classes.ForgotPassword} to="forgotpassword">Forgot Password?</NavLink>
            <NavLink className={classes.CreateAnAccount} to="signup">Create an account</NavLink>
          </div>
        </div>
      </WithClass>
    );
  }
}

export default ui;
