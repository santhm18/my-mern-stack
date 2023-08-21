import { Types } from '../_constants/actionTypes';
import { loginUser, registerUser, logoutUser , updateUser } from '../_services';
import { userDetails } from '../_helpers';
export const userActions = {
  register,
  login,
  updateProfile,
  logout
};


function register(user, navigateTo, from) {
  return async dispatch => { // returns dispatch method so that other async operations of dipatch can be executed.
    await dispatch(request(user));
    const { data } = await registerUser(user);
    try {
      await dispatch(success(data));
      navigateTo(from);
    } catch (err) {
      // dispatch error message here
      console.log(err);
    }
  }

  function request(user) { return { type: Types.REGISTER_REQUEST, user } }
  function success(user) { return { type: Types.REGISTER_SUCCESS, user } }
}

function login(user, navigate, from) {
  return async dispatch => {
    await dispatch(request(user.email));
    await loginUser(user).then((response) => {
      // Success
      sessionStorage.setItem('userDetails', JSON.stringify(response.data));
      dispatch(success(response.data));  // dispatch success message here
      navigate(from);

      // history.push("/home");
    })
      .catch((error) => {
        // Error
        dispatch(errorMsg(error.response.data.error));
      });
  }

  function request(user) { return { type: Types.LOGIN_REQUEST, user } }
  function success(user) { return { type: Types.LOGIN_SUCCESS, user } }
  function errorMsg(message) { return { type: Types.LOGIN_FAILURE, message } }
}


function updateProfile(user, navigate, from,setIsLoading) {
  setIsLoading(true);
  return async dispatch => {
    await dispatch(request(user));
    await updateUser(user).then((response) => {
      // Success
      sessionStorage.setItem('userDetails', JSON.stringify(response.data));
       setIsLoading(false);
      dispatch(success(response.data));  // dispatch success message here
      navigate(from);
    })
      .catch((error) => {
        // Error
        setIsLoading(false);
        dispatch(errorMsg(error.response.data.error));
      });
  }

  function request(user) { return { type: Types.REGISTER_UPDATE_REQUEST, user } }
  function success(user) { return { type: Types.REGISTER_UPDATE_SUCCESS, user } }
  function errorMsg(message) { return { type: Types.REGISTER_UPDATE_FAILURE, message } }
}


function logout(token,navigate, from) {
  return async dispatch => { // returns dispatch method so that other async operations of dipatch can be executed.
   dispatch(request('Logging out'));  // dispatch request message here 
    await logoutUser(token,userDetails()).then((response) => {
    dispatch(success(response.data.user));  // dispatch request message here 
    sessionStorage.clear();
    navigate(from);
    }).catch((error) => {
        // Error
        dispatch(errorMsg(error));

      });
  }

  function request(message) { return { type: Types.LOGOUT_REQUEST, message } }
  function success(user) { return { type: Types.LOGOUT_SUCCESS, user } }
  function errorMsg(message) { return { type: Types.LOGOUT_FAILURE, message } }
}