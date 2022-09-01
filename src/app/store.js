import { configureStore } from '@reduxjs/toolkit'
import rocketReducer from './slices/rocketSlice'

export const store = configureStore({
    reducer: {
        rockets: rocketReducer
    },
})
