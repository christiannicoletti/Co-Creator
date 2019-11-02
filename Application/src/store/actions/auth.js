import * as actionTypes from "./actionTypes";
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  localStorage.removeItem("name");
  localStorage.removeItem("photoURL");
  localStorage.removeItem("userId");
  localStorage.removeItem("email");
  localStorage.removeItem("displayName");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const authSignup = (name, email, displayName, password) => {
  return async (dispatch) => {
    dispatch(authStart());
    const authData = {
      name: name,
      email: email,
      displayName: displayName,
      password: password,
      returnSecureToken: true
    };  
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_API_KEY}`;

    try {
      console.log("Authenticating email/password")
      const res = await axios.post(url, authData);
      console.log("Authenticated email/password!")
      const expirationData = new Date(
        new Date().getTime() + res.data.expiresIn * 1000
      );
      const uid = res.data.localId;
      localStorage.setItem("token", res.data.idToken);
      localStorage.setItem("expirationDate", expirationData);
      localStorage.setItem("userId", res.data.localId);
      dispatch(authSuccess(res.data.idToken, res.data.localId));
      dispatch(checkAuthTimeout(res.data.expiresIn));

      console.log("Storing user...")
      url = `https://us-central1-co-creator-144ca.cloudfunctions.net/addUser`
      const userData = {
        uid: uid,
        name: name,
        email: email,
        photoURL: 'hgfdhhfgd',
        username: displayName
      }
      const user = await axios.post(url, userData);
      localStorage.setItem("name", name);
      localStorage.setItem("photoURL", 'hgfdhhfgd');
      localStorage.setItem("displayName", displayName);
      console.log("User stored: ", user)

    } catch (err) {
      dispatch(authFail(err));
    }
  };
};

export const authSignin = (email, password) => {
  return async (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_API_KEY}`;
    try {
      console.log("Authenticating email/password")
      const res = await axios.post(url, authData);
      console.log("Authenticated email/password!")
      const expirationData = new Date(
        new Date().getTime() + res.data.expiresIn * 1000
      );
      localStorage.setItem("token", res.data.idToken);
      localStorage.setItem("expirationDate", expirationData);
      localStorage.setItem("userId", res.data.localId);
      dispatch(authSuccess(res.data.idToken, res.data.localId));
      dispatch(checkAuthTimeout(res.data.expiresIn));
    } catch (err) {
      dispatch(authFail(err.response.data.error));
    }
  };
};

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
