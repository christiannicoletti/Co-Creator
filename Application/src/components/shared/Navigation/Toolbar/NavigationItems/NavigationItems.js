import React, { Component } from 'react';

import classes from "./NavigationItems.module.css";

import NavigationItem from "./NavigationItem/NavigationItem";
import ProfilePicture from '../../../../../assets/images/Toolbar/default_picture.png';
import DownArrow from '../../../../../assets/images/Toolbar/down_arrow.png';
import UserDrawer from '../../UserDrawer/UserDrawer';
import WithClass from '../../../../../hoc/withClass';

class navigationItems extends Component {
  state = {
    drawerDisplay: false
  };

  displayUserDrawerHandler = () => {
    this.setState(prevState => {
      return { drawerDisplay: !prevState.drawerDisplay }
    });
  }

  render() {
    let drawer = null;
    let nav = (
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
    
    let drawerClasses = [classes.Drawer];
    let profileClasses = [classes.ProfileContainer]

    if (this.state.drawerDisplay) {
      drawerClasses = [classes.Drawer, classes.Open];
      profileClasses = [classes.ProfileContainer, classes.ProfileClicked]
      drawer = <UserDrawer />
    } else {
      drawerClasses = [classes.Drawer, classes.Close];
      drawer = <UserDrawer />
    }

    if (this.props.isAuthenticated) {
      nav = (
        <div className={`${classes.NavigationItems} ${this.props.className}`}>
        <NavigationItem link="/howtojoinproject" exact>
          Joining a project
        </NavigationItem>
        <NavigationItem link="/howtojoinproject" exact>
          Creating a project
        </NavigationItem>
        <div className={classes.UserButtonContainer}>
          <div className={classes.Hide}/>
          <button className={profileClasses.join(' ')} onClick={this.displayUserDrawerHandler}>
            <div className={classes.Username}>Christian Nicoletti</div>
            <img src={ProfilePicture} alt="Default prof pic" className={classes.ProfilePicture} />
            <img src={DownArrow} alt="Down arrow for collapsing/expanding" className={classes.DownArrow} />
          </button>
          <div className={drawerClasses.join(' ')}>
            {drawer}
          </div>
        </div>
      </div>
      )
    }

    return (
      <WithClass>
        {nav}
      </WithClass>
    );
  }
}
 
export default navigationItems;
