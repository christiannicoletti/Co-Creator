import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./NavigationItem.module.css";

const navigationItem = props => {
  return (
    <div className={classes.NavItemContainer}>
      <NavLink
          to={props.link}
          exact={props.exact}
          className={classes.NavigationItem}
      >
          {props.children}
      </NavLink>
    </div>
  );
};

export default navigationItem;
