import * as actionTypes from "../actions/actionTypes";
import { updateObject } from '../../shared/utility';

const initialState = {
  deleteUserProfileContentError: null,
  deleteUserProfileContentLoading: false,
  deleteUserProfileContentComplete: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DELETE_PUBLICUSERCONTENT_START:
      return updateObject(state, { 
        deleteUserProfileContentComplete: false,
        deleteUserProfileContentError: null, 
        deleteUserProfileContentLoading: true 
        });

    case actionTypes.DELETE_PUBLICUSERCONTENT_SUCCESS:
      return updateObject(state, {
        deleteUserProfileContentError: null,
        deleteUserProfileContentLoading: false,
        deleteUserProfileContentComplete: true
      });

    case actionTypes.DELETE_PUBLICUSERCONTENT_FAIL:
      return updateObject(state, {
        deleteUserProfileContentError: action.error,
        deleteUserProfileContentLoading: false
      });

    default:
      return state;
  }
};

export default reducer;