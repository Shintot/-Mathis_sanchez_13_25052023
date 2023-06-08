import { LOG_IN, LOG_OUT, UPDATE_USER, FETCH_USER, EDIT_USER } from './Action';

const initialState = {
  token: null,
  user: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        token: action.payload,
      };
    case LOG_OUT:
      return initialState;
    case UPDATE_USER:
    case FETCH_USER:
    case EDIT_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
