import { createSlice } from '@reduxjs/toolkit';
import Cookie from 'js-cookie';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;

        },
        logout: (state) => {
            state.user = null;
            Cookie.remove('user');
        }
    }
})

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;