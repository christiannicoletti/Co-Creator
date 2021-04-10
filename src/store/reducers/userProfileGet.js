import * as actionTypes from "../actions/actionTypes";
import { updateObject } from '../../shared/utility';

const initialState = {
  getUserProfileError: null,
  getUserProfileLoading: false,
  getUserProfileComplete: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PUBLICUSERPROFILE_START:
      return updateObject(state, { 
        getUserProfileComplete: false,
        getUserProfileError: null, 
        getUserProfileLoading: true 
        });

    case actionTypes.GET_PUBLICUSERPROFILE_SUCCESS:
      return updateObject(state, {
        getUserProfileError: null,
        getUserProfileLoading: false,
        getUserProfileComplete: true
      });

    case actionTypes.GET_PUBLICUSERPROFILE_FAIL:
      return updateObject(state, {
        getUserProfileError: action.error,
        getUserProfileLoading: false
      });

    default:
      return state;
  }
};

export default reducer;