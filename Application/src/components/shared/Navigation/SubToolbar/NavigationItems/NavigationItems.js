import React from "react";

import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = () => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/explore" exact>
        Explore
      </NavigationItem>
      <NavigationItem link="/projects" exact>
        Projects
      </NavigationItem>
      <NavigationItem link="/startups" exact>
        Startups
      </NavigationItem>
      <NavigationItem link="/about" exact>
        About
      </NavigationItem>
      <NavigationItem link="/contact" exact>
        Contact
      </NavigationItem>
      <NavigationItem link="/help" exact>
        Help
      </NavigationItem>
    </ul>
  );
};

export default navigationItems;
