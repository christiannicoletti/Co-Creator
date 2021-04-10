import React, { Component } from "react";

import classes from "./AboutPage.module.css";

import Layout from "../shared/Layout/Layout";
import WithClass from "../../hoc/withClass";
import Background from "../shared/Background/Background";
import Logo from "../shared/Logo/Logo";
import DesignedEasy from "../../assets/images/AboutPage/DesignedEasy.png";
import HandsOnExperience from "../../assets/images/AboutPage/HandsOnExperience.png";
import PitchIdea from "../../assets/images/AboutPage/PitchIdea.png";

/**
 * Main projects Page
 *
 * Called by FirstPage.js in <Button>
 */
class ui extends Component {
  render() {
    return (
      <WithClass>
        <Background />
        <Layout />
        <div className={classes.TitleContainer}>
          <Logo className={classes.Logo} />
          <div className={classes.Slogan}>
            Making the project creation process easier
          </div>
        </div>

        <div className={classes.AllRows}>
          <div className={classes.Row1Content}>
            <div className={classes.DesignedEasyAsset}>
              <img
                src={DesignedEasy}
                alt="Find Project button example"
                className={classes.DesignedEasy}
              />
            </div>

            <div className={classes.DesignedEasyContent}>
              <div>Designed to be simple and easy,</div>
              <div>Co-Create will find you project founders eager to lead,</div>
              <div>and colleagues eager to work.</div>
            </div>
          </div>

          <div className={classes.Row3Content}>
            <div className={classes.HandsOnExperienceContent}>
              <div>Build a strong resume with hands-on experience.</div>
              <div>Become up-to-date on all industry level skillsets.</div>
              <div>Compete with other users in your field.</div>
            </div>

            <div className={classes.HandsOnExperienceAsset}>
              <img
                src={HandsOnExperience}
                alt="Find Project button example"
                className={classes.HandsOnExperience}
              />
            </div>
          </div>

          <div className={classes.Row4Content}>
            <div className={classes.PitchIdeaAsset}>
              <img
                src={PitchIdea}
                alt="Find Project button example"
                className={classes.PitchIdea}
              />
            </div>

            <div className={classes.PitchIdeaContent}>
              <div>Or pitch your idea.</div>
              <div>Interview users.</div>
              <div>Learn team building skills.</div>
              <div>And make your idea a reality.</div>
            </div>
          </div>
          <div className={classes.Row5Content}>
            <div className={classes.TitleContainer}>
              <div className={classes.Slogan2}>
                Giving you the strongest foundation your project can have
              </div>
              <Logo className={classes.Logo2} />
            </div>
          </div>
        </div>
      </WithClass>
    );
  }
}

export default ui;
