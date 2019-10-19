import React from "react";

import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = () => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" exact>
        Explore
      </NavigationItem>
      <NavigationItem link="/" exact>
        Projects
      </NavigationItem>
      <NavigationItem link="/" exact>
        Startups
      </NavigationItem>
      <NavigationItem link="/" exact>
        About
      </NavigationItem>
      <NavigationItem link="/" exact>
        Contact
      </NavigationItem>
      <NavigationItem link="/" exact>
        Help
      </NavigationItem>
    </ul>
  );
};

export default navigationItems;
