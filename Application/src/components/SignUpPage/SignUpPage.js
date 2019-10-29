import React, { Component } from 'react';

import classes from "./SignupPage.module.css";

import WithClass from "../../hoc/withClass";
import Background from "../shared/Background/Background";
import SideImage from './UI/SideImage/SideImage';
import Form from '../../containers/SignupPage/Form/Form';
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
          </div>
        </div>
      </WithClass>
    );
  }
}

export default ui;
