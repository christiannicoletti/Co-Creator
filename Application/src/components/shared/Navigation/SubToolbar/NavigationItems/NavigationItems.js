import React, { Component } from 'react';

import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
import WithClass from '../../../../../hoc/withClass';

class navigationItems extends Component {
  render() {
    let navNotLoggedIn = (
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
  
        {/* Waiting to add Contact page, for when users log in*/}
        {/* <NavigationItem link="/contact" exact>
          Contact
        </NavigationItem> */}
  
        {/* Idea to make a news tab for Co-Create news & updates */}
        {/* <NavigationItem link="/news" exact>
          News
        </NavigationItem> */}
      </div>
    )

    return (
      <WithClass>
        {navNotLoggedIn}
      </WithClass>
    );
  }
}
 
export default navigationItems;
