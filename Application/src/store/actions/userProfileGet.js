import * as actionTypes from "./actionTypes";
import axios from "axios";

export const getPublicUserProfileStart = () => {
  return {
    type: actionTypes.GET_PUBLICUSERPROFILE_START
  };
};

export const getPublicUserProfileFail = () => {
    return {
      type: actionTypes.GET_PUBLICUSERPROFILE_FAIL
    };
  };

  export const getPublicUserProfileSuccess = () => {
    return {
      type: actionTypes.GET_PUBLICUSERPROFILE_SUCCESS
    };
  };
  

  export const getPublicUserProfile = (username) => {
    return async dispatch => {
      try {
        dispatch(getPublicUserProfileStart());
        let url_retrieve = `https://us-central1-co-creator-144ca.cloudfunctions.net/getPublicUser`;
        const user = {
          username: username
        };
        const userData = await axios.post(url_retrieve, user);
        console.log("Public user data retrieved: ", userData.data);
        localStorage.setItem("publicuserinfoname", userData.data.name);
        localStorage.setItem("publicuserinfousername", userData.data.username);
        localStorage.setItem("publicuserinfoemail", userData.data.email);
        localStorage.setItem("publicuserinfophoto", userData.data.photo);
        dispatch(getPublicUserProfileSuccess());
      } catch (err) {
        dispatch(getPublicUserProfileFail(err));
      }
  };
};