import React, { Component } from 'react';

import classes from "./NavigationItems.module.css";

import NavigationItem from "./NavigationItem/NavigationItem";
import WithClass from '../../../../../hoc/withClass';

class navigationItems extends Component {
  render() {
    const username = localStorage.getItem("username")
    return (
      <WithClass>
        <div className={`${classes.NavigationItems} ${this.props.className}`}>
          <NavigationItem link={`/user/${username}`} exact>
            Profile
          </NavigationItem>
          <NavigationItem link="/projects" exact>
            Projects
          </NavigationItem>
          <NavigationItem link="/applications" exact>
            Applications
          </NavigationItem>
          <NavigationItem link="/requests" exact>
            Requests
          </NavigationItem>
          <NavigationItem link="/logout" exact>
            Logout
          </NavigationItem>
        </div>
      </WithClass>
    );
  }
}
 
export default navigationItems;
