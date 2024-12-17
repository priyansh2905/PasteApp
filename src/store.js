import { configureStore, createSlice } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import pasteReducer from './redux/pasteSlice'

export const store = configureStore({
  reducer: {
    paste : pasteReducer,
  },
})