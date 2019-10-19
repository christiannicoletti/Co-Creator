import React from "react";

import classes from "./StartPage.module.css";

import SideImage from "../UI/StartPage/SideImage/SideImage";
import Layout from "../Layout/StartPage/Layout";
import WithClass from "../../hoc/withClass";
import Logo from "../UI/StartPage/Logo/Logo";
import Button from "../UI/Buttons/Buttons";
import Apple from "../UI/StartPage/Apple/Apple";
import GooglePlay from "../UI/StartPage/GooglePlay/GooglePlay";
import { NavLink } from "react-router-dom";

const ui = () => (
  <WithClass>
    <Layout />
    <div className={classes.SideImage}>
      <SideImage />
    </div>
    <div className={classes.UiContainer}>
      <Logo />
      <div className={classes.Slogan}>
        Making the project creation process easier
      </div>
      <div className={classes.Button}>
        <Button title="Find Projects >" />
      </div>
      <div class={classes.Line} />
      <div className={classes.OR}>OR</div>
      <div class={classes.Line2} />
      <div className={classes.GetApp}>Get the app</div>
      <NavLink to="Apple" className={classes.Apple}>
        <Apple />
      </NavLink>
      <NavLink to="GooglePlay" className={classes.GooglePlay}>
        <GooglePlay />
      </NavLink>
    </div>
  </WithClass>
);

export default ui;
