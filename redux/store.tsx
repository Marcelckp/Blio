import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'

interface Store {
    reducer: {[key: string]: any}
}

export const store:any = configureStore({
  reducer: {
    user: userReducer,
  },
})
