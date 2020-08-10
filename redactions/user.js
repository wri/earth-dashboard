/**
 * CONSTANTS
*/
const SET_USER = 'user/setUser';

/**
 * REDUCER
*/
const initialState = {
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER: {
      return { ...state, ...action.payload };
    }

    default:
      return state;
  }
}

/**
 * ACTIONS
 * - setUser
*/
export function setUser(user) {
  return (dispatch) => {
    if (!user) return;

    const userObj = { ...user };

    if (userObj.token) {
      userObj.token2 = userObj.token.includes('Bearer') ? userObj.token2 : userObj.token;
      userObj.token = userObj.token.includes('Bearer') ? userObj.token : `Bearer ${userObj.token}`;
    }

    // TO-DO: this "serialization" should be done in the API
    // eslint-disable-next-line no-underscore-dangle
    if (userObj._id) userObj.id = userObj._id;

    dispatch({ type: SET_USER, payload: userObj });
  };
}
