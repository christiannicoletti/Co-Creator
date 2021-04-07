import React from 'react';

import classes from './Options.module.css';
import WithClass from '../../../../../hoc/withClass';

const option = () => (
    <WithClass>
        <div className={classes.Option}>Upload a picture</div>
        <div className={classes.Option}>Remove picture</div>
    </WithClass>
);
 
export default option;