import React from 'react';

import NavigationItems from './NavigationItems/NavigationItems';
import classes from './Footbar.module.css';

const footbar = () => (
    <header className={classes.Main}>
        <nav>
            <NavigationItems />
        </nav>
    </header>
);
 
export default footbar;