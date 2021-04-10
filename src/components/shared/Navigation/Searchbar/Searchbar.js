import React from "react";

import classes from "./Searchbar.module.css";

const searchbar = (props) => (
  <input
    type="search"
    className={`${classes.Searchbar} ${props.className}`}
    placeholder="Search for a project or user..."
  ></input>
);

export default searchbar;
