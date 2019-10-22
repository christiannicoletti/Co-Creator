import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

import classes from "./SigninPage.module.css";

import WithClass from "../../hoc/withClass";
import Background from "../Background/Background";
import Button from '../FirstPage/UI/Buttons/Buttons';
import Form from './Form/Form';
import Layout from './Layout/Layout';

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
        <Form className={classes.Form}/>
        <Button title="Sign in >" className={classes.Button}/>
        <NavLink className={classes.ForgotPassword} to="forgotpassword">Forgot Password?</NavLink>
        <NavLink className={classes.CreateAnAccount} to="signup">Create an account</NavLink>
      </WithClass>
    );
  }
}

export default ui;
