import * as Actions from '../types';
const initialState = {
  uid: null,
  accessToken: null,
  userData: {},
  tempUser: null,
  // userType: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.LOGIN: {
      console.log('-----------Access Token in Action------------');
      console.log(action.payload);
      return {
        ...state,
        accessToken: action.payload,
        dealer: action.dealer,
      };
    }
    case Actions.LOGOUT: {
      console.log('-----------Logout in Reducer------------');
      return {
        ...state,
        uid: null,
        userData: null,
        accessToken: null,
      };
    }

    default: {
      return state;
    }
  }
};

export default authReducer;
