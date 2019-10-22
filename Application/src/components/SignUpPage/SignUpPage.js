import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

import classes from "./SignupPage.module.css";

import WithClass from "../../hoc/withClass";
import Background from "../shared/Background/Background";
import SideImage from './UI/SideImage/SideImage';
import Button from '../shared/UI/Buttons/Buttons';
import Form from './Form/Form';
import Layout from '../shared/Layout/Layout';

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
        <Layout />
        <div className={classes.MainContainer}>
          <SideImage className={classes.SideImage} />
          <div className={classes.UiContainer}>
            <div className={classes.Text}>Sign Up</div>
            <Form className={classes.Form}/>
            <div className={classes.Agreement}>
              By clicking Create Account, you agree to our <NavLink to="Terms">Terms of Use</NavLink>, and <NavLink to="PrivacyPolicy">Privacy Policy</NavLink>.
            </div>
            <Button title="Create Account >" className={classes.Button}/>
            <div className={classes.AlreadyHaveAccount}>
              Already have an account?
            </div>
            <NavLink className={classes.SignIn} to="signin">Sign in</NavLink>
          </div>
        </div>
      </WithClass>
    );
  }
}

export default ui;
