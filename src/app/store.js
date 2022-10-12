import { configureStore } from '@reduxjs/toolkit'
import cardsReducer from './slice/cardSlice'

export const store = configureStore({
    reducer: {
        cards: cardsReducer
    },
})
// state все карточки 
// curent и конрктено вібранная карта 