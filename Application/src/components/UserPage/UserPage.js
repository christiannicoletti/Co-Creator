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

/**
 * First Default landing page
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
    projectPositionsArray: []
  };

  // Get the user's profile upon loading URL
  componentDidMount() {
    this.props.getPublicUserProfile(
      `${this.props.location.pathname.match(/[^/]+$/)[0]}`
    );
  }

  // If redirecting back to user profile owner's page, update profile
  componentDidUpdate(prevProps) {
    if (
      this.props.location.pathname.match(/[^/]+$/)[0] !==
      prevProps.location.pathname.match(/[^/]+$/)[0]
    ) {
      this.props.getPublicUserProfile(
        `${this.props.location.pathname.match(/[^/]+$/)[0]}`
      );
    }
  }

  switchBiographyForm = () => {
    this.setState({ biographyForm: !this.state.biographyForm });
  };

  switchSubjectExperienceForm = () => {
    this.setState({ subjectExperienceForm: !this.state.subjectExperienceForm });
  };

  switchSubjectTagsForm = () => {
    this.setState({ subjectTagsForm: !this.state.subjectTagsForm });
  };

  switchProjectPositionsForm = () => {
    this.setState({ projectPositionsForm: !this.state.projectPositionsForm });
  };

  handleDelete = (id) => {
    this.setState(({ subjectExperienceArray: this.state.subjectExperienceArray.filter(element => element !== id )}));
  }

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

    // "Edit" elements
    let editBiography = null;
    let editSubjectExperience = null;
    let editSubjectTags = null;
    let editProjectPositions = null;

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

      // Parse some localSorage items to an array
      if (subjectExperience[0] !== "null") {
        subjectExperience = subjectExperience.split(",");
      }

      for (let key in subjectExperience) {
        this.state.subjectExperienceArray.push({
          id: key,
          subject: subjectExperience[key]
        });
      }

      if (subjectTags[0] !== "null") {
        subjectTags = subjectTags.split(",");
      }

      for (let key in subjectTags) {
        this.state.subjectTagsArray.push({
          id: key,
          tag: subjectTags[key]
        });
      }

      if (projectPositions[0] !== "null") {
        projectPositions = projectPositions.split(",");
      }

      for (let key in projectPositions) {
        this.state.projectPositionsArray.push({
          id: key,
          position: projectPositions[key]
        });
      }

      // Checking if this public profile is the current user's profile
      // Check will be changed to check uid instead of privatename
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

        if (workBiography === "null") {
          if (this.state.biographyForm) {
            addBiography = (
              <WithClass>
                <BiographyForm switchBiographyForm={this.switchBiographyForm} />
              </WithClass>
            );
          } else {
            addBiography = (
              // Container for both pencil icon & text
              <div className={classes.WorkBiographyContainer}>
                <button
                  className={classes.WorkBiographyButton}
                  onClick={this.switchBiographyForm}
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
                <BiographyForm switchBiographyForm={this.switchBiographyForm} />
              </WithClass>
            );
          } else {
            editBiography = (
              // Container for both pencil icon & text
              <WithClass>
                <div className={classes.WorkBiographyContainer}>
                  <button
                    className={classes.WorkBiographyButton}
                    onClick={this.switchBiographyForm}
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
                  switchSubjectExperienceForm={this.switchSubjectExperienceForm}
                />
              </WithClass>
            );
          } else {
            addSubjectExperience = (
              <button
                className={classes.AddSubjects}
                onClick={this.switchSubjectExperienceForm}
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
                  switchSubjectExperienceForm={this.switchSubjectExperienceForm}
                />
              </WithClass>
            );
          } else {
            editSubjectExperience = (
              // Container for both pencil icon & text
              <WithClass>
                <button
                  className={classes.AddSubjects}
                  onClick={this.switchSubjectExperienceForm}
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
                  switchSubjectTagsForm={this.switchSubjectTagsForm}
                />
              </WithClass>
            );
          } else {
            addSubjectTags = (
              <button
                className={classes.AddSubjectTags}
                onClick={this.switchSubjectTagsForm}
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
                  switchSubjectTagsForm={this.switchSubjectTagsForm}
                />
              </WithClass>
            );
          } else {
            editSubjectTags = (
              // Container for both pencil icon & text
              <WithClass>
                <button
                  className={classes.AddSubjectTags}
                  onClick={this.switchSubjectTagsForm}
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
                  switchProjectPositionsForm={this.switchProjectPositionsForm}
                />
              </WithClass>
            );
          } else {
            addProjectPositions = (
              <button
                className={classes.AddProjectPositions}
                onClick={this.switchProjectPositionsForm}
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
                  switchProjectPositionsForm={this.switchProjectPositionsForm}
                />
              </WithClass>
            );
          } else {
            editProjectPositions = (
              // Container for both pencil icon & text
              <WithClass>
                <button
                  className={classes.AddSubjectTags}
                  onClick={this.switchProjectPositionsForm}
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
                    this.state.subjectExperienceArray.map(subjectExperience => (
                      <div
                        key={subjectExperience.id}
                        className={classes.SubjectExperience}
                        onClick={() => this.handleDelete(subjectExperience.id)}
                      >
                        {subjectExperience.subject}
                      </div>
                    ))
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
                    this.state.subjectTagsArray.map(subjectTags => (
                      <div 
                        key={subjectTags.id} 
                        className={classes.SubjectTags}
                      >
                        {subjectTags.tag}
                      </div>
                    ))
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
                    this.state.projectPositionsArray.map(projectPositions => (
                      <div
                        key={projectPositions.id}
                        className={classes.ProjectPositions}
                      >
                        {projectPositions.position}
                      </div>
                    ))
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
      // Shows spinner until profile page loads
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
      state.userProfilePost.postProjectPositionsLoading
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
