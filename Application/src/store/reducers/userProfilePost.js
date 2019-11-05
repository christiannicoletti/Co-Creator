import * as actionTypes from "../actions/actionTypes";
import { updateObject } from '../../shared/utility';

const initialState = {
  error: null,
  loading: false,
  complete: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.POST_BIOGRAPHY_START:
      return updateObject(state, { 
          error: null, 
          loading: true 
        });

    case actionTypes.POST_BIOGRAPHY_SUCCESS:
      return updateObject(state, {
        error: null,
        loading: false,
        complete: true
      });

    case actionTypes.POST_BIOGRAPHY_FAIL:
      return updateObject(state, {
        error: action.error,
        loading: false
      });

    default:
      return state;
  }
};

export default reducer;