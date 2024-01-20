import * as Actions from '../types';

export const logIn = (token, dealer) => {
  console.log('-----------Access Token in Reducer------------');
  console.log(token);
  console.log(dealer);
  return dispatch => {
    dispatch({type: Actions.LOGIN, payload: token, dealer: dealer});
  };
};

export const logOut = () => {
  console.log('-----------Logout in Reducer------------');

  return dispatch => {
    dispatch({type: Actions.LOGOUT});
  };
};
