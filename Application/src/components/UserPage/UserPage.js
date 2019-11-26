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
import BiographyForm from "../../containers/UserPage/biographyForm/Form";
import SubjectExperienceForm from "../../containers/UserPage/subjectExperienceForm/Form";
import SubjectTagsForm from "../../containers/UserPage/subjectTagsForm/Form";
import ProjectPositionsForm from "../../containers/UserPage/projectPositionsForm/Form";
import Content from "./UI/Content/Content";

/**
 * Profile user page
 * (Handles both case of being the current user and a visiting user)
 *
 * Called by App.js in <Route>
 */
class ui extends Component {
  state = {
    biographyForm: false,
    subjectExperienceForm: false,
    subjectTagsForm: false,
    projectPositionsForm: false,

    subjectExperienceArray: [],
    subjectTagsArray: [],
    projectPositionsArray: [],

    profileOptions: false
  };

  getPublicUserProfile = () => {
    return this.props.getPublicUserProfile(
      `${this.props.location.pathname.match(/[^/]+$/)[0]}`
    );
  };

  // Get the user's profile upon loading URL
  componentDidMount() {
    this.getPublicUserProfile();
  }

  // If redirecting back to user profile owner's page, update profile
  componentDidUpdate(prevProps) {
    if (
      this.props.location.pathname.match(/[^/]+$/)[0] !==
      prevProps.location.pathname.match(/[^/]+$/)[0]
    ) {
      this.getPublicUserProfile();
    }
  }

  switchForm = (form, formValue) => {
    this.setState({ [form]: !formValue });
  };

  toggleProfilePictureOptions = () => {
    this.setState(prevState => ({
      profileOptions: !prevState.profileOptions
    }));
  };

  handleFrontEndDelete = (arrayName, array, id) => {
    this.setState({ [arrayName]: array.filter(el => el !== id) });
  };

  render() {
    let spinner = null;

    // Checking public profiles vs (current logged in) private user
    let publicName = null;
    let privateName = null;

    // Declare user posted content to null
    let workBiography = null;
    let subjectExperience = null;
    let subjectTags = null;
    let projectPositions = null;

    // "Adding" elements
    let addProfilePic = null;
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
    
    // "Edit" elements
    let editBiography = null;
    let editSubjectExperience = null;
    let editSubjectTags = null;
    let editProjectPositions = null;
    

    // Misc items for now
    let becomeVerifiedUser = null;
    let profileOptionsDiv = null;

    // Whole page elements
    let page = null;
    let secondpage = null;

    // Once getPublicUserProfile completes getting public info, page loads
    if (this.props.getUserProfileComplete) {
      publicName = localStorage.getItem("publicuserinfoname");
      privateName = localStorage.getItem("name");
      workBiography = localStorage.getItem("publicuserinfoworkBiography");
      subjectExperience = localStorage.getItem(
        "publicuserinfosubjectExperience"
      );
      subjectTags = localStorage.getItem("publicuserinfosubjectTags");
      projectPositions = localStorage.getItem("publicuserinfoprojectPositions");

      // Parse subjectExperience localStorage items to an array
      if (subjectExperience[0] !== "null") {
        subjectExperience = subjectExperience.split(",");
      }

      if (!this.props.deleteUserProfileContentLoading) {
        for (let key in subjectExperience) {
          if (
            !this.state.subjectExperienceArray.some(
              e => e.content === subjectExperience[key]
            )
          ) {
            this.state.subjectExperienceArray.push({
              id: key,
              content: subjectExperience[key]
            });
          }
        }
      }

      // Parse subjectTags localStorage items to an array
      if (subjectTags[0] !== "null") {
        subjectTags = subjectTags.split(",");
      }

      if (!this.props.deleteUserProfileContentLoading) {
        for (let key in subjectTags) {
          if (
            !this.state.subjectTagsArray.some(
              e => e.content === subjectTags[key]
            )
          ) {
            this.state.subjectTagsArray.push({
              id: key,
              content: subjectTags[key]
            });
          }
        }
      }

      // Parse projectPositions localStorage items to an array
      if (projectPositions[0] !== "null") {
        projectPositions = projectPositions.split(",");
      }

      if (!this.props.deleteUserProfileContentLoading) {
        for (let key in projectPositions) {
          if (
            !this.state.projectPositionsArray.some(
              e => e.content === projectPositions[key]
            )
          ) {
            this.state.projectPositionsArray.push({
              id: key,
              content: projectPositions[key]
            });
          }
        }
      }

      // Checking if this public profile is the current user's profile
      // Check will be changed to check uid instead of privatename
      if (publicName === privateName) {
        addProfilePic = (
          <button
            className={classes.AddProfilePicture}
            onClick={this.toggleProfilePictureOptions}
          >
            +
          </button>
        );

        if (this.state.profileOptions) {
          profileOptionsDiv = (
            <div className={classes.ProfilePictureOptionsContainer}>
              <div className={classes.ProfilePictureOptions} />
            </div>
          );
        }

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

        if (workBiography === "null") {
          if (this.state.biographyForm) {
            addBiography = (
              <WithClass>
                <BiographyForm
                  switchForm={() =>
                    this.switchForm("biographyForm", this.state.biographyForm)
                  }
                />
              </WithClass>
            );
          } else {
            addBiography = (
              // Container for both pencil icon & text
              <div className={classes.WorkBiographyContainer}>
                <button
                  className={classes.WorkBiographyButton}
                  onClick={() =>
                    this.switchForm("biographyForm", this.state.biographyForm)
                  }
                >
                  <img
                    src={Edit}
                    alt="Add Biography"
                    className={classes.Edit}
                  />
                  Add a work biography
                </button>
              </div>
            );
          }
        } else {
          if (this.state.biographyForm) {
            editBiography = (
              <WithClass>
                <BiographyForm
                  switchForm={() =>
                    this.switchForm("biographyForm", this.state.biographyForm)
                  }
                />
              </WithClass>
            );
          } else {
            editBiography = (
              // Container for both pencil icon & text
              <WithClass>
                <div className={classes.WorkBiographyContainer}>
                  <button
                    className={classes.WorkBiographyButton}
                    onClick={() =>
                      this.switchForm("biographyForm", this.state.biographyForm)
                    }
                  >
                    <img
                      src={Edit}
                      alt="Edit Biography"
                      className={classes.Edit}
                    />
                    Edit work biography
                  </button>
                </div>
              </WithClass>
            );
          }
        }

        if (
          subjectExperience[0] === "null" ||
          subjectExperience[0] === "undefined"
        ) {
          if (this.state.subjectExperienceForm) {
            addSubjectExperience = (
              <WithClass>
                <SubjectExperienceForm
                  switchForm={() =>
                    this.switchForm(
                      "subjectExperienceForm",
                      this.state.subjectExperienceForm
                    )
                  }
                />
              </WithClass>
            );
          } else {
            addSubjectExperience = (
              <button
                className={classes.AddSubjects}
                onClick={() =>
                  this.switchForm(
                    "subjectExperienceForm",
                    this.state.subjectExperienceForm
                  )
                }
              >
                + Add subjects you would like experience in
              </button>
            );
          }
        } else {
          if (this.state.subjectExperienceForm) {
            editSubjectExperience = (
              <WithClass>
                <SubjectExperienceForm
                  switchForm={() =>
                    this.switchForm(
                      "subjectExperienceForm",
                      this.state.subjectExperienceForm
                    )
                  }
                />
              </WithClass>
            );
          } else {
            editSubjectExperience = (
              // Container for both pencil icon & text
              <WithClass>
                <button
                  className={classes.AddSubjects}
                  onClick={() =>
                    this.switchForm(
                      "subjectExperienceForm",
                      this.state.subjectExperienceForm
                    )
                  }
                >
                  + Edit subjects you would like experience in
                </button>
              </WithClass>
            );
          }
        }

        if (subjectTags[0] === "null" || subjectTags[0] === "undefined") {
          if (this.state.subjectTagsForm) {
            addSubjectTags = (
              <WithClass>
                <SubjectTagsForm
                  switchForm={() =>
                    this.switchForm(
                      "subjectTagsForm",
                      this.state.subjectTagsForm
                    )
                  }
                />
              </WithClass>
            );
          } else {
            addSubjectTags = (
              <button
                className={classes.AddSubjectTags}
                onClick={() =>
                  this.switchForm("subjectTagsForm", this.state.subjectTagsForm)
                }
              >
                + Add subject specific tags
              </button>
            );
          }
        } else {
          if (this.state.subjectTagsForm) {
            editSubjectTags = (
              <WithClass>
                <SubjectTagsForm
                  switchForm={() =>
                    this.switchForm(
                      "subjectTagsForm",
                      this.state.subjectTagsForm
                    )
                  }
                />
              </WithClass>
            );
          } else {
            editSubjectTags = (
              // Container for both pencil icon & text
              <WithClass>
                <button
                  className={classes.AddSubjectTags}
                  onClick={() =>
                    this.switchForm(
                      "subjectTagsForm",
                      this.state.subjectTagsForm
                    )
                  }
                >
                  + Edit subject specific tags
                </button>
              </WithClass>
            );
          }
        }

        if (
          projectPositions[0] === "null" ||
          projectPositions[0] === "undefined"
        ) {
          if (this.state.projectPositionsForm) {
            addProjectPositions = (
              <WithClass>
                <ProjectPositionsForm
                  switchForm={() =>
                    this.switchForm(
                      "projectPositionsForm",
                      this.state.projectPositionsForm
                    )
                  }
                />
              </WithClass>
            );
          } else {
            addProjectPositions = (
              <button
                className={classes.AddProjectPositions}
                onClick={() =>
                  this.switchForm(
                    "projectPositionsForm",
                    this.state.projectPositionsForm
                  )
                }
              >
                + Add project positions you are seeking
              </button>
            );
          }
        } else {
          if (this.state.projectPositionsForm) {
            editProjectPositions = (
              <WithClass>
                <ProjectPositionsForm
                  switchForm={() =>
                    this.switchForm(
                      "projectPositionsForm",
                      this.state.projectPositionsForm
                    )
                  }
                />
              </WithClass>
            );
          } else {
            editProjectPositions = (
              // Container for both pencil icon & text
              <WithClass>
                <button
                  className={classes.AddSubjectTags}
                  onClick={() =>
                    this.switchForm(
                      "projectPositionsForm",
                      this.state.projectPositionsForm
                    )
                  }
                >
                  + Edit subject specific tags
                </button>
              </WithClass>
            );
          }
        }

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

      /*
       *   First top-half of the page divs which includes:
       *   Profile picture
       *   Become verified user
       *   Work Biography
       *   Subject Experience
       *   Subject Specific Tags
       *   Project Positions Seeking
       */
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
              {profileOptionsDiv}
              <div className={classes.Name}>{publicName}</div>
              {becomeVerifiedUser}
              <div className={classes.WorkBiographyTitle}>Work Biography</div>

              {(workBiography !== "null" && workBiography !== "undefined") ||
              this.props.postWorkBiographyLoading ? (
                <div className={classes.WorkBiographyContent}>
                  {this.props.postWorkBiographyLoading ? (
                    <Spinner className={classes.biographySpinner} />
                  ) : (
                    workBiography
                  )}
                </div>
              ) : null}

              {publicName === privateName ? (
                <WithClass>
                  {addBiography}
                  {editBiography}
                </WithClass>
              ) : null}
              {(subjectExperience[0] !== "null" &&
                subjectExperience[0] !== "undefined") ||
              this.props.postSubjectExperienceLoading ? (
                <div className={classes.SubjectExperienceContent}>
                  {this.props.postSubjectExperienceLoading ? (
                    <Spinner className={classes.biographySpinner} />
                  ) : (
                    <Content
                      deleteFrontEnd={this.handleFrontEndDelete}
                      username={this.props.location.pathname.match(/[^/]+$/)[0]}
                      arrayName={"subjectExperience"}
                      array={this.state.subjectExperienceArray}
                      class={classes.SubjectExperience}
                    />
                  )}
                </div>
              ) : null}

              {publicName === privateName ? (
                <WithClass>
                  {addSubjectExperience}
                  {editSubjectExperience}
                </WithClass>
              ) : null}

              {(subjectTags[0] !== "null" && subjectTags[0] !== "undefined") ||
              this.props.postSubjectTagsLoading ? (
                <div className={classes.SubjectTagsContent}>
                  {this.props.postSubjectTagsLoading ? (
                    <Spinner className={classes.biographySpinner} />
                  ) : (
                    <Content
                      deleteFrontEnd={this.handleFrontEndDelete}
                      username={this.props.location.pathname.match(/[^/]+$/)[0]}
                      arrayName={"subjectTags"}
                      array={this.state.subjectTagsArray}
                      class={classes.SubjectTags}
                    />
                  )}
                </div>
              ) : null}

              {publicName === privateName ? (
                <WithClass>
                  {addSubjectTags}
                  {editSubjectTags}
                </WithClass>
              ) : null}

              <div className={classes.SeekingPositionsTitle}>
                Seeking Positions
              </div>
              {(projectPositions[0] !== "null" &&
                projectPositions[0] !== "undefined") ||
              this.props.postProjectPositionsLoading ? (
                <div className={classes.ProjectPositionsContent}>
                  {this.props.postProjectPositionsLoading ? (
                    <Spinner className={classes.biographySpinner} />
                  ) : (
                    <Content
                      deleteFrontEnd={this.handleFrontEndDelete}
                      username={this.props.location.pathname.match(/[^/]+$/)[0]}
                      arrayName={"projectPositions"}
                      array={this.state.projectPositionsArray}
                      class={classes.ProjectPositions}
                    />
                  )}
                </div>
              ) : null}

              {publicName === privateName ? (
                <WithClass>
                  {addProjectPositions}
                  {editProjectPositions}
                </WithClass>
              ) : null}
            </div>
            <div className={classes.RightColumn}>
              <div className={classes.CurrentProjectsTitle}>
                Previous Projects
              </div>
            </div>
          </div>
        </WithClass>
      );

      /*
       *   Second half of the page divs which includes:
       *   Past Experience
       *   Education
       */
      secondpage = (
        <WithClass>
          <div className={classes.SecondPage}>
            <div className={classes.ExperienceContainer}>
              <div className={classes.PastExperienceTitle}>Past Experience</div>
              <div className={classes.AddPhotoTitleAndPositionContainer}>
                <img
                  src={AddPhoto}
                  alt="Add company or project pic"
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
                  alt="Books pic"
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
      // Shows spinner until user profile page loads
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
    getUserProfileComplete: state.userProfileGet.getUserProfileComplete,

    postWorkBiographyLoading: state.userProfilePost.postWorkBiographyLoading,
    postSubjectExperienceLoading:
      state.userProfilePost.postSubjectExperienceLoading,
    postSubjectTagsLoading: state.userProfilePost.postSubjectTagsLoading,
    postProjectPositionsLoading:
      state.userProfilePost.postProjectPositionsLoading,

    deleteUserProfileContentLoading:
      state.userProfileDelete.deleteUserProfileContentLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPublicUserProfile: username => {
      dispatch(actions.getPublicUserProfile(username));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ui);
