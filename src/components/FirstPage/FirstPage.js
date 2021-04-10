import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import classes from "./FirstPage.module.css";

import WithClass from "../../hoc/withClass";
import Background from "../shared/Background/Background";
import Layout from "../shared/Layout/Layout";
import Logo from "../shared/Logo/Logo";
import SideImage from "./UI/SideImage/SideImage";
import Button from "../shared/UI/Buttons/Buttons";
import AppleImage from "../../assets/images/FirstPage/apple.ico";
import GoogleImage from "../../assets/images/FirstPage/googleplay.ico";

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
        <div className={classes.MainContainer}>
        <div className={classes.UiContainer}>
          <Logo />
          <div className={classes.Slogan}>
            Making the project creation process easier
          </div>
          <Button
            title="Find Projects "
            className={classes.Button}
            clicked={this.findProjectsContinued}
          />
          <div className={classes.ORContainer}>
          <div className={classes.Line} />
          <div className={classes.OR}>OR</div>
          <div className={classes.Line2} />
          </div>
          <div className={classes.GetApp}>Get the app</div>
          <div className={classes.IconContainer}>
            <NavLink to="Apple">
              <img src={AppleImage} alt='apple logo' className={classes.Apple}/>
            </NavLink>
            <NavLink to="GooglePlay">
              <img src={GoogleImage} alt='google play logo' className={classes.GooglePlay}/>
            </NavLink>
          </div>
        </div>
        <SideImage className={classes.SideImage} />
      </div>
      </WithClass>
    );
  }
}

export default ui;
