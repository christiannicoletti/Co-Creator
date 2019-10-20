import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import classes from "./FirstPage.module.css";

import WithClass from "../../hoc/withClass";
import Layout from "./Layout/Layout";
import SideImage from "./UI/SideImage/SideImage";
import Logo from "./UI/Logo/Logo";
import Button from "./UI/Buttons/Buttons";
import Apple from "./UI/Apple/Apple";
import GooglePlay from "./UI/GooglePlay/GooglePlay";
import Background from "../Background/Background";

/**
 * First Default landing page
 *
 * Called by App.js in <Route>
 */
class ui extends Component {
  findProjectsContinued = () => {
    this.props.history.push({
      pathname: '/projects',
    });
  }

  render() {
    return (
      <WithClass>
        <Background />
        <Layout />
        <SideImage className={classes.SideImage} />
        <div className={classes.UiContainer}>
          <Logo />
          <div className={classes.Slogan}>
            Making the project creation process easier
          </div>
          <Button
            title="Find Projects >"
            className={classes.Button}
            clicked={this.findProjectsContinued}
          />
          <div className={classes.Line} />
          <div className={classes.OR}>OR</div>
          <div className={classes.Line2} />
          <div className={classes.GetApp}>Get the app</div>
          <NavLink to="Apple">
            <Apple className={classes.Apple} />
          </NavLink>
          <NavLink to="GooglePlay">
            <GooglePlay className={classes.GooglePlay} />
          </NavLink>
        </div>
      </WithClass>
    );
  }
}

export default ui;
