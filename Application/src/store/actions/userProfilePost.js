import * as actionTypes from "./actionTypes";
import axios from "axios";

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

export const postBiography = (workBiography) => {
    return async dispatch => {
      try {
        dispatch(postBiographyStart());
        let url_post = `https://us-central1-co-creator-144ca.cloudfunctions.net/postBiography`;
        const workBiographyEntry = {
          workBiography: workBiography
        };
        const postResponse = await axios.post(url_post, workBiographyEntry);
        console.log("Public user data posted: ", postResponse);
        dispatch(postBiographySuccess());
      } catch (err) {
        dispatch(postBiographyFail(err));
      }
    };
  };