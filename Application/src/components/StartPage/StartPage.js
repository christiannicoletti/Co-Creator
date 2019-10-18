import React from 'react';

import classes from './StartPage.module.css';
import SideImage from '../SideImage/SideImage';
import Layout from '../FirstLayout/FirstLayout';
import WithClass from '../../hoc/withClass';
import Logo from '../UI/Logo/Logo';
import Button from '../UI/Buttons/Buttons';

const ui = () => (
    <WithClass>
        <Layout />
        <div className={classes.SideImage}>
          <SideImage />
        </div>
        <div className={classes.UiContainer}>
            <Logo />
            <div className={classes.Slogan}>Making the project creation process easier</div>
            <div className={classes.Button}>
                <Button title='Find Projects >'/>
            </div>
            <div class={classes.Line}/> 
            <div className={classes.OR}>OR</div> 
            <div class={classes.Line2}/>
        </div>
    </WithClass>
);
 
export default ui;