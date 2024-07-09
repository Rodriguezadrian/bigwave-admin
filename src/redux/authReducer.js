// authReducer.js
const initialState = {
  userId: null,
  // other user-related state
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        userId: action.payload.userId,
        // other user data
      };
    default:
      return state;
  }
};

export default authReducer;
