import React from 'react';

import classes from './Buttons.module.css';

const button = (props) => (
    <div className={classes.Default}>{props.title}</div>
);
 
export default button;