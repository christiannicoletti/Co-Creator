import * as actionTypes from "./actionTypes";
import axios from "axios";

/*
 *   Post Biography
 */ 
export const postBiographyStart = () => {
  return {
    type: actionTypes.POST_BIOGRAPHY_START
  };
};

export const postBiographySuccess = () => {
  return {
    type: actionTypes.POST_BIOGRAPHY_SUCCESS
  };
};

export const postBiographyFail = error => {
  return {
    type: actionTypes.POST_BIOGRAPHY_FAIL,
    error: error
  };
};

export const postBiography = (username, workBiography) => {
  return async dispatch => {
    try {
      dispatch(postBiographyStart());
      let url_post = `https://us-central1-co-creator-144ca.cloudfunctions.net/postBiography`;
      const workBiographyEntry = {
        username: username,
        workBiography: workBiography
      };
      const postResponse = await axios.post(url_post, workBiographyEntry);
      console.log("Public user data posted: ", postResponse.data);
      localStorage.setItem(
        "publicuserinfoworkBiography",
        postResponse.data.workBiography
      );
      dispatch(postBiographySuccess());
    } catch (err) {
      dispatch(postBiographyFail(err));
    }
  };
};

/*
 *   Post subjects user is interested in
 */
export const postSubjectExperienceStart = () => {
  return {
    type: actionTypes.POST_SUBJECTEXPERIENCE_START
  };
};

export const postSubjectExperienceSuccess = () => {
  return {
    type: actionTypes.POST_SUBJECTEXPERIENCE_SUCCESS
  };
};

export const postSubjectExperienceFail = error => {
  return {
    type: actionTypes.POST_SUBJECTEXPERIENCE_FAIL,
    error: error
  };
};

export const postSubjectExperience = (username, subjectExperience) => {
  return async dispatch => {
    try {
      dispatch(postSubjectExperienceStart());
      let url_post = `https://us-central1-co-creator-144ca.cloudfunctions.net/postSubjectExperience`;
      const subjectExperienceEntry = {
        username: username,
        subjectExperience: subjectExperience
      };
      const postResponse = await axios.post(url_post, subjectExperienceEntry);
      console.log("Public user data posted: ", postResponse.data);
      const previousSubjectExperienceItem = localStorage.getItem("publicuserinfosubjectExperience");
      localStorage.setItem(
        "publicuserinfosubjectExperience",
        `${previousSubjectExperienceItem},${postResponse.data.subjectExperience}`
      );
      dispatch(postSubjectExperienceSuccess());
    } catch (err) {
      dispatch(postSubjectExperienceFail(err));
    }
  };
};

/*
 *   Post subjects specific tags
 */
export const postSubjectTagsStart = () => {
  return {
    type: actionTypes.POST_SUBJECTTAGS_START
  };
};

export const postSubjectTagsSuccess = () => {
  return {
    type: actionTypes.POST_SUBJECTTAGS_SUCCESS
  };
};

export const postSubjectTagsFail = error => {
  return {
    type: actionTypes.POST_SUBJECTTAGS_FAIL,
    error: error
  };
};

export const postSubjectTags = (username, subjectTags) => {
  return async dispatch => {
    try {
      dispatch(postSubjectTagsStart());
      let url_post = `https://us-central1-co-creator-144ca.cloudfunctions.net/postSubjectTags`;
      const subjectTagsEntry = {
        username: username,
        subjectTags: subjectTags
      };
      const postResponse = await axios.post(url_post, subjectTagsEntry);
      console.log("Public user data posted: ", postResponse.data);
      const previousSubjectTagsItem = localStorage.getItem("publicuserinfosubjectTags");
      localStorage.setItem(
        "publicuserinfosubjectTags",
        `${previousSubjectTagsItem},${postResponse.data.subjectTags}`
      );
      dispatch(postSubjectTagsSuccess());
    } catch (err) {
      dispatch(postSubjectTagsFail(err));
    }
  };
};

/*
 *   Post project positions user is seeking
 */
export const postProjectPositionsStart = () => {
  return {
    type: actionTypes.POST_PROJECTPOSITIONS_START
  };
};

export const postProjectPositionsSuccess = () => {
  return {
    type: actionTypes.POST_PROJECTPOSITIONS_SUCCESS
  };
};

export const postProjectPositionsFail = error => {
  return {
    type: actionTypes.POST_PROJECTPOSITIONS_FAIL,
    error: error
  };
};

export const postProjectPositions = (username, projectPositions) => {
  return async dispatch => {
    try {
      dispatch(postProjectPositionsStart());
      let url_post = `https://us-central1-co-creator-144ca.cloudfunctions.net/postProjectPositions`;
      const projectPositionsEntry = {
        username: username,
        projectPositions: projectPositions
      };
      const postResponse = await axios.post(url_post, projectPositionsEntry);
      console.log("Public user data posted: ", postResponse.data);
      const previousProjectPositionsItem = localStorage.getItem("publicuserinfoprojectPositions");
      localStorage.setItem(
        "publicuserinfoprojectPositions",
        `${previousProjectPositionsItem},${postResponse.data.projectPositions}`
      );
      dispatch(postProjectPositionsSuccess());
    } catch (err) {
      dispatch(postProjectPositionsFail(err));
    }
  };
};
