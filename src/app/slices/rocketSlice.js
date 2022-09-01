import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    rockets: [],
    favorites: [],
}

export const rocketSlice = createSlice({
    name: 'rockets',
    initialState,
    reducers: {
        setRockets: (state, action) => {
            state.rockets = [...state.rockets, ...action.payload]
        },
        addFavorites: (state, action) => {
            state.favorites = [...state.favorites, action.payload]
        },
        removeFavorites: (state, action) => {
            state.favorites = state.favorites.filter((item) => {
                console.log(item.id, action.payload.id)
                return item.id  !== action.payload.id
            })
        },
    },
})

// Action creators are generated for each case reducer function
export const { setRockets, addFavorites, removeFavorites } = rocketSlice.actions

export default rocketSlice.reducer