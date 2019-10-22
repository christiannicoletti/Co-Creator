import React from 'react';
import { NavLink } from "react-router-dom";

import Searchbar from '../Searchbar/Searchbar';
import NavigationItems from './NavigationItems/NavigationItems';
import Logo from "../../Logo/Logo";
import classes from './Toolbar.module.css';

const toolbar = () => (
    <header className={classes.Main}>
        <NavLink to="/"><Logo className={classes.Logo} /></NavLink>
        <Searchbar />
        <NavigationItems />
    </header>
);
 
export default toolbar;