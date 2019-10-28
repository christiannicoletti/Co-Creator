import React, { Component } from "react";

import classes from './ExplorePage.module.css';

import Layout from "../shared/Layout/Layout";
import WithClass from "../../hoc/withClass";
import Background from "../shared/Background/Background";

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
        <div className={classes.Explore}>Explore</div>
        <div className={classes.ExploreTitles}>
          <div className={classes.Explore1}>Projects that have more than 2 awards</div>
          <div className={classes.Explore2}>Projects that have more than 10 fields of study</div>
          <div className={classes.Explore3}>Projects that have events coming up soon</div>
        </div>
      </WithClass>
    );
  }
}

export default ui;
