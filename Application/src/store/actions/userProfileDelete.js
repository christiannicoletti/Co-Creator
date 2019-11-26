import * as actionTypes from "./actionTypes";
import axios from "axios";

/*
 *   Delete certain user profile content:
 *   subject experience
 *   subject tags
 *   project positions
 *   
 */

export const deletePublicUserContentStart = () => {
  return {
    type: actionTypes.DELETE_PUBLICUSERCONTENT_START
  };
};

export const deletePublicUserContentFail = () => {
  return {
    type: actionTypes.DELETE_PUBLICUSERCONTENT_FAIL
  };
};

export const deletePublicUserContentSuccess = () => {
  return {
    type: actionTypes.DELETE_PUBLICUSERCONTENT_SUCCESS
  };
};

export const deletePublicUserContent = (username, arrayName, array, id) => {
  return async dispatch => {
    try {
      dispatch(deletePublicUserContentStart());
      // Removing item from array that was passed in
      const removedItemArray = array.filter(el => el !== id);

      let removedItemContentArray = [];
      let originalContentArray = [];

      // Push contents of array (item removed)
      for (let key in removedItemArray) {
        removedItemContentArray.push(removedItemArray[key].content)
      }

      // Push contents of array (item not removed)
      for (let key in array) {
        originalContentArray.push(array[key].content)
      }

      // Find difference between removed item array and non-removed item array
      // This gives us the removed item
      let removedItem = originalContentArray.filter(x => !removedItemContentArray.includes(x));

      localStorage.setItem(`${removedItem}`, `${removedItem}`);
      let url_retrieve = `https://us-central1-co-creator-144ca.cloudfunctions.net/deleteUserContent`;
      const user = {
        username: username,
        [arrayName]: removedItemContentArray
      };
      const userData = await axios.post(url_retrieve, user);
      console.log("Public content deleted, new array: ", userData);

      const previousItems = localStorage.getItem(`publicuserinfo${arrayName}`);

      let newItems = `${previousItems}`.replace(`,${removedItem}`, '')
      newItems = `${newItems}`.replace(`${removedItem},`, '')
      newItems = `${newItems}`.replace(`${removedItem}`, '')

      localStorage.setItem(`publicuserinfo${arrayName}`,`${newItems}`);
      localStorage.removeItem(`${removedItem}`); 
      dispatch(deletePublicUserContentSuccess());
    } catch (err) {
      dispatch(deletePublicUserContentFail(err));
    }
  };
};
