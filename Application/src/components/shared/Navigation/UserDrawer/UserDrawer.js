import React from 'react';

import classes from './UserDrawer.module.css';
import WithClass from '../../../../hoc/withClass';
import NavigationItems from './NavigationItems/NavigationItems';

const userdrawer = () => {
    return (
        <WithClass>
            <div className={classes.UserDrawer}>
                <NavigationItems/>
            </div>
        </WithClass>
     );
}
 
export default userdrawer;