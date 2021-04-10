import React, { Component } from "react";

import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
import WithClass from "../../../../../hoc/withClass";

class navigationItems extends Component {
  render() {
    let nav = (
      <div className={classes.NavigationItems}>
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
      </div>
    );

    if (this.props.isAuthenticated) {
      nav = (
        <div className={classes.NavigationItems}>
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
          <NavigationItem link="/news" exact>
            News
          </NavigationItem>
        </div>
      );
    }

    return <WithClass>{nav}</WithClass>;
  }
}

export default navigationItems;
