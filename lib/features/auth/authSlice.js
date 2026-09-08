import { createSlice } from '@reduxjs/toolkit';

const getInitialAuth = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('gocart_token');
    const user = localStorage.getItem('gocart_user');
    if (token && user) {
      try {
        return { token, user: JSON.parse(user), isAuthenticated: true };
      } catch (e) {
        return { token: null, user: null, isAuthenticated: false };
      }
    }
  }
  return { token: null, user: null, isAuthenticated: false };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialAuth(),
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      if (typeof window !== 'undefined') {
        localStorage.setItem('gocart_token', token);
        localStorage.setItem('gocart_user', JSON.stringify(user));
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('gocart_token');
        localStorage.removeItem('gocart_user');
      }
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
