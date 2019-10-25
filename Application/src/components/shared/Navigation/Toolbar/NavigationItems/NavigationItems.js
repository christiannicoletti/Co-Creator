import React from "react";

import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = props => {
  return (
    <div className={`${classes.NavigationItems} ${props.className}`}>
      <NavigationItem link="/howtostart" exact>
        <strong>How to start</strong>
      </NavigationItem>
      <NavigationItem link="/signup" exact>
        Create an account
      </NavigationItem>
      <NavigationItem link="/signin" exact>
        Sign in
      </NavigationItem>
    </div>
  );
};

export default navigationItems;
