import React from 'react';

import NavigationItems from './NavigationItems/NavigationItems';
import classes from './SubToolbar.module.css';

const footbar = (props) => (
    <header className={classes.Main}>
        <nav>
            <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
    </header>
);
 
export default footbar;