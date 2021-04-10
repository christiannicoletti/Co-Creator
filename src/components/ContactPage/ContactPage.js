import React, { Component } from "react";

import classes from './ContactPage.module.css';

import WithClass from "../../hoc/withClass";
import Background from "../shared/Background/Background";
import Form from '../../containers/ContactPage/Form/Form';
import Layout from '../shared/Layout/Layout';

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
        <Layout />
        <div className={classes.Container}>
          <Form className={classes.Form}/>
        </div>
      </WithClass>
    );
  }
}

export default ui;
