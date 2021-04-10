import React from 'react';

import classes from './ProfilePictureOptions.module.css';

import Options from './Options/Options';

const options = () => (
    <div className={classes.ProfilePictureOptionsContainer}>
        <Options />
    </div>
);
 
export default options;