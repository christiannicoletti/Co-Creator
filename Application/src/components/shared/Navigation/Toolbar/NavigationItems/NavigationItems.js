import React from "react";

import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = props => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/howtostart" exact>
        <strong>How to start</strong>
      </NavigationItem>
      <NavigationItem link="/signup" exact>
        Create an account
      </NavigationItem>
      <NavigationItem link="/signin" exact>
        Sign in
      </NavigationItem>
    </ul>
  );
};

export default navigationItems;
