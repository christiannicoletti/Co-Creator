import React, { Component } from "react";

import classes from './HowToStartPage.module.css';

import Layout from "../shared/Layout/Layout";
import WithClass from "../../hoc/withClass";
import Background from "../shared/Background/Background";
import FindProjects1 from '../../assets/images/HowToStartPage/FindProjects.PNG';
import FindProjects2 from '../../assets/images/HowToStartPage/FindProjects2.PNG';
import Filter1 from '../../assets/images/HowToStartPage/Filter1.PNG';
import Filter2 from '../../assets/images/HowToStartPage/Filter2.PNG';
import CreateProfile1 from '../../assets/images/HowToStartPage/CreateProfile1.PNG';
import CreateProfile2 from '../../assets/images/HowToStartPage/CreateProfile2.PNG';
import CreateProject1 from '../../assets/images/HowToStartPage/CreateProject1.PNG';
import CreateProject2 from '../../assets/images/HowToStartPage/CreateProject2.PNG';
import Commendments1 from '../../assets/images/HowToStartPage/Commendments1.PNG';
import Commendments2 from '../../assets/images/HowToStartPage/Commendments2.PNG';
import Promote1 from '../../assets/images/HowToStartPage/Promote1.PNG';
import Promote2 from '../../assets/images/HowToStartPage/Promote2.PNG';

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
        <div className={classes.PageContainer}>
            <div className={classes.GettingStarted}>Getting Started</div>
            <div className={classes.AllRows}>
                <div className={classes.Row1Content}>
                    <div className={classes.QuicklyBrowse}>
                    Quickly Browse Projects
                        <div className={classes.QuicklyBrowseContent}>
                            <div>No need to create an account</div>
                            <div>Simply press "Find Projects" on the front page</div>
                            <div>or the "Projects" tab above</div>
                        </div>
                    <div className={classes.QuicklyBrowseAssets}>
                        <img src={FindProjects1} alt='Find Project button example' className={classes.FindProjects1}/>
                        <img src={FindProjects2} alt='Project index example' className={classes.FindProjects2}/>
                    </div>
                    </div>

                    <div className={classes.Filter}>
                    Filter based on Preferences
                        <div className={classes.FilterContent}>
                            <div>Interested in only Biology related projects?</div>
                            <div>Filter based on your preferred subject</div>
                            <div>Pick and choose the size and complexity of projects</div>
                        </div>
                    <div className={classes.FilterAssets}>
                        <img src={Filter1} alt='Filter1 example' className={classes.Filter1}/>
                        <img src={Filter2} alt='Filter2 example' className={classes.Filter2}/>
                    </div>
                    </div>
                </div>

                <div className={classes.Row2Content}>
                    <div className={classes.CreateProfile}>
                    Create a Profile
                        <div className={classes.CreateProfileContent}>
                            <div>Personalize your profile</div>
                            <div>Begin gathering commendments</div>
                            <div>Apply to projects you're interested in</div>
                        </div>
                    <div className={classes.CreateProfileAssets}>
                        <img src={CreateProfile1} alt='apple logo' className={classes.CreateProfile1}/>
                        <img src={CreateProfile2} alt='apple logo' className={classes.CreateProfile2}/>
                    </div>
                    </div>

                    <div className={classes.CreateProject}>
                    Create a Project
                        <div className={classes.CreateProjectContent}>
                            <div>Don't see a project you're interested in?</div>
                            <div>Create your own</div>
                            <div>Choose from a catalog of users to request to work on your project</div>
                        </div>
                    <div className={classes.CreateProjectAssets}>
                        <img src={CreateProject1} alt='apple logo' className={classes.CreateProject1}/>
                        <img src={CreateProject2} alt='apple logo' className={classes.CreateProject2}/>
                    </div>
                    </div>
                </div>

                <div className={classes.Row3Content}>
                    <div className={classes.Commendments}>
                    Commendments
                        <div className={classes.CommendmentsContent}>
                            <div>We aim to provide the experience before work experience</div>
                            <div>Commendments are a way for project owners to know how you've worked on other projects</div>
                            <div>Once you've finished a project, team members or project owners can commend you for your efforts</div>
                        </div>
                    <div className={classes.CommendmentsAssets}>
                        <img src={Commendments1} alt='apple logo' className={classes.Commendments1}/>
                        <img src={Commendments2} alt='apple logo' className={classes.Commendments2}/>
                    </div>
                    </div>
                </div>

                <div className={classes.Row4Content}>
                    <div className={classes.Promote}>
                    Promote
                        <div className={classes.PromoteContent}>
                            <div>We aim to provide the experience before work experience</div>
                            <div>Commendments are a way for project owners to know how you've worked on other projects</div>
                            <div>Once you've finished a project, team members or project owners can commend you for your efforts</div>
                        </div>
                    <div className={classes.PromoteAssets}>
                        <img src={Promote1} alt='apple logo' className={classes.Promote1}/>
                        <img src={Promote2} alt='apple logo' className={classes.Promote2}/>
                    </div>
                    </div>
                </div>
            </div>
        </div>
      </WithClass>
    );
  }
}

export default ui;
