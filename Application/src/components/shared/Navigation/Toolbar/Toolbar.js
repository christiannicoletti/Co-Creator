import React from 'react';
import { NavLink } from "react-router-dom";

import Searchbar from '../Searchbar/Searchbar';
import NavigationItems from './NavigationItems/NavigationItems';
import Logo from "../../Logo/Logo";
import Home from '../../../../assets/images/Toolbar/home_icon.png';
import classes from './Toolbar.module.css';

const toolbar = () => (
    <header className={classes.Main}>
        <NavLink to="/"><Logo className={classes.Logo} /></NavLink>
        <NavLink to="/" className={classes.Home}><img src={Home} className={classes.Home}/></NavLink>
        <Searchbar className={classes.Container1}/>
        <NavigationItems className={classes.Container2} />
    </header>
);
 
export default toolbar;