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

// export const auth = (name, email, displayName, password, isSignup) => {
//   return dispatch => {
//     dispatch(authStart());
//     const authData = {
//       name: name,
//       email: email,
//       displayName: displayName,
//       password: password,
//       returnSecureToken: true
//     };
//     let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_API_KEY}`;
//     if (!isSignup) {
//       url =
//         `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_API_KEY}`;
//     }
//     axios
//       .post(url, authData)
//       .then(res => {
//         const expirationData = new Date(
//           new Date().getTime() + res.data.expiresIn * 1000
//         );
//         localStorage.setItem("token", res.data.idToken);
//         localStorage.setItem("expirationDate", expirationData);
//         localStorage.setItem("userId", res.data.localId);
//         dispatch(authSuccess(res.data.idToken, res.data.localId));
//         dispatch(checkAuthTimeout(res.data.expiresIn));

//         //
//       })
//       .catch(err => {
//         dispatch(authFail(err.response.data.error));
//       });
//   };
// };
export const auth = (name, email, displayName, password, isSignup) => {
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
    if (!isSignup) {
      url =
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_API_KEY}`;
    }
    try {
      const res = await axios.post(url, authData);
      const expirationData = new Date(
        new Date().getTime() + res.data.expiresIn * 1000
      );
      const uid = res.data.localId;
      localStorage.setItem("token", res.data.idToken);
      localStorage.setItem("expirationDate", expirationData);
      localStorage.setItem("userId", res.data.localId);
      dispatch(authSuccess(res.data.idToken, res.data.localId));
      dispatch(checkAuthTimeout(res.data.expiresIn));
      if(isSignup){
        console.log("User is signing up")
        const user = await axios.post('https://us-central1-co-creator-144ca.cloudfunctions.net/addUser',{
        uid: uid,
        name: name,
        email: email,
        username: displayName
      });
      console.log("User is created: ", user)
      }
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
