import React from 'react';

import Searchbar from '../Searchbar/Searchbar';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './StartupToolbar.module.css';

const toolbar = () => (
    <header className={classes.Main}>
        <Searchbar />
        <nav>
            <NavigationItems />
        </nav>
    </header>
);
 
export default toolbar;