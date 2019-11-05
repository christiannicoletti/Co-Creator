import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

import classes from "./UserPage.module.css";

import WithClass from "../../hoc/withClass";
import Background from "../shared/Background/Background";
import Layout from "../shared/Layout/Layout";
import Spinner from "../shared/UI/Spinner/Spinner";
import Learn from "../../assets/images/UserPage/learn.png";
import Edit from "../../assets/images/UserPage/edit.png";
import Commendment from "../../assets/images/UserPage/commendment.png";
import Favorite from "../../assets/images/UserPage/favorite.png";
import AddPhoto from "../../assets/images/UserPage/addphoto.png";
import University from "../../assets/images/UserPage/university.png";
import ProfilePicture from "../../assets/images/Toolbar/default_picture.png";

/**
 * First Default landing page
 *
 * Called by App.js in <Route>
 */
class ui extends Component {
  componentDidMount() {
    this.props.getPublicUserProfile(`${this.props.location.pathname.match(/[^/]+$/)}`);
  }

  render() {
    // Checking public profiles vs (current logged in) private user
    let publicName = null;
    let privateName = null;

    let spinner = null;

    // "Adding" elements
    let addProfilePic = null;
    let becomeVerifiedUser = null;
    let addBiography = null;
    let addSubjectExperience = null;
    let addSubjectTags = null;
    let addProjectPositions = null;
    let addCompanyOrProject = null;
    let addPosition = null;
    let addEmploymentDate = null;
    let addDescription = null;
    let addUniversity = null;
    let addDegree = null;
    let addMajor = null;
    let addDateEducation = null;
    let addCoursework = null;
    let addExtra = null;

    // Whole page elements
    let page = null;
    let secondpage = null;

    console.log(this.props.complete)
    // Once fetchUserInfo completes fetching public info, page loads
    if (this.props.complete) {
      publicName = localStorage.getItem("publicuserinfoname");
      privateName = localStorage.getItem("name");

      // Checking if this public profile is the current user's profile
      if (publicName === privateName) {
        addProfilePic = (
          <button className={classes.AddProfilePicture}>+</button>
        );

        becomeVerifiedUser = (
          // Container for both pencil icon & text
          <div className={classes.VerifiedContainer}>
            <button className={classes.becomeVerifiedUser}>
              <img
                src={Learn}
                alt="learn abt verified"
                className={classes.Learn}
              />
              Become a verified user
            </button>
          </div>
        );

        addBiography = (
          // Container for both pencil icon & text
          <div className={classes.WorkBiographyContainer}>
            <button className={classes.WorkBiographyContent}>
              <img src={Edit} alt="Edit Biography" className={classes.Edit} />
              Add a work biography
            </button>
          </div>
        );

        addSubjectExperience = (
          <button className={classes.AddSubjects}>
            + Add subjects you would like experience in
          </button>
        );

        addSubjectTags = (
          <button className={classes.AddSubjectTags}>
            + Add subject specific tags
          </button>
        );

        addProjectPositions = (
          <button className={classes.AddProjectPositions}>
            + Add project positions you are seeking
          </button>
        );

        addCompanyOrProject = (
          <button className={classes.AddCompanyOrProject}>
            + Add a company or project
          </button>
        );

        addPosition = (
          <button className={classes.AddPosition}>
            + Add your position at that company or project
          </button>
        );

        addEmploymentDate = (
          <button className={classes.AddEmploymentDate}>
            + Add employment date
          </button>
        );

        addDescription = (
          <button className={classes.AddDescription}>
            + Add a Description
          </button>
        );

        addUniversity = (
          <button className={classes.AddUniversity}>
            + Add your university
          </button>
        );

        addDegree = (
          <button className={classes.AddDegree}>+ Add your degree</button>
        );

        addMajor = (
          <button className={classes.AddMajor}>+ Add your major</button>
        );

        addDateEducation = (
          <button className={classes.AddDateEducation}>
            + Add date of education
          </button>
        );

        addCoursework = (
          <button className={classes.AddCoursework}>
            + Add your Coursework
          </button>
        );
        
        addExtra = (
          <button className={classes.AddExtra}>
            + Add any extracarricular
          </button>
        );
      }

      page = (
        <WithClass>
          <div className={classes.ProfileContainer}>
            <div className={classes.LeftColumn}>
              <div className={classes.CurrentProjectsTitle}>
                Current Projects
              </div>
              <div className={classes.PositionsExperiencedTitle}>
                Positions Experienced
              </div>
            </div>
            <div className={classes.StatsContainer}>
              <div className={classes.CommendmentsTitle}>
                <img
                  src={Commendment}
                  alt="Commendment icon"
                  className={classes.Commendment}
                />
                <div className={classes.Number}>0</div>
                Commendments
              </div>
              <div className={classes.FavoritesTitle}>
                <img
                  src={Favorite}
                  alt="Favorite icon"
                  className={classes.Favorite}
                />
                <div className={classes.Number}>0</div>
                Favorites
              </div>
            </div>
            <div className={classes.CenterColumn}>
              <img
                src={ProfilePicture}
                alt="Default prof pic"
                className={classes.ProfilePicture}
              />
              {addProfilePic}
              <div className={classes.Name}>{publicName}</div>
              {becomeVerifiedUser}
              <div className={classes.WorkBiographyTitle}>Work Biography</div>
              {addBiography}
              {addSubjectExperience}
              {addSubjectTags}
              <div className={classes.SeekingPositionsTitle}>
                Seeking Positions
              </div>
              {addProjectPositions}
            </div>
            <div className={classes.RightColumn}>
              <div className={classes.CurrentProjectsTitle}>
                Previous Projects
              </div>
            </div>
          </div>
        </WithClass>
      );

      secondpage = (
        <WithClass>
          <div className={classes.SecondPage}>
            <div className={classes.ExperienceContainer}>
              <div className={classes.PastExperienceTitle}>Past Experience</div>
              <div className={classes.AddPhotoTitleAndPositionContainer}>
                <img
                  src={AddPhoto}
                  alt="Add company or project photo"
                  className={classes.AddPhoto}
                />
                <div className={classes.AddTitleAndPositionContainer}>
                  {addCompanyOrProject}
                  {addPosition}
                </div>
              </div>
              <div className={classes.AddEmploymentAndDateContainer}>
                {addEmploymentDate}
                {addDescription}
              </div>
            </div>

            <div className={classes.EducationContainer}>
              <div className={classes.EducationTitle}>Education</div>
              <div className={classes.AddPhotoAndUniversityContainer}>
                <img
                  src={University}
                  alt="Books picture"
                  className={classes.University}
                />
                <div className={classes.AddUniversityContainer}>
                  {addUniversity}
                  {addDegree}
                  {addMajor}
                </div>
              </div>
              <div className={classes.AddDateCourseworkAndExtraContainer}>
                {addDateEducation}
                <div className={classes.CourseWorkContainer}>
                  <div className={classes.CourseworkTitle}>Coursework</div>
                  {addCoursework}
                </div>
                <div className={classes.ExtraContainer}>
                  <div className={classes.ExtraTitle}>Extracarricular</div>
                  {addExtra}
                </div>
              </div>
            </div>
          </div>
        </WithClass>
      );
    } else {
      spinner = <Spinner className={classes.Spinner} />;
    }

    return (
      <WithClass>
        <Background />
        <Layout />
        {page}
        {secondpage}
        {spinner}
      </WithClass>
    );
  }
}

const mapStateToProps = state => {
  return {
    complete: state.userProfileGet.complete
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPublicUserProfile: username => {
      dispatch(actions.getPublicUserProfile(username));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ui);
