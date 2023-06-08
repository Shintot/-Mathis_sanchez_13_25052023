export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const UPDATE_USER = 'UPDATE_USER';
export const FETCH_USER = 'FETCH_USER';
export const EDIT_USER = 'EDIT_USER';

export const logIn = (token) => {
  return {
    type: LOG_IN,
    payload: token,
  };
};

export const logOut = () => {
  return {
    type: LOG_OUT
  };
};

export const updateUser = (user) => {
  return {
    type: UPDATE_USER,
    payload: user,
  };
};

export const fetchUser = (user) => {
  return {
    type: FETCH_USER,
    payload: user,
  };
};

export const editUser = (updatedUser) => {
  return {
    type: EDIT_USER,
    payload: updatedUser,
  };
};
