import React from 'react';

import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './StartupToolbar.module.css';

const toolbar = () => (
    <header>
        <nav className={classes.Main}>
            <NavigationItems />
        </nav>
    </header>
);
 
export default toolbar;