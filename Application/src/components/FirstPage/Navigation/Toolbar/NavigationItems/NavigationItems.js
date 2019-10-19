import React from "react";

import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = props => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" exact>
        <strong>How to start</strong>
      </NavigationItem>
      <NavigationItem link="/" exact>
        Create an account
      </NavigationItem>
      <NavigationItem link="/" exact>
        Sign in
      </NavigationItem>
    </ul>
  );
};

export default navigationItems;
