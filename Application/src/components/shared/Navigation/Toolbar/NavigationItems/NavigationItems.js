import React, { Component } from 'react';

import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
import ProfilePicture from '../../../../../assets/images/Toolbar/default_picture.png';
import DownArrow from '../../../../../assets/images/Toolbar/down_arrow.png';
import WithClass from '../../../../../hoc/withClass';

class navigationItems extends Component {
  render() {
    let navNotLoggedIn = (
      <div className={`${classes.NavigationItems} ${this.props.className}`}>
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
    )

    let navLoggedIn = (
      <div className={`${classes.NavigationItems} ${this.props.className}`}>
      <NavigationItem link="/howtojoinproject" exact>
        <strong>Help</strong>
      </NavigationItem>
      <NavigationItem link="/createproject" exact>
        Create a project
      </NavigationItem>
      <NavigationItem link="/createproject" exact>
        <div className={classes.ProfileContainer}>
          <div className={classes.Username}>Christian Nicoletti</div>
          <img src={ProfilePicture} className={classes.ProfilePicture} />
          <img src={DownArrow} className={classes.DownArrow} />
        </div>
      </NavigationItem>
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
