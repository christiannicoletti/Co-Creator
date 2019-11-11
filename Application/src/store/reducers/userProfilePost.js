import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  postworkBiographyError: null,
  postworkBiographyLoading: false,
  postworkBiographyComplete: false,

  postSubjectExperienceError: null,
  postSubjectExperienceLoading: false,
  postSubjectExperienceComplete: false,
  
  postSubjectTagsError: null,
  postSubjectTagsLoading: false,
  postSubjectTagsComplete: false,

  postProjectPositionsError: null,
  postProjectPositionsLoading: false,
  postProjectPositionsComplete: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // Biography
    case actionTypes.POST_BIOGRAPHY_START:
      return updateObject(state, {
        postWorkBiographyComplete: false,
        postWorkBiographyError: null,
        postWorkBiographyLoading: true
      });

    case actionTypes.POST_BIOGRAPHY_SUCCESS:
      return updateObject(state, {
        postWorkBiographyError: null,
        postWorkBiographyLoading: false,
        postWorkBiographyComplete: true
      });

    case actionTypes.POST_BIOGRAPHY_FAIL:
      return updateObject(state, {
        postWorkBiographyError: action.error,
        postWorkBiographyLoading: false
      });

    // Subject user would like experience in
    case actionTypes.POST_SUBJECTEXPERIENCE_START:
      return updateObject(state, {
        postSubjectExperienceError: null,
        postSubjectExperienceLoading: true
      });

    case actionTypes.POST_SUBJECTEXPERIENCE_SUCCESS:
      return updateObject(state, {
        postSubjectExperienceError: null,
        postSubjectExperienceLoading: false,
        postSubjectExperienceComplete: true
      });

    case actionTypes.POST_SUBJECTEXPERIENCE_FAIL:
      return updateObject(state, {
        postSubjectExperienceError: action.error,
        postSubjectExperienceLoading: false
      });

    // Subject specific tags
    case actionTypes.POST_SUBJECTTAGS_START:
      return updateObject(state, {
        postSubjectTagsError: null,
        postSubjectTagsLoading: true
      });

    case actionTypes.POST_SUBJECTTAGS_SUCCESS:
      return updateObject(state, {
        postSubjectTagsError: null,
        postSubjectTagsLoading: false,
        postSubjectTagsComplete: true
      });

    case actionTypes.POST_SUBJECTTAGS_FAIL:
      return updateObject(state, {
        postSubjectTagsError: action.error,
        postSubjectTagsLoading: false
      });

    // Project positions user is seeking
    case actionTypes.POST_PROJECTPOSITIONS_START:
      return updateObject(state, {
        postProjectPositionsError: null,
        postProjectPositionsLoading: true
      });

    case actionTypes.POST_PROJECTPOSITIONS_SUCCESS:
      return updateObject(state, {
        postProjectPositionsError: null,
        postProjectPositionsLoading: false,
        postProjectPositionsComplete: true
      });

    case actionTypes.POST_PROJECTPOSITIONS_FAIL:
      return updateObject(state, {
        postProjectPositionsError: action.error,
        postProjectPositionsLoading: false
      });

    default:
      return state;
  }
};

export default reducer;
