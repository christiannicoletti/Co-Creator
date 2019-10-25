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
    this.setState({ isCardView: !this.state.isCardView, isListView: !this.state.isListView });
  }

  render() {
    let toggle = null;
    if (this.state.isCardView) {
      toggle = (
        <div className={classes.ViewsContainer}>
          <div className={classes.Cardview}>Card view<div className={classes.CardViewLine}/></div>
          <div onClick={this.switchViewHandler} className={classes.ListviewNotClicked}>List view<div/></div>
        </div>
      )
    } else {
      toggle = (
        <div className={classes.ViewsContainer}>
          <div onClick={this.switchViewHandler} className={classes.CardviewNotClicked}>Card view<div/></div>
          <div className={classes.Listview}>List view<div className={classes.ListViewLine}/></div>
        </div>
      )
    }

    return (
      <WithClass>
        <Background />
        <Layout />
        <div className={classes.MainContainer}>
          <div className={classes.ProjectsStartupsContainer}>
            <div className={classes.Projects}>Projects</div> | <NavLink to="startups" className={classes.Startups}>Startups</NavLink>
          </div>
          <div className={classes.SecondRowContainer}>
            <div className={classes.Filter}>Filter</div>
            {toggle}
            <div className={classes.RankedBy}>Ranked by: Featured</div>
          </div>
          <div className={classes.CardViewContainer}>
          </div>
        </div>
      </WithClass>
    );
  }
}

export default ui;
