import React, { Component } from "react";
import { NavLink } from 'react-router-dom';

import classes from './ProjectsPage.module.css';

import Layout from "../shared/Layout/Layout";
import WithClass from "../../hoc/withClass";
import Background from "../shared/Background/Background";

/**
 * Main projects Page
 *
 * Called by FirstPage.js in <Button>
 */
class ui extends Component {
  state = {
    isCardView: true,
    isListView: false
  }

  switchViewHandler = () => {
    return this.setState({ isCardView: !this.state.isCardView, isListView: !this.state.isListView });
  }

  render() {
    let cardviewline = null;
    if (this.state.isCardView) {
      cardviewline = (
        <div className={classes.CardViewLine}/>
      )
    }

    let listviewline = null;
    if (this.state.isListView) {
      listviewline = (
        <div className={classes.ListViewLine}/>
      )
    }

    return (
      <WithClass>
        <Background />
        <Layout />
        <div className={classes.MainContainer}>
          <div className={classes.ProjectsStartupsContainer}>
            <div className={classes.Projects}>Projects</div>|<NavLink to="startups" className={classes.Startups}>Startups</NavLink>
          </div>
          {/* Insert Filter */}
          <div className={classes.ViewsContainer}>
            <div onClick={this.switchViewHandler} className={classes.Cardview}>Card view{cardviewline}</div><div onClick={this.switchViewHandler} className={classes.Listview}>List view{listviewline}</div>
          </div>
          {/* Insert Ranked by: */}
          <div className={classes.CardViewContainer}>
          </div>
        </div>
      </WithClass>
    );
  }
}

export default ui;
