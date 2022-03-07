import { createSlice } from '@reduxjs/toolkit'
import Cookie from 'js-cookie'

let biscuit;

if (Cookie.get('user')) {
    biscuit = JSON.parse(Cookie.get('user') || "{}")
}

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: biscuit || null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload
      // Cookie.set('user', JSON.stringify(state.user))
    },
    logout: (state) => {
      state.user = null
      Cookie.remove('user')
    },
  },
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer
