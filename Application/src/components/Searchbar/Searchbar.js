import React from 'react';

import classes from './Searchbar.module.css';

const searchbar = () => (
    <input type='search' className={classes.Searchbar} placeholder='Search for a project or user...'></input>
);
 
export default searchbar;