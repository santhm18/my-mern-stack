import { Types } from '../_constants/actionTypes';
import { fetchMemories, createMemory, updateMemory, deleteMemory, contactUsDetails } from '../_services';
import { userDetails } from '../_helpers';

// Action Creators
export const createNewMemory = (memory) => async (dispatch) => {
    await createMemory(memory,userDetails()).then((response) => {
        dispatch(success(response.data.memory));  // dispatch success message here
    })
    .catch((error) => {
       console.log(error);
    });
    function success(memory) { return { type: Types.CREATE_MEMORY, payload: memory} }
 }

export const getMemories = () => async (dispatch) => {

    await fetchMemories(userDetails()).then((response) => {
        console.log(response);
        dispatch(success(response.data.memories));  // dispatch success message here
    })
    .catch((error) => {
       console.log(error);
    });
    function success(memories) { return { type: Types.FETCH_ALL_MEMORIES, payload: memories} }
 }

 export const patchMemory = (id,memory, navigate, from) => async (dispatch) => {

    await updateMemory(id,memory,userDetails()).then((response) => {
        dispatch(success(response.data));  // dispatch success message here
        navigate(from);
    })
    .catch((error) => {
       console.log(error);
    });
    function success(memory) { return { type: Types.UPDATE_MEMORY, payload: memory} }
 }

 export const removeMemory = (id) => async (dispatch) => {

   await deleteMemory(id,userDetails()).then((response) => {
       window.location.reload();
      dispatch(success(response.data.message));  // dispatch success message here
   })
   .catch((error) => {
      console.log(error);
   });
  function success(message) { return { type: Types.DELETE_MEMORY, payload: message} }
}

// Action Creators
export const sendContactDetails = (contactdetails) => async (dispatch) => {
   await contactUsDetails(contactdetails,userDetails()).then((response) => {
     //  dispatch(success(response.data));  // dispatch success message here
     console.log(response);
   })
   .catch((error) => {
      console.log(error);
   });
 //  function success(contactdetails) { return { type: Types.CREATE_MEMORY, payload: contactdetails} }
}