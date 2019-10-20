import React from 'react';

import classes from './Buttons.module.css';

/**
 * Default cyan blue button
 * 
 * Dynamic title, pass any string to title to label the button
 */
const button = (props) => (
    <div className={classes.Default} onClick={props.clicked}>{props.title}</div>
);
 
export default button;