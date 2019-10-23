import React from "react";

import classes from "./Buttons.module.css";

/**
 * Default cyan blue button
 *
 * Dynamic title, pass any string to title to label the button
 */
const button = props => (
  <button
    className={`${classes.Default} ${props.className}`}
    onClick={props.clicked}
    disabled={props.disabled}
  >
    {props.title}
  </button>
);

export default button;
