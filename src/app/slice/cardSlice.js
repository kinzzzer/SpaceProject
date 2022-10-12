import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    allCards: [],
    currentCard: [],
    shoppingList: []
}

export const counterSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        getCardList: (state, action) => {
            state.card = [...state.cards, ...action.payload]
        },
        // getOneCard: (state, action) => {
        //     state.card = state.cards.filter((item) => {
        //         return item.id !== action.payload.id
        //     })
    },
    addPurchase: (state, action) => {
        state.purchase = [...state.purchase, ...action.payload]
    },
    removePurchase: (state, action) => {
        state.purchase = state.purchase.filter((item) => {
            console.log(item.id, action.payload.id)
            return item.id !== action.payload.id
        })
    },
})

// Action creators are generated for each case reducer function
export const { getCardList, addPurchase, removePurchase } = counterSlice.actions

export default counterSlice.reducer